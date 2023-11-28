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
        ProductReturnDTO productReturnDTO = new ProductReturnDTO();
        productReturnDTO.setId(user.getId());
        productReturnDTO.setName(user.getName());
        productReturnDTO.setDescription(user.getDescription());
        productReturnDTO.setPrice(user.getPrice());
        productReturnDTO.setRating(user.getRating());
        productReturnDTO.setCategory(user.getCategory());
        if (user.getImage() != null) {
            String base64Image;
            try {
                base64Image = Base64.getEncoder()
                        .encodeToString(ImageUtils.decompressImage(user.getImage()));
                productReturnDTO.setBase64Image(base64Image);
            } catch (DataFormatException | IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        return productReturnDTO;
    }
    public ResponseEntity<?> addProduct(ProductDTO productDTO) throws IOException {

        var compressImage = ImageUtils.compressImage(productDTO.getImage().getBytes());
        Product product = new Product(productDTO.getName(),
                productDTO.getDescription(),
                productDTO.getPrice(),
                productDTO.getCategory(), productDTO.getRating(),
                compressImage);
        productRepository.save(product);
        return  ResponseEntity.ok(new MessageResponseDTO("product update successfull"));
    }

    public ResponseEntity<?> addProductAfterApproval(Product product) throws IOException {


        productRepository.save(product);
        return  ResponseEntity.ok(new MessageResponseDTO("product update successfull"));
    }



    public void deleteProductById(Long productId) {
        productRepository.deleteById(productId);
    }


    public  Optional<Product> getProductById(Long productId) {

        return productRepository.findById(productId);
    }

    public Product updateProduct(ProductDTO productDTO,Long id) throws IOException {

        var compressImage = ImageUtils.compressImage(productDTO.getImage().getBytes());
        Product product = new Product(productDTO.getName(),
                productDTO.getDescription(),
                productDTO.getPrice(),
                productDTO.getCategory(), productDTO.getRating(),
                compressImage);
        product.setId(id);
        return productRepository.save(product);
    }
    public List<ProductReturnDTO> getAllProductsByOrder() {
        List<Product> users = productRepository.findAllByOrderByRatingDesc();
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


    // Other methods for modifying products
}



