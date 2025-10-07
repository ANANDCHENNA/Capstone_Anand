package com.wecp.insurance_claims_processing_system.controller;

import com.wecp.insurance_claims_processing_system.entity.Policy;
import com.wecp.insurance_claims_processing_system.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @RequestMapping("/api/policy")
@CrossOrigin
public class PolicyController {

    @Autowired
    private PolicyRepository policyRepository;

    @GetMapping("/api/policies")
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }
    // @GetMapping("/api/policies/{policyholderId}")
    
    //     public List<Policy> getPoliciesByOwnedUser(@PathVariable Long policyholderId)
    //     {
    //     return policyRepository.findByPolicyHolder_id(policyholderId);
    //     }
}