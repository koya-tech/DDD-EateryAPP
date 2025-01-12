# Developer Documentation

## Overview

This repository is designed to align with best practices in modern software engineering. Below are key details about the architecture and design considerations.

---

## Backend

The backend employs **Domain-Driven Design (DDD)** as its primary architectural approach. This ensures a clear separation of concerns and promotes maintainability and scalability.

### DDD Domains

The application is structured around the following domains:

- **User**
- **Eatery**
- **EateryReview**

However, as of **January 12, 2025**, to focus on achieving the **Minimum Viable Product (MVP)**, **only the `Eatery` domain** has been implemented.

#### Notes on Other Domains

- Some code for the `User` and `EateryReview` domains has been partially implemented in earlier phases of development.
- Developers can refer to previous commits in the repository's history to review or retrieve these implementations.

---

## Frontend

The frontend architecture is modular and organized for clarity and testability. Each domain, such as `discover` or `share`, has its own dedicated folders for the following components:

- **Code**: Core business logic and UI components.
- **Test Code**: Unit tests and integration tests specific to the domain.
- **Type Definitions**: TypeScript definition files, ensuring strong type safety across the application.

This domain-centric organization makes it easier to develop and maintain the codebase as the project grows.

---

## Future Work

Future iterations will include:

1. Full implementation of the `User` and `EateryReview` domains.
2. Additional refinements to the frontend to support more complex domain interactions.

---

For further questions, please consult the project owner or refer to the repository's issue tracker.

---

## In Detail

### branch rule

- Feature branch make from develop branch.
- The branch which can merge to master branch is only develop branch.
- Name of feature branch basically start with "frontend" or "backend". However, feature which influence "frontend" and "backend" is not applied.

### variable name

USER

- UserId
- UserName
- UserPassword
- UserImage

EATERY

- EateryId
- EateryName
- EateryCategory
- EateryDescription
- EateryCountry
- EateryLocation
- EateryBusinessHours
- EateryRegularHolidays
- EateryImages
