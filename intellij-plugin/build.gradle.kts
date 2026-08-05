import org.jetbrains.intellij.platform.gradle.TestFrameworkType

plugins {
    id("java")
    id("org.jetbrains.intellij.platform") version "2.18.1"
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
        if (!local.isNullOrBlank()) local(local) else intellijIdeaCommunity("2025.2")
        testFramework(TestFrameworkType.Platform)
    }
    testImplementation("junit:junit:4.13.2")
}

tasks.test {
    useJUnit()
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

/**
 * `-PmoduxRunProject=/path/to/a/repo` opens that project straight away in the sandbox IDE,
 * instead of landing on the welcome screen. The point of the plugin is what happens when you
 * open a model, so getting there should not need clicking.
 */
tasks.named<JavaExec>("runIde") {
    val project = providers.gradleProperty("moduxRunProject")
    argumentProviders.add(CommandLineArgumentProvider { listOfNotNull(project.orNull) })
}
