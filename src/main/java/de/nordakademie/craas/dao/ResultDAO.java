package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
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

@Repository
@Transactional
public class ResultDAO {

    @PersistenceContext
    protected EntityManager entityManager;
    private enum QueryType { DEFAULT, FUZZY }

    public ResultDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Result> loadResults(String term) {
        List<Result> results = new ArrayList<>(getResults(term, QueryType.DEFAULT));
        if(results.size() <= 10)
            results.addAll(new ArrayList<>(getResults(term, QueryType.FUZZY)));

        return results;
    }

    public List<Result> loadSuggestions(String term) {
        String hql =
                String.format("FROM Result as R WHERE lower(R.displayName) LIKE '%s%%'",
                        term.toLowerCase());

        return getByQuery(hql, 10);
    }

    private List<Result> getByQuery(String hql, int maxResults) {
        List<Result> results = new ArrayList<>();
        try {
            results = entityManager.createQuery(hql, Result.class)
                    .setMaxResults(maxResults).getResultList();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return results;
    }

    @Transactional
    public List<Result> getResults(String searchString, QueryType queryType) {
        List<Result> results = new ArrayList<>();
        try {
            FullTextQuery jpaQuery = getFullTextQuery(searchString, queryType);

            @SuppressWarnings("unchecked")
            List<Object[]> qryResult = jpaQuery.getResultList();

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

    private FullTextQuery getFullTextQuery(String searchString, QueryType queryType) {
        FullTextQuery fullTextQuery;
        FullTextEntityManager searchManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder queryBuilder = searchManager.getSearchFactory()
                .buildQueryBuilder().forEntity(Result.class).get();

        Query query;
        switch (queryType){
            default:
            case DEFAULT:
                query = queryBuilder
                        .keyword()
                        .onFields(getSearchFields())
                        .matching(searchString)
                        .createQuery();

                fullTextQuery = searchManager.createFullTextQuery(query, Result.class)
                        .setProjection(ProjectionConstants.THIS, ProjectionConstants.SCORE);
                break;
            case FUZZY:
                query = queryBuilder
                        .keyword()
                        .fuzzy()
                        .onFields(getSearchFields())
                        .matching(searchString)
                        .createQuery();

                fullTextQuery = searchManager.createFullTextQuery(query, Result.class)
                        .setProjection(ProjectionConstants.THIS, ProjectionConstants.SCORE);
                break;
        }
        return fullTextQuery;
    }

    private String[] getSearchFields() {
        List<String> retValue = new ArrayList<>();

        for (java.lang.reflect.Field field : Result.class.getDeclaredFields()) {

            if(field.getAnnotation(Field.class) != null)
                retValue.add(field.getName());
        }

        return retValue.toArray(new String[0]);
    }

}
