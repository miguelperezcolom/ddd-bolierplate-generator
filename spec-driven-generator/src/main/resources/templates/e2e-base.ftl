package ${project.packageName}.${module.slug}.e2e;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;

@Tag("e2e")
public abstract class BaseE2ETest {

    protected static Playwright playwright;
    protected static Browser browser;
    protected BrowserContext context;
    protected Page page;

    protected static final String BASE_URL =
            System.getProperty("e2e.base-url", "http://localhost:8080");

    @BeforeAll
    static void launchBrowser() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                        .setHeadless(!Boolean.getBoolean("e2e.headed")));
    }

    @AfterAll
    static void closeBrowser() {
        playwright.close();
    }

    @BeforeEach
    void createContext() {
        context = browser.newContext(
                new Browser.NewContextOptions().setBaseURL(BASE_URL));
        page = context.newPage();
    }

    @AfterEach
    void closeContext() {
        context.close();
    }

    protected void navigateTo(String path) {
        page.navigate(path);
        page.waitForLoadState();
    }
}
