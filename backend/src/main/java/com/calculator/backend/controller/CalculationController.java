package com.calculator.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.calculator.backend.model.Calculation;
import com.calculator.backend.repository.CalculationRepository;
import com.calculator.backend.service.CalculationService;

@RestController
@RequestMapping("/api/calculations")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CalculationController {

    @Autowired
    private CalculationRepository calculationRepository;

    @Autowired
    private CalculationService calculationService; // Injecting our new Math Engine

    @GetMapping
    public List<Calculation> getAllCalculations() {
        return calculationRepository.findAll();
    }

    @PostMapping
    public Calculation createCalculation(@RequestBody Calculation calculation) {
        // 1. Give the equation to the Service to solve
        double answer = calculationService.solveEquation(calculation.getEquation());
        
        // 2. Attach the answer to the calculation object
        calculation.setResult(answer);
        
        // 3. Save the completed calculation to the PostgreSQL database
        return calculationRepository.save(calculation);
    }

    // 3. DELETE Request: Wipes the entire history from the database
    @DeleteMapping
    public void clearHistory() {
        // JpaRepository gives us this method automatically! 
        // We don't even have to write the SQL for it.
        calculationRepository.deleteAll();
    }
}