---
title: Identity & Security (IAM/IdP)
description: Who issues the identities the system trusts — and who may do what with which data
---

An enterprise information system needs three security answers, and modux models each one:

| Question | Element | Where |
|---|---|---|
| **Who are you?** (authentication) | **Identity Provider** | This page |
| **What may you do?** (RBAC) | [Roles](/manual/roles/) + `allowedRoles`/`allowedScopes` on use cases | Behaviour |
| **On which data?** (ABAC) | **Access policies** on a bounded context | Below |

## Identity providers

An **IdP** is a first-class element: who issues the identities the rest of the model
trusts. Types: `CORPORATE` (employees), `B2C` (customers), `SOCIAL`, `PARTNER`. An IdP
is **ours** by default, or **federated** when an external system publishes it (a
partner's IdP, a social login) — drawn dashed, with a «publica» edge from its system.

Create it from the palette (**IdP (identidad)**, Estratégico group — key glyph, amber)
and wire the trust by drawing lines:

| Gesture | Meaning |
|---|---|
| **App → IdP** *(UI view)* | The app's users authenticate against this IdP («autentica con») |
| **Bounded context → IdP** *(context map)* | The context validates tokens issued by it («valida tokens de») |
| **ETL flow → IdP** *(context map)* | The pipeline runs as a **service identity** of this IdP — non-human subjects have identities too |
| **IdP → external system** *(context map)* | Federation: that system publishes the IdP |

Supr on any of those edges un-trusts (undoable); Supr on the IdP node deletes it and
clears every trust edge pointing at it. One system usually holds two or three IdPs —
the corporate one for the back-office apps and contexts, a B2C one for the customer
portal, a partner's for federated operations.

## Access policies (row-level authorization)

Beyond role checks, an **access policy** on a bounded context constrains **which rows** a
subject may see or act on — ABAC-lite, declared as a boolean expression over subject
and resource attributes:

```
subject.hotelId == resource.hotelId
```

It applies to an aggregate, a read model or a use case (`appliesToId`), and desugars
at generation time into query filters on read models/query services, guards on use
cases and UI hiding — the row-level security enterprise apps otherwise hand-roll.
Policies are edited in the bounded context's form (**Access policies** section).

## Roadmap

Declared, not yet modelled: **AI agents and scheduled triggers as service accounts**
(same pattern as ETL flows), a **scope catalog** with owners (today `allowedScopes`
are free strings), and **role ↔ IdP group provisioning** (mapping directory groups to
model roles). Lint rules for identity debt (an app with no IdP, a service subject
without identity) follow the same path.
