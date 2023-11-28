package com.example.artisian.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.artisian.entities.CustomThread;

@Repository
public interface ThreadRepository extends JpaRepository<CustomThread, Long> {
    List<CustomThread> findAll();
}