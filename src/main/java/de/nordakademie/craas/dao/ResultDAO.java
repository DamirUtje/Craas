package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import de.nordakademie.craas.model.Suggestion;
import org.apache.lucene.search.Query;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.engine.ProjectionConstants;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO for the ResultService.
 * @author Frank, Damir
 *
 */
@Repository
@Transactional
public class ResultDAO {

    @PersistenceContext
    protected EntityManager entityManager;

    public ResultDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
    * Returns a list of results which matches the passed term
    */
    @Transactional
    public List<Result> loadResults(String term) {
        Suggestion inquiry = new Suggestion(null, term);
        entityManager.persist(inquiry);

        List<Result> results = new ArrayList<>();
        try {
            FullTextQuery jpaQuery = getFullTextQuery(term);

            @SuppressWarnings("unchecked")
            List<Object[]> qryResult = jpaQuery.getResultList();

            // set score property
            for (Object[] item : qryResult) {
                Result result = (Result) item[0];
                result.setScore((float)item[1]);
                results.add(result);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    /**
    * Get full text query
    */
    private FullTextQuery getFullTextQuery(String searchString) {
        FullTextEntityManager searchManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder queryBuilder = searchManager.getSearchFactory()
                .buildQueryBuilder().forEntity(Result.class).get();

        Query query = queryBuilder
                .keyword()
                .onFields(getSearchFields())
                .matching(searchString)
                .createQuery();

        Query queryFuzzy = queryBuilder
                .keyword()
                .fuzzy()
                .onFields(getSearchFields())
                .matching(searchString)
                .createQuery();

        Query luceneFull = queryBuilder
                .bool()
                .should(query)
                .must(queryFuzzy)
                .createQuery();

        return searchManager
                .createFullTextQuery(luceneFull, Result.class)
                .setProjection(ProjectionConstants.THIS, ProjectionConstants.SCORE);
    }

    /**
    * Get relevant field names for search (with Field annotation)
    */
    private String[] getSearchFields() {
        List<String> retValue = new ArrayList<>();

        for (java.lang.reflect.Field field : Result.class.getDeclaredFields()) {

            if(field.getAnnotation(Field.class) != null)
                retValue.add(field.getName());
        }
        return retValue.toArray(new String[0]);
    }
}
