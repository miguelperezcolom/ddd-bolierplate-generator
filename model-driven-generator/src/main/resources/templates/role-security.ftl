package ${project.packageName}.infra.in.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security configuration with role constants.
 * Generated from RoleEntity definitions.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

<#if roles?has_content>
<#list roles as role>
    public static final String ROLE_${role.name?upper_case?replace("[^A-Z0-9]","_",'r')} = "ROLE_${role.name?upper_case?replace("[^A-Z0-9]","_",'r')}";
</#list>
<#else>
    // No roles defined
</#if>

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Generated scaffold: permit all requests so the Mateu UI works out of the box.
            // CSRF is disabled because the Mateu sync API is called via JSON (no CSRF token).
            // Tighten this (authentication + role rules using the ROLE_* constants above)
            // when wiring real authentication.
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }

}
