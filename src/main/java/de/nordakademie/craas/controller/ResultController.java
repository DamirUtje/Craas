package de.nordakademie.craas.controller;

import de.nordakademie.craas.model.Result;
import de.nordakademie.craas.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @GetMapping(value="/query")
    public List<Result> getResults(@RequestParam("term") String term){

        return resultService.getResults(term);
    }

    @GetMapping(value="/suggest")
    public List<Result> getSuggestions(@RequestParam("term") String term){

        return resultService.getSuggestions(term);
    }
}