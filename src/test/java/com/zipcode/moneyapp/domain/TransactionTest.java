package com.zipcode.moneyapp.domain;

import static com.zipcode.moneyapp.domain.BankAccountTestSamples.*;
import static com.zipcode.moneyapp.domain.TransactionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.zipcode.moneyapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TransactionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transaction.class);
        Transaction transaction1 = getTransactionSample1();
        Transaction transaction2 = new Transaction();
        assertThat(transaction1).isNotEqualTo(transaction2);

        transaction2.setId(transaction1.getId());
        assertThat(transaction1).isEqualTo(transaction2);

        transaction2 = getTransactionSample2();
        assertThat(transaction1).isNotEqualTo(transaction2);
    }

    @Test
    void sourceTest() throws Exception {
        Transaction transaction = getTransactionRandomSampleGenerator();
        BankAccount bankAccountBack = getBankAccountRandomSampleGenerator();

        transaction.setSource(bankAccountBack);
        assertThat(transaction.getSource()).isEqualTo(bankAccountBack);

        transaction.source(null);
        assertThat(transaction.getSource()).isNull();
    }

    @Test
    void destinationTest() throws Exception {
        Transaction transaction = getTransactionRandomSampleGenerator();
        BankAccount bankAccountBack = getBankAccountRandomSampleGenerator();

        transaction.setDestination(bankAccountBack);
        assertThat(transaction.getDestination()).isEqualTo(bankAccountBack);

        transaction.destination(null);
        assertThat(transaction.getDestination()).isNull();
    }
}
