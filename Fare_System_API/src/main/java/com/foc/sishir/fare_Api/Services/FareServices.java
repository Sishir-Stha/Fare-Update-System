package com.foc.sishir.fare_Api.Services;

import com.foc.sishir.fare_Api.Entities.Fare_Entity;
import com.foc.sishir.fare_Api.Entities.Result_Entity;
import com.foc.sishir.fare_Api.Repositories.FareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FareServices {
    @Autowired
    private FareRepository fareRepository;




    public List<Fare_Entity> resultset(String sector, String bookingClassRcd, String fareCode, String flightDate, String currency) {
        return fareRepository.getFareDataWithParams(sector, bookingClassRcd, fareCode, flightDate, currency);
    }

    public boolean updateset(String fareid, String flightdatefrom, String flightdateto,
                            String fareamount, String validOnFlight,String agencyCode,
                            String userlogon,  String actiontype) {
        try {
         Result_Entity result_entity = fareRepository.updateFareData(fareid, flightdatefrom, flightdateto,
                    fareamount, validOnFlight, agencyCode, userlogon ,actiontype);
            System.out.println("Stored procedure result: " + result_entity);
            System.out.println(result_entity.getResult());
            int value = result_entity.getResult();
            System.out.println("value " + value);
            if ( value == 1) {
                return true;
            } else {
                return false;
            }

        } catch (Exception e) {
            System.err.println("Error updating fare: " + e.getMessage());
            return false;
        }
    }
}