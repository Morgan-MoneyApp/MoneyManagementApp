package com.zipcode.moneyapp.domain;

import static com.zipcode.moneyapp.domain.BankAccountTestSamples.*;
import static com.zipcode.moneyapp.domain.TransactionTestSamples.*;
import static com.zipcode.moneyapp.domain.UserProfileTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.zipcode.moneyapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BankAccountTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankAccount.class);
        BankAccount bankAccount1 = getBankAccountSample1();
        BankAccount bankAccount2 = new BankAccount();
        assertThat(bankAccount1).isNotEqualTo(bankAccount2);

        bankAccount2.setId(bankAccount1.getId());
        assertThat(bankAccount1).isEqualTo(bankAccount2);

        bankAccount2 = getBankAccountSample2();
        assertThat(bankAccount1).isNotEqualTo(bankAccount2);
    }

    @Test
    void accountHolderTest() throws Exception {
        BankAccount bankAccount = getBankAccountRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        bankAccount.setAccountHolder(userProfileBack);
        assertThat(bankAccount.getAccountHolder()).isEqualTo(userProfileBack);

        bankAccount.accountHolder(null);
        assertThat(bankAccount.getAccountHolder()).isNull();
    }

    @Test
    void transactionsOutTest() throws Exception {
        BankAccount bankAccount = getBankAccountRandomSampleGenerator();
        Transaction transactionBack = getTransactionRandomSampleGenerator();

        bankAccount.addTransactionsOut(transactionBack);
        assertThat(bankAccount.getTransactionsOuts()).containsOnly(transactionBack);
        assertThat(transactionBack.getSource()).isEqualTo(bankAccount);

        bankAccount.removeTransactionsOut(transactionBack);
        assertThat(bankAccount.getTransactionsOuts()).doesNotContain(transactionBack);
        assertThat(transactionBack.getSource()).isNull();

        bankAccount.transactionsOuts(new HashSet<>(Set.of(transactionBack)));
        assertThat(bankAccount.getTransactionsOuts()).containsOnly(transactionBack);
        assertThat(transactionBack.getSource()).isEqualTo(bankAccount);

        bankAccount.setTransactionsOuts(new HashSet<>());
        assertThat(bankAccount.getTransactionsOuts()).doesNotContain(transactionBack);
        assertThat(transactionBack.getSource()).isNull();
    }

    @Test
    void transactionsInTest() throws Exception {
        BankAccount bankAccount = getBankAccountRandomSampleGenerator();
        Transaction transactionBack = getTransactionRandomSampleGenerator();

        bankAccount.addTransactionsIn(transactionBack);
        assertThat(bankAccount.getTransactionsIns()).containsOnly(transactionBack);
        assertThat(transactionBack.getDestination()).isEqualTo(bankAccount);

        bankAccount.removeTransactionsIn(transactionBack);
        assertThat(bankAccount.getTransactionsIns()).doesNotContain(transactionBack);
        assertThat(transactionBack.getDestination()).isNull();

        bankAccount.transactionsIns(new HashSet<>(Set.of(transactionBack)));
        assertThat(bankAccount.getTransactionsIns()).containsOnly(transactionBack);
        assertThat(transactionBack.getDestination()).isEqualTo(bankAccount);

        bankAccount.setTransactionsIns(new HashSet<>());
        assertThat(bankAccount.getTransactionsIns()).doesNotContain(transactionBack);
        assertThat(transactionBack.getDestination()).isNull();
    }
}
