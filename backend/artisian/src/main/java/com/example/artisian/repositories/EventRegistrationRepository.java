package com.example.artisian.repositories;

import com.example.artisian.entities.EventRegistrationEntity;
import com.example.artisian.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistrationEntity, Long> {
    List<EventRegistrationEntity> findByUser(UserEntity user);
}
