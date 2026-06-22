package io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo;

public enum SecretsProvider {
    Vault, AWSSecretsManager, AzureKeyVault, GCPSecretManager, Custom
}
