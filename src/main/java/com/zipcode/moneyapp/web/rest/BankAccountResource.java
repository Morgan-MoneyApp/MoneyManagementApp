package com.zipcode.moneyapp.web.rest;

import com.zipcode.moneyapp.domain.BankAccount;
import com.zipcode.moneyapp.domain.Transaction;
import com.zipcode.moneyapp.repository.BankAccountRepository;
import com.zipcode.moneyapp.repository.TransactionRepository;
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

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BankAccountRepository bankAccountRepository;

    private final TransactionRepository transactionRepository;

    public BankAccountResource(BankAccountRepository bankAccountRepository, TransactionRepository transactionRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
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
     * @param id the id of the bankAccount to save.
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
     * @param id the id of the bankAccount to save.
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
        Page<BankAccount> page = bankAccountRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
        Optional<BankAccount> bankAccount = bankAccountRepository.findById(id);
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

    @PostMapping("/{id}/transaction")
    public ResponseEntity<String> createTransaction(@PathVariable("id") Long id, @RequestBody Transaction transaction) {
        // Attempt to find an account by ID
        Optional<BankAccount> ob = bankAccountRepository.findById(id);
        Optional<BankAccount> src = bankAccountRepository.findById(transaction.getSource().getId());
        Optional<BankAccount> dst = bankAccountRepository.findById(transaction.getDestination().getId());

        //        System.out.println(transaction.getDestination().getId());
        // If there isn't an account, 404
        if (ob.isEmpty()) {
            return new ResponseEntity<>("Account not found!", HttpStatus.NOT_FOUND);
        }

        // If the source and destination accounts are equal:
        if (src.isPresent() && dst.isPresent()) {
            if (src.get().equals(dst.get())) {
                // HTTP 409
                return new ResponseEntity<>("Source and destination are the same", HttpStatus.CONFLICT);
            }
        }
        // Otherwise,

        // Get the account from the Optional<>
        BankAccount bankAccount = ob.get();
        transaction.source(bankAccountRepository.findById(transaction.getSource().getId()).get());
        transaction.destination(bankAccountRepository.findById(transaction.getDestination().getId()).get());
        transaction.transactionDate(new java.sql.Date(Date.from(Instant.now()).getTime())).generateDescription();

        transactionRepository.save(transaction);
        // If the transaction source is the account in the Optional<>
        if (src.isPresent() && src.get().getId().equals(bankAccount.getId())) {
            // Add the transaction to the account's list of outgoing transactions
            bankAccount.addTransactionsOut(transaction);

            // BANK TELLER DIFFERENTIATING TRANSFER OR WITHDRAWAL
            // If the transaction destination is null or nonexistent, it's a withdrawal
            if (dst.isEmpty()) {
                // therefore withdraw
                return bankAccount.withdraw(transaction.getTransactionValue());
            } else /* otherwise, it's a transfer: */{
                // Add the transaction to the *other account's* list of incoming transactions
                dst.get().addTransactionsIn(transaction);
                // and transfer funds
                return bankAccount.transfer(transaction.getTransactionValue(), dst.get());
            }
        } /* Else if the transaction destination
        is the account in the Optional<> */else if (dst.isPresent() && dst.get().getId().equals(bankAccount.getId())) {
            // Add the transaction to the account's list of incoming transactions
            bankAccount.addTransactionsIn(transaction);

            // BANK TELLER DIFFERENTIATING TRANSFER OR DEPOSIT
            // If the transaction source is null, it's a deposit
            if (src.isEmpty()) {
                // therefore deposit
                return bankAccount.deposit(transaction.getTransactionValue());
            } else /* otherwise, it's a transfer: */{
                // Add the transaction to the *other account's* list of outgoing transactions
                src.get().addTransactionsOut(transaction);
                // and transfer funds
                return src.get().transfer(transaction.getTransactionValue(), bankAccount);
            }
        } else if (src.isEmpty() && dst.isEmpty()) {
            return new ResponseEntity<>("Source and destination cannot both be empty!", HttpStatus.BAD_REQUEST);
        } else {
            // Else, an unknown error occurred, return a 418 error
            return new ResponseEntity<>("Unknown request error!", HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
