package de.nordakademie.craas.dao;

import de.nordakademie.craas.model.Result;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResultDAO {


    public List<Result> loadDataByTerm(String term) {
        List<Result> results = new ArrayList<>();

        results.add(new Result(1, term, term));
        results.add(new Result(1, term + 1, term + 1));
        results.add(new Result(1, term + 2, term + 2));

        return results;
    }
}
