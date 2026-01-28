const { chromium } = require('playwright');
const path = require('path');

(async () => {
    // Manually set environment variables if they are missing
    process.env.HOME = 'C:/Users/Admin';
    process.env.USERPROFILE = 'C:/Users/Admin';

    console.log('Launching browser with Path: C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe');
    const browser = await chromium.launch({
        headless: true,
        executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe',
        args: ['--disable-gpu', '--no-sandbox']
    });
    console.log('Browser launched successfully.');

    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 }
    });

    const page = await context.newPage();

    console.log('Navigating to http://localhost:3000/...');
    try {
        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
        console.log('Page loaded.');

        const screenshotPath = path.resolve(__dirname, 'screenshot.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved to ${screenshotPath}`);
    } catch (error) {
        console.error('Error during screenshot:', error);
    } finally {
        await browser.close();
    }
})();
