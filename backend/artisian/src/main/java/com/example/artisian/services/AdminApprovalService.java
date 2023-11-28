package com.example.artisian.services;

import com.example.artisian.dto.MessageResponseDTO;
import com.example.artisian.dto.ProductDTO;
import com.example.artisian.dto.ProductReturnDTO;
import com.example.artisian.entity.AdminApproval;
import com.example.artisian.entity.Product;
import com.example.artisian.repository.AdminApprovalRepository;
import com.example.artisian.utils.ImageUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

@Service
public class AdminApprovalService {
    private final AdminApprovalRepository adminApprovalRepository;

    public AdminApprovalService(AdminApprovalRepository adminApprovalRepository) {
        this.adminApprovalRepository = adminApprovalRepository;
    }


    public List<ProductReturnDTO> getAllProducts() {
        List<AdminApproval> users = adminApprovalRepository.findAll();
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

    private ProductReturnDTO convertEntityToDTO(AdminApproval user) {
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
//    public AdminApproval addProduct(AdminApproval product) {
//        return adminApprovalRepository.save(product);
//    }

    public ResponseEntity<?> addProduct(ProductDTO productDTO) throws IOException {

        var compressImage = ImageUtils.compressImage(productDTO.getImage().getBytes());
        AdminApproval product = new AdminApproval(productDTO.getName(),
                productDTO.getDescription(),
                productDTO.getPrice(),
                productDTO.getCategory(), productDTO.getRating(),
                compressImage, productDTO.getUserId());
        adminApprovalRepository.save(product);
        return  ResponseEntity.ok(new MessageResponseDTO("product update successfull"));
    }

    public void deleteProductById(Long productId) {
        adminApprovalRepository.deleteById(productId);
    }

    public Optional<AdminApproval> getProductById(Long productId) {
        return adminApprovalRepository.findById(productId);
    }

    public AdminApproval updateProduct(AdminApproval updatedProduct) {
        return adminApprovalRepository.save(updatedProduct);
    }

    public AdminApproval getAdminApprovalByProductId(Long productId) {
        return adminApprovalRepository.findById(productId).orElse(null);
    }

    public void deleteAdminApproval(AdminApproval adminApproval) {
        adminApprovalRepository.delete(adminApproval);
    }

    // Other methods related to admin approval process
}
