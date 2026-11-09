---
name: bengali-wedding-invitation-development
description: Build and evolve the interactive Bengali wedding invitation website using React, TypeScript, and Vite. Follow the project's visual direction, technical constraints, staged implementation plan, and asset-integration rules.
---

# Bengali Wedding Invitation Website — Development Skill

## Purpose

Use this skill when developing, refactoring, reviewing, or extending the interactive Bengali wedding invitation website.

Build an elegant, visually immersive, five-screen digital invitation that combines traditional Bengali wedding aesthetics with modern interaction design. The experience should feel like a handcrafted wedding scrapbook brought to life through paper textures, layered imagery, refined typography, and subtle transitions.

**Primary rule:** Build the functional foundation first. Do not invent wedding content or create decorative artwork that has not been supplied.

---

## 1. Project Stack

Core stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Three.js
- TSParticles
- Lottie React
- Howler.js

Use each library only for its intended responsibility. Add dependencies only when they provide a meaningful improvement.

| Technology | Responsibility |
|---|---|
| React + TypeScript | Application structure, components, state, and types |
| Vite | Development server and build tooling |
| Tailwind CSS | Utility-first styling |
| GSAP | Marquee animation and page transitions |
| GSAP ScrollTrigger | Only for future decorative scroll effects, if needed |
| CSS 3D transforms | Physical page-turn effect |
| Howler.js | Background music and sound effects |
| Three.js | Future 3D decorative experiences |
| TSParticles | Future ambient particle effects |
| Lottie React | Future animated illustrations |

Do not use scrolling, ScrollTrigger, mouse-wheel input, or swipe gestures to navigate between invitation screens.

---

## 2. Visual Direction

The design has two main visual layers:

1. A continuously animated photographic marquee in the background.
2. Five translucent invitation screens above the marquee.

Use this visual language:

- Traditional Bengali wedding aesthetics.
- Peach, ivory, cream, and muted terracotta palette.
- Handcrafted paper textures, subtle grain, and natural imperfections.
- Elegant Bengali typography paired with complementary English serif typography.
- Restrained ornamental borders.
- Frosted-glass effects and soft shadows.
- Layered scrapbook-like photographic presentation.

Avoid generic wedding-template styling, excessive animation, arbitrary decoration, and visual clutter.

The invitation panels must remain readable while allowing the background imagery to show through.

---

## 3. Development Stages

Work in the following stages. Complete and validate each stage before moving to the next. Do not prematurely implement future-stage features.

### Stage 1 — Foundation and Project Structure

1. Inspect the existing Vite project before changing configuration.
2. Inspect the existing `verticalmarq` image folder and identify suitable images.
3. Configure Tailwind CSS in the existing project.
4. Establish global styles, design tokens, and typography configuration.
5. Create the modular folder and component structure.
6. Keep existing working code intact unless a change is necessary.

Suggested structure:

```text
src/
├── assets/
│   ├── images/
│   ├── textures/
│   ├── animations/
│   ├── music/
│   └── decorations/
│       ├── alpana/
│       ├── verticalmarq/
│       └── wedding-motifs/
├── components/
│   ├── BackgroundMarquee.tsx
│   ├── InvitationContainer.tsx
│   ├── NavigationArrows.tsx
│   ├── MusicPlayer.tsx
│   └── PageTransition.tsx
├── pages/
│   ├── WelcomeScreen.tsx
│   ├── InvitationScreen.tsx
│   ├── CeremonyScreen.tsx
│   ├── CelebrationScreen.tsx
│   └── ClosingScreen.tsx
├── hooks/
│   ├── useMarqueeAnimation.ts
│   └── useBackgroundMusic.ts
├── styles/
│   └── global.css
├── App.tsx
└── main.tsx
```

Keep components modular, independently testable, and reusable. Adjust the structure only when there is a clear architectural reason.

### Stage 2 — Background Image Marquee

Use suitable images from the project folder named `verticalmarq`.

Create a full-viewport marquee made of multiple adjacent vertical columns.

Movement pattern:

- Column 1: top to bottom.
- Column 2: bottom to top.
- Column 3: top to bottom.
- Column 4: bottom to top.
- Continue alternating directions for additional columns.

Requirements:

- Animate each column independently with GSAP.
- Use slightly different speeds between columns.
- Make each column loop seamlessly, with no visible gaps or jumps.
- Preserve image aspect ratios wherever possible.
- Use intentional cropping where required.
- Apply a warm peach paper treatment, subtle grain, imperfections, and soft shadows.
- Make the images feel like photographs mounted in a handcrafted scrapbook.
- Ensure performance remains smooth on mobile devices.

Do not assume the number of images or hard-code paths without first inspecting the supplied assets.

### Stage 3 — Five Invitation Screens

Create exactly five independent screen components:

1. `WelcomeScreen`
2. `InvitationScreen`
3. `CeremonyScreen`
4. `CelebrationScreen`
5. `ClosingScreen`

Each screen sits inside a fixed invitation panel above the marquee.

Panel styling:

- Semi-transparent ivory or peach surface.
- Frosted-glass effect using `backdrop-filter`.
- Subtle border.
- Soft shadow.
- Slightly rounded corners.
- Space reserved for future ornamental elements.

The marquee should remain partially visible through the panel without reducing text readability.

At the initial foundation stage, implement only structural layout and basic styling. Do not add decorative illustrations or placeholder artwork. Screen-specific copy and detailed content will be supplied separately.

### Stage 4 — Arrow Navigation and 3D Page Turn

Navigation must happen exclusively through dedicated arrow controls.

- Place a small previous-screen arrow at the top.
- Place a small next-screen arrow at the bottom.
- Disable the previous arrow on screen one.
- Disable the next arrow on screen five.
- Support click and tap on the arrows.
- Use React state to track the active screen.

Do not implement:

- Scroll-based navigation.
- Scroll snapping.
- Mouse-wheel navigation.
- Swipe-based screen navigation.
- Navigation controlled by the background marquee.

Implement a subtle physical page-turn transition using CSS 3D transforms and GSAP.

The transition should:

- Use perspective and an appropriate `transform-origin`.
- Rotate the current page as though turning a physical invitation page.
- Include restrained, realistic shadow changes.
- Reveal the next screen naturally.
- Be elegant and relatively quick, not theatrical or distracting.
- Prevent additional navigation events from interrupting an active transition.
- Keep the invitation panel fixed while its screen content changes.

Clean up GSAP timelines and event listeners when components unmount.

### Stage 5 — Background Music

Use Howler.js for background music.

Expected behaviour:

- Do not autoplay music on initial page load.
- Start music only after the visitor explicitly interacts with the opening invitation.
- Provide play/pause functionality.
- Support looping.
- Provide internal volume control.
- Support smooth fade-in and fade-out.
- Keep music playing while navigating between screens.
- Do not restart music during page transitions.

Create this directory:

```text
src/assets/music/
```

Do not generate, download, or insert audio files. Prepare the integration so that the actual music file can be added later.

Keep audio state independent from individual screen components so navigation does not recreate the player.

### Stage 6 — Typography

Use two complementary font styles:

- Bengali: an elegant, refined font appropriate for a traditional wedding invitation.
- English: a romantic, editorial serif font.

Requirements:

- Maintain a clear heading/body hierarchy.
- Verify Bengali conjuncts and vowel marks render correctly.
- Use comfortable line spacing.
- Ensure mobile readability.
- Avoid using too many font families.
- Keep typography consistent across all five screens.
- Centralize font configuration so fonts can be replaced easily.

Do not create custom fonts or calligraphy at this stage.

### Stage 7 — Responsive Design and Performance

Support:

- Desktop monitors.
- Laptops.
- Tablets.
- Android phones.
- iPhones.

Desktop:
- Use multiple marquee columns.
- Center the invitation panel.
- Preserve suitable spacing around the panel.

Tablet:
- Reduce visible marquee columns when necessary.
- Adjust panel dimensions.
- Preserve the visual hierarchy.

Mobile:
- Fit the panel within the available viewport.
- Use appropriately sized typography.
- Keep arrow controls accessible.
- Prevent horizontal overflow.
- Adapt marquee columns and image dimensions.
- Account for mobile browser viewport variations.

Do not merely scale down the desktop layout. Adapt the composition to the device.

Performance and accessibility requirements:

- Avoid unnecessary React re-renders during animations.
- Clean up GSAP timelines and event listeners.
- Respect `prefers-reduced-motion`.
- Keep animation smooth on mobile.
- Avoid unnecessary dependencies.
- Maintain readable contrast and usable controls.

### Stage 8 — Future Decorative Asset Integration

The design is intended to support these future assets:

- Alpana patterns.
- Shankha illustrations.
- Lotus flowers.
- Butterflies.
- Traditional Bengali wedding motifs.
- Ornamental borders and decorative patterns.
- Lottie animations.
- Future Three.js and particle effects.

Prepare modular asset locations and reusable component interfaces so supplied SVGs can be added later.

Suggested directories:

```text
src/assets/
├── images/
├── textures/
├── animations/
├── music/
└── decorations/
    ├── alpana/
    ├── verticalmarq/
    └── wedding-motifs/
```

Decorative elements should be independently positionable, responsively sized, and capable of future GSAP or Lottie animation.

**Until the actual assets are supplied, do not create, generate, draw, download, or insert these decorations.** Do not substitute generic icons, emojis, stock illustrations, or placeholder artwork. Empty directories are acceptable.

---

## 4. Implementation Rules

Follow these rules throughout development:

1. Prioritize visual elegance over excessive animation.
2. Keep all five screens structurally independent.
3. Keep the invitation panel fixed while screen content changes.
4. Use arrow controls as the only screen-navigation mechanism.
5. Do not introduce scroll-based navigation.
6. Do not create or insert decorative assets before they are supplied.
7. Do not use placeholder illustrations.
8. Keep the codebase responsive from the beginning.
9. Keep animation logic isolated in hooks or focused components where practical.
10. Clean up animation timelines and event listeners.
11. Keep background music persistent across screen changes.
12. Avoid unnecessary dependencies and unnecessary React re-renders.
13. Preserve existing project conventions unless there is a clear reason to change them.
14. Do not invent wedding details, names, dates, venues, or invitation copy.

---

## 5. Definition of Done

The functional foundation is ready when:

- The Vite application runs and builds successfully.
- The project has a clear, modular structure.
- The background marquee uses supplied `verticalmarq` images.
- Marquee columns move in alternating directions and loop seamlessly.
- The five independent invitation screens are present.
- The invitation panel has the intended translucent visual treatment.
- Previous/next arrows enforce the first- and last-screen boundaries.
- Navigation uses a controlled 3D page-turn transition.
- Overlapping navigation transitions are prevented.
- Music starts only after explicit visitor interaction.
- Music controls and persistence work across screen transitions.
- Typography is configured for Bengali and English.
- Desktop, tablet, and mobile layouts are usable.
- Reduced-motion preferences are respected.
- No unprovided decorative artwork, music, or placeholder illustrations have been added.

---

## 6. Final Experience

The finished application should feel like a digitally handcrafted Bengali wedding invitation, combining:

- A continuously moving photographic scrapbook.
- Peach handcrafted-paper textures.
- Five floating frosted-glass invitation panels.
- Elegant 3D page-turn transitions.
- Complementary Bengali and English typography.
- Background music activated by visitor interaction.
- Responsive foundations ready for future SVG and animation assets.

Build the functional foundation first. Add actual wedding illustrations, decorative assets, music files, and screen-specific content only when they are supplied in later development stages.
