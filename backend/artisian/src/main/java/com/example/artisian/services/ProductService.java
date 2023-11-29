package com.example.artisian.services;

import com.example.artisian.dto.MessageResponseDTO;
import com.example.artisian.dto.ProductDTO;
import com.example.artisian.dto.ProductReturnDTO;
import com.example.artisian.dto.UserDTO;
import com.example.artisian.entities.ERole;
import com.example.artisian.entities.RoleEntity;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.entity.Product;
import com.example.artisian.repositories.UserRepository;
import com.example.artisian.repository.ProductRepository;
import com.example.artisian.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

import org.springframework.stereotype.Service;

import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

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

    public List<ProductReturnDTO> getAllProducts() {
        List<Product> users = productRepository.findAll();
        if (!users.isEmpty()) {
            return users.stream()
                    .filter(user -> user != null)
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
        productReturnDTO.setUserId(user.getUserId());
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
                compressImage, productDTO.getUserId());
        productRepository.save(product);
        sendNotificationsForNewProduct(product);
        return ResponseEntity.ok(new MessageResponseDTO("product update successfull"));
    }

    public ResponseEntity<?> addProductAfterApproval(Product product) throws IOException {

        productRepository.save(product);
        return ResponseEntity.ok(new MessageResponseDTO("product update successfull"));
    }

    public void deleteProductById(Long productId) {
        productRepository.deleteById(productId);
    }

    public Optional<Product> getProductById(Long productId) {

        return productRepository.findById(productId);
    }

    public Product updateProduct(ProductReturnDTO productDTO, Long id) throws IOException {

        if (productDTO != null && id != 0L) {
            Optional<Product> fetchedProduct = productRepository.findById(id);

            if (fetchedProduct.isPresent()) {
                Product productEntity = fetchedProduct.get();
                if (productDTO.getName() != null) {
                    productEntity.setName(productDTO.getName());

                }
                if (productDTO.getCategory() != null) {
                    productEntity.setCategory(productDTO.getCategory());

                }
                productEntity.setRating(productDTO.getRating());
                if (productDTO.getDescription() != null) {
                    productEntity.setDescription(productDTO.getDescription());

                }

                productEntity.setPrice(productDTO.getPrice());

                productRepository.save(productEntity);

                return productEntity;
            }
        }
        return null;

    }

    public List<ProductReturnDTO> getAllProductsByOrder() {
        List<Product> users = productRepository.findAllByOrderByRatingDesc();
        if (!users.isEmpty()) {
            return users.stream()
                    .filter(user -> user != null)
                    .map(user -> {
                        ProductReturnDTO userDTO = convertEntityToDTO(user);
                        return userDTO;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    // Other methods for modifying products

    public List<ProductReturnDTO> getFeaturedProducts(int limit) {
        List<Product> products = productRepository.findAllByOrderByRatingDesc();
        if (products == null || products.isEmpty()) {
            return new ArrayList<>();
        }
        return productRepository.findAllByOrderByRatingDesc()
                .subList(0, products.size() >= limit ? limit : products.size())
                .stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }

    public Map<String, List<ProductReturnDTO>> getGroupedProducts() {
        Map<String, List<ProductReturnDTO>> productMap = productRepository.findAll()
                .stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.groupingBy(ProductReturnDTO::getCategory));
        productMap.entrySet().removeIf(entry -> entry.getValue().isEmpty());
        return productMap;
    }

    public Map<String, List<ProductReturnDTO>> getSearchedProducts(String searchKey, String category) {
        if (searchKey != null && !searchKey.isEmpty()) {
            Map<String, List<ProductReturnDTO>> productMap = null;
            if (category.equals("All")) {
                productMap = productRepository.findByProductNameContaining(searchKey).stream()
                        .map(this::convertEntityToDTO)
                        .collect(Collectors.groupingBy(ProductReturnDTO::getCategory));

            } else {
                productMap = productRepository.findByProductNameContainingAndCategory(searchKey, category).stream()
                        .map(this::convertEntityToDTO)
                        .collect(Collectors.groupingBy(ProductReturnDTO::getCategory));
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
            for (UserEntity user : users) {
             RoleEntity userRole = user.getRole();
            if (userRole != null && userRole.getName() == ERole.ROLE_ADMIN) {
            String subject = "New product added needs your approval!";
            String body = "A new product has been added needs your approval!! " + product.getName();
            emailService.sendEmail(user.getEmail(), subject, body);
            }
        }
      }
}
