package de.nordakademie.craas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.nordakademie.craas.dao.ResultDAO;
import de.nordakademie.craas.model.Result;

/**
 * Service impl for the Result entity.
 * @author Frank, Damir
 *
 */
@Component
public class ResultServiceImpl implements ResultService {

    @Autowired
    private ResultDAO resultDAO;
    
    @Override
    public List<Result> getResults(String term) {
        return resultDAO.loadResults(term);
    }

    @Override
    public List<Result> getSuggestions(String term) {
        return resultDAO.loadSuggestions(term);
    }

}
