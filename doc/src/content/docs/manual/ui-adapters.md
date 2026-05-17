---
title: UI Adapters
description: Defining the navigation structure of a frontend application in Modux
---

A **UI Adapter** defines the navigation structure of a frontend application for a specific service. It specifies the menu layout, the top-level title, and the set of menu items that link to [Pages](/manual/pages/).

One service can have multiple UI adapters, for example to provide different navigation trees for different user roles or devices.

## Creating a UI adapter

1. Open the **Interfaces → UI Adapters** section
2. Click **New**
3. Configure the service, layout variant and menu items

## Configuration

### Basic fields

| Field | Description |
|---|---|
| **Name** | Adapter name (PascalCase, e.g. `AdminUiAdapter`) |
| **Service** | The service this adapter belongs to |
| **Title** | Application title shown in the shell header |
| **Path** | Base URL path for this adapter (e.g. `/admin`) |
| **App variant** | Navigation layout (see below) |

### App variants

| Variant | Description |
|---|---|
| **AUTO** | Let the framework choose based on screen size |
| **HAMBURGUER_MENU** | Collapsible sidebar with a hamburger toggle |
| **MENU_ON_LEFT** | Persistent sidebar on the left |
| **MENU_ON_TOP** | Horizontal top navigation bar |
| **TABS** | Tab-based navigation |

### Menu items

Each menu item links to a page route:

| Field | Description |
|---|---|
| **Label** | Menu item text |
| **Icon** | Optional icon name |
| **Description** | Optional tooltip or subtitle |
| **Route** | URL route of the target [Page](/manual/pages/) |

## What gets generated

For each UI adapter Modux generates:

- An application class annotated with `@UI` and the chosen layout variant
- Menu item declarations pointing to the configured routes
- Navigation wiring to the corresponding page components
