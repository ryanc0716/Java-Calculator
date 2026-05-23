package com.calculator.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calculator.backend.model.Calculation;

@Repository
public interface CalculationRepository extends JpaRepository<Calculation, Long> {
    // By simply extending JpaRepository, Spring Boot automatically gives us 
    // built-in methods like .save() and .findAll() for our Calculation table!
}