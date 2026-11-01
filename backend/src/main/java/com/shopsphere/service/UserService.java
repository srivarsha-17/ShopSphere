package com.shopsphere.service;

import com.shopsphere.dto.auth.UserDTO;
import com.shopsphere.entity.Role;
import com.shopsphere.entity.User;
import com.shopsphere.exception.ResourceNotFoundException;
import com.shopsphere.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(authService::mapToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return authService.mapToDTO(user);
    }

    @Transactional
    public UserDTO updateUserRole(Long id, Role role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setRole(role);
        User saved = userRepository.save(user);
        return authService.mapToDTO(saved);
    }

    @Transactional
    public UserDTO updateProfile(User currentUser, UserDTO request) {
        currentUser.setName(request.getName().trim());
        if (request.getPhone() != null) currentUser.setPhone(request.getPhone().trim());
        if (request.getAddress() != null) currentUser.setAddress(request.getAddress().trim());
        if (request.getCity() != null) currentUser.setCity(request.getCity().trim());
        if (request.getState() != null) currentUser.setState(request.getState().trim());
        if (request.getPostalCode() != null) currentUser.setPostalCode(request.getPostalCode().trim());

        User saved = userRepository.save(currentUser);
        return authService.mapToDTO(saved);
    }
}
