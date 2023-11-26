package com.example.artisian.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.artisian.dto.ResourceDTO;
import com.example.artisian.dto.enums.ContentType;
import com.example.artisian.services.ResourceService;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/api/resource")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/getall/{userName}")
    public ResponseEntity<Map<ContentType, List<ResourceDTO>>> getAllResources(@PathVariable String userName) {
        Map<ContentType, List<ResourceDTO>> resources = resourceService.getAllResourceForUser(userName);
        return ResponseEntity.ok(resources);
    }

    @PostMapping(path = "/create/{userName}")
    public ResponseEntity<ResourceDTO> createResource(@ModelAttribute ResourceDTO resource,
            @PathVariable String userName) {
        return ResponseEntity.ok(resourceService.createResource(userName, resource));
    }
}
