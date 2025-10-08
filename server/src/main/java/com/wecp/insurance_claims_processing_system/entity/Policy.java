package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String policyNumber;
    private String name;
    private String policyType; 
    private Double premium;     
    private int termMonths;       
    private String status;   

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "policyholder_id")
    @JsonIgnore
    private Policyholder policyholder;

    public Policy() {}

    public Policy(Long id, String policyNumber, String name, String policyType, Double premium, int termMonths, Policyholder policyholder, String status) {
        this.id = id;
        this.policyNumber = policyNumber;
        this.name = name;
        this.policyType = policyType;
        this.premium = premium;
        this.termMonths = termMonths;
        this.policyholder = policyholder;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public Double getPremium() {
        return premium;
    }

    public void setPremium(Double premium) {
        this.premium = premium;
    }

    public int getTermMonths() {
        return termMonths;
    }

    public void setTermMonths(int termMonths) {
        this.termMonths = termMonths;
    }

    public Policyholder getPolicyholder() {
        return policyholder;
    }

    public void setPolicyholder(Policyholder policyholder) {
        this.policyholder = policyholder;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
