package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import java.util.Date;
import com.example.demo.ComputerPart;
@Controller
public class OrderUIController {
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    ReceiptpartRepository receiptpartRepository;
    @Autowired
    ReceiptRepository receiptRepository;

    @ResponseBody
    @RequestMapping(path = "/employee/{eid}/receiptpart/{receiptpart_ID}", method = RequestMethod.GET)
    public String Receipt(@PathVariable Long eid,@PathVariable Long receiptpart_ID) {
        Employee employee = this.employeeRepository.findOne(eid);
        Receiptpart receiptpart = this.receiptpartRepository.findOne(receiptpart_ID);
        Date date = new Date(System.currentTimeMillis());
        int totalprice = 0;
        Set<ComputerPart> computerpart=  receiptpart.getComputerparts();
        for(ComputerPart c:computerpart){
            totalprice += (c.getAmount()*c.getPrice());
        }
        Receipt receipt = new Receipt(employee, receiptpart, totalprice ,date);
        this.receiptRepository.save(receipt);
        return "{\"status\":\"created\"}";
    }
}
