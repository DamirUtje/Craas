package de.nordakademie.craas.controller;

import de.nordakademie.craas.model.Suggestion;
import de.nordakademie.craas.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SuggestionController {

    private final SuggestionService suggestionService;

    @Autowired
    public SuggestionController(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }

    @GetMapping(value="/suggest")
    public List<Suggestion> getSuggestions(@RequestParam("term") String term){

        return suggestionService.getSuggestions(term);
    }

    @GetMapping(value="/favorites")
    public List<Suggestion> getFavorites() {

        return suggestionService.getFavorites();
    }
}
