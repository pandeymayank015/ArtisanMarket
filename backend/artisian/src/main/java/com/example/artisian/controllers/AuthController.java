package com.example.artisian.controllers;

import java.io.IOException;
import com.example.artisian.dto.LoginDTO;
import com.example.artisian.dto.MessageResponseDTO;
import com.example.artisian.dto.RegisterDTO;
import com.example.artisian.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@ModelAttribute RegisterDTO registerDTO) throws IOException {
        return authService.registerUser(registerDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) {
        return authService.authenticateUser(loginDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
       return authService.logoutUser();
    }

}