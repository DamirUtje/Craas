package de.nordakademie.craas.service;

import de.nordakademie.craas.model.Result;

import java.util.List;

public interface ResultService {
    List<Result> getResults(String term);
    List<Result> getSuggestions(String term);
}
