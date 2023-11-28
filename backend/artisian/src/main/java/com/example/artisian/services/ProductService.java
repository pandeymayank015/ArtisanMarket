package com.example.artisian.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.artisian.dto.ResourceDTO;
import com.example.artisian.entity.Product;
import com.example.artisian.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
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
        return productRepository.findAll().stream()
                .collect(Collectors.groupingBy(Product::getCategory));
    }

    public List<Product> getSearchedProducts(String searchKey) {
        if (searchKey != null && !searchKey.isEmpty()) {
            return productRepository.findByProductNameContaining(searchKey);
        }
        return new ArrayList<>();
    }

    public List<String> getDistinctCategories() {
        List<String> categories = productRepository.findAllDistinctCategories();
        categories.add("All");
        return categories;
    }
}
