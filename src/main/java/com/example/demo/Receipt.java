package com.example.demo;
import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

import lombok.Data;

@Data
@Entity

public class Receipt {
    private @Id @GeneratedValue @Column(name="receipt_ID") long reciept_id;

    private Date Date;
    @ManyToOne
    private Employee employee;
    @ManyToOne
    private Receiptpart receiptpart ;
    private int totalprice;
    private Receipt() {
    }

    public Receipt (Employee employee, Receiptpart receiptpart , int totalprice, Date Date) {

        this.employee = employee;
        this.receiptpart = receiptpart;
        this.totalprice = totalprice;
        this.Date = Date;
    }
}