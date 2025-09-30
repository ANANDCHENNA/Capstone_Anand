package com.wecp.insurance_claims_processing_system.entity;


import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import io.jsonwebtoken.Claims;

@Table(name = "policyholder") 
@Entity
public class Policyholder extends User {
    //one policy holder have many claims
@OneToMany
@JoinColumn(name = "policyholder_id")
private Claims claims;
   

}
