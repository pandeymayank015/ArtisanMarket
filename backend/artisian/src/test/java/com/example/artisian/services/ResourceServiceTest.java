package com.example.artisian.services;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.example.artisian.dto.ResourceDTO;
import com.example.artisian.dto.enums.ContentType;
import com.example.artisian.entities.ResourceEntity;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.repositories.ResourceRepository;

import io.jsonwebtoken.io.IOException;

class ResourceServiceTest {

    private ResourceService resourceService;

    @Mock
    private ResourceRepository resourceRepository;

    @Mock
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        resourceService = new ResourceService(resourceRepository, userService);
    }

    @Test
    void testCreateResourceWithNullUserName() {
        // Arrange
        String userName = null;
        ResourceDTO resourceDTO = new ResourceDTO();

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> resourceService.createResource(userName, resourceDTO));
    }

    @Test
    public void testCreateResourceWithInvalidThumbnail() throws IOException {
        // Arrange
        String userName = "testUser";
        MultipartFile emptyThumbnailFile = new MockMultipartFile("thumbnailFile", "emptyFile.jpg", "image/jpeg",
                new byte[0]);
        ResourceDTO resourceDTO = new ResourceDTO();
        resourceDTO.setTitle("Test Resource");
        resourceDTO.setThumbnailFile(emptyThumbnailFile); // Empty base64 thumbnail data

        when(userService.getUserEntity(userName)).thenReturn(new UserEntity());
        when(resourceRepository.save(any())).thenAnswer(invocation -> {
            // Simulate an IOException when saving the resource
            throw new IOException("Invalid thumbnail data");
        });

        // Act and Assert
        assertThrows(IOException.class, () -> resourceService.createResource(userName, resourceDTO));
    }

    @Test
    public void testGetAllResourceForUserWithNullUserName() {
        // Arrange
        String userName = null;

        // Act and Assert
        assertNull(resourceService.getAllResourceForUser(userName));
    }

}
