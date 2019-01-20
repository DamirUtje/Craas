package de.nordakademie.craas.model;

import de.nordakademie.craas.service.CustomResultAnalyzer;
import org.hibernate.search.annotations.*;

import javax.persistence.*;
import java.util.Date;

/**
 * Model for the Result.
 * @author Frank, Damir
 *
 */
@Indexed
@Entity
@Table(name = "CONSOLIDATED_CRIMINALS")
@Analyzer(impl = CustomResultAnalyzer.class)
public class Result {
    @Id
    @Column(name = "ID")
    private String sourceId;
    @Field
    @Column(name = "DISPLAY_NAME")
    private String displayName;
    @Column(name = "ENTITY_TYPE")
    private String entityType;
    @Column(name = "SANCTION_LISTTYPE")
    private String listType;
    @Column(name = "REGULATION_TYPE")
    private String regulationType;
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
    @Field
    private String nameAlias;
    @Column(name = "NAME_ALIAS")
    private String lastName;
    @Column(name = "PROFESSIONAL_FUNCTION")
    private String professionalFunction;
    @Column(name = "DATE_OF_BIRTH")
    private String dateOfBirth;
    @Column(name = "PLACE_OF_BIRTH")
    private String placeOfBirth;
    @Column(name = "PASSPORT_COUNTRY")
    private String passportCountry;
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "COUNTRY")
    private String country;
    @Column(name = "IS_DELETED")
    private boolean deleted;
    @Column(name = "LOAD_END_DATE")
    private Date deletedOn;

    @Column(name = "LOAD_DATE")
    private Date loadedOn;
    @Transient
    private float score;

    protected Result() {
    }

    public Result(
            String sourceId, String displayName, String entityType, String listType,
            String regulationType, String categoryLabel, String listedOn, String lastDayUpdated,
            String firstName, String nameAlias, String lastName, String professionalFunction,
            String dateOfBirth, String placeOfBirth, String passportCountry, String address,
            String country, boolean deleted, Date deletedOn, Date loadedOn, float score) {
        this.sourceId = sourceId;
        this.displayName = displayName;
        this.entityType = entityType;
        this.listType = listType;
        this.regulationType = regulationType;
        this.categoryLabel = categoryLabel;
        this.listedOn = listedOn;
        this.lastDayUpdated = lastDayUpdated;
        this.firstName = firstName;
        this.nameAlias = nameAlias;
        this.lastName = lastName;
        this.professionalFunction = professionalFunction;
        this.dateOfBirth = dateOfBirth;
        this.placeOfBirth = placeOfBirth;
        this.passportCountry = passportCountry;
        this.address = address;
        this.country = country;
        this.deleted = deleted;
        this.deletedOn = deletedOn;
        this.loadedOn = loadedOn;
        this.score = score;
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

    public String getLastDayUpdated() {
        return lastDayUpdated;
    }

    public void setLastDayUpdated(String lastDayUpdated) {
        this.lastDayUpdated = lastDayUpdated;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getNameAlias() {
        return nameAlias;
    }

    public void setNameAlias(String nameAlias) {
        this.nameAlias = nameAlias;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Date getDeletedOn() {
        return deletedOn;
    }

    public void setDeletedOn(Date deletedOn) {
        this.deletedOn = deletedOn;
    }

    public Date getLoadedOn() {
        return loadedOn;
    }

    public void setLoadedOn(Date loadedOn) {
        this.loadedOn = loadedOn;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }
}