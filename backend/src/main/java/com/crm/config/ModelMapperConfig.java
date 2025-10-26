package com.crm.config;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Optional: Customize the mapper configuration
        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);

        // Custom converter for converting String to Long
        Converter<String, Long> stringToLongConverter = new Converter<String, Long>() {
            public Long convert(MappingContext<String, Long> context) {
                try {
                    return Long.parseLong(context.getSource());
                } catch (NumberFormatException e) {
                    return null; // Handle exception or return a default value
                }
            }
        };

        // Register custom converter for String to Long mapping
        modelMapper.addConverter(stringToLongConverter);

        return modelMapper;
    }
}
