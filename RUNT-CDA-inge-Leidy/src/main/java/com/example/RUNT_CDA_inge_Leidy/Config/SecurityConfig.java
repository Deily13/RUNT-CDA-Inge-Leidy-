package com.example.RUNT_CDA_inge_Leidy.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        // Recursos estáticos de Angular
        .requestMatchers(
          "/",
          "/index.html",
          "/*.js",
          "/*.css",
          "/*.ico",
          "/*.png",
          "/*.woff2",
          "/assets/**",
          "/favicon.ico"
        ).permitAll()
        // API y documentación
        .requestMatchers(
          "/api/**",
          "/swagger-ui/**",
          "/swagger-ui.html",
          "/api-docs/**"
        ).permitAll()
        // Todo lo demás (rutas de Angular como /inspecciones, /panel, etc.)
        .anyRequest().permitAll()
      );
    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    // Permite tanto desarrollo (4200) como producción (8080 mismo origen)
    config.setAllowedOrigins(List.of(
      "http://localhost:4200",
      "http://localhost:8080"
    ));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }
}
