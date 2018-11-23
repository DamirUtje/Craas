package de.nordakademie.craas.service;

import de.nordakademie.craas.model.Result;

import java.util.List;

public interface ResultService {

    List<Result> getResultByTerm(String term);
}
