package com.example.artisian.services;

import com.example.artisian.dto.EventRegistrationDTO;
import com.example.artisian.dto.InvitationRequestDTO;
import com.example.artisian.entities.EventEntity;
import com.example.artisian.entities.EventRegistrationEntity;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.repositories.EventRegistrationRepository;
import com.example.artisian.repositories.EventRepository;
import com.example.artisian.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.from}")
    private String fromEmail;

    public EventEntity createEvent(EventEntity event) {
        return eventRepository.save(event);
    }

    public List<EventEntity> getAllEvents() {
        return eventRepository.findAll();
    }

    public EventEntity registerForEvent(Long eventId, EventRegistrationDTO eventRegistrationDTO) {
        EventEntity event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Find the user by username
        UserEntity user = userRepository.findByUsername(eventRegistrationDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found for username: " + eventRegistrationDTO.getUsername()));

        // Save the registration information
        EventRegistrationEntity registration = new EventRegistrationEntity();
        registration.setUser(user);
        registration.setEvent(event);
        // Set other registration details as needed
        eventRegistrationRepository.save(registration);

        sendRegistrationEmail(event, eventRegistrationDTO);
        return event;
    }

    private void sendRegistrationEmail(EventEntity event, EventRegistrationDTO eventRegistrationDTO) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(eventRegistrationDTO.getEmail());
        message.setSubject("Event Registration Successful!");
        message.setText("Hello " + eventRegistrationDTO.getUsername() + "\r\n"
                + "Thank you for registering for the event: " + event.getEventName() + "\r\n"
                + "Event Date: " + event.getEventDate() + "\r\n"
                + "Event Time: " + event.getEventTime() + "\r\n"
                + "Event Venue: " + event.getEventVenue() + "\r\n"
                + "Event Description: " + event.getEventDescription());
        javaMailSender.send(message);
    }

    public List<EventEntity> getRegisteredEventsForUser(String username) {
        // Fetch the user by username
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found for username: " + username));

        // Get the list of events the user is registered for
        List<EventRegistrationEntity> registrations = eventRegistrationRepository.findByUser(user);

        // Extract the events from the registrations
        return registrations.stream()
                .map(EventRegistrationEntity::getEvent)
                .collect(Collectors.toList());
    }

    public void sendInvitationEmail(InvitationRequestDTO invitationRequestDTO) {
        Long eventId = Long.parseLong(invitationRequestDTO.getEventId());
        EventEntity event = eventRepository.findById(eventId).orElse(null);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(invitationRequestDTO.getInviteEmail());
        message.setSubject("Event Invitation!");
        message.setText("Hello " +  "\r\n"
                + "You have been invited by " + invitationRequestDTO.getUsername() +" to attend the event: " + event.getEventName() + "\r\n"
                + "Event Date: " + event.getEventDate() + "\r\n"
                + "Event Time: " + event.getEventTime() + "\r\n"
                + "Event Venue: " + event.getEventVenue() + "\r\n"
                + "Event Description: " + event.getEventDescription());
        javaMailSender.send(message);
    }

}
