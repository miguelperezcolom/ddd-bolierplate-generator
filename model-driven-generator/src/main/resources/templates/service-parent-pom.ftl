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
    <artifactId>${service.name?replace(" ","-")?lower_case}-parent</artifactId>
    <version>${project.version!'0.0.1-SNAPSHOT'}</version>
    <packaging>pom</packaging>
    <name>${service.name}</name>
    <modules>
<#list service.modules as module>
        <module>${module.name?replace(" ","-")?lower_case?replace("[^a-z0-9]","",'r')}</module>
</#list>
        <module>${service.name?replace(" ","-")?lower_case}-custom</module>
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
    <build>
        <plugins>
            <!-- Code coverage, inherited by every module -->
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.12</version>
                <executions>
                    <execution>
                        <id>prepare-agent</id>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>report</id>
                        <phase>test</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <!-- Build hygiene: require a minimum Java/Maven -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-enforcer-plugin</artifactId>
                <version>3.5.0</version>
                <executions>
                    <execution>
                        <id>enforce</id>
                        <goals>
                            <goal>enforce</goal>
                        </goals>
                        <configuration>
                            <rules>
                                <requireMavenVersion>
                                    <version>[3.6.3,)</version>
                                </requireMavenVersion>
                                <requireJavaVersion>
                                    <version>[21,)</version>
                                </requireJavaVersion>
                            </rules>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <!-- Code formatting (google-java-format). Run on demand: mvn spotless:apply -->
            <plugin>
                <groupId>com.diffplug.spotless</groupId>
                <artifactId>spotless-maven-plugin</artifactId>
                <version>2.43.0</version>
                <configuration>
                    <java>
                        <googleJavaFormat/>
                    </java>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
