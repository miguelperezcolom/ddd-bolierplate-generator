<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>${project.packageName}</groupId>
    <artifactId>${project.name?replace(" ","-")?lower_case}</artifactId>
    <version>${project.version!'0.0.1-SNAPSHOT'}</version>
    <packaging>pom</packaging>
    <name>${project.name}</name>
    <modules>
<#list project.services as service>
        <module>${service.name?replace(" ","-")?lower_case}</module>
</#list>
    </modules>
</project>
