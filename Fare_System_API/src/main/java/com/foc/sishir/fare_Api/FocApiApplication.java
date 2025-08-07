package com.foc.sishir.fare_Api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class FocApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FocApiApplication.class, args);
	}
}
