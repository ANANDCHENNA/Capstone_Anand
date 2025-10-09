package com.wecp.insurance_claims_processing_system.controller;

import com.wecp.insurance_claims_processing_system.entity.Claim;
import com.wecp.insurance_claims_processing_system.entity.Policy;
import com.wecp.insurance_claims_processing_system.entity.Policyholder;
import com.wecp.insurance_claims_processing_system.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.wecp.insurance_claims_processing_system.repository.PolicyholderRepository;
import com.wecp.insurance_claims_processing_system.repository.PolicyRepository;
import java.util.List;

@RestController
public class PolicyholderController {

    @Autowired
    private ClaimService claimService;
    @Autowired
    private PolicyholderRepository policyholderRepository;
    @Autowired
    private PolicyRepository policyRepository;

    @PostMapping("/api/policyholder/claim")
    public ResponseEntity<?> submitClaim(@RequestParam Long policyholderId, @RequestBody Claim claim) {
        Claim savedClaim = claimService.submitClaim(policyholderId, claim);
        return ResponseEntity.status(HttpStatus.OK).body(savedClaim);
    }

    // @PostMapping(value = "/api/policyholder/claim", produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<Claim> submitClaim(@RequestParam Long policyholderId, @RequestBody Claim claim) {
    //     Claim savedClaim = claimService.submitClaim(policyholderId, claim);
    //     return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(savedClaim);
    // }

    @GetMapping("/api/policyholder/claims")
    public ResponseEntity<List<Claim>> getClaims(@RequestParam Long policyholderId) {
        List<Claim> claims = claimService.getClaimsByPolicyholder(policyholderId);
        return ResponseEntity.ok(claims);
    }

    @PostMapping("/api/policyholder/purchase")
    public ResponseEntity<String> purchasePolicy(@RequestParam Long policyId, @RequestParam Long policyholderId) {
        Policyholder holder = policyholderRepository.findById(policyholderId).get();
        Policy policy = policyRepository.findById(policyId).get();

        if (holder.getOwnedPolicies().contains(policy)) {
            return ResponseEntity.badRequest().body("Policy already owned");
        }

        holder.getOwnedPolicies().add(policy);
        policyholderRepository.save(holder);
        return ResponseEntity.ok("Policy purchased successfully");
    }
}
