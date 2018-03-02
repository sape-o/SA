package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Bhuridech Sudsee.
 */
//@RepositoryRestResource(exported = false)
public interface CustomerRepository extends CrudRepository<Customer,Long> {

    //Customer findById(Long id);
    Customer findByFirstName(String firstName);
    //Customer findByLastName(String lastName);

    //Customer findC(String firstName,String lastName);
    //Customer findC(String firstName,String lastName,String tel);
}
