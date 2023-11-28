package com.example.artisian.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artisian.entities.CustomThread;
import com.example.artisian.services.CustomThreadService;

@RestController
@RequestMapping("/api/threads")
public class ThreadController {

    private final CustomThreadService customThreadService;

    public ThreadController(CustomThreadService customThreadService) {
        this.customThreadService = customThreadService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCustomThread(@RequestBody CustomThread customThread) {
        try {
            customThreadService.createCustomThread(customThread);
            return ResponseEntity.ok("Custom Thread created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating Custom Thread");
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CustomThread>> getAllThreads() {
        List<CustomThread> threads = customThreadService.getAllThreads();
        return ResponseEntity.ok(threads);
    }
}