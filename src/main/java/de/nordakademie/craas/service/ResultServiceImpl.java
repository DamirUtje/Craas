package de.nordakademie.craas.service;

import de.nordakademie.craas.dao.ResultDAO;
import de.nordakademie.craas.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResultServiceImpl implements ResultService {

    @Autowired
    private ResultDAO resultDAO;

    @Override
    public List<Result> getResultByTerm(String term) {

        return resultDAO.loadDataByTerm(term);
    }
}
