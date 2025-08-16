package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class EmployeeDTO {

    private String employeeId;
    private String employeeName;

}
