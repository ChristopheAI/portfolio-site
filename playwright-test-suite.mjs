// PLAYWRIGHT MCP TEST SUITE
// Continuous monitoring for portfolio website

import { chromium } from 'playwright';
import fs from 'fs';

class PortfolioTestSuite {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.testResults = [];
    }

    async runAllTests() {
        console.log('🧪 Starting Playwright MCP Test Suite...');
        
        const browser = await chromium.launch({ 
            headless: false,
            args: ['--no-sandbox']
        });
        
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        
        const page = await context.newPage();
        
        try {
            // Run all test categories
            await this.testCriticalFunctionality(page);
            await this.testPerformance(page);
            await this.testAccessibility(page);
            await this.testContentQuality(page);
            await this.testVisualElements(page);
            await this.testResponsiveDesign(context);
            
            // Generate test report
            this.generateTestReport();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
        } finally {
            await browser.close();
        }
    }

    async testCriticalFunctionality(page) {
        console.log('🔧 Testing Critical Functionality...');
        
        try {
            // Test page loads
            await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
            this.addTestResult('Page Load', 'PASS', 'Page loaded successfully');
            
            // Test navigation
            const navigationLinks = await page.$$eval('a[href]', links => 
                links.map(link => ({ href: link.href, text: link.textContent?.trim() }))
            );
            
            if (navigationLinks.length > 0) {
                this.addTestResult('Navigation Links', 'PASS', `Found ${navigationLinks.length} navigation links`);
            } else {
                this.addTestResult('Navigation Links', 'FAIL', 'No navigation links found');
            }
            
            // Test for console errors
            const consoleErrors = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    consoleErrors.push(msg.text());
                }
            });
            
            await page.waitForTimeout(2000);
            
            if (consoleErrors.length === 0) {
                this.addTestResult('Console Errors', 'PASS', 'No console errors detected');
            } else {
                this.addTestResult('Console Errors', 'FAIL', `${consoleErrors.length} console errors found`);
            }
            
        } catch (error) {
            this.addTestResult('Critical Functionality', 'FAIL', error.message);
        }
    }

    async testPerformance(page) {
        console.log('⚡ Testing Performance...');
        
        try {
            const startTime = Date.now();
            await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
            const loadTime = Date.now() - startTime;
            
            if (loadTime < 2000) {
                this.addTestResult('Load Time', 'PASS', `Page loaded in ${loadTime}ms`);
            } else {
                this.addTestResult('Load Time', 'WARN', `Page loaded in ${loadTime}ms (slow)`);
            }
            
            // Test for failed requests
            const failedRequests = [];
            page.on('requestfailed', request => {
                failedRequests.push(request.url());
            });
            
            await page.waitForTimeout(2000);
            
            if (failedRequests.length === 0) {
                this.addTestResult('Network Requests', 'PASS', 'All network requests successful');
            } else {
                this.addTestResult('Network Requests', 'FAIL', `${failedRequests.length} failed requests`);
            }
            
        } catch (error) {
            this.addTestResult('Performance', 'FAIL', error.message);
        }
    }

    async testAccessibility(page) {
        console.log('♿ Testing Accessibility...');
        
        try {
            // Test heading structure
            const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
                elements.map(el => ({ tag: el.tagName, text: el.textContent?.trim().substring(0, 30) }))
            );
            
            if (headings.length > 0) {
                this.addTestResult('Heading Structure', 'PASS', `Found ${headings.length} headings`);
            } else {
                this.addTestResult('Heading Structure', 'FAIL', 'No headings found');
            }
            
            // Test image alt text
            const images = await page.$$eval('img', elements => 
                elements.map(el => ({ src: el.src, alt: el.alt }))
            );
            
            const imagesWithoutAlt = images.filter(img => !img.alt);
            
            if (imagesWithoutAlt.length === 0) {
                this.addTestResult('Image Alt Text', 'PASS', 'All images have alt text');
            } else {
                this.addTestResult('Image Alt Text', 'FAIL', `${imagesWithoutAlt.length} images missing alt text`);
            }
            
            // Test for broken images
            const brokenImages = await page.evaluate(() => {
                const images = Array.from(document.querySelectorAll('img'));
                return images.filter(img => {
                    return img.naturalWidth === 0 || img.naturalHeight === 0;
                }).length;
            });
            
            if (brokenImages === 0) {
                this.addTestResult('Broken Images', 'PASS', 'No broken images detected');
            } else {
                this.addTestResult('Broken Images', 'FAIL', `${brokenImages} broken images found`);
            }
            
        } catch (error) {
            this.addTestResult('Accessibility', 'FAIL', error.message);
        }
    }

    async testContentQuality(page) {
        console.log('📝 Testing Content Quality...');
        
        try {
            const content = await page.evaluate(() => {
                const bodyText = document.body.innerText;
                const title = document.title;
                return { bodyText, title };
            });
            
            // Test content length
            const wordCount = content.bodyText.split(/\s+/).filter(word => word.length > 0).length;
            
            if (wordCount > 100) {
                this.addTestResult('Content Length', 'PASS', `${wordCount} words of content`);
            } else {
                this.addTestResult('Content Length', 'WARN', `Only ${wordCount} words of content`);
            }
            
            // Test for Dutch content
            const hasDutchContent = content.bodyText.toLowerCase().includes('vlaanderen') || 
                                   content.bodyText.toLowerCase().includes('belgië');
            
            if (hasDutchContent) {
                this.addTestResult('Dutch Content', 'PASS', 'Dutch/Flemish content detected');
            } else {
                this.addTestResult('Dutch Content', 'WARN', 'No Dutch/Flemish content detected');
            }
            
            // Test for B2B terms
            const b2bTerms = ['enterprise', 'b2b', 'software', 'development', 'consultancy'];
            const foundB2bTerms = b2bTerms.filter(term => 
                content.bodyText.toLowerCase().includes(term.toLowerCase())
            );
            
            if (foundB2bTerms.length > 0) {
                this.addTestResult('B2B Content', 'PASS', `Found ${foundB2bTerms.length} B2B terms`);
            } else {
                this.addTestResult('B2B Content', 'WARN', 'No B2B terms detected');
            }
            
        } catch (error) {
            this.addTestResult('Content Quality', 'FAIL', error.message);
        }
    }

    async testVisualElements(page) {
        console.log('🖼️ Testing Visual Elements...');
        
        try {
            // Test CSS loading
            const stylesheets = await page.$$eval('link[rel="stylesheet"]', links => links.length);
            
            if (stylesheets > 0) {
                this.addTestResult('CSS Loading', 'PASS', `${stylesheets} stylesheets loaded`);
            } else {
                this.addTestResult('CSS Loading', 'FAIL', 'No stylesheets loaded');
            }
            
            // Test for responsive design indicators
            const hasViewportMeta = await page.$eval('meta[name="viewport"]', () => true).catch(() => false);
            
            if (hasViewportMeta) {
                this.addTestResult('Responsive Meta', 'PASS', 'Viewport meta tag present');
            } else {
                this.addTestResult('Responsive Meta', 'WARN', 'No viewport meta tag');
            }
            
        } catch (error) {
            this.addTestResult('Visual Elements', 'FAIL', error.message);
        }
    }

    async testResponsiveDesign(context) {
        console.log('📱 Testing Responsive Design...');
        
        const breakpoints = [
            { name: 'Mobile', width: 375, height: 667 },
            { name: 'Tablet', width: 768, height: 1024 },
            { name: 'Desktop', width: 1920, height: 1080 }
        ];
        
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
                
                if (!hasHorizontalScroll) {
                    this.addTestResult(`${breakpoint.name} Layout`, 'PASS', 'No horizontal scroll');
                } else {
                    this.addTestResult(`${breakpoint.name} Layout`, 'FAIL', 'Horizontal scroll detected');
                }
                
            } catch (error) {
                this.addTestResult(`${breakpoint.name} Layout`, 'FAIL', error.message);
            } finally {
                await page.close();
            }
        }
    }

    addTestResult(testName, status, message) {
        this.testResults.push({
            test: testName,
            status: status,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        const emoji = status === 'PASS' ? '✅' : status === 'WARN' ? '⚠️' : '❌';
        console.log(`${emoji} ${testName}: ${message}`);
    }

    generateTestReport() {
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.status === 'PASS').length;
        const failedTests = this.testResults.filter(r => r.status === 'FAIL').length;
        const warningTests = this.testResults.filter(r => r.status === 'WARN').length;
        
        const successRate = Math.round((passedTests / totalTests) * 100);
        
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests,
                passedTests,
                failedTests,
                warningTests,
                successRate
            },
            results: this.testResults,
            recommendations: this.generateRecommendations()
        };
        
        // Save report
        fs.writeFileSync('playwright-test-report.json', JSON.stringify(report, null, 2));
        
        // Print summary
        console.log('\n📊 TEST SUITE SUMMARY:');
        console.log('======================');
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests} ✅`);
        console.log(`Warnings: ${warningTests} ⚠️`);
        console.log(`Failed: ${failedTests} ❌`);
        console.log(`Success Rate: ${successRate}%`);
        
        if (successRate >= 90) {
            console.log('🎉 Excellent! Portfolio is in great shape!');
        } else if (successRate >= 75) {
            console.log('👍 Good! Some minor improvements needed.');
        } else {
            console.log('⚠️ Needs attention! Several issues to address.');
        }
        
        console.log('\n📋 Detailed report saved to: playwright-test-report.json');
    }

    generateRecommendations() {
        const recommendations = [];
        
        const failedTests = this.testResults.filter(r => r.status === 'FAIL');
        const warningTests = this.testResults.filter(r => r.status === 'WARN');
        
        failedTests.forEach(test => {
            recommendations.push(`Fix: ${test.test} - ${test.message}`);
        });
        
        warningTests.forEach(test => {
            recommendations.push(`Improve: ${test.test} - ${test.message}`);
        });
        
        return recommendations;
    }
}

// Run the test suite
const testSuite = new PortfolioTestSuite();
testSuite.runAllTests().catch(console.error); 