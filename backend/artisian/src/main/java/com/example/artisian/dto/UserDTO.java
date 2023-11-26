package com.example.artisian.dto;

import javax.persistence.Column;

public class UserDTO {

    private String username;
    private String email;
    private String base64Image; // Base64 encoded image
    private String roleName;
    private String profession;
    private String address;
    private String contact;
    private boolean ProfileVisibility;
   

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBase64Image() {
        return base64Image;
    }

    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

     public String getProfession(){
        return profession;
    }

     public void setProfession(String profession) {
        this.profession = profession;
    }

     public String getAddress(){
        return address;
    }

     public void setAddress(String address) {
        this.address = address;
    }

     public String getContact(){
        return contact;
    }

     public void setContact(String contact) {
        this.contact = contact;
    }

     public boolean getProfileVisibility() {
        return ProfileVisibility;
    }

    public void setProfileVisibility(String username) {
        this.ProfileVisibility = ProfileVisibility;
    }
}
