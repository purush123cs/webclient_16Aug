package com.example.demo.webclient;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.request.EmployeeCreateRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

import java.util.Optional;

@HttpExchange(
        url = "/employees",
        accept = MediaType.APPLICATION_JSON_VALUE)
public interface EmployeeClient {

    @PostExchange
    Optional<EmployeeDTO> createEmployee(@RequestBody EmployeeCreateRequest employee);

    @GetExchange("/{id}")
    Optional<EmployeeDTO> getEmployeeById(@PathVariable long id);

}
