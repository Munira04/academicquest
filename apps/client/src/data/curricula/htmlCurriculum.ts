import type { Course } from '../../types/curriculum';

export const htmlCourse: Course = {
  id: 'web1',
  title: 'HTML',
  tagline: 'Structure every page on the web',
  philosophy: 'HTML is taught as semantic structure — every tag has meaning, and accessibility starts with correct markup.',
  icon: '🏗️',
  color: 'from-orange-500 to-orange-700',
  level: 'BEGINNER',
  pillar: 'Web Development',
  xp: 150,
  sections: [
    {
      sectionId: 'html-section-1',
      title: 'Section 1: Document Structure & Semantics',
      learningObjective: 'Master the fundamental structure of HTML documents and understand semantic markup for accessibility.',
      order: 1,
      isLocked: false,
      xpReward: 50,
      keyConcepts: ['DOCTYPE', 'HTML Elements', 'Head vs Body', 'Semantic Tags', 'Accessibility', 'Document Tree'],
      estimatedMinutes: 45,
      lessons: [
        {
          lessonId: 'html-01', title: 'Document Structure', type: 'learn', difficulty: 'beginner', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'HTML documents use a tree structure: <!DOCTYPE html> tells the browser to use HTML5 standards mode. The <html> element is the root, containing <head> (metadata like title, styles, scripts) and <body> (visible content). Headings h1–h6 create a hierarchy, and <p> defines paragraphs. Proper structure is the foundation of accessible, SEO-friendly websites.',
            instructions: 'Build a minimal page with <!DOCTYPE html>, <html>, <head> containing <title> "My Page", and <body> with an <h1> "Welcome to HTML" and a <p> with any welcome sentence.',
          },
          utilities: {
            hint: '<!DOCTYPE html>\n<html>\n<head><title>My Page</title></head>\n<body>\n  <h1>Welcome to HTML</h1>\n  <p>Let\'s build the web.</p>\n</body>\n</html>',
            flashcard: { front: 'What does DOCTYPE html do?', back: 'It tells the browser to use standards mode (HTML5) rather than quirks mode, ensuring consistent rendering across browsers. Without it, browsers may emulate old rendering bugs.' },
            solution: '<!DOCTYPE html>\n<html>\n<head><title>My Page</title></head>\n<body>\n  <h1>Welcome to HTML</h1>\n  <p>Let\'s build the web together.</p>\n</body>\n</html>',
          },
          rightPanel: { startingCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <!-- Add h1 and p -->\n</body>\n</html>', expectedOutput: 'Welcome to HTML' },
        },
        {
          lessonId: 'html-02', title: 'Links & Images', type: 'learn', difficulty: 'beginner', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'Anchor tags create links: <a href="https://example.com">Visit</a>. The href attribute specifies the destination. Images use <img src="photo.jpg" alt="Description"> — alt text is required for accessibility and SEO. It describes the image for screen readers and displays if the image fails to load. Relative paths (src="logo.png") reference files in the same directory.',
            instructions: 'Add a link to https://academicquest.com with text "AcademicQuest" and an img with src="logo.png" and alt="AQ Logo".',
          },
          utilities: {
            hint: '<a href="https://academicquest.com">AcademicQuest</a>\n<img src="logo.png" alt="AQ Logo">',
            flashcard: { front: 'Why is alt text important?', back: 'Screen readers use alt text for visually impaired users. It also displays when images fail to load and helps search engines understand page content, improving SEO.' },
            solution: '<a href="https://academicquest.com">AcademicQuest</a>\n<img src="logo.png" alt="AQ Logo">',
          },
          rightPanel: { startingCode: '<!-- Add a link and an image -->\n', expectedOutput: 'AcademicQuest' },
        },
        {
          lessonId: 'html-03', title: 'Lists & Tables', type: 'learn', difficulty: 'beginner', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'Unordered lists: <ul><li>Item</li></ul> for bullet points. Ordered lists: <ol> for numbered sequences. Tables use <table> as container, <tr> for rows, <th> for header cells, and <td> for data cells. Use tables for tabular data only, never for layout — that\'s what CSS is for. Proper table structure includes <thead> and <tbody> for semantic clarity.',
            instructions: 'Create a ul with three programming languages and a table with columns Language and Level and two rows of data.',
          },
          utilities: {
            hint: '<ul><li>Python</li><li>JavaScript</li><li>Java</li></ul>\n<table><tr><th>Language</th><th>Level</th></tr><tr><td>Python</td><td>Beginner</td></tr></table>',
            flashcard: { front: 'ul vs ol?', back: 'ul = unordered (bullets); ol = ordered (numbers). Both contain li elements. Choose based on whether order matters to the meaning.' },
            solution: '<ul>\n  <li>Python</li>\n  <li>JavaScript</li>\n  <li>Java</li>\n</ul>\n<table>\n  <tr><th>Language</th><th>Level</th></tr>\n  <tr><td>Python</td><td>Beginner</td></tr>\n  <tr><td>React</td><td>Intermediate</td></tr>\n</table>',
          },
          rightPanel: { startingCode: '<!-- Create a ul and a table -->\n', expectedOutput: 'Python' },
        },
        {
          lessonId: 'html-04', title: 'Semantic HTML', type: 'practice', difficulty: 'beginner', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'Semantic tags describe meaning, not just appearance: <header>, <nav>, <main>, <section>, <article>, <footer>, <aside>. They improve SEO (search engines understand content structure), accessibility (screen readers can navigate by landmarks), and maintainability. Generic <div> elements have no semantic meaning. Use semantic tags whenever possible, reserving divs for styling hooks.',
            instructions: 'Wrap content in header (site title), main (article with h2 + p), and footer (copyright line).',
          },
          utilities: {
            hint: '<header><h1>AcademicQuest</h1></header>\n<main><article><h2>Lesson</h2><p>Content here.</p></article></main>\n<footer><p>© 2026 AcademicQuest</p></footer>',
            flashcard: { front: 'What is the main landmark for?', back: 'main should contain the primary unique content of the page — one per page. Skip navigation and footers belong outside it. Screen readers can jump directly to main content.' },
            solution: '<header><h1>AcademicQuest</h1></header>\n<main>\n  <article>\n    <h2>Today\'s Lesson</h2>\n    <p>Learn semantic HTML for better structure.</p>\n  </article>\n</main>\n<footer><p>© 2026 AcademicQuest</p></footer>',
          },
          rightPanel: { startingCode: '<!-- Use header, main, article, footer -->\n', expectedOutput: 'AcademicQuest' },
        },
        {
          lessonId: 'html-05', title: 'Forms & Input Elements', type: 'practice', difficulty: 'beginner', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'Forms collect user input: <form action="/submit" method="POST">. Common inputs: text, email, password, number, date, checkbox, radio, select, textarea. Labels improve accessibility: <label for="email">Email</label> pairs with <input id="email">. The for attribute matches the input\'s id, creating an accessible association. Required attribute ensures validation before submission.',
            instructions: 'Create a login form with email input, password input, and a submit button. Use proper labels and required attributes.',
          },
          utilities: {
            hint: '<form>\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email">\n  <label for="password">Password</label>\n  <input type="password" id="password" name="password">\n  <button type="submit">Log In</button>\n</form>',
            flashcard: { front: 'Why pair label with for/id?', back: 'Clicking the label focuses the input — larger click target. Screen readers announce the label when the field is focused. Without it, users may not know what the field is for.' },
            solution: '<form action="/login" method="POST">\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" required>\n  <label for="password">Password</label>\n  <input type="password" id="password" name="password" required>\n  <button type="submit">Log In</button>\n</form>',
          },
          rightPanel: { startingCode: '<!-- Build a login form -->\n', expectedOutput: 'Log In' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'html-super-01', title: 'Accessibility Best Practices', type: 'supercharge', difficulty: 'intermediate', track: 'html', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'Accessibility (a11y) ensures everyone can use your website. Key practices: use semantic HTML, provide alt text for images, ensure color contrast (4.5:1 for text), make interactive elements keyboard-navigable, use ARIA attributes when HTML isn\'t enough (aria-label, aria-describedby), and test with screen readers. Accessible sites are better for everyone, not just users with disabilities.',
            instructions: 'Create an accessible card component with proper heading hierarchy, descriptive alt text, and ARIA attributes where needed.',
          },
          utilities: {
            hint: '<article role="article">\n  <h2>Course Title</h2>\n  <img src="course.jpg" alt="Screenshot of the course interface showing code editor and terminal">\n  <p>Description here.</p>\n  <button aria-label="Enroll in Python course">Enroll</button>\n</article>',
            flashcard: { front: 'What is the difference between aria-label and aria-describedby?', back: 'aria-label provides a replacement label when the visible label is insufficient. aria-describedby references another element by ID that provides additional description. Use aria-label for buttons with icons, aria-describedby for form field help text.' },
            solution: '<article role="article" aria-labelledby="course-title">\n  <h2 id="course-title">Python Fundamentals</h2>\n  <img src="python-course.jpg" alt="Screenshot showing Python code editor with a simple print statement">\n  <p>Learn programming fundamentals with Python.</p>\n  <button aria-label="Enroll in Python Fundamentals course">Enroll Now</button>\n</article>',
          },
          rightPanel: { startingCode: '<!-- Create accessible card with ARIA -->\n', expectedOutput: 'Accessible card component' },
        },
      ],
      sectionProject: {
        lessonId: 'html-project-1', title: 'Section Project: Personal Portfolio Page', type: 'project', difficulty: 'beginner', track: 'html', xpReward: 20,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a complete personal portfolio page using all HTML concepts learned. This project will demonstrate semantic structure, accessibility, and proper document organization.',
          instructions: 'Build a portfolio page with:\n  • Semantic header with navigation\n  • Hero section with introduction\n  • Skills section with a list\n  • Projects section with a table\n  • Contact form\n  • Semantic footer',
        },
        utilities: {
          hint: 'Use header, nav, main, section, article, footer. Include proper headings hierarchy (h1 → h2 → h3). Add alt text to images. Use labels for form inputs. Include ARIA attributes where needed.',
          flashcard: { front: 'What makes a well-structured HTML document?', back: 'Clear heading hierarchy (one h1, logical h2-h3), semantic landmarks (header, nav, main, footer), proper nesting, meaningful alt text, accessible forms with labels, and valid HTML5 syntax.' },
          solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Munira\'s Portfolio</title>\n</head>\n<body>\n  <header>\n    <nav>\n      <a href="#about">About</a>\n      <a href="#skills">Skills</a>\n      <a href="#projects">Projects</a>\n      <a href="#contact">Contact</a>\n    </nav>\n  </header>\n  <main>\n    <section id="about">\n      <h1>Munira Mwanzia</h1>\n      <p>Full Stack Developer</p>\n    </section>\n    <section id="skills">\n      <h2>Skills</h2>\n      <ul>\n        <li>Python</li>\n        <li>JavaScript</li>\n        <li>React</li>\n      </ul>\n    </section>\n    <section id="projects">\n      <h2>Projects</h2>\n      <table>\n        <tr><th>Project</th><th>Tech</th><th>Year</th></tr>\n        <tr><td>AcademicQuest</td><td>React</td><td>2026</td></tr>\n      </table>\n    </section>\n    <section id="contact">\n      <h2>Contact</h2>\n      <form>\n        <label for="name">Name</label>\n        <input type="text" id="name" required>\n        <label for="email">Email</label>\n        <input type="email" id="email" required>\n        <button type="submit">Send</button>\n      </form>\n    </section>\n  </main>\n  <footer>\n    <p>© 2026 Munira Mwanzia</p>\n  </footer>\n</body>\n</html>',
        },
        rightPanel: { startingCode: '<!-- Build complete portfolio page -->\n', expectedOutput: 'Complete semantic portfolio page' },
      },
    },
    {
      sectionId: 'html-section-2',
      title: 'Section 2: Advanced HTML & Media',
      learningObjective: 'Learn advanced HTML features including media embedding, iframes, meta tags, and modern HTML5 APIs.',
      order: 2,
      isLocked: true,
      xpReward: 50,
      keyConcepts: ['Video & Audio', 'Iframes', 'Meta Tags', 'Data Attributes', 'HTML5 APIs', 'Performance'],
      estimatedMinutes: 45,
      lessons: [
        {
          lessonId: 'html-06', title: 'Video & Audio Elements', type: 'learn', difficulty: 'intermediate', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'HTML5 introduced native <video> and <audio> elements, eliminating the need for Flash. <video src="movie.mp4" controls> includes play/pause, volume, and timeline. Provide multiple sources with <source> for browser compatibility: <source src="movie.webm" type="video/webm">. Add a fallback message between tags for browsers without support. The poster attribute shows a thumbnail before playback.',
            instructions: 'Create a video element with controls, a poster image, and multiple source formats (mp4, webm).',
          },
          utilities: {
            hint: '<video controls poster="thumbnail.jpg">\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  Your browser doesn\'t support video.\n</video>',
            flashcard: { front: 'Why provide multiple video source formats?', back: 'Different browsers support different video codecs. MP4 (H.264) has broad support, WebM is open-source and efficient. Providing both ensures your video works everywhere.' },
            solution: '<video controls poster="course-preview.jpg" width="640">\n  <source src="lesson.mp4" type="video/mp4">\n  <source src="lesson.webm" type="video/webm">\n  <p>Your browser doesn\'t support HTML5 video. <a href="lesson.mp4">Download the file</a> instead.</p>\n</video>',
          },
          rightPanel: { startingCode: '<!-- Add video with multiple sources -->\n', expectedOutput: 'Video element with controls' },
        },
        {
          lessonId: 'html-07', title: 'Iframes & Embedding', type: 'learn', difficulty: 'intermediate', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Iframes embed external content: <iframe src="https://example.com"></iframe>. Common uses: YouTube videos, Google Maps, external widgets. Security concerns: use sandbox attribute to restrict capabilities (allow-scripts, allow-same-origin). The loading="lazy" attribute defers loading until the iframe is near the viewport, improving performance. Always consider privacy implications when embedding third-party content.',
            instructions: 'Embed a YouTube video using iframe with lazy loading and appropriate security attributes.',
          },
          utilities: {
            hint: '<iframe src="https://www.youtube.com/embed/VIDEO_ID" loading="lazy" sandbox="allow-scripts allow-same-origin" allowfullscreen></iframe>',
            flashcard: { front: 'What does the iframe sandbox attribute do?', back: 'sandbox restricts the iframe\'s capabilities for security. By default, it blocks everything. You can enable specific features: allow-scripts, allow-same-origin, allow-forms, allow-popups. Always use the minimum permissions needed.' },
            solution: '<iframe \n  width="560" \n  height="315" \n  src="https://www.youtube.com/embed/dQw4w9WgXcQ" \n  title="YouTube video player" \n  loading="lazy"\n  sandbox="allow-scripts allow-same-origin"\n  allowfullscreen>\n</iframe>',
          },
          rightPanel: { startingCode: '<!-- Embed YouTube video -->\n', expectedOutput: 'YouTube iframe' },
        },
        {
          lessonId: 'html-08', title: 'Meta Tags & SEO', type: 'learn', difficulty: 'intermediate', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'Meta tags provide metadata about the document. Essential meta tags: charset="UTF-8" for character encoding, viewport for responsive design, description for SEO snippets, og:title and og:image for social media sharing. Robots meta controls crawler behavior: <meta name="robots" content="noindex">. Proper meta tags improve search rankings and social sharing previews.',
            instructions: 'Add essential meta tags: charset, viewport, description, and Open Graph tags for social sharing.',
          },
          utilities: {
            hint: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Learn to code with AcademicQuest">\n<meta property="og:title" content="AcademicQuest">\n<meta property="og:image" content="preview.jpg">',
            flashcard: { front: 'What is the viewport meta tag for?', back: 'viewport controls how the page scales on mobile devices. width=device-width matches the screen width, initial-scale=1.0 prevents zooming. Without it, mobile browsers zoom out to show desktop layout, making text tiny.' },
            solution: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Master programming with AcademicQuest - interactive coding lessons in Python, JavaScript, React, and more.">\n<meta property="og:title" content="AcademicQuest - Learn to Code">\n<meta property="og:description" content="Interactive coding lessons for beginners and advanced developers.">\n<meta property="og:image" content="https://academicquest.com/og-image.jpg">\n<meta property="og:url" content="https://academicquest.com">',
          },
          rightPanel: { startingCode: '<head>\n  <!-- Add meta tags -->\n</head>', expectedOutput: 'Meta tags for SEO and social sharing' },
        },
        {
          lessonId: 'html-09', title: 'Data Attributes', type: 'practice', difficulty: 'intermediate', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Data attributes store custom data on HTML elements: data-user-id="123", data-role="admin". They\'re prefixed with data- and accessible via JavaScript with element.dataset.userId. Use them for storing information needed by JavaScript without polluting class names or creating non-standard attributes. They\'re valid HTML5 and don\'t affect styling or default behavior.',
            instructions: 'Create a list of courses with data attributes for course ID, difficulty, and XP. Write JavaScript to log these values.',
          },
          utilities: {
            hint: '<li data-course-id="py1" data-difficulty="beginner" data-xp="200">Python</li>\n<script>\nconst course = document.querySelector(\'[data-course-id="py1"]\');\nconsole.log(course.dataset.difficulty, course.dataset.xp);\n</script>',
            flashcard: { front: 'Why use data- attributes instead of custom attributes?', back: 'data- attributes are valid HTML5, won\'t cause validation errors, and have a standard API (dataset). Custom attributes like courseId are invalid HTML and may conflict with future HTML standards.' },
            solution: '<ul>\n  <li data-course-id="py1" data-difficulty="beginner" data-xp="200">Python</li>\n  <li data-course-id="web3" data-difficulty="beginner" data-xp="300">JavaScript</li>\n  <li data-course-id="web4" data-difficulty="intermediate" data-xp="400">React</li>\n</ul>\n<script>\nconst courses = document.querySelectorAll(\'[data-course-id]\');\ncourses.forEach(course => {\n  console.log(`${course.textContent}: ${course.dataset.difficulty}, ${course.dataset.xp} XP`);\n});\n</script>',
          },
          rightPanel: { startingCode: '<!-- Add courses with data attributes -->\n', expectedOutput: 'Courses with data attributes logged' },
        },
        {
          lessonId: 'html-10', title: 'HTML5 APIs Overview', type: 'practice', difficulty: 'intermediate', track: 'html', xpReward: 10,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'HTML5 provides browser APIs accessed through JavaScript: Geolocation (navigator.geolocation), LocalStorage/SessionStorage for data persistence, Web Workers for background processing, Canvas for graphics, WebSockets for real-time communication. These APIs enable rich web applications without plugins. Always check for API support before using: if (\'geolocation\' in navigator).',
            instructions: 'Use LocalStorage to save and retrieve a user preference. Check for API support first.',
          },
          utilities: {
            hint: 'if (\'localStorage\' in window) {\n  localStorage.setItem(\'theme\', \'dark\');\n  const theme = localStorage.getItem(\'theme\');\n  console.log(theme);\n}',
            flashcard: { front: 'What is the difference between localStorage and sessionStorage?', back: 'localStorage persists across browser sessions (survives closing the browser). sessionStorage is cleared when the tab/session ends. Both have the same API (setItem, getItem, removeItem, clear).' },
            solution: '<button id="save-theme">Save Dark Theme</button>\n<button id="load-theme">Load Theme</button>\n<script>\nif (\'localStorage\' in window) {\n  document.getElementById(\'save-theme\').onclick = () => {\n    localStorage.setItem(\'theme\', \'dark\');\n    console.log(\'Theme saved\');\n  };\n  document.getElementById(\'load-theme\').onclick = () => {\n    const theme = localStorage.getItem(\'theme\');\n    console.log(\'Current theme:\', theme || \'not set\');\n  };\n} else {\n  console.log(\'localStorage not supported\');\n}\n</script>',
          },
          rightPanel: { startingCode: '<!-- Add buttons and localStorage script -->\n', expectedOutput: 'LocalStorage save/load functionality' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'html-super-02', title: 'Performance Optimization', type: 'supercharge', difficulty: 'advanced', track: 'html', xpReward: 15,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'HTML performance impacts page load speed and user experience. Key optimizations: defer non-critical scripts (<script defer>), async for independent scripts (<script async>), preload critical resources (<link rel="preload">), lazy load images (loading="lazy"), use modern image formats (WebP), minimize DOM depth, avoid inline styles and scripts. Faster pages rank better in SEO and retain more users.',
            instructions: 'Optimize a page by adding defer/async to scripts, preloading critical CSS, and lazy loading images.',
          },
          utilities: {
            hint: '<link rel="preload" href="critical.css" as="style">\n<script src="analytics.js" async></script>\n<script src="main.js" defer></script>\n<img src="hero.jpg" loading="lazy">',
            flashcard: { front: 'What is the difference between async and defer for scripts?', back: 'async downloads in parallel and executes as soon as ready (may interrupt parsing). defer downloads in parallel and executes after HTML parsing completes (maintains order). Use async for independent scripts like analytics, defer for scripts that depend on DOM.' },
            solution: '<head>\n  <link rel="preload" href="critical.css" as="style">\n  <link rel="stylesheet" href="critical.css">\n  <script src="analytics.js" async></script>\n</head>\n<body>\n  <img src="hero.jpg" loading="eager">\n  <img src="gallery-1.jpg" loading="lazy">\n  <img src="gallery-2.jpg" loading="lazy">\n  <script src="main.js" defer></script>\n</body>',
          },
          rightPanel: { startingCode: '<!-- Optimize page performance -->\n', expectedOutput: 'Performance-optimized HTML' },
        },
      ],
      sectionProject: {
        lessonId: 'html-project-2', title: 'Section Project: Video Course Landing Page', type: 'project', difficulty: 'intermediate', track: 'html', xpReward: 20,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build a video course landing page using advanced HTML features. This project will demonstrate media embedding, meta tags, data attributes, and performance optimization.',
          instructions: 'Build a landing page with:\n  • Complete meta tags for SEO and social sharing\n  • Hero section with embedded video\n  • Course list with data attributes\n  • Lazy-loaded images\n  • Optimized script loading',
        },
        utilities: {
          hint: 'Use video element with multiple sources. Add Open Graph meta tags. Use data- attributes for course info. Add loading="lazy" to below-fold images. Use defer for main script, async for analytics.',
          flashcard: { front: 'What makes a high-performance HTML page?', back: 'Minimal blocking resources, deferred JavaScript, lazy-loaded media, optimized images (WebP), preloaded critical CSS, shallow DOM tree, semantic HTML for efficient parsing, and proper caching headers.' },
          solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Master HTML5 with our comprehensive video course">\n  <meta property="og:title" content="HTML5 Mastery Course">\n  <meta property="og:description" content="Learn modern HTML5 from basics to advanced">\n  <meta property="og:image" content="https://academicquest.com/html5-course.jpg">\n  <meta property="og:type" content="website">\n  <link rel="preload" href="styles.css" as="style">\n  <link rel="stylesheet" href="styles.css">\n  <script src="analytics.js" async></script>\n</head>\n<body>\n  <header>\n    <h1>HTML5 Mastery</h1>\n  </header>\n  <main>\n    <section class="hero">\n      <video controls poster="hero-poster.jpg" width="800">\n        <source src="intro.mp4" type="video/mp4">\n        <source src="intro.webm" type="video/webm">\n      </video>\n    </section>\n    <section class="courses">\n      <h2>Course Modules</h2>\n      <ul>\n        <li data-module="1" data-duration="45min" data-xp="50">Document Structure</li>\n        <li data-module="2" data-duration="60min" data-xp="75">Forms & Validation</li>\n        <li data-module="3" data-duration="90min" data-xp="100">Media & APIs</li>\n      </ul>\n    </section>\n    <section class="gallery">\n      <h2>Student Projects</h2>\n      <img src="project1.jpg" loading="lazy" alt="Student project 1">\n      <img src="project2.jpg" loading="lazy" alt="Student project 2">\n    </section>\n  </main>\n  <footer>\n    <p>© 2026 AcademicQuest</p>\n  </footer>\n  <script src="main.js" defer></script>\n</body>\n</html>',
        },
        rightPanel: { startingCode: '<!-- Build video course landing page -->\n', expectedOutput: 'Complete landing page with optimizations' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'html-capstone', title: 'Course Capstone: AcademicQuest Homepage', type: 'project', difficulty: 'advanced', track: 'html', xpReward: 50,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build the complete AcademicQuest homepage using all HTML concepts learned. This capstone will demonstrate semantic structure, accessibility, media embedding, SEO optimization, and performance best practices.',
      instructions: 'Build the AcademicQuest homepage with:\n  • Complete semantic structure (header, nav, main, sections, footer)\n  • Hero section with video preview\n  • Course categories with data attributes\n  • Student testimonials with lazy-loaded images\n  • Complete meta tags for SEO and social sharing\n  • Contact form with proper accessibility\n  • Performance-optimized resource loading\n  • ARIA attributes for accessibility',
    },
    utilities: {
      hint: 'Use semantic HTML throughout. Add comprehensive meta tags. Embed video with multiple sources. Use data- attributes for course data. Lazy load images. Optimize script loading. Add ARIA labels where needed. Ensure color contrast and keyboard navigation.',
      flashcard: { front: 'What makes a production-ready HTML page?', back: 'Valid HTML5, semantic structure, complete meta tags, accessibility (ARIA, alt text, labels), SEO optimization, performance (lazy loading, deferred scripts), responsive design (viewport meta), cross-browser compatibility, and proper encoding.' },
      solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="AcademicQuest - Master programming with interactive coding lessons in Python, JavaScript, React, and more. Build real projects, earn XP, and get certified.">\n  <meta name="keywords" content="learn to code, programming, Python, JavaScript, React, online courses">\n  <meta name="author" content="AcademicQuest">\n  <meta property="og:title" content="AcademicQuest - Learn to Code">\n  <meta property="og:description" content="Interactive coding lessons for beginners and advanced developers">\n  <meta property="og:image" content="https://academicquest.com/og-image.jpg">\n  <meta property="og:url" content="https://academicquest.com">\n  <meta property="og:type" content="website">\n  <meta name="twitter:card" content="summary_large_image">\n  <link rel="preload" href="critical.css" as="style">\n  <link rel="stylesheet" href="critical.css">\n  <script src="analytics.js" async></script>\n</head>\n<body>\n  <header role="banner">\n    <nav role="navigation" aria-label="Main navigation">\n      <a href="/" aria-label="AcademicQuest Home">🏠</a>\n      <a href="/courses">Courses</a>\n      <a href="/paths">Learning Paths</a>\n      <a href="/community">Community</a>\n      <a href="/login">Login</a>\n    </nav>\n  </header>\n  <main role="main">\n    <section class="hero" aria-labelledby="hero-title">\n      <h1 id="hero-title">Master Programming with AcademicQuest</h1>\n      <video controls poster="hero-preview.jpg" width="800" aria-label="Platform preview video">\n        <source src="preview.mp4" type="video/mp4">\n        <source src="preview.webm" type="video/webm">\n        <p><a href="preview.mp4">Download the video</a> to see the platform in action.</p>\n      </video>\n      <a href="/courses" class="cta-button">Start Learning Free</a>\n    </section>\n    <section class="categories" aria-labelledby="categories-title">\n      <h2 id="categories-title">Course Categories</h2>\n      <div class="category-grid">\n        <article class="category" data-category="web" data-count="5">\n          <h3>Web Development</h3>\n          <p>HTML, CSS, JavaScript, React, Node.js</p>\n        </article>\n        <article class="category" data-category="data" data-count="2">\n          <h3>Data Science</h3>\n          <p>Python, SQL, Machine Learning</p>\n        </article>\n        <article class="category" data-category="ai" data-count="1">\n          <h3>Artificial Intelligence</h3>\n          <p>Neural Networks, Deep Learning</p>\n        </article>\n      </div>\n    </section>\n    <section class="testimonials" aria-labelledby="testimonials-title">\n      <h2 id="testimonials-title">What Students Say</h2>\n      <div class="testimonial-grid">\n        <blockquote class="testimonial">\n          <img src="student1.jpg" loading="lazy" alt="Munira, a software developer">\n          <p>"AcademicQuest transformed my career. I went from zero coding knowledge to a junior developer in 6 months."</p>\n          <cite>— Munira Mwanzia</cite>\n        </blockquote>\n        <blockquote class="testimonial">\n          <img src="student2.jpg" loading="lazy" alt="Alex, a data analyst">\n          <p>"The interactive lessons and real projects made learning Python actually fun and practical."</p>\n          <cite>— Alex Chen</cite>\n        </blockquote>\n      </div>\n    </section>\n    <section class="contact" aria-labelledby="contact-title">\n      <h2 id="contact-title">Get in Touch</h2>\n      <form action="/contact" method="POST">\n        <label for="contact-name">Name</label>\n        <input type="text" id="contact-name" name="name" required aria-required="true">\n        <label for="contact-email">Email</label>\n        <input type="email" id="contact-email" name="email" required aria-required="true">\n        <label for="contact-message">Message</label>\n        <textarea id="contact-message" name="message" required aria-required="true"></textarea>\n        <button type="submit">Send Message</button>\n      </form>\n    </section>\n  </main>\n  <footer role="contentinfo">\n    <p>© 2026 AcademicQuest. All rights reserved.</p>\n    <nav aria-label="Footer navigation">\n      <a href="/about">About</a>\n      <a href="/privacy">Privacy</a>\n      <a href="/terms">Terms</a>\n    </nav>\n  </footer>\n  <script src="main.js" defer></script>\n</body>\n</html>',
    },
    rightPanel: { startingCode: '<!-- Build complete AcademicQuest homepage -->\n', expectedOutput: 'Production-ready homepage with all HTML best practices' },
  },
  totalLessons: 10,
  totalXP: 150,
};
