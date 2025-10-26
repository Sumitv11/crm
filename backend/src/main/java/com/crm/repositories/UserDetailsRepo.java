package com.crm.repositories;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.UserDetails;



public interface UserDetailsRepo extends JpaRepository<UserDetails, Integer> {
	
	@Query("From UserDetails u where u.user_id=?1 and u.active=1")
	Optional<UserDetails> getUserById(Integer user_id);
	
	@Query("From UserDetails u where u.userName=?1 and u.active=1")
	Optional<UserDetails> getUserByUserName(String userName);
	
	@Query("SELECT u FROM UserDetails u WHERE u.userName = :userName AND u.password = :password")
	Optional<UserDetails> findByUserNameAndPassword(@Param("userName") String userName, @Param("password") String password);

	
	
}

