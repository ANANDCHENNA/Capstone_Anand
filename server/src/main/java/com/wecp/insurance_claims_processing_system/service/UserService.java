package com.wecp.insurance_claims_processing_system.service;
 
 import com.wecp.insurance_claims_processing_system.entity.*;
 import com.wecp.insurance_claims_processing_system.repository.*;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.security.core.authority.SimpleGrantedAuthority;
 import org.springframework.security.core.userdetails.UserDetails;
 import org.springframework.security.core.userdetails.UserDetailsService;
 import org.springframework.security.core.userdetails.UsernameNotFoundException;
 import org.springframework.security.crypto.password.PasswordEncoder;
 import org.springframework.stereotype.Service;
 

import java.util.Collections;

 @Service
 public class UserService implements UserDetailsService {
     @Autowired
     private UserRepository userRepository;
 
     @Autowired
     private InvestigatorRepository investigatorRepository;
 
     @Autowired
     private PolicyholderRepository policyholderRepository;
 
     @Autowired
     private AdjusterRepository adjusterRepository;
 
     @Autowired
     private UnderwriterRepository underwriterRepository;

     @Autowired
     private AdminRepository adminRepository;
 
     @Autowired
     private PasswordEncoder passwordEncoder;
   

     public User registerUser(User user) throws Exception{
        User newUser;

        User oldUser = userRepository.findByUsername(user.getUsername());
            User emailExists = userRepository.findByEmail(user.getEmail());
                if(oldUser != null){
                    throw new Exception("Username is duplicated: " + user.getUsername());
                         }
                if(emailExists != null){
                 throw new Exception("User already exists with the given email: "+user.getEmail());
                         }

        switch(user.getRole()){
         case "ADJUSTER" :
             newUser = new Adjuster();
             copyProperties(user, newUser);
             adjusterRepository.save((Adjuster) newUser);
             break;
       
         case "INVESTIGATOR" :
             newUser = new Investigator();
             copyProperties(user, newUser);
             investigatorRepository.save((Investigator) newUser);
             break;
 
             case "POLICYHOLDER":
                 newUser = new Policyholder();
                 copyProperties(user, newUser);
                 policyholderRepository.save((Policyholder) newUser);
                 break;
 
             case "UNDERWRITER" :
                 newUser =  new Underwriter();
                 copyProperties(user, newUser);
                 underwriterRepository.save((Underwriter) newUser);
                 break;

             case "ADMIN" :
                 newUser =  new Admin();
                 copyProperties(user, newUser);
                 adminRepository.save((Admin) newUser);
                 break;
             default:
                 throw new IllegalArgumentException("Invalid User try again");
               
        }
        return userRepository.save(newUser);
     }
 

     public User getUserByUsername(String username) {
         return userRepository.findByUsername(username);
     }

     
 
 @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
 
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }

    private void copyProperties(User source, User target) {
        target.setUsername(source.getUsername());
        target.setEmail((source.getEmail()));
        target.setPassword(passwordEncoder.encode(source.getPassword()));
        target.setRole(source.getRole());
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
