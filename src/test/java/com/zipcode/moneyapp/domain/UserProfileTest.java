package com.zipcode.moneyapp.domain;

import static com.zipcode.moneyapp.domain.AddressTestSamples.*;
import static com.zipcode.moneyapp.domain.BankAccountTestSamples.*;
import static com.zipcode.moneyapp.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.zipcode.moneyapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class UserProfileTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProfile.class);
        UserProfile userProfile1 = getUserProfileSample1();
        UserProfile userProfile2 = new UserProfile();
        assertThat(userProfile1).isNotEqualTo(userProfile2);

        userProfile2.setId(userProfile1.getId());
        assertThat(userProfile1).isEqualTo(userProfile2);

        userProfile2 = getUserProfileSample2();
        assertThat(userProfile1).isNotEqualTo(userProfile2);
    }

    @Test
    void bankAccountTest() throws Exception {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        BankAccount bankAccountBack = getBankAccountRandomSampleGenerator();

        userProfile.addBankAccount(bankAccountBack);
        assertThat(userProfile.getBankAccounts()).containsOnly(bankAccountBack);
        assertThat(bankAccountBack.getAccountHolder()).isEqualTo(userProfile);

        userProfile.removeBankAccount(bankAccountBack);
        assertThat(userProfile.getBankAccounts()).doesNotContain(bankAccountBack);
        assertThat(bankAccountBack.getAccountHolder()).isNull();

        userProfile.bankAccounts(new HashSet<>(Set.of(bankAccountBack)));
        assertThat(userProfile.getBankAccounts()).containsOnly(bankAccountBack);
        assertThat(bankAccountBack.getAccountHolder()).isEqualTo(userProfile);

        userProfile.setBankAccounts(new HashSet<>());
        assertThat(userProfile.getBankAccounts()).doesNotContain(bankAccountBack);
        assertThat(bankAccountBack.getAccountHolder()).isNull();
    }

    @Test
    void addressTest() throws Exception {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        Address addressBack = getAddressRandomSampleGenerator();

        userProfile.setAddress(addressBack);
        assertThat(userProfile.getAddress()).isEqualTo(addressBack);

        userProfile.address(null);
        assertThat(userProfile.getAddress()).isNull();
    }
}
