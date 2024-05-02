package com.zipcode.moneyapp.domain;

import static com.zipcode.moneyapp.domain.AddressTestSamples.*;
import static com.zipcode.moneyapp.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.zipcode.moneyapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AddressTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Address.class);
        Address address1 = getAddressSample1();
        Address address2 = new Address();
        assertThat(address1).isNotEqualTo(address2);

        address2.setId(address1.getId());
        assertThat(address1).isEqualTo(address2);

        address2 = getAddressSample2();
        assertThat(address1).isNotEqualTo(address2);
    }

    @Test
    void userProfileTest() throws Exception {
        Address address = getAddressRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        address.addUserProfile(userProfileBack);
        assertThat(address.getUserProfiles()).containsOnly(userProfileBack);
        assertThat(userProfileBack.getAddress()).isEqualTo(address);

        address.removeUserProfile(userProfileBack);
        assertThat(address.getUserProfiles()).doesNotContain(userProfileBack);
        assertThat(userProfileBack.getAddress()).isNull();

        address.userProfiles(new HashSet<>(Set.of(userProfileBack)));
        assertThat(address.getUserProfiles()).containsOnly(userProfileBack);
        assertThat(userProfileBack.getAddress()).isEqualTo(address);

        address.setUserProfiles(new HashSet<>());
        assertThat(address.getUserProfiles()).doesNotContain(userProfileBack);
        assertThat(userProfileBack.getAddress()).isNull();
    }
}
