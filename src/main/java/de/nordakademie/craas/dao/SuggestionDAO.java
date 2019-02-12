package de.nordakademie.craas.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.nordakademie.craas.model.Result;
import de.nordakademie.craas.model.Suggestion;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * DAO for the SuggestionService.
 * @author Frank, Damir
 *
 */
@Repository
@Transactional
public class SuggestionDAO {

    @PersistenceContext
    protected EntityManager entityManager;

    public SuggestionDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
     * Returns a list of suggestions with max. item size of 10.
     * Each item display name starts with the passed term
     */
    @Transactional
    public List<Suggestion> loadSuggestions(String term) {
        String hql =
                String.format("FROM Result as R WHERE lower(R.displayName) LIKE '%s%%'",
                        term.toLowerCase());

        return getByQuery(hql, 10);
    }

    /**
     * Get suggestions by hibernate query statement
     */
    private List<Suggestion> getByQuery(String hql, int maxResults) {
        List<Suggestion> suggestions = new ArrayList<>();
        try {
            List<Result> results = entityManager.createQuery(hql, Result.class)
                    .setMaxResults(maxResults).getResultList();

            // map result to suggestion
            if(results.size() > 0) {
                for(Result result : results) {
                    suggestions.add(new Suggestion(null, result.getDisplayName()));
                }
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return suggestions;
    }


    /**
    * Returns a list of results with max. item size of 10.
    */
    @Transactional
    @SuppressWarnings("unchecked")
	public List<Suggestion> loadFavorites() {

        List<Suggestion> favorites = new ArrayList<>();

        Session session = entityManager.unwrap(Session.class);

        // select only favorites
        Criteria criteria = session.createCriteria(Suggestion.class)
                .setProjection(Projections.projectionList()
                        .add(Projections.groupProperty("displayName"))
                        .add(Projections.rowCount(), "rCount"))
                .addOrder(Order.desc("rCount"))
                .setMaxResults(10);

        // map result to Suggestion
        if(criteria.list().size() > 0) {
            for(Object o : criteria.list()) {
                Object[] row = (Object[]) o;
                if(row[0] != null) {
                    favorites.add(new Suggestion(null, row[0].toString()));
                }
            }
        }
        return favorites;
	}
}
