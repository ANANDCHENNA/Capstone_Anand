package com.wecp.insurance_claims_processing_system.controller;
import com.wecp.insurance_claims_processing_system.entity.Investigation;
import com.wecp.insurance_claims_processing_system.service.InvestigationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/investigator")
public class InvestigatorController {

    @Autowired
    private InvestigationService investigationService;

    @GetMapping("/investigations/{id}")
    public Investigation getdInvestigationById(@PathVariable Long id) {
        return investigationService.getInvestigationById(id);
    }

    @PostMapping("/investigation")
    public ResponseEntity<Investigation> createInvestigation(@RequestBody Investigation investigation) {
        Investigation savedInvestigation = investigationService.createInvestigation(investigation);
        return ResponseEntity.ok(savedInvestigation);
    }

    @PutMapping("/investigation/{id}")
    public ResponseEntity<Investigation> updateInvestigation(@PathVariable Long id, @RequestBody Investigation investigationDetails) {
        Investigation updatedInvestigation = investigationService.updateInvestigation(id, investigationDetails);
        return ResponseEntity.ok(updatedInvestigation);
    }

    @GetMapping("/investigations")
    public ResponseEntity<List<Investigation>> getAllInvestigations() {
        List<Investigation> investigations = investigationService.findAllInvestigations();
        return ResponseEntity.ok(investigations);
    }

    
    


}
