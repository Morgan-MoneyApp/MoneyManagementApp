package com.zipcode.moneyapp.service;

import com.zipcode.moneyapp.domain.Address;
import com.zipcode.moneyapp.repository.AddressRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    // Attempt to find an address in the database
    public Address findOrCreate(Address address) {
        // Get all the addresses
        List<Address> addresses = addressRepository.findAll();

        // Filtering with stream ♥♥♥♥ery
        List<Address> filteredAddresses = addresses
            .stream()
            .filter(
                addr ->
                    (addr.getHouseNumber().equals(address.getHouseNumber()) &&
                        addr.getStreet().equals(address.getStreet()) &&
                        addr.getCity().equals(address.getCity()) &&
                        addr.getState().equals(address.getState()) &&
                        addr.getZip().equals(address.getZip()) &&
                        addr.getApartmentNumber().equals(address.getApartmentNumber()))
            )
            .toList();

        if (!filteredAddresses.isEmpty()) {
            return filteredAddresses.get(0);
        } else {
            addressRepository.save(address);
            List<Address> tmp = addressRepository.findAll();
            return address.id(tmp.get(tmp.size() - 1).getId());
        }
    }
}
