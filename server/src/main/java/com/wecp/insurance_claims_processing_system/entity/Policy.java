package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Policy {

    @Id
    private Long id; // predefined, no @GeneratedValue
    private String name;
    private String coverage; // e.g., "Accident, Damage"
    private String tenure; // months

    
    // @ManyToMany(mappedBy = "ownedPolicies")
    // private List<Policyholder> owners;

    public Policy() {
    }

    public Policy(Long id, String name, String coverage, String tenure) {
        this.id = id;
        this.name = name;
        this.coverage = coverage;
        this.tenure = tenure;
    }

    // ✅ Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoverage() {
        return coverage;
    }

    public void setCoverage(String coverage) {
        this.coverage = coverage;
    }

    public String getTenure() {
        return tenure;
    }

    public void setTenure(String tenure) {
        this.tenure = tenure;
    }

    // ✅ Newly added getters/setters for owners list
    // public List<Policyholder> getOwners() {
    //     return owners;
    // }

    // public void setOwners(List<Policyholder> owners) {
    //     this.owners = owners;
    // }
}