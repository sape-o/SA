package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "GetEmployee", types = { Employee.class })
interface GetEmployee {

    Long getId();
    String getFirstName();
    String getLastName();
    String getTel();
    String getPosition();
    String getAddress();
    int getAge();
    String getSex();
    String getId_card_NO();


}
