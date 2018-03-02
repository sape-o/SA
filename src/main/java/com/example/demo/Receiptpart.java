package com.example.demo;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
@Entity
public class Receiptpart {
    private @Id
    @GeneratedValue
    @Column(name="receiptpart_ID")long id;

    @OneToMany
    private Set<ComputerPart> computerparts;

    private Receiptpart () {
    }

    public Receiptpart (Set<ComputerPart> computerparts) {
        this.computerparts = computerparts;
    }
}
