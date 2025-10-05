package com.wecp.insurance_claims_processing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.insurance_claims_processing_system.entity.Policy;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long>{
}