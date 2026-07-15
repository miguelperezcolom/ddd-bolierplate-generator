package io.mateu.modux.figma;

import static org.assertj.core.api.Assertions.assertThat;

import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Test;

/**
 * End-to-end over the fixture (the same mini check-in the modux importer is tested with): the
 * reader maps the Figma JSON through the bundled contract and each emitter produces a compilable
 * -looking view with the sections, fields and notices designed in Figma.
 */
class EmittersTest {

    private Screen screen() throws Exception {
        Path fixture = Path.of(getClass().getResource("/figma/checkin-file.json").toURI());
        var screens = new FigmaScreenReader(null).read(fixture);
        assertThat(screens).hasSize(1);
        return screens.get(0);
    }

    @Test
    void javaEmitterProducesTheDesignedView() throws Exception {
        String source = new JavaEmitter().emit(screen(), "com.acme.ui");
        assertThat(source)
                .contains("package com.acme.ui;")
                .contains("@UI(\"/check-in\")")
                .contains("@Title(\"Check In\")")
                .contains("@Section(value = \"Documento\", propertyList = true, frameless = true)")
                .contains("@Label(\"Email\")")
                .contains("String email;")
                .contains("@Notice(theme = \"danger\", slim = true)")
                .contains("2 quejas pendientes")
                .contains("TODO wizard frame");
    }

    @Test
    void csharpEmitterProducesTheDesignedView() throws Exception {
        String source = new CSharpEmitter().emit(screen(), "Acme.Ui");
        assertThat(source)
                .contains("namespace Acme.Ui;")
                .contains("[UI(\"check-in\"), Title(\"Check In\")]")
                .contains("[Section(\"Documento\", PropertyList = true, Frameless = true)]")
                .contains("public string? Email { get; set; }")
                .contains("TODO notice");
    }

    @Test
    void pythonEmitterProducesTheDesignedView() throws Exception {
        String source = new PythonEmitter().emit(screen());
        assertThat(source)
                .contains("@ui(\"check-in\")")
                .contains("class CheckIn:")
                .contains("Section(\"Documento\", property_list=True, frameless=True)")
                .contains("email: Annotated[str | None,");
    }

    @Test
    void generatedJavaHasBalancedBraces() throws Exception {
        String source = new JavaEmitter().emit(screen(), "com.acme.ui");
        long open = source.chars().filter(c -> c == '{').count();
        long close = source.chars().filter(c -> c == '}').count();
        assertThat(open).isEqualTo(close);
        // and it round-trips to disk without mangling
        Path tmp = Files.createTempFile("figma-gen", ".java");
        Files.writeString(tmp, source);
        assertThat(Files.readString(tmp)).isEqualTo(source);
        Files.delete(tmp);
    }
}
