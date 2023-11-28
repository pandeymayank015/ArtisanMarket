package com.example.artisian.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @DeleteMapping("delete/{userEmail}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> deleteProduct(@PathVariable String userEmail) {
        userService.deleteProductByEmail(userEmail);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }
}
