package com.example.artisian.entities;

import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.example.artisian.dto.enums.ContentType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Resource")
public class ResourceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Long publishedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity publishedBy;

    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] thumbnail;
    private String content;
    private ContentType type;

}
