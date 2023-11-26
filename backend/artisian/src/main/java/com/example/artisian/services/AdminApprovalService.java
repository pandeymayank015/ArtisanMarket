package com.example.artisian.services;

import com.example.artisian.entity.AdminApproval;
import com.example.artisian.entity.Product;
import com.example.artisian.repository.AdminApprovalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminApprovalService {
    private final AdminApprovalRepository adminApprovalRepository;

    public AdminApprovalService(AdminApprovalRepository adminApprovalRepository) {
        this.adminApprovalRepository = adminApprovalRepository;
    }

    public List<AdminApproval> getAllProducts() {
        return adminApprovalRepository.findAll();
    }

    public AdminApproval addProduct(AdminApproval product) {
        return adminApprovalRepository.save(product);
    }

    public void deleteProductById(Long productId) {
        adminApprovalRepository.deleteById(productId);
    }

    public Optional<AdminApproval> getProductById(Long productId) {
        return adminApprovalRepository.findById(productId);
    }

    public AdminApproval updateProduct(AdminApproval updatedProduct) {
        return adminApprovalRepository.save(updatedProduct);
    }

    public AdminApproval getAdminApprovalByProductId(Long productId) {
        return adminApprovalRepository.findById(productId).orElse(null);
    }

    public void deleteAdminApproval(AdminApproval adminApproval) {
        adminApprovalRepository.delete(adminApproval);
    }

    // Other methods related to admin approval process
}
