package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name = "adjuster") 
@Entity
public class Adjuster extends User {
@OneToMany(mappedBy = "adjuster")
    private Claim claim;
}