
package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.*;

@Entity
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String policyName;
    private String policyType;
    private String description;
    private Double premiumAmount;
    private Double coverageAmount;
    private Integer durationInYears; // duration in years
    private String termsAndConditions;

    public Policy() {}

    public Policy(String policyName, String policyType, String description, 
                  Double premiumAmount, Double coverageAmount, Integer durationInYears,
                  String termsAndConditions) {
        this.policyName = policyName;
        this.policyType = policyType;
        this.description = description;
        this.premiumAmount = premiumAmount;
        this.coverageAmount = coverageAmount;
        this.durationInYears = durationInYears;
        this.termsAndConditions = termsAndConditions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPremiumAmount() {
        return premiumAmount;
    }

    public void setPremiumAmount(Double premiumAmount) {
        this.premiumAmount = premiumAmount;
    }

    public Double getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(Double coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public Integer getDurationInYears() {
        return durationInYears;
    }

    public void setDurationInYears(Integer durationInYears) {
        this.durationInYears = durationInYears;
    }

    public String getTermsAndConditions() {
        return termsAndConditions;
    }

    public void setTermsAndConditions(String termsAndConditions) {
        this.termsAndConditions = termsAndConditions;
    }

  

    
    

    // getters and setters...
}
