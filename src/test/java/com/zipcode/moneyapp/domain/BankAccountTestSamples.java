package com.zipcode.moneyapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class BankAccountTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static BankAccount getBankAccountSample1() {
        return new BankAccount().id(1L).accountNumber(1L).routingNumber(1);
    }

    public static BankAccount getBankAccountSample2() {
        return new BankAccount().id(2L).accountNumber(2L).routingNumber(2);
    }

    public static BankAccount getBankAccountRandomSampleGenerator() {
        return new BankAccount()
            .id(longCount.incrementAndGet())
            .accountNumber(longCount.incrementAndGet())
            .routingNumber(intCount.incrementAndGet());
    }
}
