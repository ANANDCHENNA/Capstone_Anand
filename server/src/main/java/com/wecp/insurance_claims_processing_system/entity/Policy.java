package com.wecp.insurance_claims_processing_system.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "policies")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String policyNumber;

    private String policyType;      // e.g., "Health", "Vehicle", "Life"
    private Double premium;         // amount to pay
    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private PolicyStatus status;    // e.g., ACTIVE, PENDING, CANCELLED

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policyholder_id")
    private Policyholder policyholder;

    public Policy() {}

    public Policy(Long id, String policyNumber, String policyType, Double premium, LocalDate startDate, LocalDate endDate, PolicyStatus status, Policyholder policyholder) {
        this.id = id;
        this.policyNumber = policyNumber;
        this.policyType = policyType;
        this.premium = premium;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.policyholder = policyholder;
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public PolicyStatus getStatus() {
        return status;
    }

    public void setStatus(PolicyStatus status) {
        this.status = status;
    }

    public Policyholder getPolicyholder() {
        return policyholder;
    }

    public void setPolicyholder(Policyholder policyholder) {
        this.policyholder = policyholder;
    }

}
