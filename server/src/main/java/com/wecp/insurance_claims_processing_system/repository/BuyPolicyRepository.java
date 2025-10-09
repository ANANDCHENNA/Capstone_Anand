package com.wecp.insurance_claims_processing_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.insurance_claims_processing_system.entity.BuyPolicy;
import com.wecp.insurance_claims_processing_system.entity.Policyholder;

@Repository
public interface BuyPolicyRepository extends JpaRepository<BuyPolicy, Long>{

    List<BuyPolicy> findByPolicyholder(Policyholder policyholder);

    
}

