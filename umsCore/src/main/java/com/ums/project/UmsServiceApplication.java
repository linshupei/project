package com.ums.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan("com.ums.project")
public class UmsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UmsServiceApplication.class, args);
	}
}
