package com.wecp.insurance_claims_processing_system.service;

import com.wecp.insurance_claims_processing_system.entity.Claim;
import com.wecp.insurance_claims_processing_system.entity.Investigation;
import com.wecp.insurance_claims_processing_system.repository.InvestigationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class InvestigationService {

    @Autowired
    InvestigationRepository investigationRepository;

    @Autowired
    Claim claim;

    public InvestigationService(InvestigationRepository investigationRepository, Claim claim) {
        this.investigationRepository = investigationRepository;
        this.claim = claim;
    }

    public List<Investigation> getAllInvestigation() throws SQLException{
        return investigationRepository.findAll();
    }

    public Investigation addInvestigation(Investigation investigation) throws SQLException{
        return investigationRepository.save(investigation);
    }

    public Optional<Investigation> getByIdInvestigation(Long InvestigationId) throws SQLException{
        return investigationRepository.findById(InvestigationId);
    }

    public void updateInvestigation(Investigation investigation) throws SQLException {
        investigationRepository.save(investigation);
    }

    public void deleteById(Long InvestigationId ) throws SQLException{
     investigationRepository.deleteById(InvestigationId);
    }



    

    

  

    
}
