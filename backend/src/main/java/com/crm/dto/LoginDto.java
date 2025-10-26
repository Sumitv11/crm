package com.crm.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDto {
    @NotBlank(message = "UserName is required")
    private String userName;
    @NotBlank(message = "Password is required")
    private String password;
}
