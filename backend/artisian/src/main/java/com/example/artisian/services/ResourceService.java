package com.example.artisian.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.artisian.dto.ResourceDTO;
import com.example.artisian.entities.Resource;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.repositories.ResourceRepository;

@Service
public class ResourceService {

    private final ResourceRepository repo;

    public ResourceService(ResourceRepository repo) {
        this.repo = repo;
    }

    public List<ResourceDTO> getAllResourceForUser(String userName) {
        List<ResourceDTO> resources = null;
        if (userName != null) {
            List<Resource> resourceList = repo.findAll();
            resources = resourceList.stream().map(this::convertToDTO)
                    .collect(Collectors.toList());
        }
        return resources;
    }

    public ResourceDTO createResource(String userName, ResourceDTO resource) {
        ResourceDTO newResource = null;
        if (userName != null) {
            Resource savedResource = repo.save(convertToEntity(userName, resource));
            newResource = convertToDTO(savedResource);
        } else {
            throw new IllegalArgumentException("UserName not provided");
        }
        return newResource;
    }

    private ResourceDTO convertToDTO(Resource savedResource) {
        ResourceDTO resourceDTO = new ResourceDTO();
        if (savedResource != null) {
            resourceDTO.setTitle(savedResource.getTitle());
            resourceDTO.setDescription(savedResource.getDescription());
            resourceDTO.setPublishedAt(savedResource.getPublishedAt());
            resourceDTO.setThumbnail(savedResource.getThumbnail());
            resourceDTO.setContent(savedResource.getContent());
            resourceDTO.setType(savedResource.getType());
        }
        return resourceDTO;
    }

    private Resource convertToEntity(String username, ResourceDTO resource) {
        Resource resourceEntity = new Resource();
        if (resource != null) {
            resourceEntity.setTitle(resource.getTitle());
            resourceEntity.setDescription(resource.getDescription());
            resourceEntity.setPublishedAt(resource.getPublishedAt());
            resourceEntity.setThumbnail(resource.getThumbnail());
            resourceEntity.setContent(resource.getContent());
            resourceEntity.setType(resource.getType());
            resourceEntity.setPublishedBy(new UserEntity(username));
        }
        return resourceEntity;
    }

}
