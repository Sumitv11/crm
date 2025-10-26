package com.crm.exceptionHandler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crm.dto.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle invalid input exceptions
	@ExceptionHandler(InvalidInputException.class)
	@ResponseBody
    public ResponseEntity<ErrorResponse> handleInvalidInputException(InvalidInputException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Invalid Input", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON) // Ensuring the response is in JSON format
                .body(errorResponse);
    }
	
	@ExceptionHandler(EntityAlreadyExistException.class)
	@ResponseBody
    public ResponseEntity<ErrorResponse> handleEntityAlreadyExistException(EntityAlreadyExistException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Data is already present", ex.getMessage());
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .contentType(MediaType.APPLICATION_JSON) // Ensuring the response is in JSON format
                .body(errorResponse);
    }

    // Handle resource not found exceptions
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseBody
	public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
	    ErrorResponse errorResponse = new ErrorResponse("Data Not Found", ex.getMessage());
	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(errorResponse);
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
	@ResponseBody
	public ResponseEntity<ErrorResponse> handleResourceNotFoundException(DataIntegrityViolationException ex) {
	    ErrorResponse errorResponse = new ErrorResponse( ex.getMessage(),"A data integrity violation occurred");
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(errorResponse);
	}
	
//	@ExceptionHandler(DataIntegrityViolationException.class)
//	@ResponseBody
//	public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
//	    String fullMessage = ex.getMessage();
//	    String extractedMessage = "Invalid data length encountered.";
//	    
//	    if (fullMessage != null) {
//	        Pattern pattern = Pattern.compile("Data too long for column '([^']*)'");
//	        Matcher matcher = pattern.matcher(fullMessage);
//	        if (matcher.find()) {
//	            extractedMessage = "Data too long for column: " + matcher.group(1);
//	        }
//	    }
//
//	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                         .contentType(MediaType.APPLICATION_JSON)
//	                         .body(new ErrorResponse("Data length exceeded", extractedMessage));
//	}



    // Handle all other exceptions and return a generic error message
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON) // Ensuring the response is in JSON format
                .body("{\"error\": \"Internal Server Error\", \"message\": \"" + ex+ "\"}");
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }


}

