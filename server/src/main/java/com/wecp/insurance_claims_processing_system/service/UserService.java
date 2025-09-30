package com.wecp.insurance_claims_processing_system.service;

import com.wecp.insurance_claims_processing_system.entity.*;
import com.wecp.insurance_claims_processing_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserLoginServiceImpl(UserRepository userRepository,
                                StudentRepository studentRepository,
                                TeacherRepository teacherRepository,
                                PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(UserRegistrationDTO userRegistrationDTO) throws Exception {
        String role = userRegistrationDTO.getRole();
        String email = userRegistrationDTO.getEmail();
        String username = userRegistrationDTO.getUsername();

        if (!role.equalsIgnoreCase("STUDENT") && !role.equalsIgnoreCase("TEACHER")) {
            throw new Exception("Invalid role. Only 'STUDENT' or 'TEACHER' allowed.");
        }

        if (userRepository.findByUsername(username) != null) {
            throw new Exception("Username '" + username + "' already exists.");
        }

        if (studentRepository.findByEmail(email) != null || teacherRepository.findByEmail(email) != null) {
            throw new Exception("Email '" + email + "' already exists.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        user.setRole(role.toUpperCase());

        if (role.equalsIgnoreCase("STUDENT")) {
            Student student = new Student();
            student.setFullName(userRegistrationDTO.getFullName());
            student.setDateOfBirth(userRegistrationDTO.getDateOfBirth());
            student.setEmail(userRegistrationDTO.getEmail());
            student.setContactNumber(userRegistrationDTO.getContactNumber());
            student.setAddress(userRegistrationDTO.getAddress());

            Student savedStudent = studentRepository.save(student);
            user.setStudent(savedStudent);

        } else if (role.equalsIgnoreCase("TEACHER")) {
            Teacher teacher = new Teacher();
            teacher.setEmail(userRegistrationDTO.getEmail());
            teacher.setFullName(userRegistrationDTO.getFullName());
            teacher.setSubject(userRegistrationDTO.getSubject());
            teacher.setContactNumber(userRegistrationDTO.getContactNumber());
            teacher.setYearsOfExperience(userRegistrationDTO.getYearsOfExperience());

            Teacher savedTeacher = teacherRepository.save(teacher);
            user.setTeacher(savedTeacher);
        }

        userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserDetails(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user;
        if (identifier.matches("\\d+")) {
            user = userRepository.findById(Integer.parseInt(identifier))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + identifier));
        } else {
            user = userRepository.findByUsername(identifier);
            if (user == null) {
                throw new UsernameNotFoundException("User not found with username: " + identifier);
            }
        }

        return new org.springframework.security.core.userdetails.User(
                String.valueOf(user.getUserId()),
                user.getPassword(),
                Collections.emptyList());
    }
}