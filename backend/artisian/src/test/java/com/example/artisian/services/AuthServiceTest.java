package com.example.artisian.services;

import com.example.artisian.dto.LoginDTO;
import com.example.artisian.dto.MessageResponseDTO;
import com.example.artisian.dto.RegisterDTO;
import com.example.artisian.dto.UserInfoResponseDTO;
import com.example.artisian.entities.ERole;
import com.example.artisian.entities.RoleEntity;
import com.example.artisian.repositories.RoleRepository;
import com.example.artisian.repositories.UserRepository;
import com.example.artisian.security.jwt.JwtUtils;
import com.example.artisian.security.services.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.junit.Assert;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthService authService;

    @Test
    public void testAuthenticateUser() {
        // Arrange
        LoginDTO loginDTO = new LoginDTO("testUser", "testPassword");
        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testUser", "test@test.com", "testPassword", Collections.emptyList());
        Authentication authentication = mock(Authentication.class); // Mock the Authentication object

        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtUtils.generateJwtToken(userDetails)).thenReturn("testToken");

        // Act
        ResponseEntity<?> responseEntity = authService.authenticateUser(loginDTO);

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals("testToken", ((UserInfoResponseDTO) responseEntity.getBody()).getJwtToken());
    }


    @Test
    public void testRegisterUser() throws IOException {
        // Arrange
        MockMultipartFile mockImage = new MockMultipartFile("image", "test-image.jpg", "image/jpeg", new byte[0]);
        RegisterDTO registerDTO = new RegisterDTO("testUser", "test@test.com", "user", "testpassword", mockImage);
        when(userRepository.existsByUsername(eq("testUser"))).thenReturn(false);
        when(userRepository.existsByEmail(eq("test@test.com"))).thenReturn(false);
        when(roleRepository.findByName(any(ERole.class))).thenReturn(Optional.of(new RoleEntity()));

        // Act
        ResponseEntity<?> responseEntity = authService.registerUser(registerDTO);

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals("User registered successfully!", ((MessageResponseDTO) responseEntity.getBody()).getMessage());
    }

    @Test
    public void testLogoutUser() {
        // Arrange
        when(jwtUtils.getCleanJwtToken()).thenReturn("cleanToken");

        // Act
        ResponseEntity<?> responseEntity = authService.logoutUser();

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals("Bearer cleanToken", responseEntity.getHeaders().getFirst("Authorization"));
        assertEquals("You've been signed out!", ((MessageResponseDTO) responseEntity.getBody()).getMessage());
    }

}
