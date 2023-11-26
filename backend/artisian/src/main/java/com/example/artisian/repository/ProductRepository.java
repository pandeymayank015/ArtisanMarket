package com.example.artisian.repository;

import com.example.artisian.entity.AdminApproval;
import com.example.artisian.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Add custom queries if needed
    List<Product> findAllByOrderByRatingDesc();
}
