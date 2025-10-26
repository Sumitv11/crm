package com.crm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.entities.Customer;

public interface CustomerListRepositories extends JpaRepository<Customer, Long> {

}
