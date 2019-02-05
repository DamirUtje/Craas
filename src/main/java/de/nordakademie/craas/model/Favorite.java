package de.nordakademie.craas.model;

import java.math.BigInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import de.nordakademie.craas.service.CustomResultAnalyzer;

/**
 * Model for the Favorite.
 * @author Frank, Damir
 *
 */
@Indexed
@Entity
@Table(name = "FAVORITE_SEARCHQUERY")
@Analyzer(impl = CustomResultAnalyzer.class)
public class Favorite {
    @Id
    @Column(name = "ID")
    private String sourceId;
    @Field
    @Column(name = "DISPLAY_NAME")
    private String displayName;
    @Column(name = "COUNTER")
    private BigInteger counter;
   
    protected Favorite() {
    }

    public Favorite(
            String sourceId, String displayName, BigInteger counter) {
        this.sourceId = sourceId;
        this.displayName = displayName;
        this.counter = counter;
    }

    public String getSourceId() {
        return sourceId;
    }

    public void setSourceId(String sourceId) {
        this.sourceId = sourceId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

	public BigInteger getCounter() {
		return counter;
	}

	public void setCounter(BigInteger counter) {
		this.counter = counter;
	}
    
}