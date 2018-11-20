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
public class Company {
	
private static final long serialVersionUID = -485136401822846850L;
	
	@Id
	@GeneratedValue
	private Long id;
	private String vorname;
	private String nachname;

	
	public Company() {
		super();
	}
		
}
