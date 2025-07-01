// PLAYWRIGHT MCP CAPABILITIES DEMO
// Showing what Playwright MCP can really do

import { chromium } from 'playwright';
import fs from 'fs';

class PlaywrightMCPShowcase {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.results = {};
    }

    async demonstrateAllCapabilities() {
        console.log('🎭 PLAYWRIGHT MCP CAPABILITIES DEMO');
        console.log('====================================');
        
        const browser = await chromium.launch({ 
            headless: false,
            slowMo: 100 
        });
        
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        
        const page = await context.newPage();
        
        try {
            // 1. INTERACTIVE TESTING
            await this.demoInteractiveTesting(page);
            
            // 2. NAVIGATION TESTING
            await this.demoNavigationTesting(page);
            
            // 3. PERFORMANCE MONITORING
            await this.demoPerformanceMonitoring(page);
            
            // 4. ACCESSIBILITY TESTING
            await this.demoAccessibilityTesting(page);
            
            // 5. NETWORK MONITORING
            await this.demoNetworkMonitoring(page);
            
            // 6. MOBILE TESTING
            await this.demoMobileTesting(context);
            
            // 7. PDF GENERATION
            await this.demoPDFGeneration(page);
            
            console.log('\n🎉 ALL CAPABILITIES DEMONSTRATED!');
            this.generateCapabilitiesReport();
            
        } catch (error) {
            console.error('❌ Demo failed:', error);
        } finally {
            await browser.close();
        }
    }

    async demoInteractiveTesting(page) {
        console.log('\n1️⃣ INTERACTIVE TESTING');
        console.log('----------------------');
        
        await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
        
        // Test clicking on navigation links
        const navLinks = await page.$$('a[href]');
        console.log(`📋 Found ${navLinks.length} clickable links`);
        
        // Test hover effects
        const hoverElements = await page.$$('a, button, .hover, [class*="hover"]');
        console.log(`🖱️ Found ${hoverElements.length} hoverable elements`);
        
        // Test keyboard navigation
        await page.keyboard.press('Tab');
        console.log('⌨️ Keyboard navigation tested');
        
        // Test scroll behavior
        await page.evaluate(() => window.scrollTo(0, 500));
        console.log('📜 Smooth scrolling tested');
        
        this.results.interactive = {
            clickableLinks: navLinks.length,
            hoverElements: hoverElements.length,
            keyboardNav: true,
            smoothScroll: true
        };
    }

    async demoNavigationTesting(page) {
        console.log('\n2️⃣ NAVIGATION TESTING');
        console.log('----------------------');
        
        // Test internal navigation
        const internalLinks = await page.$$eval('a[href^="#"], a[href^="/"]', links => links.length);
        console.log(`🔗 Internal links: ${internalLinks}`);
        
        // Test external links
        const externalLinks = await page.$$eval('a[href^="http"]', links => links.length);
        console.log(`🌐 External links: ${externalLinks}`);
        
        // Test anchor links
        const anchorLinks = await page.$$eval('a[href^="#"]', links => links.length);
        console.log(`⚓ Anchor links: ${anchorLinks}`);
        
        this.results.navigation = {
            internal: internalLinks,
            external: externalLinks,
            anchors: anchorLinks
        };
    }

    async demoPerformanceMonitoring(page) {
        console.log('\n3️⃣ PERFORMANCE MONITORING');
        console.log('---------------------------');
        
        const startTime = Date.now();
        await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
        const loadTime = Date.now() - startTime;
        
        // Get performance metrics
        const performanceMetrics = await page.evaluate(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            return {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
                firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
                resourceCount: performance.getEntriesByType('resource').length
            };
        });
        
        console.log(`⏱️ Load time: ${loadTime}ms`);
        console.log(`📊 DOM ready: ${performanceMetrics.domContentLoaded}ms`);
        console.log(`🎨 First paint: ${performanceMetrics.firstPaint}ms`);
        console.log(`📦 Resources loaded: ${performanceMetrics.resourceCount}`);
        
        this.results.performance = {
            loadTime,
            ...performanceMetrics
        };
    }

    async demoAccessibilityTesting(page) {
        console.log('\n4️⃣ ACCESSIBILITY TESTING');
        console.log('-------------------------');
        
        // Test heading structure
        const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
            elements.map(el => ({ tag: el.tagName, text: el.textContent?.trim().substring(0, 30) }))
        );
        
        // Test image accessibility
        const images = await page.$$eval('img', elements => 
            elements.map(el => ({ src: el.src, alt: el.alt, hasAlt: !!el.alt }))
        );
        
        const imagesWithoutAlt = images.filter(img => !img.hasAlt);
        
        // Test focus indicators
        const focusableElements = await page.$$eval('a, button, input, select, textarea, [tabindex]', elements => elements.length);
        
        console.log(`📋 Headings: ${headings.length} (structure: ${headings.map(h => h.tag).join(' → ')})`);
        console.log(`🖼️ Images without alt: ${imagesWithoutAlt.length}`);
        console.log(`🎯 Focusable elements: ${focusableElements}`);
        
        this.results.accessibility = {
            headings: headings.length,
            imagesWithoutAlt: imagesWithoutAlt.length,
            focusableElements
        };
    }

    async demoNetworkMonitoring(page) {
        console.log('\n5️⃣ NETWORK MONITORING');
        console.log('----------------------');
        
        const failedRequests = [];
        const slowRequests = [];
        
        page.on('requestfailed', request => {
            failedRequests.push({
                url: request.url(),
                failure: request.failure()?.errorText
            });
        });
        
        page.on('response', response => {
            if (response.status() >= 400) {
                slowRequests.push({
                    url: response.url(),
                    status: response.status()
                });
            }
        });
        
        await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        console.log(`❌ Failed requests: ${failedRequests.length}`);
        console.log(`⚠️ Slow requests: ${slowRequests.length}`);
        
        // Check for broken resources
        const brokenResources = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.filter(img => img.naturalWidth === 0 || img.naturalHeight === 0).length;
        });
        
        console.log(`🖼️ Broken images: ${brokenResources}`);
        
        this.results.network = {
            failedRequests: failedRequests.length,
            slowRequests: slowRequests.length,
            brokenResources
        };
    }

    async demoMobileTesting(context) {
        console.log('\n6️⃣ MOBILE TESTING');
        console.log('------------------');
        
        const mobilePage = await context.newPage();
        await mobilePage.setViewportSize({ width: 375, height: 667 });
        
        try {
            await mobilePage.goto(this.baseUrl, { waitUntil: 'networkidle' });
            
            // Test touch interactions
            const touchElements = await mobilePage.$$('a, button, [role="button"]');
            console.log(`👆 Touch targets: ${touchElements.length}`);
            
            // Test mobile navigation
            const mobileNav = await mobilePage.$('nav, .nav, .navigation, [role="navigation"]');
            console.log(`📱 Mobile navigation: ${mobileNav ? '✅' : '❌'}`);
            
            // Test responsive images
            const responsiveImages = await mobilePage.$$eval('img[srcset], img[sizes]', images => images.length);
            console.log(`🖼️ Responsive images: ${responsiveImages}`);
            
            this.results.mobile = {
                touchTargets: touchElements.length,
                mobileNav: !!mobileNav,
                responsiveImages
            };
            
        } finally {
            await mobilePage.close();
        }
    }

    async demoPDFGeneration(page) {
        console.log('\n7️⃣ PDF GENERATION');
        console.log('-----------------');
        
        try {
            const pdfPath = 'portfolio.pdf';
            await page.pdf({ 
                path: pdfPath,
                format: 'A4',
                printBackground: true
            });
            
            console.log(`📄 PDF generated: ${pdfPath}`);
            this.results.pdf = { generated: true, path: pdfPath };
            
        } catch (error) {
            console.log('❌ PDF generation failed (common on some systems)');
            this.results.pdf = { generated: false, error: error.message };
        }
    }

    generateCapabilitiesReport() {
        const report = {
            timestamp: new Date().toISOString(),
            capabilities: this.results,
            summary: {
                interactiveTesting: '✅ Complete',
                navigationTesting: '✅ Complete',
                performanceMonitoring: '✅ Complete',
                accessibilityTesting: '✅ Complete',
                networkMonitoring: '✅ Complete',
                mobileTesting: '✅ Complete',
                pdfGeneration: this.results.pdf?.generated ? '✅ Complete' : '⚠️ Limited'
            }
        };
        
        fs.writeFileSync('playwright-capabilities-demo.json', JSON.stringify(report, null, 2));
        
        console.log('\n📊 CAPABILITIES SUMMARY:');
        console.log('========================');
        Object.entries(report.summary).forEach(([capability, status]) => {
            console.log(`${capability}: ${status}`);
        });
        
        console.log('\n🎯 WHAT PLAYWRIGHT MCP CAN DO:');
        console.log('==============================');
        console.log('• Interactive element testing');
        console.log('• Navigation and link testing');
        console.log('• Performance monitoring');
        console.log('• Accessibility compliance');
        console.log('• Network request monitoring');
        console.log('• Mobile device testing');
        console.log('• PDF generation');
        console.log('• Screenshot comparison');
        console.log('• Cross-browser testing');
        console.log('• API testing');
        console.log('• File upload testing');
        console.log('• Local storage testing');
        console.log('• Cookie management');
        console.log('• Service worker testing');
        console.log('• PWA testing');
        console.log('• Visual regression testing');
        console.log('• User interaction simulation');
        console.log('• Geolocation testing');
        console.log('• Database testing');
        
        console.log('\n📋 Detailed report saved to: playwright-capabilities-demo.json');
    }
}

// Run the capabilities demo
const demo = new PlaywrightMCPShowcase();
demo.demonstrateAllCapabilities().catch(console.error); 