package de.nordakademie.craas.controller;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/index")
public class IndexController {
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@RequestMapping(value="/renewIndex")
	public String renewIndex(){
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
		return "index renewed";

	}
}