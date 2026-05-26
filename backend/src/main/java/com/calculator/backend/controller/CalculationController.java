package com.calculator.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.calculator.backend.model.Calculation;
import com.calculator.backend.repository.CalculationRepository;
import com.calculator.backend.service.CalculationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/calculations")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
public class CalculationController {

    @Autowired
    private CalculationRepository calculationRepository;

    @Autowired
    private CalculationService calculationService; // Injecting our new Math Engine

    @GetMapping
    public ResponseEntity<Page<Calculation>> getHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        // This automatically fetches exactly 5 records, sorted by newest first!
        Page<Calculation> historyPage = calculationRepository.findAll(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id")));
        return ResponseEntity.ok(historyPage);
    }

    @PostMapping
    public ResponseEntity<Calculation> createCalculation(@Valid @RequestBody Calculation calculation) {
        double answer = calculationService.solveEquation(calculation.getEquation());
        calculation.setResult(answer);

        Calculation saved = calculationRepository.save(calculation);

        // Explicitly tells the client that a new resource was CREATED (HTTP 201)
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // 3. DELETE Request: Wipes the entire history from the database
    @DeleteMapping
    public void clearHistory() {
        // JpaRepository gives us this method automatically!
        // We don't even have to write the SQL for it.
        calculationRepository.deleteAll();
    }
}