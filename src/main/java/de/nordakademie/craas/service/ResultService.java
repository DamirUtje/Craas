package de.nordakademie.craas.service;

import de.nordakademie.craas.model.Result;

import java.util.List;

/**
 * Service for the Result entity.
 * @author Frank, Damir
 *
 */
public interface ResultService {
    List<Result> getResults(String term);
    List<Result> getSuggestions(String term);
}
