package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Policyholder extends User {

    // WHY: A policyholder can buy multiple policies, 
    // and a policy can be owned by multiple policyholders → ManyToMany relationship.
    // @ManyToMany
    // @JoinTable(
    //     name = "policyholder_policy", // intermediate table name
    //     joinColumns = @JoinColumn(name = "policyholder_id"), // foreign key for policyholder
    //     inverseJoinColumns = @JoinColumn(name = "policy_id") // foreign key for policy
    // )
    // private List<Policy> ownedPolicies;

    // // WHY: A policyholder can file multiple claims (One policyholder → many claims)
    // @OneToMany(mappedBy = "policyHolder", cascade = CascadeType.ALL)
    // private List<Claim> claims;

    public Policyholder() {}

    // Getters and Setters
    // public List<Policy> getOwnedPolicies() {
    //     return ownedPolicies;
    // }

    // public void setOwnedPolicies(List<Policy> ownedPolicies) {
    //     this.ownedPolicies = ownedPolicies;
    // }

    // public List<Claim> getClaims() {
    //     return claims;
    // }

    // public void setClaims(List<Claim> claims) {
    //     this.claims = claims;
    // }
}
