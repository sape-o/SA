package com.example.demo;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    private String Type;
    private String Brand;
    private String Model;
    private String Color;
    private String Problem;
    private String Note;

    private Product(){}

    public Product(String Type, String Brand, String Model, String Color, String Problem, String Note){
        this.Type = Type;
        this.Brand = Brand;
        this.Model = Model;
        this.Color = Color;
        this.Problem = Problem;
        this.Note = Note;
    }
}
