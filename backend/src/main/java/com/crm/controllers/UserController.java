package com.crm.controllers;

import java.util.List;
import java.util.Optional;

import com.crm.dto.LoginDto;
import com.crm.dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.crm.dto.Status;
import com.crm.entities.UserDetails;
import com.crm.exceptionHandler.EntityAlreadyExistException;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.UserDetailsRepo;
import com.crm.services.UserAndLoginService;
import com.crm.util.ResponseGenerator;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserDetailsRepo userDetailsRepo;

	@Autowired
	UserAndLoginService loginService;

	@PostMapping(value = "/create")
	public ResponseEntity<?> addBreakdown(@RequestBody UserDetails userDetails) {

		System.out.println("User " + userDetails.toString());
		Optional<UserDetails> optional = userDetailsRepo.getUserByUserName(userDetails.getUserName());
		if (optional.isPresent()) {
			throw new EntityAlreadyExistException("UserName is already present", new Object[] {});
		}
		UserDetails userDetail = loginService.addUser(userDetails);

		return ResponseGenerator.generateResponse("User Created", HttpStatus.CREATED, userDetail);

	}

	@GetMapping("/getAlluser")
	public ResponseEntity<Object> getUsers() {

		List<UserDetails> allUsers = loginService.getUsers();
		return ResponseGenerator.generateResponse("Fetch Successful", allUsers);
	}

	@GetMapping("/getUserById/{user_id}")
	public ResponseEntity<?> getUserById(@PathVariable("user_id") int userId) {
		try {
			Optional<UserDetails> optionalUser = loginService.getUserById(userId);
			if (optionalUser.isPresent()) {
				return ResponseEntity.ok(optionalUser.get());
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + userId);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@PostMapping(value = "/changeStatus")
	@ResponseBody
	public Status changeStatus(@RequestBody UserDetails userDetails) {
		Status status = new Status();
		try {

			Optional<UserDetails> optionalUser = userDetailsRepo.findById(userDetails.getUser_id());
			if (optionalUser.isPresent()) {
				UserDetails user = optionalUser.get();

				user.setActive(userDetails.getActive());

				userDetailsRepo.save(user);

				status.setCode(200);
				status.setMessage("Status updated successfully");
			} else {
				status.setCode(404);
				status.setMessage("User not found");
			}
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("An error occurred while updating status: " + e.getMessage());
		}
		return status;
	}

	@PutMapping("/edit/{user_id}")
	public ResponseEntity<Object> editUserById(@PathVariable("user_id") int user_id,
			@RequestBody UserDetails userDetails) {

		Optional<UserDetails> optionalUser = userDetailsRepo.findById(user_id);
			if (optionalUser.isPresent()) {
				UserDetails existingUser = optionalUser.get();

				existingUser.setFirstName(userDetails.getFirstName());
				existingUser.setLastName(userDetails.getLastName());
				existingUser.setEmailId(userDetails.getEmailId());
				existingUser.setGender(userDetails.getGender());
				existingUser.setPassword(userDetails.getPassword());
				existingUser.setContactNo(userDetails.getContactNo());
				existingUser.setUserName(userDetails.getUserName());
				existingUser.setActive(userDetails.getActive());

				userDetailsRepo.save(existingUser);

			} else {
				throw new ResourceNotFoundException("User not found with Id="+user_id);
			}
			
		return ResponseGenerator.generateResponse("Updated Successful", optionalUser);
	}

	@DeleteMapping(value = "/deleteUser/{user_id}")
	public ResponseEntity<Object> deleteUserById(@PathVariable("user_id") Integer user_id) {

			Optional<UserDetails> optionalUser = loginService.getUserById(user_id);
			if (optionalUser.isPresent()) {
				loginService.deleteUserById(user_id);
				return ResponseGenerator.generateResponse("Delete successful", null);
			} 
			else
			throw new ResourceNotFoundException("User not found with id="+user_id);
		
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto loginRequest) {
		try {
			Optional<UserDetails> user = loginService.login(loginRequest.getUserName(), loginRequest.getPassword());
			if (user.isPresent()) {
				UserDetails newUser=user.get();
				return ResponseEntity.ok(new UserResponseDto(newUser.getEmailId(),newUser.getFirstName()));
				// return ResponseEntity.ok("Login SuccessFul");
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

}
