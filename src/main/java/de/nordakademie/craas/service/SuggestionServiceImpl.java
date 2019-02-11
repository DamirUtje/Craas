package de.nordakademie.craas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.nordakademie.craas.dao.SuggestionDAO;
import de.nordakademie.craas.model.Suggestion;

/**
 * Service impl for the Suggestion entity.
 * @author Frank, Damir
 *
 */
@Component
public class SuggestionServiceImpl implements SuggestionService {
    
    @Autowired
    private SuggestionDAO suggestionDAO;

	@Override
	public List<Suggestion> getFavorites() {
		return suggestionDAO.loadFavorites();
	}

    @Override
    public List<Suggestion> getSuggestions(String term) {
        return suggestionDAO.loadSuggestions(term);
    }
}
