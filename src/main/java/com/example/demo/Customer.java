package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private String tel;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<RepairInvoice> repairInvoices;

    private Customer(){}

    public Customer(String firstName, String lastName, String tel){
        this.firstName = firstName;
        this.lastName = lastName;
        this.tel = tel;
    }
}
