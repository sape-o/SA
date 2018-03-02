package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Set;

public interface ComputerPartRepository extends PagingAndSortingRepository< ComputerPart, Long> {

}
