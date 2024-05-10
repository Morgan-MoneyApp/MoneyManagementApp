package com.zipcode.moneyapp;

import com.zipcode.moneyapp.domain.BankAccount;
import com.zipcode.moneyapp.repository.BankAccountRepository;
import java.util.Optional;

public class BinarySearch {

    private static BankAccountRepository bankAccountRepository;

    public BinarySearch(BankAccountRepository bankAccountRepository) {
        BinarySearch.bankAccountRepository = bankAccountRepository;
    }

    public static Long binarySearch(Long current, Long max, Long min) {
        Optional<BankAccount> ob = bankAccountRepository.findByAccountNumber(current);
        if (ob.isPresent()) {
            if (bankAccountRepository.findByAccountNumber(current + 1).isEmpty()) {
                return current;
            } else {
                return binarySearch((current + max) / 2, max, current);
            }
        } else {
            if (bankAccountRepository.findByAccountNumber(current - 1).isPresent()) {
                return current - 1;
            } else {
                return binarySearch((current + min) / 2, current, min);
            }
        }
    }
}
