package com.example.demo;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;


@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String Username;
    private String Password;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "eid")
    private Employee employee;
   
    private User(){}

    public User(String Username, String Password,Employee employee){
        this.id = id;
        this.Username = Username;
        this.Password = Password;
        this.employee = employee;
    }
}
