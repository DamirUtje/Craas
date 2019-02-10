package de.nordakademie.craas.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
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
    @SuppressWarnings("unchecked")
	public List<SearchInquiry> loadFavorites() {

        List<SearchInquiry> favorites = new ArrayList<>();

        Session session = entityManager.unwrap(Session.class);

        // select only favorites
        Criteria criteria = session.createCriteria(SearchInquiry.class)
                .setProjection(Projections.projectionList()
                        .add(Projections.groupProperty("displayName"))
                        .add(Projections.rowCount(), "rCount"))
                .addOrder(Order.desc("rCount"))
                .setMaxResults(10);

        // map result to SearchInquiry
        if(criteria.list().size() > 0) {
            for(Object o : criteria.list()) {
                Object[] row = (Object[]) o;
                if(row[0] != null) {
                    favorites.add(new SearchInquiry(null, row[0].toString(), null, null));
                }
            }
        }
        return favorites;
	}

    public void save(SearchInquiry searchInquiry) {
        entityManager.persist(searchInquiry);
    }
}
