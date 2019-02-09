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
    private long id;
    @Column(name = "KEYWORD")
    private String keyword;
    @Column(name = "BROWSER_LANGUAGE")
    private String browserLanguage;
    @Column(name = "MOBILE_DEVICE")
    private boolean mobileDevice;
   
    protected SearchInquiry() {
    }

    public SearchInquiry(long id, String keyword, String browserLanguage, boolean mobileDevice) {
        this.id = id;
        this.keyword = keyword;
        this.browserLanguage = browserLanguage;
        this.mobileDevice = mobileDevice;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getBrowserLanguage() {
        return browserLanguage;
    }

    public void setBrowserLanguage(String browserLanguage) {
        this.browserLanguage = browserLanguage;
    }

    public boolean isMobileDevice() {
        return mobileDevice;
    }

    public void setMobileDevice(boolean mobileDevice) {
        this.mobileDevice = mobileDevice;
    }
}