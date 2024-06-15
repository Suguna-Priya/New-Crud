package com.example.springboot_backend.service;

import com.example.springboot_backend.model.User;
import com.example.springboot_backend.repository.UserRepository;

import java.util.Optional;

@org.springframework.stereotype.Service
public class Service {

    private final UserRepository userRepo;

    public Service(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void addUser(User user){
            User newUser = new User(user.getFirstName(),user.getLastName(),user.getEmail());
        userRepo.save(newUser);
    }

    public User updateUser(User newUser,Long id){
        return userRepo.findById(id)
                        .map(user ->{
                            user.setFirstName(newUser.getFirstName());
                            user.setLastName(newUser.getLastName());
                            user.setEmail(newUser.getEmail());
                            return userRepo.save(user);
                        }).orElseThrow();

    }
}
