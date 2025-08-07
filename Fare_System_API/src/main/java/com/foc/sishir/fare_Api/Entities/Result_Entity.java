package com.foc.sishir.fare_Api.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Result_Entity {

    @Id
    @Column(name = "Result")
    private int result;
}
