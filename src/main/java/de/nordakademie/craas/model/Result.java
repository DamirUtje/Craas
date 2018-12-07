package de.nordakademie.craas.model;

import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;

/**
 * Model for the Result.
 * @author Frank, Damir
 *
 */

@Indexed
@Entity
@Table(name = "CRIMINALS_NOW")
public class Result {

    @Id
    @GeneratedValue
    private int id;
    @Field
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Field
    @Column(name = "LAST_NAME")
    private String lastName;
    @Field
    @Column(name = "FULL_NAME")
    private String fullName;

    protected Result() {
    }

    public Result(String firstName, String lastName, String fullName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}