package com.wecp.insurance_claims_processing_system.controller;

import com.wecp.insurance_claims_processing_system.entity.BuyPolicy;
import com.wecp.insurance_claims_processing_system.service.BuyPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buypolicy")
public class BuyPolicyController {

    @Autowired
    private BuyPolicyService buyPolicyService;

    @PostMapping
    public ResponseEntity<BuyPolicy> buyPolicy(@RequestParam Long policyholderId,
                                               @RequestParam Long policyId) {
        return new ResponseEntity<>(buyPolicyService.buyPolicy(policyholderId, policyId), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BuyPolicy>> getPoliciesByPolicyholder(@RequestParam Long policyholderId) {
        return ResponseEntity.ok(buyPolicyService.getPoliciesByPolicyholder(policyholderId));
    }
}
