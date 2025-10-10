package com.wecp.insurance_claims_processing_system.service;

import com.wecp.insurance_claims_processing_system.entity.Claim;
import com.wecp.insurance_claims_processing_system.entity.Investigation;
import com.wecp.insurance_claims_processing_system.repository.ClaimRepository;
import com.wecp.insurance_claims_processing_system.repository.InvestigationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestigationService {

    @Autowired
    private InvestigationRepository investigationRepository;

    @Autowired
    private ClaimRepository claimRepository;

    public Investigation createInvestigation(Investigation investigation) {
        if (investigation.getClaim() != null) {
            Claim claim = claimRepository.findById(investigation.getClaim().getId()).get();
            if (claim != null) {
                investigation.setClaim(claim);
            }
        }
        return investigationRepository.save(investigation);
    }

    public List<Investigation> findAllInvestigations() {
        return investigationRepository.findAll();
    }

    public Investigation getInvestigationById(Long id) {
        Investigation investigation = investigationRepository.findById(id).get();
        return investigation;
    }

    // public Investigation updateInvestigation(Long id, Investigation investigationDetails) {
    //     Claim claim = claimRepository.findById(investigationDetails.getClaim().getId()).orElse(null);
    //     return investigationRepository.findById(id).map(investigation -> {
    //         investigation.setReport(investigationDetails.getReport());
    //         investigation.setStatus(investigationDetails.getStatus());
    //         investigation.setClaim(claim);
    //         return investigationRepository.save(investigation);
    //     }).orElseThrow(() -> new IllegalArgumentException("Investigation not found"));
    // }

    public Investigation updateInvestigation(Long id, Investigation investigationDetails) {
        Claim claim = claimRepository.findById(investigationDetails.getClaim().getId())
                .orElseThrow(() -> new IllegalArgumentException("Claim not found"));

        return investigationRepository.findById(id).map(investigation -> {
            investigation.setReport(investigationDetails.getReport());
            investigation.setStatus(investigationDetails.getStatus());
            investigation.setClaim(claim);

            Investigation savedInvestigation = investigationRepository.save(investigation);

            claim.setStatus(investigationDetails.getStatus());
            claim.setInvestigation(savedInvestigation);
            claimRepository.save(claim);

            return savedInvestigation;
        }).orElseThrow(() -> new IllegalArgumentException("Investigation not found"));
    }

}
