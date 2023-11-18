package com.example.artisian.repository;

import com.example.artisian.entity.AdminApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminApprovalRepository extends JpaRepository<AdminApproval, Long> {
    // You can add custom queries or methods if needed
    Optional<AdminApproval> findByProduct_Id(Long productId); // Custom method to find AdminApproval by productId
}
