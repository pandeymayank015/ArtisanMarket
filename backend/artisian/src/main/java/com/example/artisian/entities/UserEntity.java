package com.example.artisian.entities;

import lombok.*;
import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String email;
    private String password;
    @Column(name = "profession")
    private String profession;    
    @Column(name = "address")
    private String address;
    @Column(name = "contact_information")
    private String contact;
    @Column(name = "profile_visibility")
    private boolean ProfileVisibility;
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    public UserEntity(String username, String email, String password, RoleEntity role, byte[] image) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.image = image;
    }

    public UserEntity(String username) {
        this.username = username;
    }

    
}
