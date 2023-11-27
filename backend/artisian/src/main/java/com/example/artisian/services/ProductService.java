package com.example.artisian.services;

import com.example.artisian.entities.UserEntity;
import com.example.artisian.entity.Product;
import com.example.artisian.repositories.UserRepository;
import com.example.artisian.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

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
        Product p1= productRepository.save(product);
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
        private void sendNotificationsForNewProduct(Product product) {
            // Retrieve distinct emails of users who need to be notified
            List<UserEntity> users = userRepository.findAll();
            for(UserEntity s1 :users){
            String subject = "New product added!";
            String body = "A new product has been added: " + product.getName();
            emailService.sendEmail(s1.getEmail(), subject, body);
        }
        }
}



