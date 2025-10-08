package com.wecp.insurance_claims_processing_system.controller;
 
 
import com.wecp.insurance_claims_processing_system.dto.LoginRequest;
import com.wecp.insurance_claims_processing_system.dto.LoginResponse;
import com.wecp.insurance_claims_processing_system.entity.User;
import com.wecp.insurance_claims_processing_system.jwt.JwtUtil;
import com.wecp.insurance_claims_processing_system.service.OtpService;
import com.wecp.insurance_claims_processing_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
 
 
 
@RestController
@RequestMapping
public class RegisterAndLoginController {
 
   
    @Autowired
    UserService userService;
 
    @Autowired
    OtpService OtpService;
 
    @Autowired
    AuthenticationManager authenticationManager;
 
    @Autowired
    JwtUtil jwtUtil;
 
 
    @PostMapping("/api/user/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try{
            return ResponseEntity.ok(userService.registerUser(user));
        } catch(Exception ex) {
            return new ResponseEntity<>(ex.getMessage() , HttpStatus.CONFLICT);
        }
    }
 
    // Step 1: validate username/password and send OTP
        @PostMapping("/api/user/login")
        public ResponseEntity<?> loginAndSendOtp(@RequestBody LoginRequest loginRequest) {
            User user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
            if (user != null) {
                // Generate & email OTP
                OtpService.createAndSendOtpForUser(user.getUsername());
                // Return a response saying OTP sent (do NOT return token yet)
                return ResponseEntity.ok().body(
                    java.util.Map.of(
                        "userId", user.getId(),
                        "username", user.getUsername(),
                        "message", "OTP_SENT"
                    )
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(java.util.Map.of("message","INVALID_CREDENTIALS"));
            }
        }
   
        // Step 2: verify OTP and return token on success
        @PostMapping("/api/user/verify-otp")
        public ResponseEntity<?> verifyOtpAndLogin(@RequestBody java.util.Map<String, String> body) {
            String username = body.get("username");
            String otp = body.get("otp");
            if (username == null || otp == null) {
                return ResponseEntity.badRequest().body(java.util.Map.of("message","MISSING_PARAMS"));
            }
            boolean ok = OtpService.verifyOtp(username, otp);
            if (ok) {
                String token = jwtUtil.generateToken(username);
                User user = userService.getUserByUsername(username);
                LoginResponse response = new LoginResponse(user.getId(), token, user.getUsername(), user.getEmail(), user.getRole());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(java.util.Map.of("message","INVALID_OR_EXPIRED_OTP"));
            }
        }
   
        // Resend OTP (server enforces cooldown)
        @PostMapping("/api/user/resend-otp")
        public ResponseEntity<?> resendOtp(@RequestBody java.util.Map<String, String> body) {
            String username = body.get("username");
            if (username == null) return ResponseEntity.badRequest().body(java.util.Map.of("message","MISSING_USERNAME"));
            try {
                if (!OtpService.canResend(username)) {
                    return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                            .body(java.util.Map.of("message","RESEND_COOLDOWN"));
                }
                OtpService.resendOtp(username);
                return ResponseEntity.ok(java.util.Map.of("message","OTP_RESENT"));
            } catch (Exception ex) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(java.util.Map.of("message","ERROR", "detail", ex.getMessage()));
            }
        }
   
   
     
}