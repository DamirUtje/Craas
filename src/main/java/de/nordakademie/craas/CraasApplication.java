package de.nordakademie.craas;


import java.sql.SQLException;

import org.h2.tools.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class CraasApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {

		SpringApplication.run(CraasApplication.class, args);
		
//		// start the TCP Server
//		Server server = Server.createTcpServer(args).start();
	}


	
}
