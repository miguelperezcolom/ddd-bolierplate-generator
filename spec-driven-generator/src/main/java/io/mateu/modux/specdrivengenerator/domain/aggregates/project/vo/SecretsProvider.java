package io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo;

public enum SecretsProvider {
    Vault, AWSSecretsManager, AzureKeyVault, GCPSecretManager, Custom
}
