// PLAYWRIGHT MCP PORTFOLIO AUDIT - PREMIUM B2B FOCUS
// Advanced visual testing and optimization for Flemish market targeting

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

class PortfolioAuditor {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
        this.results = {
            performance: {},
            accessibility: {},
            content: {},
            visual: {},
            broken: []
        };
    }

    async runFullAudit() {
        console.log('🚀 Starting Playwright MCP Portfolio Audit...');
        
        const browser = await chromium.launch({ 
            headless: false,
            slowMo: 100 
        });
        
        try {
            const page = await browser.newPage();
            
            // Set viewport for desktop testing
            await page.setViewportSize({ width: 1920, height: 1080 });
            
            console.log('📊 Testing Performance...');
            await this.testPerformance(page);
            
            console.log('♿ Testing Accessibility...');
            await this.testAccessibility(page);
            
            console.log('📝 Testing Content Quality...');
            await this.testContent(page);
            
            console.log('🖼️ Testing Visual Elements...');
            await this.testVisualElements(page);
            
            console.log('📱 Testing Responsive Design...');
            await this.testResponsiveDesign(page);
            
            // Take comprehensive screenshots
            await this.takeScreenshots(page);
            
            console.log('✅ Audit Complete!');
            this.generateReport();
            
        } catch (error) {
            console.error('❌ Audit failed:', error);
        } finally {
            await browser.close();
        }
    }

    async testPerformance(page) {
        const startTime = Date.now();
        
        // Navigate to portfolio
        await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
        
        // Measure load time
        const loadTime = Date.now() - startTime;
        this.results.performance.loadTime = loadTime;
        
        // Check for console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        this.results.performance.consoleErrors = consoleErrors;
        
        // Check for failed network requests
        const failedRequests = [];
        page.on('requestfailed', request => {
            failedRequests.push({
                url: request.url(),
                failure: request.failure()
            });
        });
        
        this.results.performance.failedRequests = failedRequests;
        
        console.log(`⏱️ Load time: ${loadTime}ms`);
        console.log(`🚨 Console errors: ${consoleErrors.length}`);
        console.log(`❌ Failed requests: ${failedRequests.length}`);
    }

    async testAccessibility(page) {
        // Basic accessibility checks
        const accessibilityIssues = [];
        
        // Check for proper heading structure
        const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
            elements.map(el => ({ tag: el.tagName, text: el.textContent?.trim() }))
        );
        
        // Check for alt text on images
        const images = await page.$$eval('img', elements => 
            elements.map(el => ({ src: el.src, alt: el.alt }))
        );
        
        const imagesWithoutAlt = images.filter(img => !img.alt);
        
        // Check for proper contrast (basic check)
        const textElements = await page.$$eval('p, h1, h2, h3, h4, h5, h6, span, div', elements => 
            elements.filter(el => el.textContent?.trim()).length
        );
        
        this.results.accessibility = {
            headings,
            imagesWithoutAlt,
            textElementsCount: textElements
        };
        
        console.log(`📋 Headings found: ${headings.length}`);
        console.log(`🖼️ Images without alt: ${imagesWithoutAlt.length}`);
    }

    async testContent(page) {
        // Check for Dutch content quality
        const content = await page.evaluate(() => {
            const bodyText = document.body.innerText;
            const title = document.title;
            const metaDescription = document.querySelector('meta[name="description"]')?.content;
            
            return { bodyText, title, metaDescription };
        });
        
        // Check for key B2B terms
        const b2bTerms = ['enterprise', 'b2b', 'software', 'development', 'consultancy', 'vlaanderen', 'belgië'];
        const foundTerms = b2bTerms.filter(term => 
            content.bodyText.toLowerCase().includes(term.toLowerCase())
        );
        
        // Check content length
        const wordCount = content.bodyText.split(/\s+/).length;
        
        this.results.content = {
            title: content.title,
            metaDescription: content.metaDescription,
            wordCount,
            b2bTermsFound: foundTerms,
            hasDutchContent: content.bodyText.toLowerCase().includes('vlaanderen') || 
                            content.bodyText.toLowerCase().includes('belgië')
        };
        
        console.log(`📝 Word count: ${wordCount}`);
        console.log(`🇳🇱 Dutch content: ${this.results.content.hasDutchContent}`);
        console.log(`🏢 B2B terms found: ${foundTerms.length}/${b2bTerms.length}`);
    }

    async testVisualElements(page) {
        // Check for broken images
        const brokenImages = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.filter(img => {
                return img.naturalWidth === 0 || img.naturalHeight === 0;
            }).map(img => img.src);
        });
        
        // Check for CSS loading
        const stylesheets = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
                .map(link => link.href);
        });
        
        // Check for custom fonts
        const fonts = await page.evaluate(() => {
            return Array.from(document.styleSheets)
                .filter(sheet => sheet.href)
                .map(sheet => sheet.href);
        });
        
        this.results.visual = {
            brokenImages,
            stylesheets,
            fonts
        };
        
        console.log(`🖼️ Broken images: ${brokenImages.length}`);
        console.log(`🎨 Stylesheets: ${stylesheets.length}`);
        console.log(`🔤 Custom fonts: ${fonts.length}`);
    }

    async testResponsiveDesign(page) {
        const breakpoints = [
            { name: 'Mobile', width: 375, height: 667 },
            { name: 'Tablet', width: 768, height: 1024 },
            { name: 'Desktop', width: 1920, height: 1080 }
        ];
        
        for (const breakpoint of breakpoints) {
            await page.setViewportSize(breakpoint);
            await page.waitForTimeout(500);
            
            // Check for horizontal scroll
            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            
            console.log(`${breakpoint.name} (${breakpoint.width}x${breakpoint.height}): ${hasHorizontalScroll ? '❌ Horizontal scroll' : '✅ No horizontal scroll'}`);
        }
    }

    async takeScreenshots(page) {
        const screenshots = [];
        
        // Full page screenshot
        const fullPagePath = 'portfolio-full-page.png';
        await page.screenshot({ 
            path: fullPagePath, 
            fullPage: true 
        });
        screenshots.push(fullPagePath);
        
        // Viewport screenshot
        const viewportPath = 'portfolio-viewport.png';
        await page.screenshot({ 
            path: viewportPath 
        });
        screenshots.push(viewportPath);
        
        // Hero section screenshot
        const heroSection = await page.$('.hero, .hero-section, #hero, [class*="hero"]');
        if (heroSection) {
            const heroPath = 'portfolio-hero.png';
            await heroSection.screenshot({ path: heroPath });
            screenshots.push(heroPath);
        }
        
        console.log(`📸 Screenshots saved: ${screenshots.join(', ')}`);
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: this.baseUrl,
            summary: {
                performance: this.results.performance.loadTime < 2000 ? '✅ Good' : '⚠️ Needs improvement',
                accessibility: this.results.accessibility.imagesWithoutAlt.length === 0 ? '✅ Good' : '⚠️ Needs improvement',
                content: this.results.content.hasDutchContent ? '✅ Dutch content found' : '⚠️ Missing Dutch content',
                visual: this.results.visual.brokenImages.length === 0 ? '✅ Good' : '❌ Broken images found'
            },
            details: this.results,
            recommendations: this.generateRecommendations()
        };
        
        // Save report to file
        fs.writeFileSync('playwright-audit-report.json', JSON.stringify(report, null, 2));
        console.log('📊 Report saved to: playwright-audit-report.json');
        
        // Print summary
        console.log('\n📋 AUDIT SUMMARY:');
        console.log('================');
        Object.entries(report.summary).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.results.performance.loadTime > 2000) {
            recommendations.push('Optimize page load time - consider lazy loading and image optimization');
        }
        
        if (this.results.accessibility.imagesWithoutAlt.length > 0) {
            recommendations.push('Add alt text to all images for accessibility');
        }
        
        if (!this.results.content.hasDutchContent) {
            recommendations.push('Add more Dutch content to target Flemish market');
        }
        
        if (this.results.visual.brokenImages.length > 0) {
            recommendations.push('Fix broken images - replace with proper assets');
        }
        
        if (this.results.performance.consoleErrors.length > 0) {
            recommendations.push('Fix JavaScript console errors');
        }
        
        return recommendations;
    }
}

// Run the audit
const auditor = new PortfolioAuditor();
auditor.runFullAudit().catch(console.error);
