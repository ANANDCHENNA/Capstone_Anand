package com.wecp.insurance_claims_processing_system.controller;

import com.wecp.insurance_claims_processing_system.repository.PolicyRepository;
import com.wecp.insurance_claims_processing_system.dto.PurchaseRequest;
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
        if (u == null)
            return ResponseEntity.status(404).body("User not found");

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
        if (u == null)
            return ResponseEntity.status(404).body("User not found");
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

    // CREATE
    @PostMapping
    public ResponseEntity<Policy> createPolicy(@RequestBody Policy policy) {
        return ResponseEntity.ok(policyService.createPolicy(policy));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Policy>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Policy> getPolicyById(@PathVariable Long id) {
        return policyService.getPolicyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Policy> updatePolicy(@PathVariable Long id, @RequestBody Policy policy) {
        Policy updated = policyService.updatePolicy(id, policy);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicy(@PathVariable Long id) {
        boolean deleted = policyService.deletePolicy(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


    // Get policies for specific policyholder
    @GetMapping("/policyholder/{id}")
    public List<Policy> getPoliciesByPolicyholder(@PathVariable Long id) {
        Policyholder policyholder = policyholderRepository.findById(id).orElse(null);
        if (policyholder == null)
            return List.of();
        return policyService.getPoliciesForPolicyholder(policyholder);
    }

    // Buy a new policy
    @PostMapping("/purchase/{policyholderId}")
    public Policy purchasePolicy(
            @PathVariable Long policyholderId,
            @RequestBody Policy purchaseRequest) {

        Policyholder policyholder = policyholderRepository.findById(policyholderId).orElse(null);
        if (policyholder == null)
            throw new RuntimeException("Policyholder not found");

        return policyService.purchasePolicy(
                policyholder,
                purchaseRequest.getPolicyType(),
                purchaseRequest.getPremium(),
                purchaseRequest.getTermMonths());
    }

}
