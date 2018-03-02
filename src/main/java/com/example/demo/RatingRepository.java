package com.example.demo;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RatingRepository extends CrudRepository<Rating, Long> {
}