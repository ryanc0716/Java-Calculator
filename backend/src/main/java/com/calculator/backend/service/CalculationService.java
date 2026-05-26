package com.calculator.backend.service;

import org.springframework.stereotype.Service;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

@Service
public class CalculationService {

    public double solveEquation(String equation) {
        try {
            // exp4j automatically handles order of operations, decimals, and complex math!
            Expression e = new ExpressionBuilder(equation).build();
            return e.evaluate();
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid math expression");
        }
    }
}