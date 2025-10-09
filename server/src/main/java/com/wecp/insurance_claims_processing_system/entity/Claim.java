package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

@Entity
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Date date;
    private String status;
    // private String claimType;
    private Long policy_id;
    // @ManyToOne
    // @JoinColumn(name = "policy_id")
    // private Policy policy;
    @ManyToOne
    @JoinColumn(name = "policyholder_id")
    @JsonIgnore
    private Policyholder policyholder;

    @ManyToOne
    @JoinColumn(name = "adjuster_id")
    @JsonIgnore
    private Adjuster adjuster;

    @ManyToOne
    @JoinColumn(name = "underwriter_id")
    @JsonIgnore
    private Underwriter underwriter;

    @ManyToOne
    @JoinColumn(name = "investigator_id")
    @JsonIgnore
    private Investigator investigator;

    @OneToOne(mappedBy = "claim")
    @JsonIgnore
    private Investigation investigation;

    public Claim() {
    }

    public Claim(Long id, String description, Date date, String status, Policyholder policyholder, Adjuster adjuster,
            Underwriter underwriter, Investigator investigator, Investigation investigation) {
        this.id = id;
            }

    public Claim(Long id, String description, Date date, String status, Policyholder policyholder, Adjuster adjuster,
            Underwriter underwriter, Investigation investigation, Long policy_id, Policy policy) {
        this.description = description;
        this.id = id;
        this.date = date;
        this.status = status;
        // this.claimType = claimType;
        this.policyholder = policyholder;
        this.adjuster = adjuster;
        this.underwriter = underwriter;
        this.investigation = investigation;
        this.investigator = investigator;
        this.policy_id = policy_id;
        // this.policy=policy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Policyholder getPolicyholder() {
        return policyholder;
    }

    public void setPolicyholder(Policyholder policyholder) {
        this.policyholder = policyholder;
    }

    public Adjuster getAdjuster() {
        return adjuster;
    }

    public void setAdjuster(Adjuster adjuster) {
        this.adjuster = adjuster;
    }

    public Underwriter getUnderwriter() {
        return underwriter;
    }

    public void setUnderwriter(Underwriter underwriter) {
        this.underwriter = underwriter;
    }

    public Investigation getInvestigation() {
        return investigation;
    }

    public void setInvestigation(Investigation investigation) {
        this.investigation = investigation;
    }

    public Investigator getInvestigator() {
        return investigator;
    }

    public void setInvestigator(Investigator investigator) {
        this.investigator = investigator;
    }

    // public String getClaimType() {
    // return claimType;
    // }

    // public void setClaimType(String claimType) {
    // this.claimType = claimType;
    // }

    public Long getPolicy_id() {
        return policy_id;
    }

    public void setPolicy_id(Long policy_id) {
        this.policy_id = policy_id;
    }

    // public Policy getPolicy() {
    // return policy;
    // }

    // public void setPolicy(Policy policy) {
    // this.policy = policy;
    // }

}