package io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo;

public enum SecretsProvider {
    Vault, AWSSecretsManager, AzureKeyVault, GCPSecretManager, Custom
}
