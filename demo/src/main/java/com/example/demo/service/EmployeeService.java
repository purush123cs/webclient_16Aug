package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.request.EmployeeCreateRequest;
import com.example.demo.webclient.EmployeeClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeClient employeeClient;

    public EmployeeDTO createEmployee(EmployeeCreateRequest employeeCreateRequest) {

        Optional<EmployeeDTO> employeeDTOOptional = employeeClient.createEmployee(employeeCreateRequest);
        return employeeDTOOptional.get();//TODO: refactor to better
    }
    public EmployeeDTO getEmployeeById(int id) {

        Optional<EmployeeDTO> employeeDTOOptional = employeeClient.getEmployeeById(id);
        return employeeDTOOptional.get();//TODO: refactor to better
    }

}
