package com.calculator.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // This is the ignition switch that turns on your Spring Boot server
        SpringApplication.run(BackendApplication.class, args);
    }

}