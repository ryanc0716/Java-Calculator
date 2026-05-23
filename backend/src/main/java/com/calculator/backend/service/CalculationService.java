package com.calculator.backend.service;

import org.springframework.stereotype.Service;

@Service 
public class CalculationService {

    public double solveEquation(String equation) {
        if (equation == null || equation.isBlank()) {
            throw new IllegalArgumentException("Equation cannot be empty");
        }

        // UPGRADE: .trim() removes extra spaces at the start/end
        // UPGRADE: .split("\\s+") splits by ANY amount of spaces between characters
        String[] parts = equation.trim().split("\\s+");
        
        if (parts.length != 3) {
            throw new IllegalArgumentException("Equation must be in format: num1 operator num2");
        }

        double num1 = Double.parseDouble(parts[0]);
        String operator = parts[1];
        double num2 = Double.parseDouble(parts[2]);

        return switch (operator) {
            case "+" -> num1 + num2;
            case "-" -> num1 - num2;
            case "*" -> num1 * num2;
            case "/" -> {
                if (num2 == 0) throw new ArithmeticException("Cannot divide by zero");
                yield num1 / num2;
            }
            default -> throw new IllegalArgumentException("Unknown operator: " + operator);
        };
    }
}