package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class Policyholder extends User {

    // @ManyToMany
    // @JoinTable(
    //     name = "policyholder_policy", // intermediate table name
    //     joinColumns = @JoinColumn(name = "policyholder_id"), // foreign key for policyholder
    //     inverseJoinColumns = @JoinColumn(name = "policy_id") // foreign key for policy
    // )
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
