package de.nordakademie.craas.model;

import javax.persistence.*;

/**
 * Model for the SearchInquiry.
 * @author Frank, Damir
 *
 */
@Entity
@Table(name = "SEARCH_INQUIRY")
public class SearchInquiry {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DISPLAY_NAME")
    private String displayName;
    @Column(name = "BROWSER_LANGUAGE")
    private String browserLanguage;
    @Column(name = "MOBILE_DEVICE")
    private Boolean mobileDevice;
   
    protected SearchInquiry() {
    }

    public SearchInquiry(Long id, String displayName, String browserLanguage, Boolean mobileDevice) {
        this.id = id;
        this.displayName = displayName;
        this.browserLanguage = browserLanguage;
        this.mobileDevice = mobileDevice;
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

    public String getBrowserLanguage() {
        return browserLanguage;
    }

    public void setBrowserLanguage(String browserLanguage) {
        this.browserLanguage = browserLanguage;
    }

    public Boolean isMobileDevice() {
        return mobileDevice;
    }

    public void setMobileDevice(Boolean mobileDevice) {
        this.mobileDevice = mobileDevice;
    }
}