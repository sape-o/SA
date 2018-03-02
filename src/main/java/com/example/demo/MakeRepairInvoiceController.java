package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;

@Controller
public class MakeRepairInvoiceController {

    @Autowired
    RepairInvoiceRepository repairInvoiceRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    ProductRepository productRepository;

    Customer c = new Customer(null,null,null);
    Product p = new Product(null,null,null,null,null,null);


    @ResponseBody
    @RequestMapping(path = "/cusFirstName/{cusFirstName}/cusLastName/{cusLastName}/cusTel/{cusTel}", method = RequestMethod.GET)
    public String Customers(@PathVariable String cusFirstName,
                            @PathVariable String cusLastName,
                            @PathVariable String cusTel) {

        //Customer customer = new Customer(cusFirstName, cusLastName, cusTel);
        //this.customerRepository.save(customer);

        //Customer cf = this.customerRepository.findByFirstName("wat");
        Customer customer = new Customer(cusFirstName, cusLastName, cusTel);
        this.customerRepository.save(customer);
        c = customer;

        //if(cusFirstName==cf.getFirstName() && cusLastName==cf.getLastName()){
        //    c = cf;
        //}else {
            //this.customerRepository.save(customer);
            //c = customer;
        //}

        //c.setId(customer.getId());
        //c.setFirstName(cusFirstName);
        //c.setLastName(cusFirstName);
        //c.setTel(cusLastName);

        return "{\"status\":\"Customer\"}";
    }

    @ResponseBody
    @RequestMapping(path = "/Type/{Type}/Brand/{Brand}/Model/{Model}/Color/{Color}/Problem/{Problem}/Note/{Note}", method = RequestMethod.GET)
    public String Products(@PathVariable String Type,@PathVariable String Brand, @PathVariable String Model,
                           @PathVariable String Color, @PathVariable String Problem,@PathVariable String Note) {

        Product product = new Product(Type, Brand, Model, Color, Problem, Note);
        this.productRepository.save(product);

        p = product;

        /*
        p.setId(product.getId());
        p.setType(Type);
        p.setBrand(Brand);
        p.setModel(Model);
        p.setColor(Color);
        p.setProblem(Problem);
        p.setNote(Note);
        */

        return "{\"status\":\"Product\"}";
    }

    @ResponseBody
    @RequestMapping(path = "/dateIn/{dateIn}/dateOut/{dateOut}/salesEmp/{sid}/repairEmp/{rid}", method = RequestMethod.GET)
    public String RepairInvoices(
                                 @PathVariable String dateIn,
                                 @PathVariable String dateOut,
                                 @PathVariable Long sid,
                                 @PathVariable Long rid
    ) throws ParseException {

        long xx = customerRepository.count();
        long xy = productRepository.count();

        Employee salesEmp = this.employeeRepository.findOne(sid);
        Employee repairEmp = this.employeeRepository.findOne(rid);
        Customer ct = this.customerRepository.findOne(xx);
        Product pt = this.productRepository.findOne(xy);


        DateFormat newDate = new SimpleDateFormat("yyyy-MM-dd");
        Date x = newDate.parse(dateIn);
        Date y = newDate.parse(dateOut);

        RepairInvoice r = new RepairInvoice(x,y,c,p,salesEmp,repairEmp);
        this.repairInvoiceRepository.save(r);

        return "{\"status\":\"RepairInvoices\"}";

    }


}