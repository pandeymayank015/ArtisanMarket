package com.example.artisian.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponseDTO {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private String jwtToken;

    public UserInfoResponseDTO(Long id, String username, String email, List<String> roles) {
        this.id=id;
        this.username=username;
        this.email=email;
        this.roles=roles;
    }
}
