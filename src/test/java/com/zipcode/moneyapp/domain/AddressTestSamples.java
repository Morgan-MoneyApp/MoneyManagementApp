package com.zipcode.moneyapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class AddressTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Address getAddressSample1() {
        return new Address().id(1L).houseNumber(1).street("street1").apartmentNumber(1).city("city1").state("state1").zip("zip1");
    }

    public static Address getAddressSample2() {
        return new Address().id(2L).houseNumber(2).street("street2").apartmentNumber(2).city("city2").state("state2").zip("zip2");
    }

    public static Address getAddressRandomSampleGenerator() {
        return new Address()
            .id(longCount.incrementAndGet())
            .houseNumber(intCount.incrementAndGet())
            .street(UUID.randomUUID().toString())
            .apartmentNumber(intCount.incrementAndGet())
            .city(UUID.randomUUID().toString())
            .state(UUID.randomUUID().toString())
            .zip(UUID.randomUUID().toString());
    }
}
