package de.nordakademie.craas.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import de.nordakademie.craas.model.Favorite;



/**
 * DAO for the FavoriteService.
 * @author Frank, Damir
 *
 */
@Repository
@Transactional
public class FavoriteDAO {

    @PersistenceContext
    protected EntityManager entityManager;

    public FavoriteDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	/**
	 * method to save or update favorite
	 * 
	 * @param favorite
	 *            favorite which should be saved or updated
	 */
	public void save(Favorite favorite) {
		Session session = sessionFactory.getCurrentSession();
		session.saveOrUpdate(favorite);
	}
    
    /**
    * Returns a list of results with max. item size of 10.
    * Each item is read from the Favorite searchQuery Table which persists the most favoured
    * searchQueries by display name and counter as Number of searchRequests.
    */
    @Transactional
	public List<Favorite> loadFavorites() {
		 String hql =
	                String.format("FROM Favorite as F ORDER BY counter DESC");
	        return getByQuery(hql, 10);
	}

    /**
    * Get results by hibernate query statement
    */
    private List<Favorite> getByQuery(String hql, int maxFavorites) {
        List<Favorite> favorites = new ArrayList<>();
        try {
        	favorites = entityManager.createQuery(hql, Favorite.class)
                    .setMaxResults(maxFavorites).getResultList();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return favorites;
    }

	public void saveSearchQuery(String term) {
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * method to load favorite entity 
	 * @param term
	 * @return favorite or null
	 */
	public Favorite loadByTerm(String term) {
		Session session = sessionFactory.getCurrentSession();
		Favorite favorite = (Favorite) session.createQuery(
				"from Favorite as f where f.displayname ="
						+ term).uniqueResult();
		return favorite;
	}
	
}
