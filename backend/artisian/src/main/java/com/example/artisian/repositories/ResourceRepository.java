package com.example.artisian.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.artisian.entities.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByPublishedBy_Username(String userName);

}
