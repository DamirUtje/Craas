package de.nordakademie.craas.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import de.nordakademie.craas.model.SearchInquiry;



/**
 * DAO for the SearchInquiryService.
 * @author Frank, Damir
 *
 */
@Repository
@Transactional
public class SearchInquiryDAO {

    @PersistenceContext
    protected EntityManager entityManager;

    public SearchInquiryDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
    * Returns a list of results with max. item size of 10.
    */
    @Transactional
	public List<SearchInquiry> loadFavorites() {
    	String hql = "FROM SearchInquiry as S";
		return entityManager
                .createQuery(hql, SearchInquiry.class)
                .setMaxResults(10)
                .getResultList();
	}

    public void save(SearchInquiry searchInquiry) {
        entityManager.persist(searchInquiry);
    }
}
