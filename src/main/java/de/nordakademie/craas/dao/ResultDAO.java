package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ResultDAO {

    @PersistenceContext
    protected EntityManager entityManager;

    public List<Result> loadResults(String term) {
        String hql =
                String.format("FROM Result as R WHERE lower(R.fullName) LIKE '%%s%%'", term.toLowerCase());

        return loadData(hql, 100000);
    }

    public List<Result> loadSuggestions(String term) {
        String hql =
                String.format("FROM Result as R WHERE lower(R.fullName) LIKE '%s%%'", term.toLowerCase());

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
            //String.format("Failed to load data for query ''");// + hsql;
        }
        return results;
    }
}
