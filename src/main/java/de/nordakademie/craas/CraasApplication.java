package de.nordakademie.craas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class CraasApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {

		SpringApplication.run(CraasApplication.class, args);

	}
}
