package com.test.myfirstjhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Club.
 */
@Entity
@Table(name = "club")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Club implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "number_phone_1")
    private String numberPhone1;

    @Column(name = "number_phone_2")
    private String numberPhone2;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Club name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Club address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public Club email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumberPhone1() {
        return numberPhone1;
    }

    public Club numberPhone1(String numberPhone1) {
        this.numberPhone1 = numberPhone1;
        return this;
    }

    public void setNumberPhone1(String numberPhone1) {
        this.numberPhone1 = numberPhone1;
    }

    public String getNumberPhone2() {
        return numberPhone2;
    }

    public Club numberPhone2(String numberPhone2) {
        this.numberPhone2 = numberPhone2;
        return this;
    }

    public void setNumberPhone2(String numberPhone2) {
        this.numberPhone2 = numberPhone2;
    }

    public String getCity() {
        return city;
    }

    public Club city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public Club country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Club club = (Club) o;
        if (club.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), club.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Club{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", email='" + getEmail() + "'" +
            ", numberPhone1='" + getNumberPhone1() + "'" +
            ", numberPhone2='" + getNumberPhone2() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
