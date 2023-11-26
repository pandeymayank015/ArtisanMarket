package com.example.artisian.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artisian.dto.UserDTO;
import com.example.artisian.services.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/artisans/all")
    public ResponseEntity<List<UserDTO>> getAllArtisans() {
        List<UserDTO> artisans = userService.getAllArtisans();
        return ResponseEntity.ok(artisans);
    }

}
