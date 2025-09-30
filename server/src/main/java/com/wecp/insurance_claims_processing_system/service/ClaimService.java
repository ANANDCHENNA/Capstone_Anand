package com.wecp.insurance_claims_processing_system.service;


import com.wecp.insurance_claims_processing_system.entity.Claim;
import com.wecp.insurance_claims_processing_system.entity.Policyholder;
import com.wecp.insurance_claims_processing_system.entity.Underwriter;
import com.wecp.insurance_claims_processing_system.repository.AdjusterRepository;
import com.wecp.insurance_claims_processing_system.repository.ClaimRepository;
import com.wecp.insurance_claims_processing_system.repository.InvestigationRepository;
import com.wecp.insurance_claims_processing_system.repository.PolicyholderRepository;
import com.wecp.insurance_claims_processing_system.repository.UnderwriterRepository;
import com.wecp.insurance_claims_processing_system.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ClaimService {

    @Autowired
    AdjusterRepository adjusterRepository;

    @Autowired
    ClaimRepository claimRepository;

    @Autowired 
    InvestigationService investigationService;

    @Autowired
    InvestigationRepository inverstigatorRepository;

    @Autowired
    PolicyholderRepository policyholderRepository;

    @Autowired
    UnderwriterRepository underwriterRepository;

    @Autowired
    UserRepository userRepository;

    
    public Claim submitPolicy(Claim claim) {
        return claimRepository.save(claim);  
    }

    
    
}
