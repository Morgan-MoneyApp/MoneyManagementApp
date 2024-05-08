package com.zipcode.moneyapp.web.rest;

import static com.zipcode.moneyapp.domain.UserProfileAsserts.*;
import static com.zipcode.moneyapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zipcode.moneyapp.IntegrationTest;
import com.zipcode.moneyapp.domain.User;
import com.zipcode.moneyapp.domain.UserProfile;
import com.zipcode.moneyapp.repository.UserProfileRepository;
import com.zipcode.moneyapp.repository.UserRepository;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UserProfileResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserProfileResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/user-profiles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserProfileMockMvc;

    private UserProfile userProfile;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProfile createEntity(EntityManager em) {
        UserProfile userProfile = new UserProfile()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        userProfile.setUser(user);
        return userProfile;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProfile createUpdatedEntity(EntityManager em) {
        UserProfile userProfile = new UserProfile()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        userProfile.setUser(user);
        return userProfile;
    }

    @BeforeEach
    public void initTest() {
        userProfile = createEntity(em);
    }

    @Test
    @Transactional
    void createUserProfile() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the UserProfile
        var returnedUserProfile = om.readValue(
            restUserProfileMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            UserProfile.class
        );

        // Validate the UserProfile in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertUserProfileUpdatableFieldsEquals(returnedUserProfile, getPersistedUserProfile(returnedUserProfile));

        assertUserProfileMapsIdRelationshipPersistedValue(userProfile, returnedUserProfile);
    }

    @Test
    @Transactional
    void createUserProfileWithExistingId() throws Exception {
        // Create the UserProfile with an existing ID
        userProfile.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void updateUserProfileMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Add a new parent entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();

        // Load the userProfile
        UserProfile updatedUserProfile = userProfileRepository.findById(userProfile.getId()).orElseThrow();
        assertThat(updatedUserProfile).isNotNull();
        // Disconnect from session so that the updates on updatedUserProfile are not directly saved in db
        em.detach(updatedUserProfile);

        // Update the User with new association value
        updatedUserProfile.setUser(user);

        // Update the entity
        restUserProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserProfile.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedUserProfile))
            )
            .andExpect(status().isOk());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertSameRepositoryCount(databaseSizeBeforeCreate);
        UserProfile testUserProfile = userProfileList.get(userProfileList.size() - 1);
        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testUserProfile.getId()).isEqualTo(testUserProfile.getUser().getId());
    }

    @Test
    @Transactional
    void checkFirstNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProfile.setFirstName(null);

        // Create the UserProfile, which fails.

        restUserProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLastNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProfile.setLastName(null);

        // Create the UserProfile, which fails.

        restUserProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateOfBirthIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProfile.setDateOfBirth(null);

        // Create the UserProfile, which fails.

        restUserProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUserProfiles() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        // Get all the userProfileList
        restUserProfileMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userProfile.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())));
    }

    @Test
    @Transactional
    void getUserProfile() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        // Get the userProfile
        restUserProfileMockMvc
            .perform(get(ENTITY_API_URL_ID, userProfile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userProfile.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()));
    }

    @Test
    @Transactional
    void getNonExistingUserProfile() throws Exception {
        // Get the userProfile
        restUserProfileMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUserProfile() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the userProfile
        UserProfile updatedUserProfile = userProfileRepository.findById(userProfile.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedUserProfile are not directly saved in db
        em.detach(updatedUserProfile);
        updatedUserProfile.firstName(UPDATED_FIRST_NAME).lastName(UPDATED_LAST_NAME).dateOfBirth(UPDATED_DATE_OF_BIRTH);

        restUserProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserProfile.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedUserProfile))
            )
            .andExpect(status().isOk());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedUserProfileToMatchAllProperties(updatedUserProfile);
    }

    @Test
    @Transactional
    void putNonExistingUserProfile() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProfile.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userProfile.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserProfile() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProfile.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserProfile() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProfile.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProfile)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserProfileWithPatch() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the userProfile using partial update
        UserProfile partialUpdatedUserProfile = new UserProfile();
        partialUpdatedUserProfile.setId(userProfile.getId());

        partialUpdatedUserProfile.dateOfBirth(UPDATED_DATE_OF_BIRTH);

        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedUserProfile))
            )
            .andExpect(status().isOk());

        // Validate the UserProfile in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertUserProfileUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedUserProfile, userProfile),
            getPersistedUserProfile(userProfile)
        );
    }

    @Test
    @Transactional
    void fullUpdateUserProfileWithPatch() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the userProfile using partial update
        UserProfile partialUpdatedUserProfile = new UserProfile();
        partialUpdatedUserProfile.setId(userProfile.getId());

        partialUpdatedUserProfile.firstName(UPDATED_FIRST_NAME).lastName(UPDATED_LAST_NAME).dateOfBirth(UPDATED_DATE_OF_BIRTH);

        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedUserProfile))
            )
            .andExpect(status().isOk());

        // Validate the UserProfile in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertUserProfileUpdatableFieldsEquals(partialUpdatedUserProfile, getPersistedUserProfile(partialUpdatedUserProfile));
    }

    @Test
    @Transactional
    void patchNonExistingUserProfile() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProfile.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserProfile() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProfile.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserProfile() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProfile.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(userProfile)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserProfile in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserProfile() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the userProfile
        restUserProfileMockMvc
            .perform(delete(ENTITY_API_URL_ID, userProfile.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return userProfileRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected UserProfile getPersistedUserProfile(UserProfile userProfile) {
        return userProfileRepository.findById(userProfile.getId()).orElseThrow();
    }

    protected void assertPersistedUserProfileToMatchAllProperties(UserProfile expectedUserProfile) {
        assertUserProfileAllPropertiesEquals(expectedUserProfile, getPersistedUserProfile(expectedUserProfile));
    }

    protected void assertPersistedUserProfileToMatchUpdatableProperties(UserProfile expectedUserProfile) {
        assertUserProfileAllUpdatablePropertiesEquals(expectedUserProfile, getPersistedUserProfile(expectedUserProfile));
    }
}
