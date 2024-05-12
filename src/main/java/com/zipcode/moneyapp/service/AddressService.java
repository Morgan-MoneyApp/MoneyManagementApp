package com.zipcode.moneyapp.service;

import com.zipcode.moneyapp.domain.Address;
import com.zipcode.moneyapp.repository.AddressRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
        List<Address> filteredAddresses = findAddressesByNoId(address);

        // If there IS an address in that filtered list,
        if (!filteredAddresses.isEmpty()) {
            // return it.
            return filteredAddresses.get(0);
        } /* Else, */else {
            // save the address info to the repository,
            addressRepository.save(address);
            // then return the address with an ID by
            // doing the same thing again...
            List<Address> filtereds = findAddressesByNoId(address);

            return filtereds.get(0);
        }
    }

    private List<Address> findAddressesByNoId(Address address) {
        // Get all the addresses, then
        List<Address> tmp = addressRepository.findAll();

        // Filter them out by checking each field on the current
        // address and the one provided for a match.
        // Only if all fields match, does an address get returned.
        return tmp
            .stream()
            .filter(
                addr ->
                    (addr.getHouseNumber().equals(address.getHouseNumber()) &&
                        addr.getStreet().equals(address.getStreet()) &&
                        addr.getCity().equals(address.getCity()) &&
                        addr.getState().equals(address.getState()) &&
                        addr.getZip().equals(address.getZip()) &&
                        (addr.getApartmentNumber() == null || addr.getApartmentNumber().equals(address.getApartmentNumber())))
            )
            .toList();
    }

    public Address findOrCreate(String addressString) {
        Pattern hnPattern = Pattern.compile("(?<Home>^[0-9]+?(?=\\b))");
        Pattern srPattern = Pattern.compile("(?<=^[0-9]\\b)(?<Street>[a-zA-Z0-9\\s]+?(St|Rd|Ave|Blvd|Cir|Dr|Pl|Sq)\\.)\\b");
        Pattern apPattern = Pattern.compile("(?<=(Apt\\.|Apartment)\\b)(?<Apt>[0-9]+)");
        Pattern ctPattern = Pattern.compile("(?<=[a-zA-Z0-9\\s]{1,255})(?<City>[a-zA-Z]+?(?=,))");
        Pattern stPattern = Pattern.compile("(?<=,\\b)(?<State>[a-zA-Z]{2})(?=\\b)");
        Pattern zpPattern = Pattern.compile("(?<Zip>[0-9]{5}(\\$|(?<=(Apt\\.|Apartment)\\b)[0-9]+))");

        Matcher hnMatcher = hnPattern.matcher(addressString);
        Matcher srMatcher = srPattern.matcher(addressString);
        Matcher apMatcher = apPattern.matcher(addressString);
        Matcher ctMatcher = ctPattern.matcher(addressString);
        Matcher stMatcher = stPattern.matcher(addressString);
        Matcher zpMatcher = zpPattern.matcher(addressString);

        Address address = new Address()
            .houseNumber(Integer.parseInt(hnMatcher.group("Home")))
            .street(srMatcher.group("Street"))
            .apartmentNumber(Integer.parseInt(apMatcher.group("Apt")))
            .city(ctMatcher.group("City"))
            .state(stMatcher.group("State"))
            .zip(zpMatcher.group("Zip"));

        return findOrCreate(address);
    }
}
