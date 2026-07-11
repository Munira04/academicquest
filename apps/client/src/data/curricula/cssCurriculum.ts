import type { Course } from '../../types/curriculum';

export const cssCourse: Course = {
  id: 'web2',
  title: 'CSS',
  tagline: 'Style and layout the modern web',
  philosophy: 'CSS is taught through visual outcomes — color, spacing, flexbox, and responsive design you can see immediately.',
  icon: '🎨',
  color: 'from-blue-500 to-blue-700',
  level: 'BEGINNER',
  pillar: 'Web Development',
  xp: 200,
  sections: [
    {
      sectionId: 'css-section-1',
      title: 'Section 1: CSS Fundamentals',
      learningObjective: 'Master CSS selectors, the box model, colors, and typography to style web pages effectively.',
      order: 1,
      isLocked: false,
      xpReward: 75,
      keyConcepts: ['Selectors', 'Box Model', 'Colors', 'Typography', 'Specificity', 'Cascade'],
      estimatedMinutes: 60,
      lessons: [
        {
          lessonId: 'css-01', title: 'Selectors & Colors', type: 'learn', difficulty: 'beginner', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'CSS selects HTML elements and applies styles. Syntax: selector { property: value; }. Element selectors (p), class (.card), and id (#hero) target different specificity levels. Colors use hex (#8B5CF6), rgb(), rgba(), or named colors. The cascade means later rules override earlier ones unless specificity differs. Specificity: ID (100) > class (10) > element (1). !important overrides everything (avoid overuse).',
            instructions: 'Write CSS that makes .title purple (#8B5CF6) and p text color #333 with font-size 16px.',
          },
          utilities: {
            hint: '.title {\n  color: #8B5CF6;\n}\np {\n  color: #333;\n  font-size: 16px;\n}',
            flashcard: { front: 'Class vs ID selector specificity?', back: 'ID (#hero) beats class (.card) beats element (p). Inline styles beat IDs. !important overrides everything (avoid overuse). Specificity is calculated by adding these values.' },
            solution: '.title {\n  color: #8B5CF6;\n  font-weight: 700;\n}\np {\n  color: #333;\n  font-size: 16px;\n}',
          },
          rightPanel: { startingCode: '/* Style .title and p */\n', expectedOutput: '#8B5CF6' },
        },
        {
          lessonId: 'css-02', title: 'Box Model', type: 'learn', difficulty: 'beginner', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'Every element is a box: content → padding → border → margin. box-sizing: border-box includes padding and border in width/height — the modern default. Without it, width is only content, and padding/border add to the total size. This causes layout surprises. Always set box-sizing: border-box on a universal selector (* { box-sizing: border-box; }) for predictable sizing.',
            instructions: 'Style .card with width 300px, padding 20px, border 1px solid #ccc, border-radius 8px, and margin 16px auto.',
          },
          utilities: {
            hint: '.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  margin: 16px auto;\n  box-sizing: border-box;\n}',
            flashcard: { front: 'What does margin: 0 auto do?', back: 'Sets top/bottom margin to 0 and left/right to auto, which horizontally centers a block element with a defined width. The element must have a width set for auto margins to work.' },
            solution: '.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  margin: 16px auto;\n  box-sizing: border-box;\n}',
          },
          rightPanel: { startingCode: '.card {\n  /* complete the card styles */\n}\n', expectedOutput: '300px' },
        },
        {
          lessonId: 'css-03', title: 'Flexbox', type: 'learn', difficulty: 'beginner', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'Flexbox lays out items in one dimension. On the container: display: flex; justify-content (main axis alignment: flex-start, center, space-between, space-around); align-items (cross axis alignment: stretch, center, flex-start); gap for spacing. On items: flex-grow, flex-shrink, flex-basis (shorthand: flex). Flexbox solved vertical centering, equal-height columns, and responsive spacing — problems that plagued CSS for years.',
            instructions: 'Make .toolbar a flex row with space-between alignment, centered items, and 12px gap.',
          },
          utilities: {
            hint: '.toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}',
            flashcard: { front: 'Flexbox vs Grid?', back: 'Flexbox: one-dimensional (row OR column). Grid: two-dimensional (rows AND columns). Use flex for nav bars, card layouts, and component alignment. Use grid for page layouts and complex 2D arrangements.' },
            solution: '.toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 24px;\n}',
          },
          rightPanel: { startingCode: '.toolbar {\n  /* flex layout */\n}\n', expectedOutput: 'flex' },
        },
        {
          lessonId: 'css-04', title: 'Typography & Spacing', type: 'practice', difficulty: 'beginner', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'font-family, line-height, and letter-spacing control readability. line-height: 1.6 is optimal for body text (1.2-1.4 for headings). rem units scale with root font size (1rem = root px) — better for accessibility than px. em units scale with parent font size (can compound). Consistent spacing systems use multiples of 4 or 8 (4px, 8px, 16px, 24px, 32px). font-weight: 400 (normal), 500 (medium), 700 (bold).',
            instructions: 'Style body with font-family Inter, sans-serif; line-height 1.6; and h1 with font-size 2rem and margin-bottom 1rem.',
          },
          utilities: {
            hint: 'body {\n  font-family: Inter, sans-serif;\n  line-height: 1.6;\n}\nh1 {\n  font-size: 2rem;\n  margin-bottom: 1rem;\n}',
            flashcard: { front: 'rem vs em?', back: 'rem is relative to root html font size — consistent throughout. em is relative to the current element\'s font size — can compound in nested elements (dangerous). Use rem for most things, em only when you specifically want compounding.' },
            solution: 'body {\n  font-family: Inter, sans-serif;\n  line-height: 1.6;\n  color: #1a1a2e;\n}\nh1 {\n  font-size: 2rem;\n  margin-bottom: 1rem;\n  font-weight: 700;\n}',
          },
          rightPanel: { startingCode: 'body {\n  /* typography */\n}\nh1 {\n  /* heading styles */\n}\n', expectedOutput: '1.6' },
        },
        {
          lessonId: 'css-05', title: 'Responsive Design', type: 'practice', difficulty: 'beginner', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'Media queries apply styles at breakpoints: @media (max-width: 768px) { ... }. Mobile-first means default styles for small screens, then min-width queries for larger. Common breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide). Use relative units (%, rem, vw/vh) instead of fixed pixels for fluid layouts. Test responsive design by resizing the browser window.',
            instructions: 'Write a media query that stacks .sidebar below .content below 768px using flex-direction: column.',
          },
          utilities: {
            hint: '.layout {\n  display: flex;\n  gap: 24px;\n}\n@media (max-width: 768px) {\n  .layout {\n    flex-direction: column;\n  }\n}',
            flashcard: { front: 'What is mobile-first CSS?', back: 'Write base styles for mobile (small screens), then use min-width media queries to enhance for tablet/desktop. Easier to scale up than strip down desktop-first designs. Better performance (mobile gets less CSS). Forces prioritization of essential content.' },
            solution: '.layout {\n  display: flex;\n  gap: 24px;\n}\n@media (max-width: 768px) {\n  .layout {\n    flex-direction: column;\n  }\n  .sidebar {\n    width: 100%;\n  }\n}',
          },
          rightPanel: { startingCode: '.layout {\n  display: flex;\n}\n/* Add responsive media query */\n', expectedOutput: '768px' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'css-super-01', title: 'CSS Custom Properties (Variables)', type: 'supercharge', difficulty: 'intermediate', track: 'css', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'CSS custom properties (variables) let you define reusable values: --primary-color: #8B5CF6;. Use them with var(--primary-color). Define on :root for global scope, or specific selectors for local scope. They enable theming, consistent design systems, and dynamic updates via JavaScript. Unlike preprocessor variables (SASS), CSS variables are live in the browser and can be changed at runtime.',
            instructions: 'Create a design system with CSS variables for colors, spacing, and typography. Use them throughout your styles.',
          },
          utilities: {
            hint: ':root {\n  --primary: #8B5CF6;\n  --spacing: 16px;\n  --font-main: Inter, sans-serif;\n}\n.button {\n  background: var(--primary);\n  padding: var(--spacing);\n  font-family: var(--font-main);\n}',
            flashcard: { front: 'CSS variables vs SASS variables?', back: 'CSS variables are native, live in the browser, can be changed at runtime via JavaScript, cascade with scope, and work with media queries. SASS variables are compiled away, static, only work at build time, and cannot be changed dynamically.' },
            solution: ':root {\n  --color-primary: #8B5CF6;\n  --color-secondary: #10B981;\n  --color-text: #1a1a2e;\n  --color-bg: #ffffff;\n  --spacing-xs: 4px;\n  --spacing-sm: 8px;\n  --spacing-md: 16px;\n  --spacing-lg: 24px;\n  --spacing-xl: 32px;\n  --font-body: Inter, system-ui, sans-serif;\n  --font-heading: Georgia, serif;\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 12px;\n}\n\nbody {\n  font-family: var(--font-body);\n  color: var(--color-text);\n  background: var(--color-bg);\n  padding: var(--spacing-lg);\n}\n\nh1, h2, h3 {\n  font-family: var(--font-heading);\n}\n\n.button {\n  background: var(--color-primary);\n  color: white;\n  padding: var(--spacing-sm) var(--spacing-md);\n  border-radius: var(--radius-md);\n}',
          },
          rightPanel: { startingCode: '/* Create CSS variable design system */\n', expectedOutput: 'Complete design system with variables' },
        },
      ],
      sectionProject: {
        lessonId: 'css-project-1', title: 'Section Project: Styled Card Component', type: 'project', difficulty: 'beginner', track: 'css', xpReward: 25,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a polished card component using all CSS fundamentals learned. This project will demonstrate selectors, box model, flexbox, typography, and responsive design.',
          instructions: 'Build a card component with:\n  • CSS variables for colors and spacing\n  • Proper box model sizing\n  • Flexbox for internal layout\n  • Responsive design with media queries\n  • Hover effects and transitions',
        },
        utilities: {
          hint: 'Use CSS variables for consistency. Set box-sizing: border-box globally. Use flexbox for card content alignment. Add media query for mobile. Add hover effects with transition.',
          flashcard: { front: 'What makes a reusable CSS component?', back: 'Uses CSS variables for theming, box-sizing: border-box for predictable sizing, flexbox for layout, responsive breakpoints, no hardcoded dimensions where possible, and clear class naming (BEM or utility classes).' },
          solution: ':root {\n  --card-bg: #ffffff;\n  --card-border: #e5e7eb;\n  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  --card-radius: 12px;\n  --card-padding: 24px;\n  --text-primary: #1a1a2e;\n  --text-secondary: #6b7280;\n  --color-primary: #8B5CF6;\n}\n\n* {\n  box-sizing: border-box;\n}\n\n.card {\n  background: var(--card-bg);\n  border: 1px solid var(--card-border);\n  border-radius: var(--card-radius);\n  box-shadow: var(--card-shadow);\n  padding: var(--card-padding);\n  max-width: 400px;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);\n}\n\n.card-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.card-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n\n.card-title {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n\n.card-subtitle {\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin: 4px 0 0 0;\n}\n\n.card-body {\n  color: var(--text-secondary);\n  line-height: 1.6;\n  margin-bottom: 16px;\n}\n\n.card-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.card-button {\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n}\n\n@media (max-width: 480px) {\n  .card {\n    padding: 16px;\n  }\n  \n  .card-header {\n    flex-direction: column;\n    text-align: center;\n  }\n}',
        },
        rightPanel: { startingCode: '/* Build styled card component */\n', expectedOutput: 'Complete card component with all features' },
      },
    },
    {
      sectionId: 'css-section-2',
      title: 'Section 2: Advanced CSS & Layout',
      learningObjective: 'Learn Grid layout, animations, transforms, and modern CSS features for sophisticated designs.',
      order: 2,
      isLocked: true,
      xpReward: 75,
      keyConcepts: ['CSS Grid', 'Animations', 'Transforms', 'Transitions', 'Pseudo-elements', 'Modern Features'],
      estimatedMinutes: 60,
      lessons: [
        {
          lessonId: 'css-06', title: 'CSS Grid Layout', type: 'learn', difficulty: 'intermediate', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'CSS Grid is a 2D layout system. On container: display: grid; grid-template-columns defines column structure (repeat(3, 1fr) = 3 equal columns). grid-template-rows for rows. grid-gap (or gap) for spacing. grid-column and grid-row on items to span multiple columns/rows. Grid areas let you name regions: grid-template-areas. Grid is ideal for page layouts, card grids, and complex 2D arrangements.',
            instructions: 'Create a 3-column grid with equal columns and 16px gap. Make the first item span 2 columns.',
          },
          utilities: {
            hint: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n.item:first-child {\n  grid-column: span 2;\n}',
            flashcard: { front: 'When to use Grid vs Flexbox?', back: 'Use Grid for 2D layouts (rows AND columns) like page layouts, card grids, and complex arrangements. Use Flexbox for 1D layouts (row OR column) like nav bars, component alignment, and simple lists. They can be combined.' },
            solution: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n.item:first-child {\n  grid-column: span 2;\n}',
          },
          rightPanel: { startingCode: '/* Create 3-column grid */\n', expectedOutput: 'Grid with spanning item' },
        },
        {
          lessonId: 'css-07', title: 'Transitions & Transforms', type: 'learn', difficulty: 'intermediate', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Transitions animate property changes: transition: property duration timing-function delay. Common: transition: all 0.3s ease. Transforms modify element appearance without affecting layout: translate(x, y), rotate(deg), scale(n), skew(deg). Transforms are GPU-accelerated and performant. Combine with transitions for smooth hover effects. transform-origin changes the pivot point.',
            instructions: 'Create a button that scales up 1.1x and changes color on hover with smooth transition.',
          },
          utilities: {
            hint: '.button {\n  transition: transform 0.3s ease, background 0.3s ease;\n}\n.button:hover {\n  transform: scale(1.1);\n  background: #8B5CF6;\n}',
            flashcard: { front: 'Why use transform instead of width/height for animations?', back: 'transform (translate, scale, rotate) only triggers compositing, not layout or paint — it\'s GPU-accelerated and 60fps smooth. Changing width/height triggers layout recalculation, which is expensive and can cause jank.' },
            solution: '.button {\n  background: #3B82F6;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;\n}\n.button:hover {\n  transform: scale(1.1);\n  background: #8B5CF6;\n  box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);\n}',
          },
          rightPanel: { startingCode: '/* Create animated button */\n', expectedOutput: 'Button with hover effects' },
        },
        {
          lessonId: 'css-08', title: 'CSS Animations', type: 'learn', difficulty: 'intermediate', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: '@keyframes define animation sequences: @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }. Apply with animation: name duration timing-function delay iteration-count direction. Timing functions: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(). Iteration: infinite for looping. Animations can run automatically (on load) or on hover/state change.',
            instructions: 'Create a fade-in animation that plays when an element appears.',
          },
          utilities: {
            hint: '@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.element {\n  animation: fadeIn 0.5s ease forwards;\n}',
            flashcard: { front: 'What does forwards do in animation?', back: 'forwards keeps the element in its final animation state after the animation completes. Without it, the element snaps back to its original state. Other options: normal (default), backwards (starts in initial keyframe state), both (applies forwards and backwards).' },
            solution: '@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.card {\n  animation: fadeIn 0.5s ease forwards;\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n}\n\n.notification {\n  animation: pulse 2s ease-in-out infinite;\n}',
          },
          rightPanel: { startingCode: '/* Create fade-in animation */\n', expectedOutput: 'Animation keyframes and usage' },
        },
        {
          lessonId: 'css-09', title: 'Pseudo-elements', type: 'practice', difficulty: 'intermediate', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Pseudo-elements ::before and ::after insert content before/after an element\'s content. They\'re used for decorative elements, clearing floats (clearfix), tooltips, and styling enhancements. Content is set with content: property (required). They\'re part of the element but not in the DOM. Single colon (:before) is old syntax, double (::before) is modern — both work but use double for pseudo-elements.',
            instructions: 'Use ::before to add a decorative icon before headings, and ::after to add a subtle underline.',
          },
          utilities: {
            hint: 'h2::before {\n  content: "✨ ";\n}\nh2::after {\n  content: "";\n  display: block;\n  width: 50px;\n  height: 2px;\n  background: currentColor;\n}',
            flashcard: { front: 'What is the difference between :before and ::before?', back: ':before is CSS2 syntax (single colon). ::before is CSS3 syntax (double colon). Both work in all browsers. CSS3 uses double colons for pseudo-elements (::before, ::after) and single for pseudo-classes (:hover, :active). Use double for clarity.' },
            solution: 'h2 {\n  position: relative;\n  padding-left: 32px;\n}\n\nh2::before {\n  content: "📚";\n  position: absolute;\n  left: 0;\n  top: 0;\n  font-size: 24px;\n}\n\nh2::after {\n  content: "";\n  display: block;\n  width: 60px;\n  height: 3px;\n  background: linear-gradient(90deg, #8B5CF6, #10B981);\n  margin-top: 8px;\n  border-radius: 2px;\n}',
          },
          rightPanel: { startingCode: '/* Add pseudo-elements to headings */\n', expectedOutput: 'Headings with decorations' },
        },
        {
          lessonId: 'css-10', title: 'Modern CSS Features', type: 'practice', difficulty: 'intermediate', track: 'css', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'Modern CSS features: clamp(min, preferred, max) for responsive typography. aspect-ratio for maintaining proportions. :is() and :where() for selector grouping. :not() for negation. :has() for parent selection (newer). container queries for component-level responsiveness. CSS nesting (newer) lets you nest selectors. These features reduce CSS complexity and enable new design patterns.',
            instructions: 'Use clamp() for responsive font size, aspect-ratio for an image container, and :has() for parent selection.',
          },
          utilities: {
            hint: 'h1 {\n  font-size: clamp(1.5rem, 5vw, 3rem);\n}\n.image-container {\n  aspect-ratio: 16/9;\n}\n.card:has(.badge) {\n  border-color: #8B5CF6;\n}',
            flashcard: { front: 'What does clamp(1rem, 5vw, 3rem) do?', back: 'Sets a responsive value that\'s at least 1rem, at most 3rem, and scales with viewport width (5vw) between those bounds. Eliminates the need for multiple media queries for typography.' },
            solution: 'h1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n  line-height: 1.2;\n}\n\n.hero-image {\n  aspect-ratio: 16/9;\n  width: 100%;\n  object-fit: cover;\n}\n\n.card {\n  border: 2px solid #e5e7eb;\n  padding: 24px;\n}\n\n.card:has(.badge) {\n  border-color: #8B5CF6;\n  background: linear-gradient(135deg, #8B5CF610, transparent);\n}\n\n.card:has(.badge.featured) {\n  border-color: #F59E0B;\n}',
          },
          rightPanel: { startingCode: '/* Use modern CSS features */\n', expectedOutput: 'Modern CSS with clamp, aspect-ratio, :has()' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'css-super-02', title: 'CSS Architecture & Methodologies', type: 'supercharge', difficulty: 'advanced', track: 'css', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'CSS architecture methodologies organize styles for maintainability: BEM (Block__Element--Modifier), OOCSS (Object-Oriented CSS), SMACSS (Scalable and Modular Architecture for CSS), ITCSS (Inverted Triangle CSS), and utility-first (Tailwind). Key principles: DRY (Don\'t Repeat Yourself), separation of concerns, component-based architecture, and consistent naming. Choose based on team size and project complexity.',
            instructions: 'Refactor styles using BEM naming convention and component-based organization.',
          },
          utilities: {
            hint: '/* BEM: Block__Element--Modifier */\n.card { }\n.card__header { }\n.card__title { }\n.card__title--large { }\n.card__body { }\n.card__footer { }',
            flashcard: { front: 'What is BEM naming convention?', back: 'BEM = Block Element Modifier. Block: standalone component (.card). Element: part of block (.card__title). Modifier: variant (.card__title--large). Double underscore separates block/element, double hyphen for modifiers. Prevents specificity wars and clarifies relationships.' },
            solution: '/* Component: Card */\n.card {\n  --card-bg: #ffffff;\n  --card-border: #e5e7eb;\n  --card-radius: 12px;\n  --card-padding: 24px;\n  \n  background: var(--card-bg);\n  border: 1px solid var(--card-border);\n  border-radius: var(--card-radius);\n  padding: var(--card-padding);\n}\n\n.card__header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.card__avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}\n\n.card__title {\n  font-size: 18px;\n  font-weight: 700;\n  margin: 0;\n}\n\n.card__title--large {\n  font-size: 24px;\n}\n\n.card__body {\n  color: #6b7280;\n  line-height: 1.6;\n}\n\n.card__footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 16px;\n}\n\n.card__button {\n  padding: 8px 16px;\n  border-radius: 6px;\n}\n\n.card__button--primary {\n  background: #8B5CF6;\n  color: white;\n}\n\n.card__button--secondary {\n  background: #e5e7eb;\n  color: #1a1a2e;\n}',
          },
          rightPanel: { startingCode: '/* Refactor to BEM */\n', expectedOutput: 'BEM-organized CSS' },
        },
      ],
      sectionProject: {
        lessonId: 'css-project-2', title: 'Section Project: Responsive Dashboard Layout', type: 'project', difficulty: 'intermediate', track: 'css', xpReward: 25,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build a responsive dashboard layout using Grid, Flexbox, animations, and modern CSS features. This project will demonstrate advanced layout techniques and responsive design.',
          instructions: 'Build a dashboard with:\n  • CSS Grid for main layout\n  • Flexbox for component internals\n  • Responsive breakpoints\n  • Smooth animations\n  • Modern CSS features (clamp, aspect-ratio)',
        },
        utilities: {
          hint: 'Use Grid for sidebar + main content. Use Flexbox for cards and nav. Add media queries for mobile. Use clamp for typography. Add animations for loading states. Use CSS variables for theming.',
          flashcard: { front: 'What makes a good responsive dashboard layout?', back: 'Grid for overall structure (sidebar + main), Flexbox for components, mobile-first media queries, consistent spacing system, CSS variables for theming, smooth transitions, touch-friendly targets (44px+), and performance optimizations.' },
            solution: ':root {\n  --sidebar-width: 250px;\n  --header-height: 64px;\n  --color-bg: #f3f4f6;\n  --color-surface: #ffffff;\n  --color-primary: #8B5CF6;\n  --spacing: 24px;\n}\n\n.dashboard {\n  display: grid;\n  grid-template-columns: var(--sidebar-width) 1fr;\n  grid-template-rows: var(--header-height) 1fr;\n  min-height: 100vh;\n}\n\n.sidebar {\n  grid-row: 1 / -1;\n  background: var(--color-surface);\n  border-right: 1px solid #e5e7eb;\n}\n\n.header {\n  grid-column: 2;\n  background: var(--color-surface);\n  border-bottom: 1px solid #e5e7eb;\n  display: flex;\n  align-items: center;\n  padding: 0 var(--spacing);\n}\n\n.main {\n  grid-column: 2;\n  padding: var(--spacing);\n  background: var(--color-bg);\n}\n\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: var(--spacing);\n}\n\n.card {\n  background: var(--color-surface);\n  border-radius: 12px;\n  padding: var(--spacing);\n  animation: fadeIn 0.5s ease;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@media (max-width: 768px) {\n  .dashboard {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto 1fr;\n  }\n  \n  .sidebar {\n    grid-row: 1;\n    display: none;\n  }\n  \n  .header {\n    grid-column: 1;\n  }\n  \n  .main {\n    grid-column: 1;\n  }\n}',
        },
        rightPanel: { startingCode: '/* Build responsive dashboard */\n', expectedOutput: 'Complete responsive dashboard layout' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'css-capstone', title: 'Course Capstone: AcademicQuest Theme System', type: 'project', difficulty: 'advanced', track: 'css', xpReward: 50,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build a complete theme system for AcademicQuest using all CSS concepts learned. This capstone will demonstrate CSS variables, responsive design, animations, Grid/Flexbox layouts, and modern CSS features.',
      instructions: 'Build a theme system with:\n  • Comprehensive CSS variable system\n  • Light and dark theme support\n  • Responsive grid layouts\n  • Smooth animations and transitions\n  • Component library with BEM naming\n  • Modern CSS features throughout',
    },
    utilities: {
      hint: 'Create extensive CSS variable system for colors, spacing, typography. Use data-theme attribute for theme switching. Use Grid for layouts. Add animations for interactions. Use BEM for component naming. Use clamp, aspect-ratio, :has() for modern features.',
      flashcard: { front: 'What makes a production-ready CSS architecture?', back: 'Comprehensive variable system, consistent naming (BEM/utility), component-based organization, responsive breakpoints, performance optimizations, accessibility considerations, browser compatibility, documentation, and maintainability.' },
      solution: ':root {\n  /* Colors - Light Theme */\n  --color-bg-primary: #ffffff;\n  --color-bg-secondary: #f3f4f6;\n  --color-bg-tertiary: #e5e7eb;\n  --color-text-primary: #1a1a2e;\n  --color-text-secondary: #6b7280;\n  --color-text-tertiary: #9ca3af;\n  --color-primary: #8B5CF6;\n  --color-primary-light: #A78BFA;\n  --color-primary-dark: #7C3AED;\n  --color-success: #10B981;\n  --color-warning: #F59E0B;\n  --color-error: #EF4444;\n  \n  /* Spacing System */\n  --space-1: 4px;\n  --space-2: 8px;\n  --space-3: 12px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n  --space-12: 48px;\n  --space-16: 64px;\n  \n  /* Typography */\n  --font-sans: Inter, system-ui, sans-serif;\n  --font-mono: Fira Code, monospace;\n  --font-serif: Georgia, serif;\n  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);\n  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);\n  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);\n  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);\n  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);\n  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);\n  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);\n  \n  /* Border Radius */\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 12px;\n  --radius-xl: 16px;\n  --radius-full: 9999px;\n  \n  /* Shadows */\n  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);\n  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);\n  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);\n  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);\n  \n  /* Transitions */\n  --transition-fast: 150ms ease;\n  --transition-base: 250ms ease;\n  --transition-slow: 350ms ease;\n}\n\n[data-theme="dark"] {\n  --color-bg-primary: #08080C;\n  --color-bg-secondary: #120F1F;\n  --color-bg-tertiary: #1A1028;\n  --color-text-primary: #ffffff;\n  --color-text-secondary: #a1a1aa;\n  --color-text-tertiary: #71717a;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: var(--font-sans);\n  font-size: var(--text-base);\n  color: var(--color-text-primary);\n  background: var(--color-bg-primary);\n  line-height: 1.6;\n  transition: background var(--transition-base), color var(--transition-base);\n}\n\n/* Layout Grid */\n.layout__grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--space-6);\n}\n\n.layout__flex {\n  display: flex;\n  gap: var(--space-4);\n  align-items: center;\n}\n\n/* Component: Button */\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-6);\n  font-family: var(--font-sans);\n  font-size: var(--text-sm);\n  font-weight: 600;\n  border-radius: var(--radius-md);\n  border: none;\n  cursor: pointer;\n  transition: all var(--transition-base);\n}\n\n.btn--primary {\n  background: var(--color-primary);\n  color: white;\n}\n\n.btn--primary:hover {\n  background: var(--color-primary-dark);\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-lg);\n}\n\n/* Component: Card */\n.card {\n  background: var(--color-bg-secondary);\n  border: 1px solid var(--color-bg-tertiary);\n  border-radius: var(--radius-lg);\n  padding: var(--space-6);\n  transition: all var(--transition-base);\n}\n\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-xl);\n  border-color: var(--color-primary);\n}\n\n.card__header {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  margin-bottom: var(--space-4);\n}\n\n.card__title {\n  font-size: var(--text-lg);\n  font-weight: 700;\n  color: var(--color-text-primary);\n}\n\n/* Animations */\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.animate--slideUp {\n  animation: slideUp var(--transition-slow) ease forwards;\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  .layout__grid {\n    grid-template-columns: 1fr;\n  }\n  \n  .layout__flex {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}',
    },
    rightPanel: { startingCode: '/* Build complete theme system */\n', expectedOutput: 'Production-ready theme system' },
  },
  totalLessons: 10,
  totalXP: 200,
};
