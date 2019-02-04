package de.nordakademie.craas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.nordakademie.craas.service.RenewIndexService;

@RestController
@RequestMapping("/index")
public class IndexController {
	
	 @Autowired
	private RenewIndexService renewIndexService;
	
	@RequestMapping(value="/renewIndex")
	public String renewIndex(){
		
		return renewIndexService.renewIndex();

	}
}