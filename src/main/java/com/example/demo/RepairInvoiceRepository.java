package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


/**
 * Created by Bhuridech Sudsee.
 */
public interface RepairInvoiceRepository extends CrudRepository<RepairInvoice,Long> {
    //RepairInvoice findByfinName(String name);
}
