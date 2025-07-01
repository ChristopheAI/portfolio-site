// SIMPLE PLAYWRIGHT MCP AUDIT
// Focused on critical portfolio issues

import { chromium } from 'playwright';

async function runSimpleAudit() {
    console.log('🚀 Starting simple Playwright audit...');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Navigate to portfolio
        console.log('📱 Loading portfolio...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
        
        // Take screenshot
        console.log('📸 Taking screenshot...');
        await page.screenshot({ path: 'portfolio-screenshot.png', fullPage: true });
        
        // Check for broken images
        console.log('🖼️ Checking images...');
        const brokenImages = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.filter(img => {
                return img.naturalWidth === 0 || img.naturalHeight === 0;
            }).map(img => ({ src: img.src, alt: img.alt }));
        });
        
        // Check content
        console.log('📝 Checking content...');
        const content = await page.evaluate(() => {
            return {
                title: document.title,
                bodyText: document.body.innerText.substring(0, 500),
                hasDutchContent: document.body.innerText.toLowerCase().includes('vlaanderen') || 
                                document.body.innerText.toLowerCase().includes('belgië')
            };
        });
        
        // Check console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        // Wait a bit to catch errors
        await page.waitForTimeout(2000);
        
        // Print results
        console.log('\n📊 AUDIT RESULTS:');
        console.log('================');
        console.log(`Title: ${content.title}`);
        console.log(`Dutch content: ${content.hasDutchContent ? '✅ Yes' : '❌ No'}`);
        console.log(`Broken images: ${brokenImages.length}`);
        console.log(`Console errors: ${consoleErrors.length}`);
        
        if (brokenImages.length > 0) {
            console.log('\n🚨 BROKEN IMAGES:');
            brokenImages.forEach(img => {
                console.log(`- ${img.src} (alt: ${img.alt || 'none'})`);
            });
        }
        
        if (consoleErrors.length > 0) {
            console.log('\n🚨 CONSOLE ERRORS:');
            consoleErrors.forEach(error => {
                console.log(`- ${error}`);
            });
        }
        
        console.log('\n✅ Audit complete! Screenshot saved as portfolio-screenshot.png');
        
    } catch (error) {
        console.error('❌ Audit failed:', error);
    } finally {
        await browser.close();
    }
}

runSimpleAudit(); 