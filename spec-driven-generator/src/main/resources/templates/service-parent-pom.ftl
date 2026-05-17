<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>4.0.4</version>
        <relativePath/>
    </parent>
    <groupId>${project.packageName}</groupId>
    <artifactId>${service.name?replace(" ","-")?lower_case}</artifactId>
    <version>${project.version!'0.0.1-SNAPSHOT'}</version>
    <packaging>pom</packaging>
    <name>${service.name}</name>
    <modules>
<#list service.modules as module>
        <module>${module.name?replace(" ","-")?lower_case?replace("[^a-z0-9]","",'r')}</module>
</#list>
        <module>${service.name?replace(" ","-")?lower_case}-app</module>
    </modules>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>2025.1.0</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
