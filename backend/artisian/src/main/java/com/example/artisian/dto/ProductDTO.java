package com.example.artisian.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private int rating;
    private String category;
    private MultipartFile image;
}
