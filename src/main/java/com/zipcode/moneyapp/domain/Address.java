package com.zipcode.moneyapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Address entity
 */
@Schema(description = "Address entity")
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Min(value = 1)
    @Column(name = "house_number", nullable = false)
    private Integer houseNumber;

    @NotNull
    @Pattern(regexp = "[a-zA-Z]+\\s(St|Rd|Ave|Blvd|Cir|Dr|Pl|Sq).")
    @Column(name = "street", nullable = false)
    private String street;

    @Min(value = 1)
    @Column(name = "apartment_number")
    private Integer apartmentNumber;

    @NotNull
    @Pattern(regexp = "[a-zA-Z]+")
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Pattern(regexp = "[a-zA-Z]{2}")
    @Column(name = "state", nullable = false)
    private String state;

    @NotNull
    @Pattern(regexp = "[0-9]{5}")
    @Column(name = "zip", nullable = false)
    private String zip;

    /**
     * Associate each UserProfile with an Address
     */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "address")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "user", "bankAccounts", "address" }, allowSetters = true)
    private Set<UserProfile> userProfiles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Address id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getHouseNumber() {
        return this.houseNumber;
    }

    public Address houseNumber(Integer houseNumber) {
        this.setHouseNumber(houseNumber);
        return this;
    }

    public void setHouseNumber(Integer houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getStreet() {
        return this.street;
    }

    public Address street(String street) {
        this.setStreet(street);
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getApartmentNumber() {
        return this.apartmentNumber;
    }

    public Address apartmentNumber(Integer apartmentNumber) {
        this.setApartmentNumber(apartmentNumber);
        return this;
    }

    public void setApartmentNumber(Integer apartmentNumber) {
        this.apartmentNumber = apartmentNumber;
    }

    public String getCity() {
        return this.city;
    }

    public Address city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return this.state;
    }

    public Address state(String state) {
        this.setState(state);
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return this.zip;
    }

    public Address zip(String zip) {
        this.setZip(zip);
        return this;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Set<UserProfile> getUserProfiles() {
        return this.userProfiles;
    }

    public void setUserProfiles(Set<UserProfile> userProfiles) {
        if (this.userProfiles != null) {
            this.userProfiles.forEach(i -> i.setAddress(null));
        }
        if (userProfiles != null) {
            userProfiles.forEach(i -> i.setAddress(this));
        }
        this.userProfiles = userProfiles;
    }

    public Address userProfiles(Set<UserProfile> userProfiles) {
        this.setUserProfiles(userProfiles);
        return this;
    }

    public Address addUserProfile(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.setAddress(this);
        return this;
    }

    public Address removeUserProfile(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.setAddress(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return getId() != null && getId().equals(((Address) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", houseNumber=" + getHouseNumber() +
            ", street='" + getStreet() + "'" +
            ", apartmentNumber=" + getApartmentNumber() +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", zip='" + getZip() + "'" +
            "}";
    }
}
