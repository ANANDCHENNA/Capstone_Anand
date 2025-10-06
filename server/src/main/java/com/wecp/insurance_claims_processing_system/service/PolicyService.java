package com.wecp.insurance_claims_processing_system.service;

import com.wecp.insurance_claims_processing_system.entity.Policy;
import com.wecp.insurance_claims_processing_system.entity.Policyholder;
import com.wecp.insurance_claims_processing_system.repository.PolicyRepository;
import com.wecp.insurance_claims_processing_system.repository.PolicyholderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private PolicyholderRepository policyholderRepository;

    public List<Policy> getPoliciesForPolicyholder(Policyholder p) {
        return policyRepository.findByPolicyholder(p);
    }

    public Policy getByPolicyNumber(String policyNumber) {
        return policyRepository.findByPolicyNumber(policyNumber).orElse(null);
    }

    @Transactional
    public Policy purchasePolicy(Policyholder policyholder, String policyType, Double premium, int termMonths) {
        Policy policy = new Policy();
        policy.setPolicyNumber(generatePolicyNumber());
        policy.setPolicyType(policyType);
        policy.setPremium(premium);
        LocalDate start = LocalDate.now();
        policy.setStartDate(start);
        policy.setEndDate(start.plusMonths(termMonths));
        policy.setStatus(com.wecp.insurance_claims_processing_system.entity.PolicyStatus.ACTIVE);
        policy.setPolicyholder(policyholder);
        return policyRepository.save(policy);
    }

    private String generatePolicyNumber() {
        // simple UUID based short id (customize for your format)
        return "POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
