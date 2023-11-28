package com.example.artisian.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artisian.entities.UserEntity;
import com.example.artisian.entity.Product;
import com.example.artisian.repositories.UserRepository;
import com.example.artisian.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserRepository userRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        Product p1 = productRepository.save(product);
        sendNotificationsForNewProduct(product);
        return p1;
    }

    public void deleteProductById(Long productId) {
        productRepository.deleteById(productId);
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public Product updateProduct(Product updatedProduct) {
        return productRepository.save(updatedProduct);
    }

    public List<Product> getAllProductsByOrder() {
        return productRepository.findAllByOrderByRatingDesc();
    }
    // Other methods for modifying products

    public List<Product> getFeaturedProducts(int limit) {
        List<Product> products = productRepository.findAllByOrderByRatingDesc();
        if (products == null || products.isEmpty()) {
            return new ArrayList<>();
        }
        return productRepository.findAllByOrderByRatingDesc()
                .subList(0, products.size() >= limit ? limit : products.size());
    }

    public Map<String, List<Product>> getGroupedProducts() {
        Map<String, List<Product>> productMap = productRepository.findAll().stream()
                .collect(Collectors.groupingBy(Product::getCategory));
        productMap.entrySet().removeIf(entry -> entry.getValue().isEmpty());
        return productMap;
    }

    public Map<String, List<Product>> getSearchedProducts(String searchKey, String category) {
        if (searchKey != null && !searchKey.isEmpty()) {
            Map<String, List<Product>> productMap = null;
            if (category.equals("All")) {
                productMap = productRepository.findByProductNameContaining(searchKey).stream()
                        .collect(Collectors.groupingBy(Product::getCategory));

            } else {
                productMap = productRepository.findByProductNameContainingAndCategory(searchKey, category).stream()
                        .collect(Collectors.groupingBy(Product::getCategory));
            }
            productMap.entrySet().removeIf(entry -> entry.getValue().isEmpty());
            return productMap;
        }
        return Collections.emptyMap();
    }

    public List<String> getDistinctCategories() {
        List<String> categories = productRepository.findAllDistinctCategories();
        categories.add("All");
        return categories;
    }

    private void sendNotificationsForNewProduct(Product product) {
        List<UserEntity> users = userRepository.findAll();
        for (UserEntity s1 : users) {
            String subject = "New product added!";
            String body = "A new product has been added: " + product.getName();
            emailService.sendEmail(s1.getEmail(), subject, body);
        }
    }
}
