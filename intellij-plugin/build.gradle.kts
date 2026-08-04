plugins {
    id("java")
    id("org.jetbrains.intellij.platform") version "2.1.0"
}

group = "io.mateu.modux"
version = "0.1.0"

repositories {
    mavenCentral()
    intellijPlatform {
        defaultRepositories()
    }
}

dependencies {
    intellijPlatform {
        // Build against a local IDE install when one is configured — it avoids downloading a
        // whole SDK, and it is what a developer already has. Falls back to a pinned Community
        // release so CI and a fresh clone work with no configuration.
        val local = providers.gradleProperty("moduxIdeaLocalPath").orNull
        if (!local.isNullOrBlank()) local(local) else intellijIdeaCommunity("2024.2")
        instrumentationTools()
    }
}

java {
    toolchain.languageVersion = JavaLanguageVersion.of(21)
}

intellijPlatform {
    // The plugin contributes no settings pages, so there is nothing to index — and the task
    // boots a headless IDE to find that out.
    buildSearchableOptions = false

    pluginConfiguration {
        name = "Modux"
        ideaVersion {
            sinceBuild = "242"
            untilBuild = provider { null }
        }
    }
}

/**
 * The editor bundle is built by `editor/` and copied in as a plugin resource. The plugin does
 * not vendor a second copy: one editor, two hosts.
 */
val editorBundle by tasks.registering(Copy::class) {
    from(rootProject.file("../editor/dist")) {
        include("*.js")
    }
    into(layout.buildDirectory.dir("editor-bundle/modux-editor"))
}

sourceSets.main {
    resources.srcDir(layout.buildDirectory.dir("editor-bundle"))
}

tasks.processResources {
    dependsOn(editorBundle)
}
