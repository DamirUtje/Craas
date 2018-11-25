package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ResultDAO {

    public List<Result> loadResults(String term) {
        String sql = String.format("SELECT * FROM UN_SL_INDIVIDUAL WHERE " +
                "CAST(FIRST_NAME AS VARCHAR_IGNORECASE) LIKE '%s%%'", term);
        return loadData(sql);
    }

    public List<Result> loadSuggestions(String term) {
        String sql = String.format("SELECT TOP 10 * FROM UN_SL_INDIVIDUAL WHERE " +
                "CAST(FIRST_NAME AS VARCHAR_IGNORECASE) LIKE '%s%%'", term);
        return loadData(sql);
    }

    private List<Result> loadData(String sql){
        List<Result> results = new ArrayList<>();
        try {
            Connection conn = DriverManager.getConnection("jdbc:h2:/home/damir/test.h2.db", "", "");
            PreparedStatement statement = conn.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet != null) {
                while (resultSet.next()) {

                    Result result = new Result(resultSet.getInt("DATAID"),
                            resultSet.getString("FIRST_NAME"),
                            resultSet.getString("SECOND_NAME"));

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
