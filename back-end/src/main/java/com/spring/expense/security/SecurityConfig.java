package com.spring.expense.security;


import com.spring.expense.filter.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {


    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    @Bean
    public PasswordEncoder passwordEncoder()
    {
     return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf-> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(authrequest-> authrequest
                                .requestMatchers("/adduser").permitAll()
                                .requestMatchers("/authenticate").permitAll()
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/users").hasRole("USER")
                                .requestMatchers("/users/email/**").permitAll()
                                .requestMatchers("/addexpense").hasRole("USER")
                                .requestMatchers("/expenses").hasRole("ADMIN")
                                .requestMatchers("/expenses/userid").hasRole("USER")
                                .requestMatchers("/users/user").hasRole("USER")
                                .requestMatchers("/saveuser").hasRole("USER")
                                .requestMatchers("/expense/{id}").hasRole("USER")
                                .requestMatchers("/expenses/reports").hasRole("USER")
                                .requestMatchers("/budget/set").hasRole("USER")
                                .requestMatchers("/budget/update").hasRole("USER")
                                .requestMatchers("/budget/check").hasRole("USER")
                                .requestMatchers("/expenses/month").hasRole("USER")
                                .requestMatchers("/budget/user").hasRole("USER")
                                .anyRequest().authenticated()

                        )
                .sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults());
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

}
