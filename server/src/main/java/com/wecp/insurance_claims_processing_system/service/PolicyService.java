package com.wecp.insurance_claims_processing_system.service;

import com.wecp.insurance_claims_processing_system.entity.Policy;
import com.wecp.insurance_claims_processing_system.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Policy updatePolicy(Long id, Policy policy) {
        Policy existing = policyRepository.findById(id).orElseThrow();
        existing.setPolicyName(policy.getPolicyName());
        existing.setPolicyType(policy.getPolicyType());
        existing.setDescription(policy.getDescription());
        existing.setPremiumAmount(policy.getPremiumAmount());
        existing.setCoverageAmount(policy.getCoverageAmount());
        existing.setDurationInYears(policy.getDurationInYears());
        existing.setTermsAndConditions(policy.getTermsAndConditions());
        return policyRepository.save(existing);
    }

    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }
}
