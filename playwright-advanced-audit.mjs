// ADVANCED PLAYWRIGHT MCP AUDIT
// Comprehensive testing for premium B2B portfolio

import { chromium } from 'playwright';
import fs from 'fs';

class AdvancedPortfolioAuditor {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.results = {};
        this.screenshots = [];
    }

    async runAdvancedAudit() {
        console.log('🚀 Starting Advanced Playwright MCP Audit...');
        
        const browser = await chromium.launch({ 
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        
        const page = await context.newPage();
        
        try {
            // 1. PERFORMANCE AUDIT
            await this.auditPerformance(page);
            
            // 2. ACCESSIBILITY AUDIT
            await this.auditAccessibility(page);
            
            // 3. CONTENT AUDIT
            await this.auditContent(page);
            
            // 4. VISUAL AUDIT
            await this.auditVisualElements(page);
            
            // 5. RESPONSIVE DESIGN AUDIT
            await this.auditResponsiveDesign(context);
            
            // Generate comprehensive report
            this.generateAdvancedReport();
            
        } catch (error) {
            console.error('❌ Advanced audit failed:', error);
        } finally {
            await browser.close();
        }
    }

    async auditPerformance(page) {
        console.log('⚡ Performance Audit...');
        
        const startTime = Date.now();
        
        await page.goto(this.baseUrl, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        const loadTime = Date.now() - startTime;
        
        // Check for failed resources
        const failedRequests = [];
        page.on('requestfailed', request => {
            failedRequests.push({
                url: request.url(),
                failure: request.failure()?.errorText
            });
        });
        
        await page.waitForTimeout(2000);
        
        this.results.performance = {
            loadTime,
            failedRequests,
            score: this.calculatePerformanceScore(loadTime, failedRequests.length)
        };
        
        console.log(`⏱️ Load time: ${loadTime}ms`);
        console.log(`📊 Performance score: ${this.results.performance.score}/100`);
    }

    async auditAccessibility(page) {
        console.log('♿ Accessibility Audit...');
        
        // Check heading structure
        const headings = await page.evaluate(() => {
            const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            return Array.from(headingElements).map((el, index) => ({
                level: parseInt(el.tagName.charAt(1)),
                text: el.textContent?.trim().substring(0, 50),
                index
            }));
        });
        
        // Check images for alt text
        const images = await page.evaluate(() => {
            const imgElements = document.querySelectorAll('img');
            return Array.from(imgElements).map(img => ({
                src: img.src,
                alt: img.alt,
                hasAlt: !!img.alt
            }));
        });
        
        const imagesWithoutAlt = images.filter(img => !img.hasAlt);
        
        this.results.accessibility = {
            headings,
            images,
            imagesWithoutAlt: imagesWithoutAlt.length,
            score: this.calculateAccessibilityScore(headings.length, imagesWithoutAlt.length)
        };
        
        console.log(`📋 Headings: ${headings.length}`);
        console.log(`🖼️ Images without alt: ${imagesWithoutAlt.length}`);
        console.log(`📊 Accessibility score: ${this.results.accessibility.score}/100`);
    }

    async auditContent(page) {
        console.log('📝 Content Audit...');
        
        const content = await page.evaluate(() => {
            const bodyText = document.body.innerText;
            const title = document.title;
            const metaDescription = document.querySelector('meta[name="description"]')?.content;
            
            // Check for key sections
            const sections = {
                hero: !!document.querySelector('.hero, .hero-section, #hero, [class*="hero"]'),
                about: !!document.querySelector('.about, .about-section, #about, [class*="about"]'),
                projects: !!document.querySelector('.projects, .projects-section, #projects, [class*="projects"]'),
                contact: !!document.querySelector('.contact, .contact-section, #contact, [class*="contact"]')
            };
            
            return { bodyText, title, metaDescription, sections };
        });
        
        // Check for Dutch/Flemish content
        const dutchTerms = ['vlaanderen', 'belgië', 'nederlands', 'vlaams', 'antwerpen', 'gent', 'brugge', 'leuven'];
        const foundDutchTerms = dutchTerms.filter(term => 
            content.bodyText.toLowerCase().includes(term.toLowerCase())
        );
        
        // Check for B2B terms
        const b2bTerms = ['enterprise', 'b2b', 'software', 'development', 'consultancy', 'business', 'professional'];
        const foundB2bTerms = b2bTerms.filter(term => 
            content.bodyText.toLowerCase().includes(term.toLowerCase())
        );
        
        const wordCount = content.bodyText.split(/\s+/).filter(word => word.length > 0).length;
        
        this.results.content = {
            title: content.title,
            metaDescription: content.metaDescription,
            wordCount,
            sections: content.sections,
            dutchTermsFound: foundDutchTerms,
            b2bTermsFound: foundB2bTerms,
            hasDutchContent: foundDutchTerms.length > 0,
            hasB2bContent: foundB2bTerms.length > 0,
            score: this.calculateContentScore(wordCount, foundDutchTerms.length, foundB2bTerms.length, content.sections)
        };
        
        console.log(`📝 Word count: ${wordCount}`);
        console.log(`🇳🇱 Dutch terms: ${foundDutchTerms.length}/${dutchTerms.length}`);
        console.log(`🏢 B2B terms: ${foundB2bTerms.length}/${b2bTerms.length}`);
        console.log(`📊 Content score: ${this.results.content.score}/100`);
    }

    async auditVisualElements(page) {
        console.log('🖼️ Visual Elements Audit...');
        
        // Check for broken images
        const brokenImages = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.filter(img => {
                return img.naturalWidth === 0 || img.naturalHeight === 0;
            }).map(img => ({ src: img.src, alt: img.alt }));
        });
        
        // Check for CSS and styling
        const stylesheets = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
                .map(link => link.href);
        });
        
        this.results.visual = {
            brokenImages,
            brokenImagesCount: brokenImages.length,
            stylesheets,
            score: this.calculateVisualScore(brokenImages.length, stylesheets.length)
        };
        
        console.log(`🖼️ Broken images: ${brokenImages.length}`);
        console.log(`🎨 Stylesheets: ${stylesheets.length}`);
        console.log(`📊 Visual score: ${this.results.visual.score}/100`);
    }

    async auditResponsiveDesign(context) {
        console.log('📱 Responsive Design Audit...');
        
        const breakpoints = [
            { name: 'Mobile', width: 375, height: 667 },
            { name: 'Tablet', width: 768, height: 1024 },
            { name: 'Desktop', width: 1920, height: 1080 }
        ];
        
        const responsiveResults = [];
        
        for (const breakpoint of breakpoints) {
            const page = await context.newPage();
            await page.setViewportSize(breakpoint);
            
            try {
                await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
                await page.waitForTimeout(1000);
                
                // Check for horizontal scroll
                const hasHorizontalScroll = await page.evaluate(() => {
                    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
                });
                
                // Take screenshot
                const screenshotPath = `portfolio-${breakpoint.name.toLowerCase()}.png`;
                await page.screenshot({ path: screenshotPath });
                this.screenshots.push(screenshotPath);
                
                responsiveResults.push({
                    breakpoint: breakpoint.name,
                    width: breakpoint.width,
                    height: breakpoint.height,
                    hasHorizontalScroll,
                    screenshot: screenshotPath
                });
                
                console.log(`${breakpoint.name}: ${hasHorizontalScroll ? '❌ Horizontal scroll' : '✅ No horizontal scroll'}`);
                
            } catch (error) {
                console.error(`Error testing ${breakpoint.name}:`, error);
            } finally {
                await page.close();
            }
        }
        
        this.results.responsive = responsiveResults;
    }

    calculatePerformanceScore(loadTime, failedRequests) {
        let score = 100;
        if (loadTime > 3000) score -= 30;
        else if (loadTime > 2000) score -= 15;
        score -= failedRequests * 10;
        return Math.max(0, score);
    }

    calculateAccessibilityScore(headings, imagesWithoutAlt) {
        let score = 100;
        if (headings === 0) score -= 30;
        score -= imagesWithoutAlt * 5;
        return Math.max(0, score);
    }

    calculateContentScore(wordCount, dutchTerms, b2bTerms, sections) {
        let score = 100;
        if (wordCount < 100) score -= 20;
        if (dutchTerms === 0) score -= 25;
        if (b2bTerms === 0) score -= 25;
        const sectionCount = Object.values(sections).filter(Boolean).length;
        if (sectionCount < 3) score -= 15;
        return Math.max(0, score);
    }

    calculateVisualScore(brokenImages, stylesheets) {
        let score = 100;
        score -= brokenImages * 20;
        if (stylesheets === 0) score -= 30;
        return Math.max(0, score);
    }

    generateAdvancedReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: this.baseUrl,
            summary: {
                performance: this.results.performance?.score || 0,
                accessibility: this.results.accessibility?.score || 0,
                content: this.results.content?.score || 0,
                visual: this.results.visual?.score || 0
            },
            details: this.results,
            screenshots: this.screenshots,
            recommendations: this.generateRecommendations(),
            overallScore: this.calculateOverallScore()
        };
        
        // Save detailed report
        fs.writeFileSync('playwright-advanced-report.json', JSON.stringify(report, null, 2));
        
        // Print summary
        console.log('\n📊 ADVANCED AUDIT SUMMARY:');
        console.log('==========================');
        console.log(`Overall Score: ${report.overallScore}/100`);
        console.log(`Performance: ${report.summary.performance}/100`);
        console.log(`Accessibility: ${report.summary.accessibility}/100`);
        console.log(`Content: ${report.summary.content}/100`);
        console.log(`Visual: ${report.summary.visual}/100`);
        console.log(`Screenshots: ${this.screenshots.join(', ')}`);
        console.log('\n📋 Detailed report saved to: playwright-advanced-report.json');
    }

    calculateOverallScore() {
        const scores = [
            this.results.performance?.score || 0,
            this.results.accessibility?.score || 0,
            this.results.content?.score || 0,
            this.results.visual?.score || 0
        ];
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.results.performance?.score < 80) {
            recommendations.push('Optimize page load performance - consider lazy loading and image optimization');
        }
        
        if (this.results.accessibility?.score < 80) {
            recommendations.push('Improve accessibility - add alt text to images and ensure proper heading hierarchy');
        }
        
        if (this.results.content?.score < 80) {
            recommendations.push('Enhance content - add more Dutch content and B2B-focused messaging');
        }
        
        if (this.results.visual?.score < 80) {
            recommendations.push('Fix visual issues - replace broken images and ensure responsive design');
        }
        
        return recommendations;
    }
}

// Run the advanced audit
const auditor = new AdvancedPortfolioAuditor();
auditor.runAdvancedAudit().catch(console.error); 