# Roiyan NextJS Project Guide

## Project Overview
**Name:** uae-digital-fresh  
**Type:** Next.js 15 Frontend (App Router)  
**Deployed:** Vercel  
**Purpose:** Modern digital website with animations and 3D elements

## Tech Stack
- **Framework:** Next.js 15 (Turbopack enabled)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion, GSAP, Three.js
- **UI Components:** shadcn/ui (implied from UI/UX Pro Max)
- **Email:** EmailJS
- **API Client:** GraphQL Request

## Project Structure
```
├── app/                      # Next.js App Router
│   ├── (marketing)/         # Marketing pages
│   ├── cases/               # Case studies
│   ├── services/            # Service pages
│   ├── solutions/           # Solution pages
│   └── layout.tsx           # Root layout
├── components/              # Reusable components
│   ├── booking/            # Booking components
│   ├── landing/            # Landing page components
│   └── home/               # Home page components
├── public/                  # Static assets
├── .claude/                # Claude Code skills (UI/UX Pro Max)
└── .env.local              # Local environment variables
```

## Git Workflow
- **Main branch:** `master` (production-ready)
- **Feature branches:** `feature/*` for new features
- **Design branches:** `design/*` for UI/UX changes
- **Current redesign branch:** `claude/install-ui-ux-pro-max-kijwp8`
- **Commit convention:** Clear, descriptive messages
- **Author:** Claude (noreply@anthropic.com)

## Development Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Design & UI Enhancement
- **UI/UX Pro Max Skills:** Available in `.claude/skills/`
  - `/ui-ux-pro-max` - Design intelligence and best practices
  - `/design` - Design creation and mockups
  - `/ui-styling` - Tailwind & shadcn/ui styling
  - `/design-system` - Token architecture
  - `/brand` - Brand identity and guidelines

## Component Styling Guidelines
- Use Tailwind CSS utility classes (primary)
- shadcn/ui components for common patterns
- Framer Motion for animations
- GSAP for complex timeline animations
- Three.js for 3D elements

## Deployment
- **Platform:** Vercel
- **Branch:** Push to `master` for auto-deployment
- **Environment Variables:** Use .env.local locally, Vercel dashboard for production

## Redesign Focus Areas
- Component library enhancement
- Design system consistency
- Animation optimization
- Accessibility improvements
- Mobile responsiveness
- Performance optimization

## Notes for Claude Code
- Use `/ui-styling` for component styling changes
- Use `/design` for creating visual mockups
- Use `/ui-ux-pro-max` for design best practices
- Test all changes locally with `npm run dev` before pushing
- Ensure Vercel deployment succeeds before closing tasks
