package com.wecp.insurance_claims_processing_system.service;

import com.wecp.insurance_claims_processing_system.entity.Claim;
import com.wecp.insurance_claims_processing_system.entity.Investigator;
import com.wecp.insurance_claims_processing_system.entity.Policyholder;
import com.wecp.insurance_claims_processing_system.entity.Underwriter;
import com.wecp.insurance_claims_processing_system.repository.ClaimRepository;
import com.wecp.insurance_claims_processing_system.repository.InvestigatorRepository;
import com.wecp.insurance_claims_processing_system.repository.PolicyholderRepository;
import com.wecp.insurance_claims_processing_system.repository.UnderwriterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private UnderwriterRepository underwriterRepository;

    @Autowired
    private InvestigatorRepository investigatorRepository;

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private PolicyholderRepository policyholderRepository;

    public Claim submitClaim(Long policyholderId, Claim claim) {
        Policyholder ph = policyholderRepository.findById(policyholderId).get();
        claim.setPolicyholder(ph);
        return claimRepository.save(claim);
    }

    public List<Claim> getClaimsByPolicyholder(Long policyholderId) {

        Policyholder ph = policyholderRepository.findById(policyholderId).get();
        List<Claim> claims = claimRepository.findByPolicyholder(ph);
        return claims;

    }

    public Claim updateClaim(Long id, Claim claimDetails) {
        Claim c = claimRepository.findById(id).get();
        c.setDescription(claimDetails.getDescription());
        c.setStatus(claimDetails.getStatus());
        c.setDate(claimDetails.getDate());
        if (claimDetails.getUnderwriter() != null && claimDetails.getUnderwriter().getId() != null) {
            Underwriter underwriter = underwriterRepository.findById(id).orElse(null);
            c.setUnderwriter(underwriter);
            // c.setPolicy_id(id);
        }
        return claimRepository.save(c);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public List<Underwriter> getAllUnderwriters() {

        return underwriterRepository.findAll();
    }

    public List<Investigator> getAllInvestigators() {

        return investigatorRepository.findAll();
    }

    public Claim assignClaimToUnderwriter(Long claimId, Long underwriterId, Long investigatorId) {

        Claim claim = claimRepository.findById(claimId).get();
        Underwriter underwriter = underwriterRepository.findById(underwriterId).get();
        Investigator investigator = investigatorRepository.findById(investigatorId).get();

        if ((claim != null && underwriter != null) && (investigator != null)) {
            claim.setUnderwriter(underwriter);
            claim.setInvestigator(investigator);
            return claimRepository.save(claim);
        } else {
            throw new IllegalArgumentException("Claim or Underwriter not found");
        }
    }

    public List<Claim> getAllClaimsForReview(Long underwriterId) {

        Underwriter uw = underwriterRepository.findById(underwriterId).get();
        List<Claim> claims = claimRepository.findByUnderwriter(uw);
        return claims;

    }

    public List<Claim> getAllClaimsForReviewInvestigator(Long investigatorId) {

        Investigator uw = investigatorRepository.findById(investigatorId).get();
        List<Claim> claims = claimRepository.findByInvestigator(uw);
        return claims;

    }

    public Claim reviewClaim(Long id, String status, Claim claim) {

        Claim c = claimRepository.findById(id).get();
        c.setStatus(status);
        c.setDescription(claim.getDescription());
        return claimRepository.save(c);
    }

    public Claim getClaimById(Long claimId) {

        Claim claim = claimRepository.findById(claimId).get();
        return claim;

    }

}
