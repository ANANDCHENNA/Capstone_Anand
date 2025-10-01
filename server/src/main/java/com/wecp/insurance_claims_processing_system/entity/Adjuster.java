package com.wecp.insurance_claims_processing_system.entity;

import javax.persistence.Entity;
<<<<<<<<< Temporary merge branch 1
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
=========
>>>>>>>>> Temporary merge branch 2


@Entity
public class Adjuster extends User {
<<<<<<<<< Temporary merge branch 1
@OneToMany(mappedBy = "adjuster")
    private Claim claim;
=========

    public Adjuster() {
    }

    
    // Implement entity and extends User
>>>>>>>>> Temporary merge branch 2
}