package com.foc.sishir.fare_Api.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;


@Entity
@Data
public class Fare_Entity {
    @Id
    @Column(name = "fare_id")
    private String fareId;

    @Column (name = "Sector")
    private String sector;

    @Column(name = "book_rcd")
    private String bookRcd;

    @Column(name = "flight_date_from")
    private Date flightDateFrom;

    @Column(name = "flight_date_to")
    @Temporal(TemporalType.TIMESTAMP)
    private Date flightDateTo;

    @Column(name = "fare_amount")
    private Double fareAmount;

    @Column(name = "valid_on_flight")
    private String validOnFlight;
}

