package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class Policyholder extends User {
    
    @OneToMany(mappedBy = "policyholder", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Policy> ownedPolicies;

    @OneToMany(mappedBy = "policyholder", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Claim> claims;

    public Policyholder() {}

    public List<Policy> getOwnedPolicies() {
        return ownedPolicies;
    }

    public void setOwnedPolicies(List<Policy> ownedPolicies) {
        this.ownedPolicies = ownedPolicies;
    }

    public List<Claim> getClaims() {
        return claims;
    }

    public void setClaims(List<Claim> claims) {
        this.claims = claims;
    }
}
