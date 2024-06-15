package com.example.springboot_backend.controller;

import com.example.springboot_backend.model.User;
import com.example.springboot_backend.repository.UserRepository;
import com.example.springboot_backend.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/")
//@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private Service userService;

    @GetMapping("user")
    public List<User> getAll(){
       return userRepo.findAll();
    }


    @DeleteMapping("user/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userRepo.deleteById(id);
    }

    @PostMapping("create-user")
    public String addUser(@RequestBody User user){
        System.out.println(user);
        userService.addUser(user);
        return "User Added Successfully!";
    }

//    @CrossOrigin(origins = "*")
    @PutMapping("user/{id}")
    public User updateUser(@RequestBody User user,@PathVariable Long id){
        System.out.println(user);
        return userService.updateUser(user,id);
    }
}
