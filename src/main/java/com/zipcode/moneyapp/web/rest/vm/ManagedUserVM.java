package com.zipcode.moneyapp.web.rest.vm;

import com.zipcode.moneyapp.service.dto.AdminUserDTO;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

/**
 * View Model extending the AdminUserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends AdminUserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    private String firstName, lastName;
    private LocalDate dateOfBirth;

    @Override
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public ManagedUserVM() {
        // Empty constructor needed for Jackson.
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ManagedUserVM{" + super.toString() + "} " + this.firstName + " " + this.lastName + " " + this.dateOfBirth;
    }
}
