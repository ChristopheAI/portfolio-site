// PLAYWRIGHT MCP BEAST MODE - Portfolio Audit (ES Module)
import { chromium } from 'playwright';

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
        const dutchWords = ['projecten', 'mijn', 'ervaring', 'vaardigheden', 'laten', 'praten'];
        const foundDutch = dutchWords.filter(word => bodyText.toLowerCase().includes(word));
        console.log(`🇳🇱 Dutch words found: ${foundDutch.join(', ')}`);
        
        // Check for placeholder content
        const placeholders = await page.$$eval('*', els => 
            Array.from(els).filter(el => 
                el.textContent && el.textContent.includes('placeholder')
            ).length
        );
        
        // Summary
        console.log('\n📊 PLAYWRIGHT MCP AUDIT RESULTS:');
        console.log('=' .repeat(50));
        console.log(`⚡ Load Time: ${loadTime}ms ${loadTime > 3000 ? '❌ SLOW' : loadTime < 2000 ? '✅ EXCELLENT' : '⚠️  OKAY'}`);
        console.log(`🖼️  Images: ${images.length} total, ${brokenImages.length} broken ${brokenImages.length > 0 ? '❌ CRITICAL' : '✅ GOOD'}`);
        console.log(`🇳🇱 Language: ${foundDutch.length > 3 ? 'Dutch-heavy (Vlaamse markt ready)' : 'English-friendly'}`);
        console.log(`📝 Placeholders: ${placeholders}`);
        
        // CRITICAL ISSUES
        if (brokenImages.length > 0) {
            console.log('\n🚨 CRITICAL PORTFOLIO KILLERS:');
            console.log('━'.repeat(50));
            console.log('1. BROKEN IMAGES - Instant disqualification');
            console.log('   → Replace all 1-byte image files with real photos');
            console.log('   → This makes you look completely amateur');
            
            brokenImages.forEach((img, i) => {
                console.log(`   ${i + 1}. ${img.src}`);
            });
        }
        
        // Mobile test
        console.log('\n📱 Testing mobile responsiveness...');
        await page.setViewportSize({ width: 375, height: 667 });
        await page.screenshot({ path: 'portfolio-mobile.png' });
        console.log('📸 Mobile screenshot: portfolio-mobile.png');
        
        // Desktop test
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.screenshot({ path: 'portfolio-desktop.png' });
        console.log('📸 Desktop screenshot: portfolio-desktop.png');
        
        console.log('\n✅ PLAYWRIGHT MCP AUDIT COMPLETE!');
        console.log('📸 Screenshots saved for visual review');
        
    } catch (error) {
        console.error('❌ Audit failed:', error);
    } finally {
        await browser.close();
    }
}

auditPortfolio();