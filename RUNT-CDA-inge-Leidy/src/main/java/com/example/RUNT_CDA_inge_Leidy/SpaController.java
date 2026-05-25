package com.example.RUNT_CDA_inge_Leidy;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
  @RequestMapping(value = "/{path:[^\\.]*}")
  public String spa() {
    return "forward:/index.html";
  }
}
