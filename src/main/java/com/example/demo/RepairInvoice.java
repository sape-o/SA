package com.example.demo;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "repairInvoice")
public class RepairInvoice {
    @Id
    @GeneratedValue
    private Long id;

    private Date dateIn;
    private Date dateOut;

    @ManyToOne
    @JoinColumn(name = "cid")
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "pid")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "sid")
    private Employee salesEmp;

    @ManyToOne
    @JoinColumn(name = "rid")
    private Employee repairEmp;

    private RepairInvoice() {}

    public RepairInvoice(Date dateIn, Date dateOut,Customer customer,Product product,Employee salesEmp,Employee repairEmp){
        this.dateIn = dateIn;
        this.dateOut = dateOut;
        this.customer = customer;
        this.product = product;
        this.salesEmp = salesEmp;
        this.repairEmp = repairEmp;
    }

}
