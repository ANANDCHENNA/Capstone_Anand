package com.wecp.insurance_claims_processing_system.controller;


import com.wecp.insurance_claims_processing_system.entity.Claim;
import com.wecp.insurance_claims_processing_system.entity.Underwriter;
import com.wecp.insurance_claims_processing_system.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdjusterController {

    @Autowired
    private ClaimService claimService;

  

    @PutMapping("/api/adjuster/claim/{id}")
    public ResponseEntity<Claim> updateClaim(@PathVariable Long id, @RequestBody Claim claimDetails) {
        return new ResponseEntity<Claim>(claimService.updateClaim(id, claimDetails), HttpStatus.CREATED);
    }

    @GetMapping("/api/adjuster/claims")
    public ResponseEntity<List<Claim>> getAllClaims() {
        return new ResponseEntity<>(claimService.getAllClaims(), HttpStatus.OK);
    }

    @GetMapping("/api/adjuster/underwriters")
    public ResponseEntity<List<Underwriter>> getAllUnderwriters() {
        return new ResponseEntity<>(claimService.getAllUnderwriters(), HttpStatus.OK);
    }


    @PutMapping("/api/adjuster/claim/{claimId}/assign")
    public ResponseEntity<Claim> assignClaimToUnderwriter(@PathVariable Long claimId, @RequestParam Long underwriterId) {
        Claim updatedClaim = claimService.assignClaimToUnderwriter(claimId, underwriterId);
        return ResponseEntity.ok(updatedClaim);
    

    }

    @GetMapping("/api/adjuster/claim/{claimId}")
    public Claim getClaimById(@PathVariable Long claimId) {
        return claimService.getClaimById(claimId);
    }







}




