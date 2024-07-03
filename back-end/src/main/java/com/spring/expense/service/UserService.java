package com.spring.expense.service;

import com.spring.expense.models.User;
import com.spring.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    public UserService(UserRepository userRepository)
    {
        this.userRepository=userRepository;
    }


    private final UserRepository userRepository;
//    @Autowired
//    UserRepository userRepository;

    public void addUser(User user)
    {
        userRepository.save(user);
    }

    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    public Optional<User> getUser()
    {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }
    public boolean getUserByEmail(String email)
    {
        Optional<User> user=userRepository.findByEmail(email);
        if(user.isEmpty())
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    public User updateUser(User user)
    {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User updateUser=userRepository.findByEmail(email).get();
        updateUser.setName(user.getName());
        updateUser.setEmail(user.getEmail());
        updateUser.setCountry(user.getCountry());
        updateUser.setPhone(user.getPhone());
        updateUser.setGender(user.getGender());
        return userRepository.save(updateUser);

    }



}
