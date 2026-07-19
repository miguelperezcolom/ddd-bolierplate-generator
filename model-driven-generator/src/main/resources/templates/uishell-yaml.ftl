server:
  port: ${r"${SHELL_PORT:8100}"}

spring:
  application:
    name: ${shell.name?lower_case?replace("[^a-z0-9]","-",'r')}
<#if idp??>
  # The shell validates the keycloak JWT the Mateu frontend (keycloak.js) sends on
  # every sync after login, and propagates it to the services on remote-menu fetches.
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: ${idp.issuer}/protocol/openid-connect/certs
          issuer-uri: ${idp.issuer}
</#if>

logging:
  level:
    org.springframework.security: INFO
