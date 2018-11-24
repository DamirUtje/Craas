package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ResultDAO {


    public List<Result> loadDataByTerm(String term) {

        List<Result> results = new ArrayList<>();

        try {
            Connection conn = DriverManager.getConnection("jdbc:h2:/home/damir/test.h2.db", "", "");
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM UN_SL_INDIVIDUAL");
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

    private List<Result> getFakeData(String term){
        List<Result> results = new ArrayList<>();

        results.add(new Result(1, term, term));
        results.add(new Result(1, term + 1, term + 1));
        results.add(new Result(1, term + 2, term + 2));
        return results;
    }
}
