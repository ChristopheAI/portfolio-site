# TASK-006: Featured Projects Section Test Specifications

## Test Suite: Featured Projects Showcase

### 1. Project Card Layout Tests

**Test Case: Grid Layout & Responsiveness**
- [ ] Projects displayed in responsive grid (2 columns desktop, 1 column mobile)
- [ ] Cards have consistent heights and spacing
- [ ] Grid adapts smoothly on screen resize
- [ ] No horizontal overflow on any device
- [ ] Proper spacing between cards (24px gap)

**Test Case: Card Visual Design**
- [ ] Each card has subtle shadow/border
- [ ] Hover effects work smoothly
- [ ] Card corners rounded consistently
- [ ] Background colors/gradients applied correctly
- [ ] Typography hierarchy clear within cards

### 2. Project Content Tests

**Test Case: Stock2coat Project (Priority)**
- [ ] Prominently featured (first position or larger size)
- [ ] "🚧 Currently Building" badge visible
- [ ] Clear description of inventory management purpose
- [ ] Technology stack badges displayed
- [ ] Links to demo/repo (if available)
- [ ] Professional project description

**Test Case: Portfolio Website Project**
- [ ] Positioned as meta-project showcase
- [ ] "View Source" link prominent
- [ ] Performance metrics mentioned (Lighthouse score)
- [ ] Technology stack: Vite, Vanilla JS, CSS
- [ ] Self-referential humor/cleverness appropriate

**Test Case: Project Information Quality**
- [ ] Each project has compelling title
- [ ] Descriptions focus on business value/problem solving
- [ ] Technology choices justified implicitly
- [ ] Professional tone throughout
- [ ] Call-to-action buttons clear

### 3. Interactive Elements Tests

**Test Case: Hover Effects**
- [ ] Cards lift/scale slightly on hover
- [ ] Smooth transitions (0.3s ease)
- [ ] Color changes subtle but noticeable
- [ ] No jarring movements or flashing
- [ ] Hover effects work on desktop only

**Test Case: Action Buttons**
- [ ] "Live Demo" buttons styled prominently
- [ ] "View Code" buttons secondary styling
- [ ] Links open in new tabs
- [ ] Hover states for all buttons
- [ ] Keyboard accessible

**Test Case: Technology Badges**
- [ ] Tech stack displayed as styled badges
- [ ] Consistent badge styling across projects
- [ ] Appropriate colors for different technologies
- [ ] Badges wrap properly on smaller screens
- [ ] Tooltips/labels clear

### 4. Content Strategy Tests

**Test Case: Messaging Effectiveness**
- [ ] Projects demonstrate progression/growth
- [ ] Mix of technologies shown
- [ ] Problem-solving approach highlighted
- [ ] Business impact mentioned where relevant
- [ ] Unique value proposition clear

**Test Case: Credibility Building**
- [ ] Live demos actually work
- [ ] GitHub links lead to quality code
- [ ] Project descriptions honest but compelling
- [ ] No broken links or placeholder content
- [ ] Professional presentation throughout

### 5. Performance Tests

**Test Case: Loading & Rendering**
- [ ] Section loads within 1 second
- [ ] Images optimized and load quickly
- [ ] No layout shift during load
- [ ] Smooth scrolling to section
- [ ] No performance impact from animations

**Test Case: Image Optimization**
- [ ] Project screenshots optimized (WebP/AVIF)
- [ ] Proper alt text for all images
- [ ] Lazy loading for below-fold images
- [ ] Fallback images if screenshots fail
- [ ] Appropriate image dimensions

### 6. Mobile Experience Tests

**Test Case: Mobile Layout (375px)**
- [ ] Single column layout works perfectly
- [ ] Cards stack vertically with proper spacing
- [ ] Touch targets minimum 44px
- [ ] Text remains readable
- [ ] Images scale appropriately

**Test Case: Tablet Layout (768px)**
- [ ] 2-column layout or appropriate adaptation
- [ ] Landscape orientation handled
- [ ] Touch interactions work smoothly
- [ ] Content balanced across screen

### 7. Accessibility Tests

**Test Case: Screen Reader Support**
- [ ] Proper heading structure (h2 for section, h3 for projects)
- [ ] Alt text for all images descriptive
- [ ] Links have descriptive text
- [ ] Focus indicators visible
- [ ] Logical tab order

**Test Case: Keyboard Navigation**
- [ ] All interactive elements focusable
- [ ] Focus indicators clearly visible
- [ ] Tab order logical and intuitive
- [ ] Enter/Space activate buttons
- [ ] No keyboard traps

## Acceptance Criteria Summary

### ✅ PASS Criteria:
- All project cards display correctly
- Stock2coat prominently featured
- Interactive elements work smoothly
- Mobile responsive design
- Fast loading performance
- Professional content quality
- Accessibility compliant

### ❌ FAIL Criteria:
- Broken demo/repo links
- Poor mobile experience
- Slow loading (>2 seconds)
- Unprofessional content
- Accessibility violations
- Layout breaks on any device

## Content Requirements

### Stock2coat Project:
- **Title**: "Stock2coat - Smart Inventory Management"
- **Status**: "🚧 Currently Building"
- **Description**: Focus on problem-solving and technical approach
- **Tech Stack**: Display relevant technologies used
- **Links**: Demo (if available), GitHub (if public)

### Portfolio Website Project:
- **Title**: "Portfolio Website - Performance-First Design"
- **Status**: "✅ Live"
- **Description**: Meta-commentary on build process and decisions
- **Tech Stack**: Vite, Vanilla JS, Modern CSS
- **Links**: View Source (GitHub), Live Demo (current site)

## Performance Benchmarks

**Target Metrics:**
- Section load time: <1 second
- Image optimization: <200KB per screenshot
- Hover animations: 60fps
- Mobile scroll performance: smooth
- Lighthouse score impact: minimal

---

**QA Notes**: This section is where recruiters will spend the most time. Every detail must be perfect, from working links to compelling descriptions. Projects should tell a story of growth and capability.

# Projects Section QA Tests

## TASK-010: Projects Section Enhancement Tests

### Test 1: GitHub Links Validation
```javascript
test('Portfolio GitHub link should point to correct repository', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const githubLink = page.locator('a[href*="github.com"]').first();
  expect(await githubLink.getAttribute('href')).toBe('https://github.com/ChristopheAI/portfolio-site');
});
```

### Test 2: External Links Behavior
```javascript
test('All external links should open in new tab', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"])');
  const count = await externalLinks.count();
  
  for (let i = 0; i < count; i++) {
    const target = await externalLinks.nth(i).getAttribute('target');
    expect(target).toBe('_blank');
  }
});
```

### Test 3: Project Cards Hover Effects
```javascript
test('Project cards should have hover effects', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const projectCard = page.locator('.project-card').first();
  
  // Check initial state
  const initialTransform = await projectCard.evaluate(el => 
    getComputedStyle(el).transform
  );
  
  // Hover and check change
  await projectCard.hover();
  await page.waitForTimeout(300);
  
  const hoverTransform = await projectCard.evaluate(el => 
    getComputedStyle(el).transform
  );
  
  expect(hoverTransform).not.toBe(initialTransform);
});
```

### Test 4: Case Study Link Validation
```javascript
test('Stock2coat case study link should work', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const caseStudyLink = page.locator('a[href="/stock2coat-case-study.html"]');
  expect(await caseStudyLink.count()).toBeGreaterThan(0);
  
  // Test that the link is accessible
  const response = await page.request.get('/stock2coat-case-study.html');
  expect(response.status()).toBe(200);
}); 