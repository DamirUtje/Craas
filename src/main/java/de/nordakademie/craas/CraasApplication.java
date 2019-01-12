package de.nordakademie.craas;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationListener;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@SpringBootApplication
public class CraasApplication extends SpringBootServletInitializer
        implements ApplicationListener<ApplicationReadyEvent> {

	@PersistenceContext
	private EntityManager entityManager;

	public static void main(String[] args) {
		SpringApplication.run(CraasApplication.class, args);
	}

	@Transactional
	@Override
	public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
		try {
			FullTextEntityManager fullTextEntityManager =
					Search.getFullTextEntityManager(entityManager);
			fullTextEntityManager.createIndexer().startAndWait();
		}
		catch (InterruptedException e) {
			System.out.println("Failed to create the search index: " +
							e.toString());
		}
	}
}
