package com.foc.sishir.fare_Api.Repositories;

import com.foc.sishir.fare_Api.Entities.Fare_Entity;
import com.foc.sishir.fare_Api.Entities.Result_Entity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FareRepository extends JpaRepository<Fare_Entity, String> {

    @Query(value = "EXEC uspUIFareSearch_umn1 :sector, :bookingClassRcd, :fareCode, :flightDate, :currency", nativeQuery = true)
    List<Fare_Entity> getFareDataWithParams(@Param("sector") String sector,
                                            @Param("bookingClassRcd") String bookingClassRcd,
                                            @Param("fareCode") String fareCode,
                                            @Param("flightDate") String flightDate,
                                            @Param("currency") String currency);


    @Transactional

    @Query(value = "EXEC uspFareChange_umn :fareid, :flightdatefrom, :flightdateto, :fareamount, :validOnFlight, :agencyCode, :userlogon, :actionType",
            nativeQuery = true)
    Result_Entity updateFareData(@Param("fareid") String fareid,
                       @Param("flightdatefrom") String flightdatefrom,
                       @Param("flightdateto") String flightdateto,
                       @Param("fareamount") String fareamount,
                       @Param("validOnFlight") String validOnFlight,
                       @Param("agencyCode") String agencyCode,
                       @Param("userlogon") String userlogon,
                       @Param("actionType") String actionType);
}