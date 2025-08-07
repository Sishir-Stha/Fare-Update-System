package com.foc.sishir.fare_Api.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_account")
@Getter
@Setter
public class User_Entity {

    @Id
    @Column(name = "user_logon")
    private String username;

    @Column(name = "user_password")
    private String password;

}
