package com.example.artisian.controllers;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.artisian.dto.ResourceDTO;
import com.example.artisian.services.ResourceService;

@Controller
@RequestMapping("/resource")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/getall/{userName}")
    public List<ResourceDTO> getAllResources(String userName) {
        return resourceService.getAllResourceForUser(userName);
    }

    @PostMapping("/create/{userName}")
    // add username to below method's paramaeter
    public ResourceDTO createResource(@RequestBody ResourceDTO resource, @PathVariable String userName) {
        // write logic to create resource
        return resourceService.createResource(userName, resource);
    }
}
