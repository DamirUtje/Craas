package de.nordakademie.craas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.nordakademie.craas.dao.FavoriteDAO;
import de.nordakademie.craas.model.Favorite;

/**
 * Service impl for the Favorite entity.
 * @author Frank, Damir
 *
 */
@Component
public class FavoriteServiceImpl implements FavoriteService {
    
    @Autowired
    private FavoriteDAO favoriteDAO;

	@Override
	public List<Favorite> getFavorites() {
		return favoriteDAO.loadFavorites();
	}

	@Override
	public Favorite loadFavorite(String term) {
		return favoriteDAO.loadByTerm(term);
	}

	@Override
	public void saveFavorite(String term) {
		Favorite favorite = loadFavorite(term);
		
		//favorite still exists or is null
		favoriteDAO.save(favorite);
	}
	
}
