package de.nordakademie.craas.service;

import java.util.List;

import de.nordakademie.craas.model.Favorite;

/**
 * Service for the Favorite entity.
 * @author Frank, Damir
 *
 */
public interface FavoriteService {
    List<Favorite> getFavorites();
	Favorite loadFavorite(String term);
	
	//note: this method should be called after every SearchRequest
	//searchInputText should be saved as a new 'Favorite' (if not yet existing)
    void saveFavorite(String term);

}
