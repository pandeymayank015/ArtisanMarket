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

//    @PutMapping("update/{productId}")
//    @CrossOrigin(origins = "*")
//    public ResponseEntity<String> updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
//        Optional<Product> product = productService.getProductById(productId);
//        if (product.isPresent()) {
//            updatedProduct.setId(productId); // Ensure the ID of the updated product matches the path variable ID
//            productService.updateProduct(updatedProduct);
//            return new ResponseEntity<>("Product with ID " + productId + " has been updated", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Product with ID " + productId + " not found", HttpStatus.NOT_FOUND);
//        }
//    }
//    @PutMapping("update/{productId}")
//    public ResponseEntity<?> updateProduct(@ModelAttribute ProductDTO productDTO,@PathVariable Long productId) throws IOException {
//        Optional<Product> product = productService.getProductById(productId);
//        return new ResponseEntity<>("Product with ID " + productId + " has been deleted", HttpStatus.OK);
//    }

    @PostMapping("/user-add")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> addUserProduct(@RequestBody AdminApproval product) {
//        Product addedProduct = productService.addProduct(product);
        adminApprovalService.addProduct(product); // Send for admin approval
        return new ResponseEntity<>("Product added and sent for admin approval", HttpStatus.CREATED);
    }

    @PutMapping("/approve/{productId}")
    @CrossOrigin(origins = "*")

//    public ResponseEntity<String> approveProduct(@PathVariable Long productId) {
//        AdminApproval adminApproval = adminApprovalService.getAdminApprovalByProductId(productId);
//
//        if (adminApproval != null) {
//            Product productToAdd = new Product(adminApproval.getName(), adminApproval.getDescription(), adminApproval.getPrice(), adminApproval.getCategory(), adminApproval.getRating(),adminApproval.getImage());
//
//            productService.addProduct(productToAdd); // Add the product to the Product table
//            adminApprovalService.deleteAdminApproval(adminApproval); // Delete from AdminApproval table
//
//            return new ResponseEntity<>("Product added and moved from admin approval to product table", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Admin approval not found for the given product ID", HttpStatus.NOT_FOUND);
//        }
//    }

    @GetMapping("/byOrder")
    public ResponseEntity<List<Product>> getAllEntitiesInOrder() {
        List<Product> products = productService.getAllProductsByOrder();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Other methods for editing, deleting products
}
