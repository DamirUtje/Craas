package de.nordakademie.craas;

import de.nordakademie.craas.service.IndexBuilderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationListener;

/**
 * Application
 * @author Frank, Damir
 *
 */
@SpringBootApplication
public class CraasApplication extends SpringBootServletInitializer
        implements ApplicationListener<ApplicationReadyEvent> {

	@Autowired
	private IndexBuilderService indexBuilderService;

	public static void main(String[] args) {
		SpringApplication.run(CraasApplication.class, args);
	}

	@Override
	public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
		indexBuilderService.buildIndex();
	}
}
