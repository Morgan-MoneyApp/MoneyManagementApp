package com.zipcode.moneyapp.web.rest;

import com.zipcode.moneyapp.domain.Transaction;
import com.zipcode.moneyapp.repository.TransactionRepository;
import com.zipcode.moneyapp.web.rest.errors.BadRequestAlertException;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.zipcode.moneyapp.domain.Transaction}.
 */
@RestController
@RequestMapping("/api/transactions")
@Transactional
public class TransactionResource {

    private final Logger log = LoggerFactory.getLogger(TransactionResource.class);

    private static final String ENTITY_NAME = "transaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransactionRepository transactionRepository;

    public TransactionResource(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    /**
     * {@code POST  /transactions} : Create a new transaction.
     *
     * @param transaction the transaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transaction, or with status {@code 400 (Bad Request)} if the transaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) throws URISyntaxException {
        log.debug("REST request to save Transaction : {}", transaction);
        if (transaction.getId() != null) {
            throw new BadRequestAlertException("A new transaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        transaction.transactionDate(new java.sql.Date(Date.from(Instant.now()).getTime())).generateDescription();
        transaction = transactionRepository.save(transaction);
        return ResponseEntity.created(new URI("/api/transactions/" + transaction.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, transaction.getId().toString()))
            .body(transaction);
    }

    /**
     * {@code PUT  /transactions/:id} : Updates an existing transaction.
     *
     * @param id the id of the transaction to save.
     * @param transaction the transaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transaction,
     * or with status {@code 400 (Bad Request)} if the transaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Transaction transaction
    ) throws URISyntaxException {
        log.debug("REST request to update Transaction : {}, {}", id, transaction);
        //        log.debug(transaction.getTransactionDate().toString());
        transaction.transactionDate(Date.valueOf("" + transaction.getTransactionDate())).generateDescription();
        //        log.debug(transaction.getTransactionDate().toString());
        if (transaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, transaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!transactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        transaction = transactionRepository.save(transaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, transaction.getId().toString()))
            .body(transaction);
    }

    /**
     * {@code PATCH  /transactions/:id} : Partial updates given fields of an existing transaction, field will ignore if it is null
     *
     * @param id the id of the transaction to save.
     * @param transaction the transaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transaction,
     * or with status {@code 400 (Bad Request)} if the transaction is not valid,
     * or with status {@code 404 (Not Found)} if the transaction is not found,
     * or with status {@code 500 (Internal Server Error)} if the transaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Transaction> partialUpdateTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Transaction transaction
    ) throws URISyntaxException {
        log.debug("REST request to partial update Transaction partially : {}, {}", id, transaction);
        if (transaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, transaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!transactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Transaction> result = transactionRepository
            .findById(transaction.getId())
            .map(existingTransaction -> {
                if (transaction.getTransactionValue() != null) {
                    existingTransaction.setTransactionValue(transaction.getTransactionValue());
                }

                if (transaction.getTransactionDate() != null) {
                    existingTransaction.setTransactionDate(Date.valueOf("" + transaction.getTransactionDate()));
                }

                return existingTransaction;
            })
            .map(transactionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, transaction.getId().toString())
        );
    }

    /**
     * {@code GET  /transactions} : get all the transactions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transactions in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Transaction>> getAllTransactions(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Transactions");
        Page<Transaction> page = transactionRepository.findAll(pageable);
        // Debug purposes
        //        for (Transaction t : page.getContent()) {
        //            if (t.getTransactionDate() != null) {
        //                log.info(t.getTransactionDate().toString());
        //            } else {
        //                log.info("Transaction with id {} has no date", t.getId());
        //            }
        //        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /transactions/:id} : get the "id" transaction.
     *
     * @param id the id of the transaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable("id") Long id) {
        log.debug("REST request to get Transaction : {}", id);
        Optional<Transaction> transaction = transactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transaction);
    }

    /**
     * {@code DELETE  /transactions/:id} : delete the "id" transaction.
     *
     * @param id the id of the transaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable("id") Long id) {
        log.debug("REST request to delete Transaction : {}", id);
        transactionRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
