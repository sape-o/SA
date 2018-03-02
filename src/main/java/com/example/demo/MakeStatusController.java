package com.example.demo;

import java.lang.Long;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.List;
import java.util.Date;

@Controller
public class MakeStatusController {

    @Autowired
    StatusRepository statusRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    ProductRepository productRepository;

    @ResponseBody
    @RequestMapping(path = "/eid/{eid}/statuses/{inform}/repairID/{repairID}", method = RequestMethod.GET)
    public String Status(@PathVariable Long eid,@PathVariable String inform,@PathVariable Long repairID) {
        Date date = new Date();
        Customer customer = this.customerRepository.findOne(repairID);
        Employee employee = this.employeeRepository.findOne(eid);
        Product product = this.productRepository.findOne(repairID);
        
        Status status = new Status(product,date,inform,customer,employee);
            this.statusRepository.save(status);
            return "{\"status\":\"success\"}";
        
       
    }

}

