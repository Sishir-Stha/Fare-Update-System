package com.foc.sishir.fare_Api.Test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/test")
public class ConnectCheck {

    @GetMapping("check")
    public  String  check(){
        return "ok";
    }

}
