package com.wecp.insurance_claims_processing_system.service;

import com.wecp.insurance_claims_processing_system.entity.*;
import com.wecp.insurance_claims_processing_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BuyPolicyService {

    @Autowired
    private BuyPolicyRepository buyPolicyRepository;

    @Autowired
    private PolicyholderRepository policyholderRepository;

    @Autowired
    private PolicyRepository policyRepository;

    public BuyPolicy buyPolicy(Long policyholderId, Long policyId) {
        Policyholder policyholder = policyholderRepository.findById(policyholderId).orElseThrow();
        Policy policy = policyRepository.findById(policyId).orElseThrow();

        BuyPolicy buyPolicy = new BuyPolicy();
        buyPolicy.setPolicyholder(policyholder);
        buyPolicy.setPolicy(policy);
        buyPolicy.setPurchaseDate(LocalDate.now());
        //buyPolicy.setExpiryDate(LocalDate.now().plusYears(policy.getDurationInYears()));
        buyPolicy.setStatus("ACTIVE");

        return buyPolicyRepository.save(buyPolicy);
    }

    public List<BuyPolicy> getPoliciesByPolicyholder(Long policyholderId) {
        Policyholder policyholder = policyholderRepository.findById(policyholderId).orElseThrow();
        return buyPolicyRepository.findByPolicyholder(policyholder);
    }
}
