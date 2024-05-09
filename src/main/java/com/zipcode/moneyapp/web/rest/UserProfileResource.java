package com.zipcode.moneyapp.web.rest;

import com.zipcode.moneyapp.domain.BankAccount;
import com.zipcode.moneyapp.domain.UserProfile;
import com.zipcode.moneyapp.domain.enumeration.Type;
import com.zipcode.moneyapp.repository.BankAccountRepository;
import com.zipcode.moneyapp.repository.UserProfileRepository;
import com.zipcode.moneyapp.repository.UserRepository;
import com.zipcode.moneyapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.zipcode.moneyapp.domain.UserProfile}.
 */
@RestController
@RequestMapping("/api/user-profiles")
@Transactional
public class UserProfileResource {

    private final Logger log = LoggerFactory.getLogger(UserProfileResource.class);

    private static final String ENTITY_NAME = "userProfile";
    private final BankAccountRepository bankAccountRepository;

    private static Long highestAccountNumber;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserProfileRepository userProfileRepository;

    private final UserRepository userRepository;

    public UserProfileResource(
        UserProfileRepository userProfileRepository,
        UserRepository userRepository,
        BankAccountRepository bankAccountRepository
    ) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
    }

    public static Long getHighestAccountNumber() {
        return highestAccountNumber;
    }

    public static void setHighestAccountNumber(Long highestAccountNumber) {
        UserProfileResource.highestAccountNumber = highestAccountNumber;
    }

    /**
     * {@code POST  /user-profiles} : Create a new userProfile.
     *
     * @param userProfile the userProfile to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userProfile, or with status {@code 400 (Bad Request)} if the userProfile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<UserProfile> createUserProfile(@Valid @RequestBody UserProfile userProfile) throws URISyntaxException {
        log.debug("REST request to save UserProfile : {}", userProfile);
        if (userProfile.getId() != null) {
            throw new BadRequestAlertException("A new userProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(userProfile.getUser())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        Long userId = userProfile.getUser().getId();
        userRepository.findById(userId).ifPresent(userProfile::user);
        BankAccount newMMC = new BankAccount()
            .accountNumber(highestAccountNumber++)
            .type(Type.MONEY_MARKET_CHECKING)
            .balance(000000000000.0)
            .accountHolder(userProfile);
        BankAccount newChk = new BankAccount()
            .accountNumber(highestAccountNumber++)
            .type(Type.CHECKING)
            .balance(000000000000.0)
            .accountHolder(userProfile);
        BankAccount newSvs = new BankAccount()
            .accountNumber(highestAccountNumber++)
            .type(Type.SAVINGS)
            .balance(000000000000.0)
            .accountHolder(userProfile);
        System.out.println(newMMC);
        System.out.println(newChk);
        System.out.println(newSvs);
        bankAccountRepository.save(newMMC);
        bankAccountRepository.save(newChk);
        bankAccountRepository.save(newSvs);
        userProfile = userProfileRepository.save(userProfile);
        return ResponseEntity.created(new URI("/api/user-profiles/" + userProfile.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, userProfile.getId().toString()))
            .body(userProfile);
    }

    /**
     * {@code PUT  /user-profiles/:id} : Updates an existing userProfile.
     *
     * @param id the id of the userProfile to save.
     * @param userProfile the userProfile to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProfile,
     * or with status {@code 400 (Bad Request)} if the userProfile is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userProfile couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateUserProfile(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UserProfile userProfile
    ) throws URISyntaxException {
        log.debug("REST request to update UserProfile : {}, {}", id, userProfile);
        if (userProfile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userProfile.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userProfileRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        userProfile = userProfileRepository.save(userProfile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userProfile.getId().toString()))
            .body(userProfile);
    }

    /**
     * {@code PATCH  /user-profiles/:id} : Partial updates given fields of an existing userProfile, field will ignore if it is null
     *
     * @param id the id of the userProfile to save.
     * @param userProfile the userProfile to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProfile,
     * or with status {@code 400 (Bad Request)} if the userProfile is not valid,
     * or with status {@code 404 (Not Found)} if the userProfile is not found,
     * or with status {@code 500 (Internal Server Error)} if the userProfile couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserProfile> partialUpdateUserProfile(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UserProfile userProfile
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserProfile partially : {}, {}", id, userProfile);
        if (userProfile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userProfile.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userProfileRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserProfile> result = userProfileRepository
            .findById(userProfile.getId())
            .map(existingUserProfile -> {
                if (userProfile.getFirstName() != null) {
                    existingUserProfile.setFirstName(userProfile.getFirstName());
                }
                if (userProfile.getLastName() != null) {
                    existingUserProfile.setLastName(userProfile.getLastName());
                }
                if (userProfile.getDateOfBirth() != null) {
                    existingUserProfile.setDateOfBirth(userProfile.getDateOfBirth());
                }

                return existingUserProfile;
            })
            .map(userProfileRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userProfile.getId().toString())
        );
    }

    /**
     * {@code GET  /user-profiles} : get all the userProfiles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userProfiles in body.
     */
    @GetMapping("")
    @Transactional(readOnly = true)
    public List<UserProfile> getAllUserProfiles() {
        log.debug("REST request to get all UserProfiles");
        return userProfileRepository.findAll();
    }

    /**
     * {@code GET  /user-profiles/:id} : get the "id" userProfile.
     *
     * @param id the id of the userProfile to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProfile, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable("id") Long id) {
        log.debug("REST request to get UserProfile : {}", id);
        Optional<UserProfile> userProfile = userProfileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userProfile);
    }

    /**
     * {@code DELETE  /user-profiles/:id} : delete the "id" userProfile.
     *
     * @param id the id of the userProfile to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable("id") Long id) {
        log.debug("REST request to delete UserProfile : {}", id);
        userProfileRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
