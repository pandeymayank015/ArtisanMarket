package com.example.artisian.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.artisian.entities.CustomThread;
import com.example.artisian.repositories.ThreadRepository;

@Service
public class CustomThreadService {
    private final ThreadRepository threadRepository;
    CustomThread customThread=null;
    public CustomThreadService(ThreadRepository threadRepository) {
        this.threadRepository = threadRepository;
    }

    public void createCustomThread(CustomThread customThread) {
        threadRepository.save(customThread);
    }

    public List<CustomThread> getAllThreads() {
        return threadRepository.findAll();
    }
}