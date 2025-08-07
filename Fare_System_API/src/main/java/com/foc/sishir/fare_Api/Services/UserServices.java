package com.foc.sishir.fare_Api.Services;

import com.foc.sishir.fare_Api.Entities.User_Entity;
import com.foc.sishir.fare_Api.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    public List<User_Entity>userEntityList(){
        return userRepository.findAll();
    }

    public User_Entity userbyname(String username, String password){
        return userRepository.userbylogon(username, password);
    }


}

