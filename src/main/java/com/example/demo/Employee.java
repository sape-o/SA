package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private String tel;
    private String position;
    private String address;
    private int age;
    private String sex;
    private String id_card_NO;

    @OneToMany(mappedBy = "salesEmp", cascade = CascadeType.ALL)
    private Set<RepairInvoice> salesEmp;

    @OneToMany(mappedBy = "repairEmp", cascade = CascadeType.ALL)
    private Set<RepairInvoice> repairEmp;

    private Employee(){}

    public Employee(String firstName, String lastName, String tel, String position,
                    String address, int age, String sex, String id_card_NO){
        this.firstName = firstName;
        this.lastName = lastName;
        this.tel = tel;
        this.position = position;
        this.address = address;
        this.age = age;
        this.sex = sex;
        this.id_card_NO = id_card_NO;
    }
}
