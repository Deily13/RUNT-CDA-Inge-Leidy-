package com.example.RUNT_CDA_inge_Leidy.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

  @GetMapping(value = {
    "/",
    "/{path:[^\\.]*}",
    "/{path:[^\\.]*}/**"
  })
  public String forward() {
    return "forward:/index.html";
  }
}
