package com.crm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.entities.DocType;

public interface DocTypeRepositories extends JpaRepository<DocType, Long> {

}
