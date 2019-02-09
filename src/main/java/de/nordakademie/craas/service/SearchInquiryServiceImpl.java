package de.nordakademie.craas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.nordakademie.craas.dao.SearchInquiryDAO;
import de.nordakademie.craas.model.SearchInquiry;

/**
 * Service impl for the SearchInquiry entity.
 * @author Frank, Damir
 *
 */
@Component
public class SearchInquiryServiceImpl implements SearchInquiryService {
    
    @Autowired
    private SearchInquiryDAO searchInquiryDAO;

	@Override
	public List<SearchInquiry> getFavorites() {
		return searchInquiryDAO.loadFavorites();
	}

    @Override
    public void save(SearchInquiry searchInquiry) {
        searchInquiryDAO.save(searchInquiry);
    }
}
