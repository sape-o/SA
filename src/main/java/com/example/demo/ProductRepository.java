package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 * Created by Bhuridech Sudsee.
 */
//@RepositoryRestResource(exported = false)
public interface ProductRepository extends CrudRepository<Product,Long> {
}