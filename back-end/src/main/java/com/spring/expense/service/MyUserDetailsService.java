package com.spring.expense.service;

import com.spring.expense.models.MyUserDetails;
import com.spring.expense.models.User;
import com.spring.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {


    private UserRepository userRepository;
    public MyUserDetailsService(UserRepository userRepository)
    {
        this.userRepository=userRepository;
    }
    @Override
    public MyUserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
       Optional<User> byEmail=userRepository.findByEmail(username);
       byEmail.orElseThrow(()->new UsernameNotFoundException("Username Not Found"+username));
       return byEmail.map(MyUserDetails::new).get();



    }
}
