package com.crm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.entities.OrderType;

public interface OrderTypeRepository extends JpaRepository<OrderType, Long> {

}
