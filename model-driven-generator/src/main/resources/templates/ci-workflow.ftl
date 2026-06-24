name: CI

on:
  push:
    branches: [ main, master ]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'
          cache: maven
<#list project.services as svc>
      - name: Build & test ${svc.name}
        run: mvn -B -ntp -f ${svc.name?lower_case?replace("[^a-z0-9]","-",'r')}/pom.xml verify
</#list>
