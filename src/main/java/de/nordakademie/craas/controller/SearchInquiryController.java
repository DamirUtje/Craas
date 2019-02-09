package de.nordakademie.craas.controller;

import de.nordakademie.craas.model.SearchInquiry;
import de.nordakademie.craas.service.SearchInquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchInquiryController {

    @Autowired
    SearchInquiryService searchInquiryService;

    @GetMapping(value="/favorites")
    public List<SearchInquiry> getFavorites() {

        return searchInquiryService.getFavorites();
    }

    @PostMapping(value = "/inquiry")
    public void saveInquiry(@RequestBody SearchInquiry searchInquiry) {
        searchInquiryService.save(searchInquiry);
    }
}
