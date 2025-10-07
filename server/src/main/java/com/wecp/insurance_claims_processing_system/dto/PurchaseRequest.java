package com.wecp.insurance_claims_processing_system.dto;

public class PurchaseRequest {
    private String policyType;
    private Double premium;
    private int termMonths;

    public PurchaseRequest() {
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
}

