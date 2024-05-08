package com.zipcode.moneyapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zipcode.moneyapp.domain.enumeration.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * BankAccount entity
 */
@Schema(description = "BankAccount entity")
@Entity
@Table(name = "bank_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BankAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(value = 0L)
    @Max(value = 999999999L)
    @Column(name = "account_number", unique = true)
    private Long accountNumber;

    @Min(value = 123456789)
    @Max(value = 123456789)
    @Column(name = "routing_number")
    private Integer routingNumber;

    @Column(name = "balance")
    private Double balance;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "bankAccounts", "address" }, allowSetters = true)
    private UserProfile accountHolder;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "source")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "source", "destination" }, allowSetters = true)
    private Set<Transaction> transactionsOuts = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "destination")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "source", "destination" }, allowSetters = true)
    private Set<Transaction> transactionsIns = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BankAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAccountNumber() {
        return this.accountNumber;
    }

    public BankAccount accountNumber(Long accountNumber) {
        this.setAccountNumber(accountNumber);
        return this;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Integer getRoutingNumber() {
        return this.routingNumber;
    }

    public BankAccount routingNumber(Integer routingNumber) {
        this.setRoutingNumber(routingNumber);
        return this;
    }

    public void setRoutingNumber(Integer routingNumber) {
        this.routingNumber = routingNumber;
    }

    public Double getBalance() {
        return this.balance;
    }

    public BankAccount balance(Double balance) {
        this.setBalance(balance);
        return this;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Type getType() {
        return this.type;
    }

    public BankAccount type(Type type) {
        this.setType(type);
        return this;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public UserProfile getAccountHolder() {
        return this.accountHolder;
    }

    public void setAccountHolder(UserProfile userProfile) {
        this.accountHolder = userProfile;
    }

    public BankAccount accountHolder(UserProfile userProfile) {
        this.setAccountHolder(userProfile);
        return this;
    }

    public Set<Transaction> getTransactionsOuts() {
        return this.transactionsOuts;
    }

    public void setTransactionsOuts(Set<Transaction> transactions) {
        if (this.transactionsOuts != null) {
            this.transactionsOuts.forEach(i -> i.setSource(null));
        }
        if (transactions != null) {
            transactions.forEach(i -> i.setSource(this));
        }
        this.transactionsOuts = transactions;
    }

    public BankAccount transactionsOuts(Set<Transaction> transactions) {
        this.setTransactionsOuts(transactions);
        return this;
    }

    public BankAccount addTransactionsOut(Transaction transaction) {
        this.transactionsOuts.add(transaction);
        transaction.setSource(this);
        return this;
    }

    public BankAccount removeTransactionsOut(Transaction transaction) {
        this.transactionsOuts.remove(transaction);
        transaction.setSource(null);
        return this;
    }

    public Set<Transaction> getTransactionsIns() {
        return this.transactionsIns;
    }

    public void setTransactionsIns(Set<Transaction> transactions) {
        if (this.transactionsIns != null) {
            this.transactionsIns.forEach(i -> i.setDestination(null));
        }
        if (transactions != null) {
            transactions.forEach(i -> i.setDestination(this));
        }
        this.transactionsIns = transactions;
    }

    public BankAccount transactionsIns(Set<Transaction> transactions) {
        this.setTransactionsIns(transactions);
        return this;
    }

    public BankAccount addTransactionsIn(Transaction transaction) {
        this.transactionsIns.add(transaction);
        transaction.setDestination(this);
        return this;
    }

    public BankAccount removeTransactionsIn(Transaction transaction) {
        this.transactionsIns.remove(transaction);
        transaction.setDestination(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BankAccount)) {
            return false;
        }
        return getId() != null && getId().equals(((BankAccount) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BankAccount{" +
            "id=" + getId() +
            ", accountNumber=" + getAccountNumber() +
            ", routingNumber=" + getRoutingNumber() +
            ", balance=" + getBalance() +
            ", type='" + getType() + "'" +
            "}";
    }

    private void addBalance(Double amount) {
        this.balance += amount;
    }

    public ResponseEntity<String> withdraw(Double amount) {
        if (amount == null) {
            return new ResponseEntity<>("418", HttpStatus.I_AM_A_TEAPOT);
        }
        if (amount > this.balance) {
            return new ResponseEntity<>("Insufficient funds", HttpStatus.BAD_REQUEST);
        } else if (amount <= 0 || amount.isInfinite() || amount.isNaN()) {
            return new ResponseEntity<>("Invalid amount to withdraw", HttpStatus.BAD_REQUEST);
        } else {
            this.balance -= amount;
            return new ResponseEntity<>("Withdraw successful", HttpStatus.OK);
        }
    }

    public ResponseEntity<String> deposit(Double amount) {
        if (amount == null) {
            return new ResponseEntity<>("418", HttpStatus.I_AM_A_TEAPOT);
        }
        if (amount <= 0 || amount.isInfinite() || amount.isNaN()) {
            return new ResponseEntity<>("Invalid amount to deposit", HttpStatus.BAD_REQUEST);
        } else {
            this.balance += amount;
            return new ResponseEntity<>("Deposit successful", HttpStatus.OK);
        }
    }

    public ResponseEntity<String> transfer(Double amount, BankAccount destinationAccount) {
        if (amount == null) {
            return new ResponseEntity<>("418", HttpStatus.I_AM_A_TEAPOT);
        }
        if (amount > this.balance) {
            return new ResponseEntity<>("Insufficient funds", HttpStatus.BAD_REQUEST);
        } else if (amount <= 0 || amount.isInfinite() || amount.isNaN()) {
            return new ResponseEntity<>("Invalid amount to transfer", HttpStatus.BAD_REQUEST);
        } else {
            this.balance -= amount;
            destinationAccount.addBalance(amount);
            return new ResponseEntity<>("Transfer successful", HttpStatus.OK);
        }
    }
}
