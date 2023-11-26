package com.example.artisian.dto;

import org.springframework.web.multipart.MultipartFile;

import com.example.artisian.dto.enums.ContentType;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ResourceDTO {

    private String title;
    private String description;
    private Long publishedAt;
    private MultipartFile thumbnailFile;
    private String base64Thumbnail;
    private String content;
    private ContentType type;

    public MultipartFile getThumbnailFile() {
        return thumbnailFile;
    }

    public ResourceDTO(String title, String description, Long publishedAt, MultipartFile thumbnailFile,
            String base64Thumbnail, String content, ContentType type) {
        this.title = title;
        this.description = description;
        this.publishedAt = publishedAt;
        this.thumbnailFile = thumbnailFile;
        this.base64Thumbnail = base64Thumbnail;
        this.content = content;
        this.type = type;
    }

    public void setThumbnailFile(MultipartFile thumbnailFile) {
        this.thumbnailFile = thumbnailFile;
    }

    public String getBase64Thumbnail() {
        return base64Thumbnail;
    }

    public void setBase64Thumbnail(String base64Thumbnail) {
        this.base64Thumbnail = base64Thumbnail;
    }

    public ResourceDTO() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(Long publishedAt) {
        this.publishedAt = publishedAt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ContentType getType() {
        return type;
    }

    public void setType(ContentType type) {
        this.type = type;
    }

}
