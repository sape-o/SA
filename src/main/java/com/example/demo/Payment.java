package com.example.demo;
import lombok.Data;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;
@Data
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue
    private Long id;
    private Date date;
    private int totalPrice;
    private int assure;
    private int repair;
    private  int compart;
    //@OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    //private Computer_Parts computer_parts;
    //@ManyToOne
    //@JoinColumn(name = "cpid")
   //private Computer_Parts computer_Parts;

    @ManyToOne
    @JoinColumn(name = "eid")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "repairID")
    private RepairInvoice repairInvoice;

    private Payment() {}
    public Payment (Date date, int repair,int assure,int compart,int totalPrice,RepairInvoice repairInvoice,Employee employee) {
        this.date = date;
        this.totalPrice = totalPrice;
        this.assure = assure;
        this.repairInvoice= repairInvoice;
        this.employee= employee;
        this.repair=repair;
        this.compart=compart;
    }


}

