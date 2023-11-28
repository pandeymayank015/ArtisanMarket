package com.example.artisian.controller;

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
    public ResponseEntity<String> updateProduct(@PathVariable Long productId, @ModelAttribute ProductDTO updatedProduct) throws IOException {
        Optional<Product> product = productService.getProductById(productId);
        if (product.isPresent()) {
            updatedProduct.setId(productId); // Ensure the ID of the updated product matches the path variable ID
            productService.updateProduct(updatedProduct,productId);
            return new ResponseEntity<>("Product with ID " + productId + " has been updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product with ID " + productId + " not found", HttpStatus.NOT_FOUND);
        }
}




    @PostMapping("/user-add")
    public ResponseEntity<?> addUserProduct(@ModelAttribute ProductDTO product) throws IOException {
        return adminApprovalService.addProduct(product);
    }

    @PutMapping("/approve/{productId}")
    @CrossOrigin(origins = "*")

    public ResponseEntity<String> approveProduct(@PathVariable Long productId) throws IOException {
        AdminApproval adminApproval = adminApprovalService.getAdminApprovalByProductId(productId);

        if (adminApproval != null) {
            Product productToAdd = new Product(adminApproval.getName(),adminApproval.getDescription(),adminApproval.getPrice(),adminApproval.getCategory(),adminApproval.getRating(),adminApproval.getImage(),adminApproval.getUserId());

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

    // Other methods for editing, deleting products
}
