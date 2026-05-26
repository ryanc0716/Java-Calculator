package com.calculator.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity 
public class Calculation {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @NotBlank(message = "Equation cannot be empty")
    @Size(max = 50, message = "Equation is too long")
    @Pattern(regexp = "^[0-9\\+\\-\\*/\\.\\s]+$", message = "Only math symbols allowed")
    private String equation;
    
    // CHANGED: Using the Double object class instead of primitive double
    // so it can temporarily hold "null" when React first sends the equation!
    private Double result;   

    public Calculation() {
    }

    public Calculation(String equation, Double result) {
        this.equation = equation;
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEquation() {
        return equation;
    }

    public void setEquation(String equation) {
        this.equation = equation;
    }

    public Double getResult() {
        return result;
    }

    public void setResult(Double result) {
        this.result = result;
    }
}