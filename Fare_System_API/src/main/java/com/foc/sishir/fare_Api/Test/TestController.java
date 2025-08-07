package com.foc.sishir.fare_Api.Test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/user/login")
    public void handleOptions() {
        System.out.println("OPTIONS request received");
    }
}
