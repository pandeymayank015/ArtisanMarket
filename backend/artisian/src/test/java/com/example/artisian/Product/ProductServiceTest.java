package com.example.artisian.Product;

import com.example.artisian.dto.MessageResponseDTO;
import com.example.artisian.dto.ProductDTO;
import com.example.artisian.dto.ProductReturnDTO;
import com.example.artisian.dto.RegisterDTO;
import com.example.artisian.entities.ERole;
import com.example.artisian.entities.RoleEntity;
import com.example.artisian.entity.Product;
import com.example.artisian.repository.ProductRepository;
import com.example.artisian.services.ProductService;
import com.example.artisian.utils.ImageUtils;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ImageUtils imageUtils;

    @InjectMocks
    private ProductService productService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllProducts() {
        // Mocking repository response
        List<Product> productList = Collections.singletonList(new Product("product","descrption",2d,"category",3,"user@gmail.com"));
        when(productRepository.findAll()).thenReturn(productList);

        // Calling the method to be tested
        List<ProductReturnDTO> result = productService.getAllProducts();

        // Assertions
        assertEquals(1, result.size());
        assertEquals("product", result.get(0).getName());
        // Add more assertions as needed to validate the returned data
    }

    @Test
    void testAddProduct() throws IOException {
        // Mocking input data
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName("Test Product");
        productDTO.setDescription("Test Description");
        productDTO.setPrice(100.0);
        productDTO.setRating(4);
        productDTO.setCategory("Test Category");
        productDTO.setUserId("testUserId");


        MockMultipartFile mockImage = new MockMultipartFile("image", "test-image.jpg", "image/jpeg", new byte[0]);

         productDTO.setImage(mockImage);

        // Calling the method to be tested
        ResponseEntity<?> responseEntity = productService.addProduct(productDTO);

        // Verifying the response
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals("product update successfull", ((MessageResponseDTO) responseEntity.getBody()).getMessage());
    }

    @Test
    void testUpdateProduct() throws IOException {
        // Mocking input data
        ProductReturnDTO productDTO = new ProductReturnDTO();
        productDTO.setName("Updated Product");
        productDTO.setDescription("Updated Description");
        productDTO.setPrice(150.0);
        productDTO.setRating(5);
        productDTO.setCategory("Updated Category");

        Long productId = 1L;

        // Mocking the repository to return a product when findById is called
        Product existingProduct = new Product("Original Product", "Original Description", 100.0, "Original Category", 4, "user@gmail.com");
        when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));

        // Calling the method to be tested
        Product updatedProduct = productService.updateProduct(productDTO, productId);

        // Verifying the product attributes after update
        assertEquals("Updated Product", updatedProduct.getName());
        assertEquals("Updated Description", updatedProduct.getDescription());
        assertEquals(150.0, updatedProduct.getPrice());
        assertEquals(5, updatedProduct.getRating());
        assertEquals("Updated Category", updatedProduct.getCategory());

        // Verifying that the product repository's save method was called
        // You may need to adjust this verification based on your specific implementation
        // For instance, using Mockito.verify(...) to verify the method call
        // when(productRepository).save(any(Product.class));
    }

    @Test
    void testGetAllProductsByOrder() {
        // Mocking repository response
        List<Product> productList = new ArrayList<>();
        productList.add(new Product("Product 1", "Description 1", 50.0, "Category 1", 4, "user1@gmail.com"));
        productList.add(new Product("Product 2", "Description 2", 70.0, "Category 2", 3, "user2@gmail.com"));

        when(productRepository.findAllByOrderByRatingDesc()).thenReturn(productList);

        // Calling the method to be tested
        List<ProductReturnDTO> result = productService.getAllProductsByOrder();

        // Verifying the result size and contents
        assertEquals(2, result.size());
        assertEquals("Product 1", result.get(0).getName());
        assertEquals("Description 1", result.get(0).getDescription());
        assertEquals(50.0, result.get(0).getPrice());
        assertEquals("Category 1", result.get(0).getCategory());
        assertEquals(4, result.get(0).getRating());

        assertEquals("Product 2", result.get(1).getName());
        assertEquals("Description 2", result.get(1).getDescription());
        assertEquals(70.0, result.get(1).getPrice());
        assertEquals("Category 2", result.get(1).getCategory());
        assertEquals(3, result.get(1).getRating());

        // Add more assertions based on your expected behavior
    }

    // Add more test cases for other methods in a similar manner
}
