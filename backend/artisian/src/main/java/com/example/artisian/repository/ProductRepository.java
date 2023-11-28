package com.example.artisian.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.artisian.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Add custom queries if needed
    List<Product> findAllByOrderByRatingDesc();

    @Query(value = "SELECT * FROM products p WHERE p.name LIKE %:searchKey%", nativeQuery = true)
    List<Product> findByProductNameContaining(@Param("searchKey") String searchKey);

    @Query(value = "SELECT * FROM products p WHERE p.name LIKE %:searchKey% AND p.category = :category", nativeQuery = true)
    List<Product> findByProductNameContainingAndCategory(@Param("searchKey") String searchKey,
            @Param("category") String category);

    @Query(value = "SELECT DISTINCT category FROM products", nativeQuery = true)
    List<String> findAllDistinctCategories();
}
