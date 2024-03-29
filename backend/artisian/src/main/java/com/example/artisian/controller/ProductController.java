package com.example.artisian.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.artisian.dto.ProductDTO;
import com.example.artisian.dto.ProductReturnDTO;
import com.example.artisian.entity.AdminApproval;
import com.example.artisian.entity.Product;
import com.example.artisian.services.AdminApprovalService;
import com.example.artisian.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final AdminApprovalService adminApprovalService;

    public ProductController(ProductService productService, AdminApprovalService adminApprovalService) {
        this.productService = productService;
        this.adminApprovalService = adminApprovalService;
    }

    @GetMapping
    public ResponseEntity<List<ProductReturnDTO>> getAllProducts() {
        List<ProductReturnDTO> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@ModelAttribute ProductDTO product) throws IOException {
        return productService.addProduct(product);
    }

    @DeleteMapping("delete/{productId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        productService.deleteProductById(productId);
        return new ResponseEntity<>("Product with ID " + productId + " has been deleted", HttpStatus.OK);
    }

    @PutMapping("update/{productId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,
            @RequestBody ProductReturnDTO updatedProduct) throws IOException {
        return ResponseEntity.ok(productService.updateProduct(updatedProduct, productId));

    }

    @PostMapping("/user-add")
    public ResponseEntity<?> addUserProduct(@ModelAttribute ProductDTO product) throws IOException {
        return adminApprovalService.addProduct(product);
    }

    @GetMapping("/adminApprove/products")
    public ResponseEntity<List<ProductReturnDTO>> getAllAdminApprovalProducts() {
        List<ProductReturnDTO> products = adminApprovalService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PutMapping("/approve/{productId}")
    @CrossOrigin(origins = "*")

    public ResponseEntity<String> approveProduct(@PathVariable Long productId) throws IOException {
        AdminApproval adminApproval = adminApprovalService.getAdminApprovalByProductId(productId);

        if (adminApproval != null) {
            Product productToAdd = new Product(adminApproval.getName(), adminApproval.getDescription(),
                    adminApproval.getPrice(), adminApproval.getCategory(), adminApproval.getRating(),
                    adminApproval.getImage(), adminApproval.getUserId());

            productService.addProductAfterApproval(productToAdd); // Add the product to the Product table
            adminApprovalService.deleteAdminApproval(adminApproval); // Delete from AdminApproval table

            return new ResponseEntity<>("Product added and moved from admin approval to product table", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Admin approval not found for the given product ID", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byOrder")
    public ResponseEntity<List<ProductReturnDTO>> getAllEntitiesInOrder() {
        List<ProductReturnDTO> products = productService.getAllProductsByOrder();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/featured/{limit}")
    public ResponseEntity<List<ProductReturnDTO>> getFeaturedProducts(@PathVariable int limit) {
        if (limit > 0) {
            return ResponseEntity.ok(productService.getFeaturedProducts(limit));
        } else {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, List<ProductReturnDTO>>> getCategorizedProducts() {
        return ResponseEntity.ok(productService.getGroupedProducts());
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<Map<String, List<ProductReturnDTO>>> getCategorizedProducts(@PathVariable String keyword,
            @RequestParam(name = "category", required = false) String category) {
        return ResponseEntity.ok(productService.getSearchedProducts(keyword, category));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getDistinctCategories() {
        return ResponseEntity.ok(productService.getDistinctCategories());
    }

    // Other methods for editing, deleting products
}
