package de.nordakademie.craas.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Model for the Individual.
 * @author Frank, Damir
 *
 */

//@Table(name = "Individual")
@Entity
public class Individual {
	
	private static final long serialVersionUID = -485136401822846809L;
	
	@Id
	@GeneratedValue
	private Long id;
	private String vorname;
	private String nachname;

//	(strategy = GenerationType.AUTO)
//	public Long getId() {
//		return id;
//	}
	
	public Individual() {
		super();
	}

}
