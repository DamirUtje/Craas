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
    @Column(name = "DISPLAY_NAME")
    private String displayName;
    @Column(name = "ENTITY_TYPE")
    private String entityType;
    @Column(name = "SANCTION_LISTTYPE")
    private String listType;
    @Column(name = "REGULATION_TYPE")
    private String regulationType;
    @Field
    @Column(name = "CATEGORY_LABEL")
    private String categoryLabel;
    @Column(name = "LISTED_ON")
    private String listedOn;
    @Column(name = "LAST_DAY_UPDATED")
    private String lastDayUpdated;
    @Field
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Field
    @Column(name = "LAST_NAME")
    private String lastName;
    @Field
    @Column(name = "PROFESSIONAL_FUNCTION")
    private String professionalFunction;
    @Column(name = "DATE_OF_BIRTH")
    private String dateOfBirth;
    @Field
    @Column(name = "PLACE_OF_BIRTH")
    private String placeOfBirth;
    @Column(name = "PASSPORT_COUNTRY")
    private String passportCountry;
    @Field
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "COUNTRY")
    private String country;

    protected Result() {
    }

    public Result(String displayName, String entityType, String listType, String regulationType, String categoryLabel, String listedOn, String lastDayUpdated, String firstName, String lastName, String professionalFunction, String dateOfBirth, String placeOfBirth, String passportCountry, String address, String country) {
        this.displayName = displayName;
        this.entityType = entityType;
        this.listType = listType;
        this.regulationType = regulationType;
        this.categoryLabel = categoryLabel;
        this.listedOn = listedOn;
        this.lastDayUpdated = lastDayUpdated;
        this.firstName = firstName;
        this.lastName = lastName;
        this.professionalFunction = professionalFunction;
        this.dateOfBirth = dateOfBirth;
        this.placeOfBirth = placeOfBirth;
        this.passportCountry = passportCountry;
        this.address = address;
        this.country = country;
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

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String fullName) {
        this.displayName = fullName;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getListType() {
        return listType;
    }

    public void setListType(String listType) {
        this.listType = listType;
    }

    public String getRegulationType() {
        return regulationType;
    }

    public void setRegulationType(String regulationType) {
        this.regulationType = regulationType;
    }

    public String getCategoryLabel() {
        return categoryLabel;
    }

    public void setCategoryLabel(String categoryLabel) {
        this.categoryLabel = categoryLabel;
    }

    public String getListedOn() {
        return listedOn;
    }

    public void setListedOn(String listedOn) {
        this.listedOn = listedOn;
    }

    public String getProfessionalFunction() {
        return professionalFunction;
    }

    public void setProfessionalFunction(String professionalFunction) {
        this.professionalFunction = professionalFunction;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getPassportCountry() {
        return passportCountry;
    }

    public void setPassportCountry(String passportCountry) {
        this.passportCountry = passportCountry;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLastDateUpdated() {
        return lastDayUpdated;
    }

    public void setLastDateUpdated(String lastDateUpdated) {
        this.lastDayUpdated = lastDateUpdated;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}