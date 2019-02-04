package de.nordakademie.craas.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.stereotype.Component;

/**
 * Service impl for the rebuild of the Result Index.
 * @author Frank, Damir
 *
 */
@Component
public class RenewIndexServiceImpl implements RenewIndexService {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public String renewIndex() {
		try {
			System.out.println("renewing index ...");			
			FullTextEntityManager fullTextEntityManager =
					Search.getFullTextEntityManager(entityManager);
			fullTextEntityManager.createIndexer().startAndWait();
			System.out.println("index renewed");
		}
			catch (InterruptedException e) {
			System.out.println("Failed to create the search index: " + e.toString());
		}
		// TODO Auto-generated method stub
		return "index renewed";
		
	}
}
