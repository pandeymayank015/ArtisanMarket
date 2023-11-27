package com.example.artisian.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvitationRequestDTO {
    private String eventId;
    private String username;
    private String inviteEmail;
}
