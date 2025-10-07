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
import java.util.Optional;
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
        policy.setTermMonths(termMonths);
        policy.setStatus(com.wecp.insurance_claims_processing_system.entity.PolicyStatus.ACTIVE);
        policy.setPolicyholder(policyholder);
        return policyRepository.save(policy);
    }

    private String generatePolicyNumber() {
        return "POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Optional<Policy> getPolicyById(Long id) {
        return policyRepository.findById(id);
    }

    @Transactional
    public Policy updatePolicy(Long id, Policy updatedPolicy) {
        return policyRepository.findById(id).map(existing -> {
            existing.setPolicyType(updatedPolicy.getPolicyType());
            existing.setPremium(updatedPolicy.getPremium());
            existing.setTermMonths(updatedPolicy.getTermMonths());
            existing.setStatus(updatedPolicy.getStatus());
            return policyRepository.save(existing);
        }).orElse(null);
    }

    @Transactional
    public boolean deletePolicy(Long id) {
        if (policyRepository.existsById(id)) {
            policyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}