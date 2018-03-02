package com.example.demo;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by Bhuridech Sudsee.
 */
public interface UserRepository extends CrudRepository<User,Long> {
    //List<Custor> s = this.
}
