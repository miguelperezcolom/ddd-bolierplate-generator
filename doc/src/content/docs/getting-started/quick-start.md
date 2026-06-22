---
title: Quick Start
description: Generate your first project with Modux in minutes
---

This guide walks you through creating a simple booking domain from scratch.

## 1. Start the generator

```bash
cd model-driven-generator
mvn spring-boot:run
```

Open `http://localhost:8080` in your browser.

## 2. Create a Project

A **Project** is the top-level container for your entire system.

1. Click **Organization → Projects** in the sidebar
2. Click **New**
3. Fill in:
   - **Name**: `booking-system`
   - **Package**: `com.example.booking`
   - **Output path**: `/path/to/output/dir`
4. Save

## 3. Create a Service

A **Service** represents a microservice or deployable unit.

1. Open your project and go to **Services**
2. Click **New**
3. Name it `booking-service`
4. Save

## 4. Create a Module

A **Module** is a bounded context within a service.

1. Open the service and go to **Modules**
2. Click **New**
3. Name it `bookings`
4. Save

## 5. Create an Aggregate

An **Aggregate** is the core DDD building block.

1. Open the module and go to **Aggregates**
2. Click **New**
3. Fill in:
   - **Name**: `Booking`
   - **ID type**: `UUID`
4. Add fields:
   | Name | Type |
   |---|---|
   | reference | String |
   | customer | String |
   | startDate | LocalDate |
   | endDate | LocalDate |
5. Save

## 6. Generate code

1. Go back to your **Project**
2. Click **Generate Code**
3. The generated project will be written to the output path you configured

## 7. Build and run the generated project

```bash
cd /path/to/output/dir/booking-system
mvn spring-boot:run
```

Your application starts at `http://localhost:8080` with a working CRUD interface for your `Booking` aggregate.

## 8. Add your business logic

The generated code is designed to be extended. Implement the generated interfaces in a separate Maven module with your custom logic:

```java
@Service
public class BookingDomainService implements CreateBookingUseCase {
    @Override
    public void execute(CreateBookingCommand command) {
        // your business rules here
    }
}
```

## Next steps

- Read the [User Manual](/manual/overview/) for all available concepts
- Learn about [Aggregates](/manual/aggregates/) in depth
- Set up [Domain Events](/manual/domain-events/) and [Sagas](/manual/sagas/)
