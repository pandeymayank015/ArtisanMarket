package com.example.artisian.repository;


import com.example.artisian.entity.AdminApproval;
import com.example.artisian.entity.Product;
import com.example.artisian.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByUserId(String userId);

    Wishlist findByUserIdAndProductId(String userId, Long productId);

    void deleteByUserIdAndProductId(Long userId, Long productId);
}
