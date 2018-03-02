package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;



@Controller
public class AddEmployee {

    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    UserRepository userRepository;


    @ResponseBody
    @RequestMapping(path = "/firstName/{firstName}/lastName/{lastName}/tel/{tel}/position/{position}/address/{address}/age/{age}/sex/{sex}/id_card_NO/{id_card_NO}/username/{username}/password/{password}", method = RequestMethod.GET)
    public String Employee(@PathVariable String firstName,
                            @PathVariable String lastName,
                            @PathVariable String tel,
                            @PathVariable String position,
                            @PathVariable String address,
                            @PathVariable int age,
                            @PathVariable String sex,
                            @PathVariable String id_card_NO,
                            @PathVariable String username,
                            @PathVariable String password


    ) {

        Employee employee = new Employee(firstName,lastName,tel,position,address,age,sex,id_card_NO);
        this.employeeRepository.save(employee);

        User user = new User(username,password,employee);
        this.userRepository.save(user);

        return "{\"status\":\"Employee\"}";
    }



}