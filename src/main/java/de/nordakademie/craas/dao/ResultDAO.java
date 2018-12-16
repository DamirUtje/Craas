package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.jpa.FullTextEntityManager;
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

    public ResultDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Result> loadResults(String term) {
        return search(term);
    }

    public List<Result> loadSuggestions(String term) {
        String hql =
                String.format("FROM Result as R WHERE lower(R.displayName) LIKE '%s%%'",
                        term.toLowerCase());

        return loadData(hql, 10);
    }

    private List<Result> loadData(String hql, int maxResults) {
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
    public List<Result> search(String searchString) {
        FullTextEntityManager fullTextEntityManager =
                org.hibernate.search.jpa.Search.getFullTextEntityManager(entityManager);

        QueryBuilder queryBuilder =
                fullTextEntityManager.getSearchFactory()
                        .buildQueryBuilder().forEntity(Result.class).get();

        org.apache.lucene.search.Query query =
                queryBuilder
                        .keyword()
                        .fuzzy()
                        .onFields(getSearchFields())
                        .matching(String.format("*%s*", searchString))
                        .createQuery();

        org.hibernate.search.jpa.FullTextQuery jpaQuery =
                fullTextEntityManager.createFullTextQuery(query, Result.class);

        @SuppressWarnings("unchecked")
        List<Result> results = jpaQuery.getResultList();

        return results;
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
