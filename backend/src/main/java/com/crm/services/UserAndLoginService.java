package com.crm.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.entities.UserDetails;
import com.crm.repositories.UserDetailsRepo;



@Service
public class UserAndLoginService {
	
	@Autowired
	UserDetailsRepo userDetailsRepo;

	
	public Optional<UserDetails> getUserById(int user_id) {
		// TODO Auto-generated method stub
		return userDetailsRepo.getUserById(user_id);
	}
	
	

	public List<UserDetails> getUsers() {
		// TODO Auto-generated method stub
		return userDetailsRepo.findAll();
	}
	
	public void updateUser(UserDetails userDetails) {
	    // This method will update an existing user
	    userDetailsRepo.save(userDetails);
	}



	public UserDetails addUser(UserDetails userDetails) {
		 System.out.println("Saving user: " + userDetails);
		   return userDetailsRepo.save(userDetails);
	}
	 public Optional<UserDetails> login(String userName, String password) {
	        return userDetailsRepo.findByUserNameAndPassword(userName, password);
	    }
	 
	 public void deleteUserById(int userId) {
		    userDetailsRepo.deleteById(userId);
		}
	 
	



}
