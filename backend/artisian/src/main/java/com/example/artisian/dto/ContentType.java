package com.example.artisian.dto;

public enum ContentType {
    IMAGE("IMAGE"), VIDEO("VIDEO"),
    AUDIO("AUDIO"), TEXT("TEXT");

    private final String value;

    private ContentType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
