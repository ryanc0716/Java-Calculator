package com.calculator.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class CalculationServiceTest {

    // We summon a fresh copy of your math engine for the robot to use
    private final CalculationService calculationService = new CalculationService();

    @Test
    void testBasicAddition() {
        // 1. Arrange (Set up the test)
        String equation = "7 + 5";
        
        // 2. Act (Ask your code to solve it)
        double result = calculationService.solveEquation(equation);
        
        // 3. Assert (Prove the answer is exactly 12.0)
        assertEquals(12.0, result, "Basic addition failed!");
    }

    @Test
    void testOrderOfOperations() {
        String equation = "10 + 2 * 5";
        double result = calculationService.solveEquation(equation);
        
        // Multiplication should happen first: 2*5=10, 10+10=20
        assertEquals(20.0, result, "Order of operations failed!");
    }

    @Test
    void testDecimalMath() {
        String equation = "5.5 / 2";
        double result = calculationService.solveEquation(equation);
        
        assertEquals(2.75, result, "Decimal division failed!");
    }
}