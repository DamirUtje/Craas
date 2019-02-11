package de.nordakademie.craas.service;

import java.util.List;

import de.nordakademie.craas.model.Suggestion;

/**
 * Service for the Suggestion entity.
 * @author Frank, Damir
 *
 */
public interface SuggestionService {
    List<Suggestion> getFavorites();
    List<Suggestion> getSuggestions(String term);
}