package de.nordakademie.craas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.nordakademie.craas.service.IndexBuilderService;

@RestController
@RequestMapping("/api")
public class IndexBuilderController {

	@Autowired
	private IndexBuilderService indexBuilderService;

	@GetMapping(value="/build-index")
	public void renewIndex(){

        indexBuilderService.buildIndex();
	}
}