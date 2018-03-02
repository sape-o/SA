package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
public class PaymentUIController {
    @Autowired
    RepairInvoiceRepository repairInvoiceRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    PaymentRepository paymentRepository;

    int totalAmount;

    @ResponseBody
    @RequestMapping(path = "/amount1/{amount1}/amount2/{amount2}/amount3/{amount3}/amount4/{amount4}/amount5/{amount5}", method = RequestMethod.GET)
    public String Payment(
            @PathVariable int amount1,
            @PathVariable int amount2,
            @PathVariable int amount3,
            @PathVariable int amount4,
            @PathVariable int amount5){

        totalAmount = 0;
        totalAmount += (100*amount1);
        totalAmount += (200*amount2);
        totalAmount += (300*amount3);
        totalAmount += (400*amount4);
        totalAmount += (500*amount5);

        return "save";
    }

    @ResponseBody
    @RequestMapping(path = "/repair/{repair}/assure/{assure}/repairInvoice/{repairID}/employee/{eid}", method = RequestMethod.GET)
    public String Payment(
            @PathVariable int repair,
            @PathVariable int assure,
            @PathVariable long repairID,
            @PathVariable long eid){

        RepairInvoice repairInvoice=this.repairInvoiceRepository.findOne(repairID);
        Employee employee=this.employeeRepository.findOne(eid);


        Date x = new Date();
        int totalPrice = repair+assure+totalAmount;

        Payment payment =new Payment(x,repair,assure,totalAmount,totalPrice,repairInvoice,employee);
        this.paymentRepository.save(payment);
        return "save";
    }
}
