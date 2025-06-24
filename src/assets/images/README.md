# Portfolio Image Assets

## Required Images

### Stock2coat Project
- **`stock2coat-demo.mp4`** - Video demo of Stock2coat interface (max 5MB recommended)
  - Should show: Dashboard → Stock tracking → Alert system
  - Duration: 5-10 seconds, looped
  - Dimensions: 1280x720px (16:9) or 800x600px (4:3)
  - Format: H.264 codec, web-optimized
  - Optional: `stock2coat-demo.webm` (WebM format for better compression)
  - Fallback: `stock2coat-preview.jpg` (static screenshot as poster)

### Portfolio Project  
- **`portfolio-preview.jpg`** - Screenshot of this portfolio website
  - Dimensions: 800x600px
  - Should show homepage hero section

### Personal
- **`avatar-christophe.jpg`** - Professional headshot (200x200px, square)
  - Fallback: "CVH" initials will be shown

## File Size Guidelines
- **MP4 Videos**: Under 5MB for good mobile performance
- **WebM Videos**: Under 3MB (better compression than MP4)
- **JPGs**: Under 500KB, optimized for web
- Use tools like HandBrake, FFmpeg, or online video compressors for optimization

## Implementation Notes
- All media (images/videos) have automatic fallbacks implemented
- Videos include loading indicators and accessibility support
- Videos respect `prefers-reduced-motion` for accessibility
- Automatic poster image fallback for video loading issues
- Hardware-accelerated playback with `playsinline` for mobile 