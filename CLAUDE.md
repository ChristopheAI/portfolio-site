# Portfolio Website Project - Complete Setup

## Tech Stack
- Vite + vanilla JS
- HTML/CSS/JavaScript  
- Development: yarn dev
- Build: yarn build

## Development Workflow
1. Start ccusage monitoring: `npx ccusage@latest blocks --live`
2. yarn install (first time)
3. yarn dev (development) 
4. Open localhost:5173

## Multi-Agent Rules (AUTO-SPAWN)
- Spawn subagents for parallel tasks without asking permission
- Use subagents for: testing, optimization, bug fixes, feature additions
- Each subagent must read this CLAUDE.md first
- Write comprehensive tests for every feature/change
- Auto-fix any issues found during testing

## Common Issues & Solutions
- npm cache problems on macOS → use yarn
- Port conflicts → use 3000 or 5173  
- Asset loading → check vite config

## MCP Tools Available
- Supabase integration
- Context7 for advanced analysis
- Playwright for visual testing

## Preferences
- Use yarn over npm
- Dutch/English mixed communication OK
- Focus on performance and user experience
- Deploy-ready code always