// PLAYWRIGHT MCP BEAST MODE - Portfolio Audit
const { chromium } = require('playwright');

async function auditPortfolio() {
    console.log('🚀 Starting Playwright MCP Portfolio Audit...');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Navigate to portfolio
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
        
        // Take screenshot
        await page.screenshot({ path: 'portfolio-audit.png', fullPage: true });
        console.log('📸 Screenshot saved: portfolio-audit.png');
        
        // Check for broken images
        const images = await page.$$eval('img', imgs => 
            imgs.map(img => ({
                src: img.src,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight
            }))
        );
        
        const brokenImages = images.filter(img => img.naturalWidth === 0);
        console.log(`🖼️  Total images: ${images.length}`);
        console.log(`💔 Broken images: ${brokenImages.length}`);
        
        if (brokenImages.length > 0) {
            console.log('🚨 CRITICAL: These images are broken:');
            brokenImages.forEach(img => console.log(`   - ${img.src}`));
        }
        
        // Check page performance
        const startTime = Date.now();
        await page.reload({ waitUntil: 'networkidle' });
        const loadTime = Date.now() - startTime;
        console.log(`⚡ Page load time: ${loadTime}ms`);
        
        // Check for Dutch content
        const bodyText = await page.textContent('body');
        const dutchWords = ['projecten', 'mijn', 'ervaring', 'vaardigheden'];
        const foundDutch = dutchWords.filter(word => bodyText.toLowerCase().includes(word));
        console.log(`🇳🇱 Dutch words found: ${foundDutch.length}/4`);
        
        // Summary
        console.log('\n📊 AUDIT SUMMARY:');
        console.log(`Load Time: ${loadTime}ms ${loadTime > 3000 ? '❌ SLOW' : '✅ GOOD'}`);
        console.log(`Broken Images: ${brokenImages.length} ${brokenImages.length > 0 ? '❌ CRITICAL' : '✅ GOOD'}`);
        console.log(`Language: ${foundDutch.length > 2 ? '🇳🇱 Dutch-heavy' : '🇬🇧 English-friendly'}`);
        
        if (brokenImages.length > 0) {
            console.log('\n🚨 IMMEDIATE ACTION REQUIRED:');
            console.log('1. Replace all 1-byte image files with real photos');
            console.log('2. This is a CRITICAL portfolio killer');
        }
        
    } catch (error) {
        console.error('❌ Audit failed:', error);
    } finally {
        await browser.close();
    }
}

auditPortfolio();