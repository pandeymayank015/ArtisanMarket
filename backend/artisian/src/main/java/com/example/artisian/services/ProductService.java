package com.example.artisian.services;

import com.example.artisian.dto.MessageResponseDTO;
import com.example.artisian.dto.ProductDTO;
import com.example.artisian.dto.ProductReturnDTO;
import com.example.artisian.dto.UserDTO;
import com.example.artisian.entities.ERole;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.entity.Product;
import com.example.artisian.repository.ProductRepository;
import com.example.artisian.utils.ImageUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductReturnDTO> getAllProducts() {
        List<Product> users = productRepository.findAll();
        if (!users.isEmpty()) {
            return users.stream()
                    .filter(user -> user != null
)
                    .map(user -> {
                        ProductReturnDTO userDTO = convertEntityToDTO(user);
                        return userDTO;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    private ProductReturnDTO convertEntityToDTO(Product user) {
        ProductReturnDTO userDTO = new ProductReturnDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setDescription(user.getDescription());
        userDTO.setPrice(user.getPrice());
        userDTO.setRating(user.getRating());
        userDTO.setCategory(user.getCategory());
        if (user.getImage() != null) {
            String base64Image;
            try {
                base64Image = Base64.getEncoder()
                        .encodeToString(ImageUtils.decompressImage(user.getImage()));
                userDTO.setBase64Image(base64Image);
            } catch (DataFormatException | IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        return userDTO;
    }
    public ResponseEntity<?> addProduct(ProductDTO product) throws IOException {

        var compressImage = ImageUtils.compressImage(product.getImage().getBytes());
        Product product1 = new Product(product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(), product.getRating(),
                compressImage);
        productRepository.save(product1);
        return  ResponseEntity.ok(new MessageResponseDTO("User registered successfully!"));
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
}



