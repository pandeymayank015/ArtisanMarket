package com.example.artisian.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import com.example.artisian.dto.UserDTO;
import com.example.artisian.entities.ERole;
import com.example.artisian.entities.RoleEntity;
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
                        UserDTO userDTO = convertEntityToDTO(user);
                        return userDTO;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    private UserDTO convertEntityToDTO(UserEntity user) {
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
    }



    private UserEntity convertDTOToEntity(UserDTO userDTO) {
    UserEntity userEntity = new UserEntity();
    userEntity.setUsername(userDTO.getUsername());
    userEntity.setEmail(userDTO.getEmail());
    if (userDTO.getBase64Image() != null) {
        byte[] compressedImage;
        try {
            compressedImage = ImageUtils.compressImage(Base64.getDecoder().decode(userDTO.getBase64Image()));
            userEntity.setImage(compressedImage);
        } catch (IOException e) {
            // Handle exception as needed
            e.printStackTrace();
        }
    }
    if (userDTO.getRoleName() != null) {
        // Assuming UserEntity has a reference to RoleEntity
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName(ERole.valueOf(userDTO.getRoleName()));
        userEntity.setRole(roleEntity);
    }
    return userEntity;
}




    public UserDTO getUser(String username) {
        if (username != null) {
            Optional<UserEntity> userEntity = userRepository.findByUsername(username);
            if (userEntity.isPresent()) {
                return convertEntityToDTO(userEntity.get());
            }
        }
        return null;
    }

    public UserEntity getUserEntity(String username) {
        if (username != null) {
            Optional<UserEntity> userEntity = userRepository.findByUsername(username);
            if (userEntity.isPresent()) {
                return userEntity.get();
            }
        }
        return null;
    }


    public UserDTO updateProfile(UserDTO user) {

        Optional<UserEntity> userEntity = userRepository.findByUsername(user.getUsername());
        UserEntity existingProfile=null;

        if (userEntity.isPresent()) {
            existingProfile = userEntity.get();
        } else {
            System.out.println("Profile not found with id: " + user.getUsername());
        }

        if (user.getEmail() != null) {
            existingProfile.setEmail(user.getEmail());
        }
        if (user.getAddress() != null) {
            existingProfile.setAddress(user.getAddress());
        }
        if (user.getContact() != null) {
            existingProfile.setContact(user.getContact());
        }
        if (user.getProfession() != null) {
            existingProfile.setProfession(user.getProfession());
        }
        if (user.getProfileVisibility() != existingProfile.isProfileVisibility()) {
            existingProfile.setProfileVisibility(user.getProfileVisibility());
        }
        // Update profile image if needed
        if (user.getBase64Image() != null) {             
                byte[] compressedImage;
                 try {
                        compressedImage = ImageUtils.compressImage(Base64.getDecoder().decode(user.getBase64Image()));
                         existingProfile.setImage(compressedImage);
        } catch (IOException e) {
            // Handle exception as needed
            e.printStackTrace();
        }
    
        }
       // Save the updated profile to the repository
        return convertEntityToDTO( userRepository.save(existingProfile));
    }

}
