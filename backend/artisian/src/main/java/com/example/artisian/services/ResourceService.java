package com.example.artisian.services;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

import org.springframework.stereotype.Service;

import com.example.artisian.dto.ResourceDTO;
import com.example.artisian.dto.enums.ContentType;
import com.example.artisian.entities.ResourceEntity;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.repositories.ResourceRepository;
import com.example.artisian.utils.ImageUtils;

@Service
public class ResourceService {

    private final ResourceRepository repo;

    private final UserService userService;

    public ResourceService(ResourceRepository repo, UserService userService) {
        this.repo = repo;
        this.userService = userService;
    }

    public Map<ContentType, List<ResourceDTO>> getAllResourceForUser(String userName) {
        Map<ContentType, List<ResourceDTO>> resourcesByType = null;
        if (userName != null) {
            resourcesByType = repo.findAll().parallelStream()
                    .map(this::convertToDTO)
                    .collect(Collectors.groupingBy(ResourceDTO::getType));
        }
        return resourcesByType;
    }

    public ResourceDTO createResource(String userName, ResourceDTO resource) {
        ResourceDTO newResource = null;
        if (userName != null) {
            ResourceEntity savedResource = repo.save(convertToEntity(userName, resource));
            newResource = convertToDTO(savedResource);
        } else {
            throw new IllegalArgumentException("UserName not provided");
        }
        return newResource;
    }

    private ResourceDTO convertToDTO(ResourceEntity savedResource) {
        ResourceDTO resourceDTO = new ResourceDTO();
        if (savedResource != null) {
            resourceDTO.setTitle(savedResource.getTitle());
            resourceDTO.setDescription(savedResource.getDescription());
            resourceDTO.setPublishedAt(savedResource.getPublishedAt());
            try {
                resourceDTO.setBase64Thumbnail(
                        decompressAndEncodeImage(savedResource.getThumbnail()));
            } catch (DataFormatException | IOException e) {
                System.out.println(e.getStackTrace().toString());
            }
            resourceDTO.setContent(savedResource.getContent());
            resourceDTO.setType(savedResource.getType());
        }
        return resourceDTO;
    }

    private String decompressAndEncodeImage(byte[] savedResource) throws DataFormatException, IOException {
        return Base64.getEncoder().encodeToString(ImageUtils.decompressImage(savedResource));
    }

    private ResourceEntity convertToEntity(String username, ResourceDTO resource) {
        ResourceEntity resourceEntity = new ResourceEntity();
        if (resource != null) {
            resourceEntity.setTitle(resource.getTitle());
            resourceEntity.setDescription(resource.getDescription());
            resourceEntity.setPublishedAt(resource.getPublishedAt());
            try {
                resourceEntity.setThumbnail(ImageUtils.compressImage(resource.getThumbnailFile().getBytes()));
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            resourceEntity.setContent(resource.getContent());
            resourceEntity.setType(resource.getType());
            UserEntity user = userService.getUserEntity(username);
            resourceEntity.setPublishedBy(user);
        }
        return resourceEntity;
    }

}
