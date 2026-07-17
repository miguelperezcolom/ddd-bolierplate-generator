package ${project.packageName}.infra.in.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
<#if idp??>
import org.springframework.context.annotation.Profile;
</#if>
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
<#if idp??>
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
</#if>
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security configuration with role constants.
 * Generated from RoleEntity definitions<#if idp??> and the model's identity provider
 * («${idp.name}», ${idp.type})</#if>.
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

<#if idp??>
    /**
     * Without the «secure» profile the app stays open: it always boots, even where the
     * IdP is unreachable or its credentials are absent (local runs, CI).
     */
    @Bean
    @Profile("!secure")
    public SecurityFilterChain permitAllFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }

    /**
     * «secure»: OIDC login against ${idp.name} (${idp.issuer}). The client credentials
     * arrive through the environment — see application.yaml's secure section.
     */
    @Bean
    @Profile("secure")
    public SecurityFilterChain oidcFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .oauth2Login(login -> login
                .userInfoEndpoint(userInfo -> userInfo.userAuthoritiesMapper(keycloakRealmRoles())));
        return http.build();
    }

    /** Keycloak-style realm roles (realm_access.roles) → Spring's ROLE_* authorities. */
    @Bean
    @Profile("secure")
    public GrantedAuthoritiesMapper keycloakRealmRoles() {
        return authorities -> {
            var mapped = new java.util.HashSet<GrantedAuthority>(authorities);
            for (GrantedAuthority authority : authorities) {
                if (authority instanceof OidcUserAuthority oidcAuthority) {
                    var realmAccess = oidcAuthority.getIdToken().getClaimAsMap("realm_access");
                    if (realmAccess == null && oidcAuthority.getUserInfo() != null) {
                        realmAccess = oidcAuthority.getUserInfo().getClaimAsMap("realm_access");
                    }
                    if (realmAccess != null
                            && realmAccess.get("roles") instanceof java.util.Collection<?> roles) {
                        for (Object role : roles) {
                            mapped.add(new SimpleGrantedAuthority(
                                    "ROLE_" + role.toString().toUpperCase().replaceAll("[^A-Z0-9]", "_")));
                        }
                    }
                }
            }
            return mapped;
        };
    }
<#else>
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CSRF is disabled because the Mateu sync API is called via JSON (no CSRF token).
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Service-to-service borders (consumed by sibling gateways and external
                // ACLs): machine identity, not an interactive session. Tighten with real
                // credentials when the deployment needs it.
                .requestMatchers("/v1/**").permitAll()
                .anyRequest().authenticated())
            // Browser: form login. Agents and APIs (MCP included): HTTP Basic, and a plain
            // 401 instead of the login redirect.
            .formLogin(login -> login.defaultSuccessUrl("/", true))
            .httpBasic(basic -> { })
            .exceptionHandling(exceptions -> exceptions.defaultAuthenticationEntryPointFor(
                new org.springframework.security.web.authentication.HttpStatusEntryPoint(
                    org.springframework.http.HttpStatus.UNAUTHORIZED),
                request -> request.getRequestURI().startsWith("/mcp")))
            .logout(logout -> logout.logoutSuccessUrl("/login"));
        return http.build();
    }

<#if roles?has_content>
    /**
     * Scaffold users, one per model role (username = password = the role's name in lower
     * case). Replace with a real identity provider before shipping.
     */
    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService users() {
        return new org.springframework.security.provisioning.InMemoryUserDetailsManager(
<#list roles as role>
            org.springframework.security.core.userdetails.User
                .withUsername("${role.name?lower_case?replace("[^a-z0-9]","",'r')}")
                .password("{noop}${role.name?lower_case?replace("[^a-z0-9]","",'r')}")
                .roles("${role.name?upper_case?replace("[^A-Z0-9]","_",'r')}")
                .build()<#sep>,</#sep>
</#list>
        );
    }
</#if>
</#if>

}
