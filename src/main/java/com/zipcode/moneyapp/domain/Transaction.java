package com.zipcode.moneyapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Transaction entity
 */
@Schema(description = "Transaction entity")
@Entity
@Table(name = "transaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "transaction_value")
    private Double transactionValue;

    @Column(name = "transaction_date")
    private Date transactionDate;

    /**
     * Associate each Transaction with a source BankAccount
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "accountHolder", "transactionsOuts", "transactionsIns" }, allowSetters = true)
    private BankAccount source;

    /**
     * Associate each Transaction with a destination BankAccount
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "accountHolder", "transactionsOuts", "transactionsIns" }, allowSetters = true)
    private BankAccount destination;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Transaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTransactionValue() {
        return this.transactionValue;
    }

    public Transaction transactionValue(Double transactionValue) {
        this.setTransactionValue(transactionValue);
        return this;
    }

    public void setTransactionValue(Double transactionValue) {
        this.transactionValue = transactionValue;
    }

    public BankAccount getSource() {
        return this.source;
    }

    public void setSource(BankAccount bankAccount) {
        this.source = bankAccount;
    }

    public Transaction source(BankAccount bankAccount) {
        this.setSource(bankAccount);
        return this;
    }

    public BankAccount getDestination() {
        return this.destination;
    }

    public void setDestination(BankAccount bankAccount) {
        this.destination = bankAccount;
    }

    public Transaction destination(BankAccount bankAccount) {
        this.setDestination(bankAccount);
        return this;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public Transaction transactionDate(Date transactionDate) {
        this.setTransactionDate(Date.valueOf(transactionDate.toString()));
        return this;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = Date.valueOf(transactionDate.toString());
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return getId() != null && getId().equals(((Transaction) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", transactionValue=" + getTransactionValue() +
            "}";
    }
}
