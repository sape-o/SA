package com.example.demo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;
import java.util.Date;

@Data
@Entity
@Table(name = "Status")
public class Status {

    private @Id @GeneratedValue Long id;
    private Date datetime;
    private String inform;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Status() {}

    public Status(Product product, Date datetime, String inform, Customer customer, Employee employee){

        this.product = product;
        this.datetime = datetime;
        this.inform = inform;
        this.customer = customer;
        this.employee = employee;
    }

}





