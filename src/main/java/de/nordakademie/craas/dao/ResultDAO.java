package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import org.springframework.stereotype.Component;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ResultDAO {

//	String.format(
//	String sql = String.format("SELECT * FROM STAGING.UN_SL_INDIVIDUAL WHERE " +
//    "CAST(FIRST_NAME AS VARCHAR_IGNORECASE) LIKE '%s%%'", term);
//	, term
    public List<Result> loadResults(String term) {
        String sql = "SELECT * FROM STAGING.UN_SL_INDIVIDUAL";
        return loadData(sql);
    }

    public List<Result> loadSuggestions(String term) {
        String sql = String.format("SELECT TOP 10 * FROM STAGING.UN_SL_INDIVIDUAL WHERE " +
                "CAST(FIRST_NAME AS VARCHAR_IGNORECASE) LIKE '%s%%'", term);
        return loadData(sql);
    }

    private List<Result> loadData(String sql){
        List<Result> results = new ArrayList<>();
        try {
        	//"jdbc:h2:/home/damir/test.h2.db"
//        	"jdbc:h2:tcp:"+getCurrentFileDirectory() +"test.h2.db"
//        	jdbc:h2:tcp://localhost/~/test
            Connection conn = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/test", "sa", "");
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
    
	public String getCurrentFileDirectory() {
		//output example: C:\Users\Frank\git\CraasDataService\
		String currentDir = null;
		File currentDirFile = null;
		currentDirFile = new File("");
		currentDir = currentDirFile.getAbsolutePath();
		return currentDir;
	}
}
