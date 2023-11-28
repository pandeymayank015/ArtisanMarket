package com.example.artisian.controllers;

import com.example.artisian.dto.EventRegistrationDTO;
import com.example.artisian.dto.InvitationRequestDTO;
import com.example.artisian.entities.EventEntity;
import com.example.artisian.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public EventEntity createEvent(@RequestBody EventEntity event) {
        return eventService.createEvent(event);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<EventEntity> getAllEvents() {
        return eventService.getAllEvents();
    }

    @PostMapping("/register/{eventId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public EventEntity registerForEvent(@PathVariable Long eventId, @RequestBody EventRegistrationDTO eventRegistationDTO) {
        return eventService.registerForEvent(eventId, eventRegistationDTO);
    }

    @GetMapping("/registeredEvents")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<EventEntity>> getRegisteredEventsForUser(@RequestParam String username) {
        List<EventEntity> registeredEvents = eventService.getRegisteredEventsForUser(username);
        return ResponseEntity.ok(registeredEvents);
    }

    @PostMapping("/invite")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> inviteForEvent(@RequestBody InvitationRequestDTO invitationRequestDTO) {
        try {
            eventService.sendInvitationEmail(invitationRequestDTO);
            return ResponseEntity.ok("Invitation sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending invitation.");
        }
    }

}
