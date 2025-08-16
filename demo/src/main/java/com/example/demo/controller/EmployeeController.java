package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.request.EmployeeCreateRequest;
import com.example.demo.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/employees")
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeCreateRequest employeeCreateRequest) {
        EmployeeDTO employee = employeeService.createEmployee(employeeCreateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

    @GetMapping("/employees/{id}")
    private ResponseEntity<EmployeeDTO> getEmployeeDetails(@PathVariable("id") int id) {
        EmployeeDTO employee = employeeService.getEmployeeById(id);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

}
