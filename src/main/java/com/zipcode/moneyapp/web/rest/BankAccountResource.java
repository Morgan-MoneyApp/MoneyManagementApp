package com.zipcode.moneyapp.web.rest;

import com.zipcode.moneyapp.domain.*;
import com.zipcode.moneyapp.repository.BankAccountRepository;
import com.zipcode.moneyapp.repository.TransactionRepository;
import com.zipcode.moneyapp.repository.UserProfileRepository;
import com.zipcode.moneyapp.security.SecurityUtils;
import com.zipcode.moneyapp.service.UserService;
import com.zipcode.moneyapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.zipcode.moneyapp.domain.BankAccount}.
 */
@RestController
@RequestMapping("/api/bank-accounts")
@Transactional
public class BankAccountResource {

    private static final Integer ROUTING_NR = 123456789;
    private final Logger log = LoggerFactory.getLogger(BankAccountResource.class);

    private static final String ENTITY_NAME = "bankAccount";
    private final UserService userService;
    private final UserProfileRepository userProfileRepository;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BankAccountRepository bankAccountRepository;

    private final TransactionRepository transactionRepository;

    public BankAccountResource(
        BankAccountRepository bankAccountRepository,
        TransactionRepository transactionRepository,
        UserService userService,
        UserProfileRepository userProfileRepository
    ) {
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * {@code POST  /bank-accounts} : Create a new bankAccount.
     *
     * @param bankAccount the bankAccount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bankAccount, or with status {@code 400 (Bad Request)} if the bankAccount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BankAccount> createBankAccount(@Valid @RequestBody BankAccount bankAccount) throws URISyntaxException {
        log.debug("REST request to save BankAccount : {}", bankAccount);
        if (bankAccount.getId() != null) {
            throw new BadRequestAlertException("A new bankAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (bankAccount.getRoutingNumber() == null) {
            bankAccount.setRoutingNumber(ROUTING_NR);
        }
        bankAccount = bankAccountRepository.save(bankAccount);
        return ResponseEntity.created(new URI("/api/bank-accounts/" + bankAccount.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, bankAccount.getId().toString()))
            .body(bankAccount);
    }

    /**
     * {@code PUT  /bank-accounts/:id} : Updates an existing bankAccount.
     *
     * @param id          the id of the bankAccount to save.
     * @param bankAccount the bankAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bankAccount,
     * or with status {@code 400 (Bad Request)} if the bankAccount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bankAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BankAccount> updateBankAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody BankAccount bankAccount
    ) throws URISyntaxException {
        log.debug("REST request to update BankAccount : {}, {}", id, bankAccount);
        if (bankAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bankAccount.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bankAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }
        if (bankAccount.getRoutingNumber() == null) {
            bankAccount.setRoutingNumber(ROUTING_NR);
        }

        bankAccount = bankAccountRepository.save(bankAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bankAccount.getId().toString()))
            .body(bankAccount);
    }

    /**
     * {@code PATCH  /bank-accounts/:id} : Partial updates given fields of an existing bankAccount, field will ignore if it is null
     *
     * @param id          the id of the bankAccount to save.
     * @param bankAccount the bankAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bankAccount,
     * or with status {@code 400 (Bad Request)} if the bankAccount is not valid,
     * or with status {@code 404 (Not Found)} if the bankAccount is not found,
     * or with status {@code 500 (Internal Server Error)} if the bankAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BankAccount> partialUpdateBankAccount(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody BankAccount bankAccount
    ) throws URISyntaxException {
        log.debug("REST request to partial update BankAccount partially : {}, {}", id, bankAccount);
        if (bankAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bankAccount.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bankAccountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BankAccount> result = bankAccountRepository
            .findById(bankAccount.getId())
            .map(existingBankAccount -> {
                if (bankAccount.getAccountNumber() != null) {
                    existingBankAccount.setAccountNumber(bankAccount.getAccountNumber());
                }
                if (bankAccount.getRoutingNumber() != null) {
                    existingBankAccount.setRoutingNumber(bankAccount.getRoutingNumber());
                }
                if (bankAccount.getBalance() != null) {
                    existingBankAccount.setBalance(bankAccount.getBalance());
                }
                if (bankAccount.getType() != null) {
                    existingBankAccount.setType(bankAccount.getType());
                }

                return existingBankAccount;
            })
            .map(bankAccountRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bankAccount.getId().toString())
        );
    }

    /**
     * {@code GET  /bank-accounts} : get all the bankAccounts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bankAccounts in body.
     */
    @GetMapping("")
    public ResponseEntity<List<BankAccount>> getAllBankAccounts(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of BankAccounts");
        // Get current user
        User curUser = userService.getUserWithAuthorities().orElse(null);
        // If the user is not logged in
        if (curUser == null) {
            // HTTP 401
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Get the User Profile associated with that user
        UserProfile holder = userProfileRepository.findByUser(curUser);
        // Declare a page of bank accounts. This will be returned
        Page<BankAccount> pg;

        // If the current user is an ADMIN
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            // They can see all accounts
            pg = bankAccountRepository.findAll(pageable);
        } else {
            // Otherwise, they can only see their own
            pg = bankAccountRepository.findAllByAccountHolder(holder, pageable);
        }

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), pg);
        return ResponseEntity.ok().headers(headers).body(pg.getContent());
    }

    /**
     * {@code GET  /bank-accounts/:id} : get the "id" bankAccount.
     *
     * @param id the id of the bankAccount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bankAccount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BankAccount> getBankAccount(@PathVariable("id") Long id) {
        log.debug("REST request to get BankAccount : {}", id);
        // Find a bank account
        Optional<BankAccount> bankAccount = bankAccountRepository.findById(id);

        // If none
        if (bankAccount.isEmpty()) {
            // HTTP 404
            return ResponseEntity.notFound().build();
        } else {
            // Otherwise, get the current user
            User curUser = userService.getUserWithAuthorities().orElse(null);
            // If null
            if (curUser == null) {
                // HTTP 401
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            // Get the user profile
            UserProfile holder = userProfileRepository.findByUser(curUser);
            // If the user profile is not associated with the account, and the user isn't an ADMIN
            if (!bankAccount.orElseThrow().getAccountHolder().equals(holder) && !SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
                // HTTP 401
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }

        // Return the bank account
        return ResponseUtil.wrapOrNotFound(bankAccount);
    }

    /**
     * {@code DELETE  /bank-accounts/:id} : delete the "id" bankAccount.
     *
     * @param id the id of the bankAccount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBankAccount(@PathVariable("id") Long id) {
        log.debug("REST request to delete BankAccount : {}", id);
        bankAccountRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/transaction")
    public ResponseEntity<String> createTransaction(@RequestBody Transaction transaction) {
        //System.out.println("Im a teapot");
        // Attempt to find an account by ID
        //        Optional<BankAccount> ob = bankAccountRepository.findById(id);
        //        Optional<BankAccount> src = bankAccountRepository.findById(transaction.getSource().getId());
        //        Optional<BankAccount> dst = bankAccountRepository.findById(transaction.getDestination().getId());
        Long sID = transaction.getSource().getId();
        Long dID = transaction.getDestination().getId();
        BankAccount source = null, dest = null;

        //            source = bankAccountRepository.findById(sID).orElse(null);
        //            dest = bankAccountRepository.findById(dID).orElse(null);

        if (sID != null) {
            source = bankAccountRepository.findById(sID).orElse(null);
            System.out.println("SRC ID SET");
        }

        if (dID != null) {
            dest = bankAccountRepository.findById(dID).orElse(null);
            System.out.println("DEST ID SET");
        }

        // System.out.println(transaction.getDestination().getId());
        // If there isn't an account, 404
        //        if (ob.isEmpty()) {
        //            return new ResponseEntity<>("Account not found!", HttpStatus.NOT_FOUND);
        //        }

        // If the source and destination accounts are equal:
        if (source != null && source.equals(dest)) {
            // HTTP 409
            return new ResponseEntity<>("Source and destination are the same", HttpStatus.CONFLICT);
        }

        transaction.source(source).destination(dest);

        transaction.transactionDate(new java.sql.Date(Date.from(Instant.now()).getTime()));

        transactionRepository.save(transaction);
        // If the transaction source is the account in the Optional<>
        if (source == null && dest != null) {
            dest.addTransactionsIn(transaction);
            return dest.deposit(transaction.getTransactionValue());
        } else if (source != null && dest == null) {
            source.addTransactionsOut(transaction);
            return source.withdraw(transaction.getTransactionValue());
        } else if (source != null && dest != null) {
            source.addTransactionsOut(transaction);
            dest.addTransactionsIn(transaction);
            return source.transfer(transaction.getTransactionValue(), dest);
        } else if (source == null && dest == null) {
            return new ResponseEntity<>("Source and destination cannot both be empty!", HttpStatus.BAD_REQUEST);
        } else {
            // Else, an unknown error occurred, return a 418 error
            return new ResponseEntity<>("Unknown request error!", HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
