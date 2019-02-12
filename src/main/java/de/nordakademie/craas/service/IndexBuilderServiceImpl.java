package de.nordakademie.craas.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service impl for the rebuild of the Result Index.
 * @author Frank, Damir
 *
 */
@Component
public class IndexBuilderServiceImpl implements IndexBuilderService {

	@PersistenceContext
	private EntityManager entityManager;

    @Transactional
	@Override
	public void buildIndex() {
		try {
			System.out.println("Building index...");
			FullTextEntityManager fullTextEntityManager =
					Search.getFullTextEntityManager(entityManager);
			fullTextEntityManager.createIndexer().startAndWait();

			System.out.println("Index build completed successfully...");
		} catch (InterruptedException e) {
			System.out.println("Failed to build the search index: " + e.toString());
		}
	}
}
