
package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class BuyPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Date when user purchased the policy
    private LocalDate purchaseDate;

    // Date until which policy is valid
    private LocalDate expiryDate;

    // Active / expired / cancelled
    private String status;

    // The specific policy the user bought
    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;

    // The user who bought the policy
    @ManyToOne
    @JoinColumn(name = "policyholder_id")
    private Policyholder policyholder;

    // Optional – if user uploads receipt or document
    private String documentUrl;

    public BuyPolicy() {}

    public BuyPolicy(LocalDate purchaseDate, LocalDate expiryDate, String status,
                     Policy policy, Policyholder policyholder, String documentUrl) {
                        this.purchaseDate = purchaseDate;
                        this.expiryDate = expiryDate;
                        this.status = status;
                        this.policy = policy;
                        this.policyholder = policyholder;
                        this.documentUrl = documentUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

    public Policyholder getPolicyholder() {
        return policyholder;
    }

    public void setPolicyholder(Policyholder policyholder) {
        this.policyholder = policyholder;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    // getters and setters...
}
