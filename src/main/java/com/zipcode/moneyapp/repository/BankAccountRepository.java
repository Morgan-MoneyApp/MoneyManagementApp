package com.zipcode.moneyapp.repository;

import com.zipcode.moneyapp.domain.BankAccount;
import com.zipcode.moneyapp.domain.UserProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BankAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    Page<BankAccount> findAllByAccountHolder(UserProfile holder, Pageable pageable);
}
