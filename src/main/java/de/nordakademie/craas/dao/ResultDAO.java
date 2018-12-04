package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ResultDAO {

    public List<Result> loadResults(String term) {
        String sql = "SELECT TOP 50 * FROM STAGING.CRIMINALS_NOW";
        return loadData(sql);
    }

    public List<Result> loadSuggestions(String term) {
        String sql = String.format("SELECT TOP 10 * FROM STAGING.CRIMINALS_NOW WHERE " +
                "CAST(FIRST_NAME AS VARCHAR_IGNORECASE) LIKE '%s%%'", term);
        return loadData(sql);
    }

    private List<Result> loadData(String sql){
        List<Result> results = new ArrayList<>();
        try {
            Connection conn = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/craas_db", "sa", "");
            PreparedStatement statement = conn.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet != null) {
                while (resultSet.next()) {

                    Result result = new Result(resultSet.getInt("ID"),
                            resultSet.getString("FIRST_NAME"),
                            resultSet.getString("LAST_NAME"));

                    results.add(result);
                }
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return results;
    }
}
