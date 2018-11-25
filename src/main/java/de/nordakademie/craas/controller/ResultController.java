package de.nordakademie.craas.controller;

import de.nordakademie.craas.model.Result;
import de.nordakademie.craas.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @RequestMapping(value="/query")
    public List<Result> query(@RequestParam("term") String term){

        return resultService.getResults(term);
    }

    @RequestMapping(value="/suggest")
    public List<Result> suggest(@RequestParam("term") String term){

        return resultService.getSuggestions(term);
    }
}