package com.crm.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseGenerator {
    public static ResponseEntity<Object> generateResponse(
            String message,
            HttpStatus status,
            Object responseObj) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", message);
        map.put("data", responseObj);

        return new ResponseEntity<>(map, status);
    }

    public static ResponseEntity<Object> generateResponse(String message, Object responseObj) {
        return generateResponse(message, HttpStatus.OK, responseObj);
    }
}

