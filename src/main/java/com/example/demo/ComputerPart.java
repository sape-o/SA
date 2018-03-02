package com.example.demo;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
@Data
@Entity

public class ComputerPart {
    private @Id @GeneratedValue @Column(name="part_ID")long id;
    private String PartsName;
    private int Price;
    private int amount;

    private @Version @JsonIgnore
    Long version;
    private ComputerPart () {
    }

    public ComputerPart (String PartsName ,int Price ,int amount ) {
        this.PartsName = PartsName;
        this.Price = Price;
        this.amount = amount;
    }
}


