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

    // Create Claim Component
    public Claim submitClaim(Long policyholderId, Claim claim) {

        Policyholder ph = policyholderRepository.findById(policyholderId).get();
        claim.setPolicyholder(ph);
        return claimRepository.save(claim);
    }

    // Dashboard Component for role: Policyholder
    public List<Claim> getClaimsByPolicyholder(Long policyholderId) {

        Policyholder ph = policyholderRepository.findById(policyholderId).get();
        List<Claim> claims = claimRepository.findByPolicyholder(ph);
        return claims;

    }

    // Update the claim for role: Adjuster
    public Claim updateClaim(Long id, Claim claimDetails) {  
        Claim c = claimRepository.findById(id).get();
        c.setDescription(claimDetails.getDescription());
        c.setStatus(claimDetails.getStatus());
        c.setDate(claimDetails.getDate());
        if(claimDetails.getUnderwriter() != null && claimDetails.getUnderwriter().getId() != null){
            Underwriter underwriter = underwriterRepository.findById(id).orElse(null);
            c.setUnderwriter(underwriter);
            //c.setPolicy_id(id);
        }
        return claimRepository.save(c);
    }

    // Dashboard Component for role: Adjuster
    public List<Claim> getAllClaims() {

        return claimRepository.findAll();

    }

    // Adjuster Assigning Claim
    public List<Underwriter> getAllUnderwriters() {

        return underwriterRepository.findAll();
    }
     // Adjuster Assigning Claim
     public List<Investigator> getAllInvestigators() {

        return investigatorRepository.findAll();
    }

    // Adjuster Assigning Claim
    public Claim assignClaimToUnderwriter(Long claimId, Long underwriterId,Long investigatorId) {

        Claim claim = claimRepository.findById(claimId).get();
        Underwriter underwriter = underwriterRepository.findById(underwriterId).get();
        Investigator investigator=investigatorRepository.findById(investigatorId).get();

        if ((claim != null && underwriter != null)&& (investigator!=null)) {
            claim.setUnderwriter(underwriter);
            claim.setInvestigator(investigator);
            return claimRepository.save(claim);
        } else {
            throw new IllegalArgumentException("Claim or Underwriter not found");
        }
    }

    // Dashboard Component for role: Underwriter
    public List<Claim> getAllClaimsForReview(Long underwriterId) {

        Underwriter uw = underwriterRepository.findById(underwriterId).get();
        List<Claim> claims = claimRepository.findByUnderwriter(uw);
        return claims;

    }
    //dashboard component for Investigator
    public List<Claim> getAllClaimsForReviewInvestigator(Long investigatorId) {

        Investigator uw = investigatorRepository.findById(investigatorId).get();
        List<Claim> claims = claimRepository.findByInvestigator(uw);
        return claims;

    }
    // Underwriter update claim
    public Claim reviewClaim(Long id, String status) {

        Claim c = claimRepository.findById(id).get();
        c.setStatus(status);
        return claimRepository.save(c);
    }

    public Claim getClaimById(Long claimId) {

        Claim claim = claimRepository.findById(claimId).get();
        return claim;

    }

}
