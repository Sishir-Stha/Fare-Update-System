package com.foc.sishir.fare_Api.Entities;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Updated_Fare_Entity {

    @Id
    @Column(name = "fare_id")
    private String  fareid;

    @Column(name = "flight_date_from")
    private Date flightDateFrom;

    @Column(name = "flight_date_to")
    @Temporal(TemporalType.TIMESTAMP)
    private Date flightDateTo;

    @Column(name = "fare_amount")
    private Double fareAmount;

    private String username;
}
