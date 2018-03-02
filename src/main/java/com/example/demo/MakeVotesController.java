package com.example.demo;

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
import java.util.concurrent.atomic.AtomicLong;

@Controller
public class MakeVotesController {

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    RepairInvoiceRepository repairInvoiceRepository;
    
    @ResponseBody
    @RequestMapping(path = "/vote/{id}/idm/{id2}/employelevel1/{employelevel1}/repairlevel/{repairlevel}", method = RequestMethod.GET)
    
    public String rating(@PathVariable Long id,@PathVariable Long id2,@PathVariable String employelevel1,@PathVariable String repairlevel) {
        RepairInvoice repairInvoice = this.repairInvoiceRepository.findOne(id);
        Employee employee = this.employeeRepository.findOne(id2);
        
        Rating rating = new Rating(repairInvoice,employee,employelevel1,repairlevel);
        this.ratingRepository.save(rating);

        
        return "{\"status\":\"Voted\"}";
    }
}