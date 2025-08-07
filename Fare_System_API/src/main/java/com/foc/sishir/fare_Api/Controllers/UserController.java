package com.foc.sishir.fare_Api.Controllers;

import com.foc.sishir.fare_Api.Entities.User_Entity;
import com.foc.sishir.fare_Api.Repositories.UserRepository;
import com.foc.sishir.fare_Api.Services.UserServices;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")

public class UserController {
    @Autowired
    public UserServices userServices;
    public UserRepository userRepository;

@GetMapping("/userdata")
    public ResponseEntity<?> userbyname(@RequestParam String username , @RequestParam String password){
        User_Entity user = userServices.userbyname(username, password);
       if (user != null){
           return ResponseEntity.ok(user);
       }else {
           return ResponseEntity.status(404).body("User not found");
       }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest,HttpSession session) {

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        System.out.println("Received username: " + username+ " and password: " + password);

        User_Entity user = userServices.userbyname(username, password);
        if(user != null){
            // Generate JWT Token
            String token = JwtTokenUtil.generateToken(username);

            return ResponseEntity.ok(new LoginResponse(token));

        } else {
            System.out.println(" user is mistake");
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @GetMapping("/checkLogin")
    public ResponseEntity<?> checkLogin(HttpSession session) {
        Long userID = (Long) session.getAttribute("userID");
        if (userID != null) {
            return ResponseEntity.ok("User is logged in with userID: " + userID);
        } else {
            return ResponseEntity.status(401).body("User not logged in");
        }
    }
}

