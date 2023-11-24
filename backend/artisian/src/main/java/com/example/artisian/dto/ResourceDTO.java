package com.example.artisian.dto;

import java.sql.Blob;

public class ResourceDTO {

    private String title;
    private String description;
    private Long publishedAt;
    private Blob thumbnail;
    private String content;
    private ContentType type;

    public ResourceDTO() {
    }

    public ResourceDTO(String title, String description, Long publishedAt, Blob thumbnail,
            String content, ContentType type) {
        this.title = title;
        this.description = description;
        this.publishedAt = publishedAt;
        this.thumbnail = thumbnail;
        this.content = content;
        this.type = type;
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

    public Blob getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(Blob thumbnail) {
        this.thumbnail = thumbnail;
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
