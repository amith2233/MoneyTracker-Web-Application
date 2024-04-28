package com.spring.expense.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UrlController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello";
    }
}
