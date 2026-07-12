package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.role.RoleCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Seguridad")
public class SecurityMenu {

    @Menu
    RoleCrudOrchestrator roles;

    @Menu
    io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.identityprovider.IdentityProviderCrudOrchestrator identityProviders;

}
