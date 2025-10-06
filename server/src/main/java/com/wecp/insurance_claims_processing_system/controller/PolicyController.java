package com.wecp.insurance_claims_processing_system.controller;

import com.wecp.insurance_claims_processing_system.entity.Policy;
import com.wecp.insurance_claims_processing_system.entity.Policyholder;
import com.wecp.insurance_claims_processing_system.entity.User;
import com.wecp.insurance_claims_processing_system.repository.PolicyholderRepository;
import com.wecp.insurance_claims_processing_system.service.PolicyService;
import com.wecp.insurance_claims_processing_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @Autowired
    private PolicyholderRepository policyholderRepository;

    @Autowired
    private UserService userService;

    // List policies for current logged-in policyholder
    @GetMapping("/me")
    public ResponseEntity<?> getMyPolicies() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User u = userService.findByUsername(username);
        if (u == null) return ResponseEntity.status(404).body("User not found");

        if (!(u instanceof Policyholder)) {
            return ResponseEntity.status(403).body("Only policyholders can view their policies");
        }
        Policyholder ph = (Policyholder) u;
        List<Policy> list = policyService.getPoliciesForPolicyholder(ph);
        return ResponseEntity.ok(list);
    }

    // Purchase a policy
    @PostMapping("/purchase")
    public ResponseEntity<?> purchasePolicy(@RequestBody PurchaseRequest req) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        com.wecp.insurance_claims_processing_system.entity.User u = userService.findByUsername(username);
        if (u == null) return ResponseEntity.status(404).body("User not found");
        if (!(u instanceof Policyholder)) {
            return ResponseEntity.status(403).body("Only policyholders can buy policies");
        }

        Policyholder ph = (Policyholder) u;
        // basic validation
        if (req.getPolicyType() == null || req.getPremium() == null || req.getTermMonths() <= 0) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        Policy saved = policyService.purchasePolicy(ph, req.getPolicyType(), req.getPremium(), req.getTermMonths());
        return ResponseEntity.ok(saved);
    }
}
