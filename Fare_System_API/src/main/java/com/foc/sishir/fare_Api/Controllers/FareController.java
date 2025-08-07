package com.foc.sishir.fare_Api.Controllers;

import com.foc.sishir.fare_Api.Entities.Fare_Entity;
import com.foc.sishir.fare_Api.Repositories.FareRepository;
import com.foc.sishir.fare_Api.Services.FareServices;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fare")
public class FareController {
    @Autowired
    public FareServices fareServices;
    public FareRepository fareRepository;

    @GetMapping("/farelist")
    public ResponseEntity<?> farelist(@RequestParam String sector,
                                      @RequestParam String bookingClassRcd,
                                      @RequestParam String fareCode,
                                      @RequestParam String flightDate,
                                      @RequestParam String currency) {

        List<Fare_Entity> fareList = fareServices.resultset(sector, bookingClassRcd, fareCode, flightDate, currency);
        System.out.println(fareList);

        if (fareList == null || fareList.isEmpty()) {
            return ResponseEntity.status(404).body("No fares found.");
        }
        return ResponseEntity.ok(fareList);
    }

    @PutMapping("/updatefare")
    public ResponseEntity<?> updatefare(@RequestParam List<String> fareid,
                                        @RequestParam String flightdatefrom,
                                        @RequestParam String flightdateto,
                                        @RequestParam String validonflight,
                                        @RequestParam String fareamount,
                                        @RequestParam String actiontype,
                                        @RequestParam String userlogon) {


        if (fareid == null || fareid.isEmpty()) {
            return ResponseEntity.badRequest().body("No fare IDs provided.");
        }
        String validnull = "";
        if (validonflight != null){
            validnull = validonflight;
        }
        System.out.println(validonflight);
        System.out.println(actiontype);
        int updatedCount = 0;
        int failedcount =0;
        for (String eachfareid : fareid) {
            try {
                System.out.println("Updating Fare ID: " + eachfareid);
                boolean isUpdated = fareServices.updateset(eachfareid, flightdatefrom, flightdateto, fareamount, validnull , "", userlogon, actiontype );
                if (isUpdated == true) {
                    updatedCount++;
                    System.out.println("Update successful for " + eachfareid);
                } else{
                    failedcount++;
                    System.out.println("Update failed for " + eachfareid);
                }
            } catch (Exception e) {
                System.err.println("Failed to update fare ID: " + eachfareid + " - " + e.getMessage());
            }finally {
                    System.out.println("Sucessfully updated " + updatedCount);
                System.out.println("Failed to Update " + failedcount);
            }
        }
        if (updatedCount == 0) {
            return ResponseEntity.status(500).body("Failed");
        }
        return ResponseEntity.ok(updatedCount + "Updated");

    }
}