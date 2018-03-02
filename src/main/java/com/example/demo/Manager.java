package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
//@ToString(exclude = "password")
@Entity
public class Manager {

    //public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private @Id @GeneratedValue Long id;

    private String name;
    private String password;

    //private @JsonIgnore String password;

    private String roles;

    /*
    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }
    */

    protected Manager() {}

    public Manager(String name, String password, String roles) {

        this.name = name;
        this.password = password;
        this.roles = roles;
    }

}