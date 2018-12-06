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
        //String sql = "SELECT TOP 50 * FROM STAGING.CRIMINALS_NOW";

        String hsql = "FROM Result as r";
        return loadData(hsql, 100000);
    }

    public List<Result> loadSuggestions(String term) {
//        String sql = String.format("SELECT TOP 10 * FROM STAGING.CRIMINALS_NOW WHERE " +
//                "CAST(FIRST_NAME AS VARCHAR_IGNORECASE) LIKE '%s%%'", term);
        String hsql =
                String.format("FROM Result as R WHERE R.fullName LIKE '%s%%'", term);

        return loadData(hsql, 10);
    }

    private List<Result> loadData(String hsql, int maxResults) {
        List<Result> results = new ArrayList<>();
        try {
            results = entityManager.createQuery(hsql, Result.class)
                    .setMaxResults(maxResults).getResultList();
        }
        catch (Exception ex) {
            ex.printStackTrace();
            //String.format("Failed to load data for query ''");// + hsql;
        }
        return results;
    }
}
