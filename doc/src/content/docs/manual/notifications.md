---
title: Notifications
description: When an event happens, tell these roles through these channels
---

A **Notification** is declared by intent: WHEN an event happens, TELL these roles
through these channels. The model declares the what; delivery plumbing (provider,
retries) is a generation-time decision — the project's `emailProvider` already
names the transport.

| Field | Description |
|---|---|
| **Owner bounded context** | The context that owns (and sends) it |
| **Event** | The domain/application event that fires it |
| **Channels** | `EMAIL`, `SMS`, `PUSH`, `WEBHOOK` |
| **Recipients** | Roles (their contact derives from the subject's profile), plus an optional expression (`resource.cliente.email`) |
| **Template** | Subject and body with `{placeholders}` over the event payload — [i18n](/manual/i18n/)-ready |

## On the context map

Palette: **Notificación** (Dominio group, pink), dropped on its bounded context —
a chip at the detail level. Wire it by drawing:

- **event → notification**: that event fires it («dispara»; Supr unpoints);
- **notification → actor**: that role gets notified (edge labeled with the channel;
  Supr removes the recipient).

Deleting the chip removes the notification; undo rebuilds it with its event and
recipients.
