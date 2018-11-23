package de.nordakademie.craas.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Model for the Result.
 * @author Frank, Damir
 *
 */

@Entity
public class Result {
	
private static final long serialVersionUID = -485136401822846850L;
	
	@Id
	@GeneratedValue
	private int id;
	private String vorname;
	private String nachname;

	
	public Result(int id, String vorname, String nachname) {
		this.id = id;
		this.vorname = vorname;
		this.nachname = nachname;
	}

	public String getNachname() {
		return nachname;
	}

	public String getVorname() {
		return vorname;
	}

	public int getId() {
		return id;
	}
}
