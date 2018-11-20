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
		startH2Server();
		SpringApplication.run(CraasApplication.class, args);
		
//		// start the TCP Server
//		Server server = Server.createTcpServer(args).start();
	}
	
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	        startH2Server();
	        return application.sources(CraasApplication.class);
	    }

	    private static void startH2Server() {
	        try {
	            Server h2Server = Server.createTcpServer().start();
	            if (h2Server.isRunning(true)) {
	                //log.info("H2 server was started and is running.");
	            	System.out.println("H2 server was started and is running.");
	            } else {
	                throw new RuntimeException("Could not start H2 server.");
	            }
	        } catch (SQLException e) {
	            throw new RuntimeException("Failed to start H2 server: ", e);
	        }
	    }
	
}
