package com.wecp.insurance_claims_processing_system.controller;


import com.wecp.insurance_claims_processing_system.entity.Claim;
import com.wecp.insurance_claims_processing_system.entity.Policy;
import com.wecp.insurance_claims_processing_system.entity.Policyholder;
import com.wecp.insurance_claims_processing_system.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wecp.insurance_claims_processing_system.repository.PolicyholderRepository;
import com.wecp.insurance_claims_processing_system.repository.PolicyRepository;

import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PolicyholderController {

    @Autowired
    private ClaimService claimService;
    @Autowired
    private PolicyholderRepository policyholderRepository;
    // @Autowired
    // private PolicyRepository policyRepository;
    // @PostMapping("/api/policyholder/claim")

    // public ResponseEntity<Claim> submitClaim(@RequestParam Long policyholderId, @RequestBody Claim claim) {
    //     return new ResponseEntity<Claim>(claimService.submitClaim(policyholderId, claim), HttpStatus.CREATED);
        
    // }

    @PostMapping("/api/policyholder/claim")
    public ResponseEntity<Claim> submitClaim(
            @RequestParam Long policyholderId,
            @RequestParam("description") String description,
            @RequestParam("date") @DateTimeFormat(pattern = "dd-MM-yyyy") Date date,
            @RequestParam("status") String status,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        Claim claim = new Claim();
        claim.setDescription(description);
        claim.setDate(date);
        claim.setStatus(status);
    
        Claim savedClaim = claimService.submitClaim(policyholderId, claim, photo);
        return new ResponseEntity<>(savedClaim, HttpStatus.CREATED);
    }

    @GetMapping("/api/policyholder/claims")
    public ResponseEntity<List<Claim>> getClaims(@RequestParam Long policyholderId) {
        List<Claim> claims = claimService.getClaimsByPolicyholder(policyholderId);
        return ResponseEntity.ok(claims);
    }
    
    // @PostMapping("/api/policyholder/purchase")
    // public ResponseEntity<String> purchasePolicy(@RequestParam Long policyId, @RequestParam Long policyholderId) {
    //     Policyholder holder = policyholderRepository.findById(policyholderId).get();
    //     Policy policy = policyRepository.findById(policyId).get();
    
    //     // if(holder.getOwnedPolicies().contains(policy)) {
    //     //     return ResponseEntity.badRequest().body("Policy already owned");
    //     // }
    
    //     // holder.getOwnedPolicies().add(policy);
    //     policyholderRepository.save(holder);
    //     return ResponseEntity.ok("Policy purchased successfully");
    // }
    
    
}
