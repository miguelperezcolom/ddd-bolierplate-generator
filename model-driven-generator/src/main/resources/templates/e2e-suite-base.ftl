package e2e;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;

/**
 * Base of the generated e2e suite: one Chromium for the whole run (installed on
 * first use), plus the form-login helper with the model's scaffold credentials
 * (the generated in-memory users are roleId/roleId).
 */
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class BaseE2eTest {

    protected static Playwright playwright;
    protected static Browser browser;

    @BeforeAll
    static void launchBrowser() throws Exception {
        // Install Chromium in a SEPARATE JVM (Playwright's CLI calls System.exit;
        // the classpath of the forked test run already holds the playwright jar).
        var install = new ProcessBuilder("java", "-cp", System.getProperty("java.class.path"),
                "com.microsoft.playwright.CLI", "install", "chromium")
                .inheritIO()
                .start();
        if (install.waitFor() != 0) {
            throw new IllegalStateException("playwright install chromium falló — revísalo a mano");
        }
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
    }

    @AfterAll
    static void closeBrowser() {
        if (browser != null) browser.close();
        if (playwright != null) playwright.close();
    }

    protected Page newPage() {
        return browser.newPage();
    }

    /**
     * Spring's form login, only if the login page shows (apps may boot open in dev).
     * After submitting, waits for the app to render something back.
     */
    protected void loginIfNeeded(Page page, String username, String password) {
        var user = page.locator("input[name='username']");
        if (user.count() > 0 && user.first().isVisible()) {
            user.first().fill(username);
            page.locator("input[name='password']").first().fill(password);
            page.locator("button[type='submit'], button:has-text('Sign in')").first().click();
            page.waitForLoadState();
        }
    }

    /** Clicks a menu entry by its visible label, tolerating surrounding whitespace. */
    protected void openMenuEntry(Page page, String label) {
        page.locator("text=" + label).first().click();
        page.waitForLoadState();
    }

    /**
     * Waits until a selector is visible (SPA syncs are async) and returns it —
     * the assertion primitive for every generated test: it pierces shadow DOM
     * and tolerates the Mateu render roundtrip.
     */
    protected com.microsoft.playwright.ElementHandle waitVisible(Page page, String selector) {
        return page.waitForSelector(selector,
                new com.microsoft.playwright.Page.WaitForSelectorOptions().setTimeout(15000));
    }

    /**
     * Navigates to the app, logs in through the form when it shows, and lands BACK
     * on the app path: Spring's login success redirect goes to "/", where the Mateu
     * SPA cannot sync (its mateu endpoint lives under the app path) and shows
     * "Not found" instead of the home.
     */
    protected void loginAndOpen(Page page, String appUrl, String username, String password) {
        page.navigate(appUrl);
        loginIfNeeded(page, username, password);
        page.navigate(appUrl);
        page.waitForLoadState();
    }
}
