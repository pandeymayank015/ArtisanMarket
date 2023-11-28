package com.example.artisian.Product;

import com.example.artisian.dto.*;
import com.example.artisian.entities.ERole;
import com.example.artisian.entities.RoleEntity;
import com.example.artisian.entity.Product;
import com.example.artisian.repositories.RoleRepository;
import com.example.artisian.repositories.UserRepository;
import com.example.artisian.repository.ProductRepository;
import com.example.artisian.security.jwt.JwtUtils;
import com.example.artisian.security.services.UserDetailsImpl;
import com.example.artisian.services.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.junit.Assert;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void testGetAllProducts() {
        // Mocking repository response
        List<Product> productList = new ArrayList<>();
        productList.add(new Product("cupholder", "To hold cups", 100.0, "Category A", 4, new byte[0], "kovarthan.ece@gmail.com"));
        productList.add(new Product("cupholder1", "To hold cups1", 100.0, "Category A", 4, new byte[0], "kovarthan.ece@gmail.com"));
        when(productRepository.findAll()).thenReturn(productList);

        // Calling the method to be tested
        List<ProductReturnDTO> result = productService.getAllProducts();

        // Assertions
        assertEquals(2, result.size());
        assertEquals("cupholder", result.get(0).getName());
        assertEquals("cupholder1", result.get(1).getName());
    }

//    @Test
//    void testAddProduct() throws Exception {
//        // Mocking input data
//        Product product = new Product("cupholder", "To hold cups", 100.0, "Category A", 4, new byte[0], "kovarthan.ece@gmail.com");
//        when(productRepository.save(any(Product.class))).thenReturn(product);
//        byte[] fileContent = "fileContent".getBytes();
//        MultipartFile multipartFile = new MockMultipartFile("image", "filename.jpg", "image/jpeg", fileContent);
//        // Calling the method to be tested
//        productService.addProduct(new ProductDTO(1L, "cupholder","To Hold Cup", 200.0, 2, "home", "kovarthan.ece@gmail.com", multipartFile));
//
//        // Verifying that save method was called
//        verify(productRepository, times(1)).save(any(Product.class));
//    }

    // Add more test cases for other methods in a similar manner
}

