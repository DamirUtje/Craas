package de.nordakademie.craas.model;

import javax.persistence.*;

/**
 * Model for the Suggestion.
 * @author Frank, Damir
 *
 */
@Entity
@Table(name = "SUGGESTIONS")
public class Suggestion {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DISPLAY_NAME")
    private String displayName;
   
    protected Suggestion() {
    }

    public Suggestion(Long id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}