package com.example.artisian.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "admin_approval")
public class AdminApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false) // Change to allow null values
    private String category;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String userId;


    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] image;

    public AdminApproval(String name, String description, double price, String category, int rating,byte[] image,String userId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.rating = rating;
        this.image = image;
        this.userId =userId;

    }

    public AdminApproval() {
        // Default constructor
    }
    // Getters and setters for id, name, description, price

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public byte[] getImage() {
        return image;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
