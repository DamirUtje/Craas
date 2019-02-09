package de.nordakademie.craas.service;

import java.util.List;

import de.nordakademie.craas.model.SearchInquiry;

/**
 * Service for the SearchInquiry entity.
 * @author Frank, Damir
 *
 */
public interface SearchInquiryService {
    List<SearchInquiry> getFavorites();

    void save(SearchInquiry searchInquiry);
}
