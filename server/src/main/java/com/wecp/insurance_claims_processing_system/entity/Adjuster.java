package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
public class Adjuster extends User {
    public Adjuster() {}
}