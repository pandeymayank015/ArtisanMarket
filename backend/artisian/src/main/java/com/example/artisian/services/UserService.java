package com.example.artisian.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artisian.dto.UserDTO;
import com.example.artisian.entities.ERole;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.repositories.UserRepository;
import com.example.artisian.utils.ImageUtils;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<UserDTO> getAllArtisans() {
        List<UserEntity> users = userRepository.findAll();
        if (!users.isEmpty()) {
            return users.stream()
                    .filter(user -> user != null
                            && user.getRole() != null
                            && user.getRole().getName().equals(ERole.ROLE_ARTISAN))
                    .map(user -> {
                        UserDTO userDTO = new UserDTO();
                        userDTO.setUsername(user.getUsername());
                        userDTO.setEmail(user.getEmail());
                        if (user.getImage() != null) {
                            String base64Image;
                            try {
                                base64Image = Base64.getEncoder()
                                        .encodeToString(ImageUtils.decompressImage(user.getImage()));
                                userDTO.setBase64Image(base64Image);
                            } catch (DataFormatException | IOException e) {
                                // TODO Auto-generated catch block
                                e.printStackTrace();
                            }
                        }
                        if (user.getRole() != null) {
                            userDTO.setRoleName(user.getRole().getName().name());
                        }
                        return userDTO;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }
}
