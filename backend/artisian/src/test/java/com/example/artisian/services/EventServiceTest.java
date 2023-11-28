package com.example.artisian.services;

import com.example.artisian.dto.EventRegistrationDTO;
import com.example.artisian.dto.InvitationRequestDTO;
import com.example.artisian.entities.EventEntity;
import com.example.artisian.entities.EventRegistrationEntity;
import com.example.artisian.entities.UserEntity;
import com.example.artisian.repositories.EventRegistrationRepository;
import com.example.artisian.repositories.EventRepository;
import com.example.artisian.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EventRegistrationRepository eventRegistrationRepository;

    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private EventService eventService;

    @BeforeEach
    void setUp() {
        EventService eventService = new EventService();
        ReflectionTestUtils.setField(eventService, "fromEmail", "test@example.com");
        ReflectionTestUtils.setField(eventService, "eventRepository", eventRepository);
        ReflectionTestUtils.setField(eventService, "userRepository", userRepository);
        ReflectionTestUtils.setField(eventService, "eventRegistrationRepository", eventRegistrationRepository);
        ReflectionTestUtils.setField(eventService, "javaMailSender", javaMailSender);

        this.eventService = eventService;
    }


    @Test
    public void testCreateEvent() {
        // Arrange
        EventEntity event = new EventEntity(11L, "test_event", "30 November 2023", "09:00 AM", "Halifax", "Basics");
        when(eventRepository.save(any(EventEntity.class))).thenReturn(event);

        // Act
        EventEntity result = eventService.createEvent(event);

        // Assert
        assertEquals(event, result);
    }


    @Test
    public void testGetAllEvents() {
        // Arrange
        EventEntity event = new EventEntity();
        when(eventRepository.findAll()).thenReturn(Collections.singletonList(event));

        // Act
        Iterable<EventEntity> result = eventService.getAllEvents();

        // Assert
        assertEquals(Collections.singletonList(event), result);
    }

    @Test
    public void testRegisterForEvent() {
        // Arrange
        Long eventId = 1L;
        EventEntity event = new EventEntity();
        EventRegistrationDTO eventRegistrationDTO = new EventRegistrationDTO("username", "email");
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));
        when(userRepository.findByUsername(eventRegistrationDTO.getUsername())).thenReturn(Optional.of(new UserEntity()));
        when(eventRegistrationRepository.save(any())).thenReturn(new EventRegistrationEntity());

        // Act
        EventEntity result = eventService.registerForEvent(eventId, eventRegistrationDTO);

        // Assert
        assertEquals(event, result);
    }

    @Test
    public void testGetRegisteredEventsForUser() {
        // Arrange
        String username = "testUser";
        UserEntity user = new UserEntity();
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(eventRegistrationRepository.findByUser(user)).thenReturn(Collections.singletonList(new EventRegistrationEntity()));

        // Act
        List<EventEntity> registeredEvents = eventService.getRegisteredEventsForUser(username);

        // Assert
        assertNotNull(registeredEvents);
        assertEquals(1, registeredEvents.size());
    }

    @Test
    public void testSendInvitationEmail() {
        // Arrange
        InvitationRequestDTO invitationRequestDTO = new InvitationRequestDTO("1", "username", "invitee@example.com");
        EventEntity event = new EventEntity();
        when(eventRepository.findById(any())).thenReturn(Optional.of(event));

        // Act
        eventService.sendInvitationEmail(invitationRequestDTO);

        // Assert: No exception indicates success
        verify(javaMailSender, times(1)).send(any(SimpleMailMessage.class));
    }
}
