import type { Course } from '../../types/curriculum';

export const javascriptCourse: Course = {
  id: 'web3',
  title: 'JavaScript',
  tagline: 'The language of the web browser',
  philosophy: 'JavaScript is taught by building interactive behavior step by step — from variables to DOM-ready logic.',
  icon: '⚡',
  color: 'from-yellow-500 to-yellow-700',
  level: 'BEGINNER',
  pillar: 'Web Development',
  xp: 300,
  sections: [
    {
      sectionId: 'js-section-1',
      title: 'Section 1: JavaScript Fundamentals',
      learningObjective: 'Master the core concepts of JavaScript including variables, functions, data types, and control flow.',
      order: 1,
      isLocked: false,
      xpReward: 100,
      keyConcepts: ['Variables', 'Data Types', 'Functions', 'Scope', 'Control Flow', 'Error Handling'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'js-01', title: 'Hello JavaScript & Variables', type: 'learn', difficulty: 'beginner', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'JavaScript runs in every browser and powers interactive websites. The console.log() function prints messages — it\'s the JavaScript equivalent of Python\'s print(). Variables are declared with let or const. const means the binding cannot be reassigned; let allows reassignment. var is legacy — avoid it. JavaScript has dynamic typing: variables can hold any type, but TypeScript adds static typing for safety.',
            instructions: 'Declare a const variable called language set to "JavaScript". Use console.log() to print "Hello, JavaScript!".',
          },
          utilities: {
            hint: 'const language = "JavaScript";\nconsole.log("Hello, " + language + "!");',
            flashcard: { front: 'What is the difference between let and const?', back: 'let allows reassignment; const does not. Both are block-scoped (unlike old var). Use const by default and let when you need to reassign. const objects can still have their properties modified.' },
            solution: 'const language = "JavaScript";\nconsole.log("Hello, " + language + "!");',
          },
          rightPanel: { startingCode: '// JavaScript Lesson 1\n// Declare language and log a greeting\n\n', expectedOutput: 'Hello, JavaScript!' },
        },
        {
          lessonId: 'js-02', title: 'Functions & Parameters', type: 'learn', difficulty: 'beginner', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'Functions bundle reusable logic. In modern JavaScript you can write function greet(name) { ... } or const greet = (name) => { ... } for arrow functions. Parameters let you pass data in; return sends a value back. Arrow functions have implicit return for single expressions: const add = (a, b) => a + b;. They also lexically bind this, which matters for object methods.',
            instructions: 'Write a function add(a, b) that returns the sum of two numbers. Call it with 12 and 8 and log the result.',
          },
          utilities: {
            hint: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(12, 8));',
            flashcard: { front: 'What does an arrow function return if there is no return keyword?', back: 'If the body uses curly braces without return, it returns undefined. A concise arrow body like (a, b) => a + b implicitly returns the expression. Curly braces require explicit return.' },
            solution: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(12, 8));',
          },
          rightPanel: { startingCode: '// JavaScript Lesson 2\nfunction add(a, b) {\n  // return the sum\n}\n\nconsole.log(add(12, 8));', expectedOutput: '20' },
        },
        {
          lessonId: 'js-03', title: 'Arrays & Loops', type: 'learn', difficulty: 'beginner', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'Arrays store ordered lists: const scores = [90, 85, 92]. Use .forEach(), .map(), or a for...of loop to process each item. .map() creates a new array by transforming each element. .filter() creates a new array with elements that pass a test. .reduce() accumulates a single value. These array methods are chainable and functional.',
            instructions: 'Given const nums = [1, 2, 3, 4, 5], use .map() to double each number and log the result.',
          },
          utilities: {
            hint: 'const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);',
            flashcard: { front: 'Does .map() modify the original array?', back: 'No. .map() returns a new array and leaves the original unchanged. This is important for React state updates. .forEach() modifies in place but returns undefined. Always prefer immutable methods.' },
            solution: 'const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);',
          },
          rightPanel: { startingCode: 'const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => /* double n */);\nconsole.log(doubled);', expectedOutput: '2,4,6,8,10' },
        },
        {
          lessonId: 'js-04', title: 'Objects & Destructuring', type: 'practice', difficulty: 'beginner', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'Objects store key-value pairs: const user = { name: "Munira", xp: 120 }. Destructuring extracts fields: const { name, xp } = user. Template literals use backticks: `Hello, ${name}!`. Object spread (...) copies properties: const newUser = { ...user, level: 5 }. Computed property keys: [key]: value. Objects are reference types — variables point to the same object.',
            instructions: 'Create a user object with name and xp. Destructure both fields and log `User: [name] has [xp] XP`.',
          },
          utilities: {
            hint: 'const user = { name: "Munira", xp: 120 };\nconst { name, xp } = user;\nconsole.log(`User: ${name} has ${xp} XP`);',
            flashcard: { front: 'What are template literals?', back: 'Strings wrapped in backticks (`) that support ${expression} interpolation and multi-line text without escape characters. They\'re more readable than string concatenation with +.' },
            solution: 'const user = { name: "Munira", xp: 120 };\nconst { name, xp } = user;\nconsole.log(`User: ${name} has ${xp} XP`);',
          },
          rightPanel: { startingCode: 'const user = { name: "Munira", xp: 120 };\n// destructure and log\n', expectedOutput: 'User: Munira has 120 XP' },
        },
        {
          lessonId: 'js-05', title: 'Conditionals & Error Handling', type: 'practice', difficulty: 'beginner', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'Use if/else if/else to branch logic. Combine comparisons with && (and) and || (or). Ternary operator: condition ? valueIfTrue : valueIfFalse. try/catch handles errors: try { riskyCode() } catch (error) { handleError(error) }. finally runs regardless of success or failure. Always validate input and handle potential errors gracefully.',
            instructions: 'Write getGrade(score) that returns "A" for 90+, "B" for 80+, "C" for 70+, else "F". Log getGrade(85). Add error handling for invalid scores.',
          },
          utilities: {
            hint: 'function getGrade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "F";\n}\ntry {\n  console.log(getGrade(85));\n} catch (e) {\n  console.error(e);\n}',
            flashcard: { front: 'What is the difference between == and === in JavaScript?', back: '== performs type coercion ( "5" == 5 is true ). === checks value AND type ( "5" === 5 is false ). Always prefer === to avoid unexpected coercion bugs.' },
            solution: 'function getGrade(score) {\n  if (typeof score !== "number" || score < 0 || score > 100) {\n    throw new Error("Invalid score");\n  }\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "F";\n}\n\ntry {\n  console.log(getGrade(85));\n  console.log(getGrade(95));\n} catch (error) {\n  console.error(error.message);\n}',
          },
          rightPanel: { startingCode: 'function getGrade(score) {\n  // return letter grade with validation\n}\nconsole.log(getGrade(85));', expectedOutput: 'B' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'js-super-01', title: 'Closures & Scope', type: 'supercharge', difficulty: 'intermediate', track: 'javascript', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'A closure is a function that remembers the variables from its outer scope even after the outer function has returned. This enables private variables, function factories, and callbacks. Scope determines variable accessibility: global, function scope, block scope (let/const). Lexical scoping means inner functions can access outer variables but not vice versa. Closures are fundamental to JavaScript patterns.',
            instructions: 'Create a counter function using closures that returns an object with increment and decrement methods. Each counter should maintain its own private count.',
          },
          utilities: {
            hint: 'function createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}',
            flashcard: { front: 'What is a closure and why is it useful?', back: 'A closure is when a function remembers and accesses variables from its outer scope even after the outer function returns. Useful for: data privacy (private variables), function factories, maintaining state in callbacks, and module patterns.' },
            solution: 'function createCounter(initialValue = 0) {\n  let count = initialValue;\n  \n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    reset: () => count = initialValue,\n    getCount: () => count\n  };\n}\n\nconst counter1 = createCounter();\nconst counter2 = createCounter(10);\n\nconsole.log(counter1.increment()); // 1\nconsole.log(counter1.increment()); // 2\nconsole.log(counter2.getCount()); // 10\nconsole.log(counter1.getCount()); // 2\nconsole.log(counter2.increment()); // 11',
          },
          rightPanel: { startingCode: '// Create counter with closures\n', expectedOutput: 'Counter with private state' },
        },
      ],
      sectionProject: {
        lessonId: 'js-project-1', title: 'Section Project: Student Grade Calculator', type: 'project', difficulty: 'beginner', track: 'javascript', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a student grade calculator using all JavaScript fundamentals learned. This project will demonstrate functions, arrays, objects, conditionals, and error handling.',
          instructions: 'Build a grade calculator that:\n  • Accepts an array of student objects with name and scores\n  • Calculates average score per student\n  • Determines letter grade\n  • Finds class average\n  • Identifies top and bottom performers\n  • Handles edge cases with error handling',
        },
        utilities: {
          hint: 'Use array methods (map, reduce, filter). Create helper functions for average and letter grade. Use destructuring for student objects. Add try/catch for validation. Return a results object with statistics.',
          flashcard: { front: 'What array method should you use to calculate a sum?', back: '.reduce() accumulates a single value from an array. For summing: array.reduce((sum, value) => sum + value, 0). The second argument (0) is the initial value. Also useful for products, building objects, and complex aggregations.' },
          solution: 'function calculateLetterGrade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  if (score >= 60) return "D";\n  return "F";\n}\n\nfunction calculateAverage(scores) {\n  if (!scores || scores.length === 0) return 0;\n  return scores.reduce((sum, score) => sum + score, 0) / scores.length;\n}\n\nfunction analyzeStudents(students) {\n  if (!Array.isArray(students)) {\n    throw new Error("Input must be an array");\n  }\n  \n  const analyzed = students.map(student => {\n    const average = calculateAverage(student.scores);\n    return {\n      name: student.name,\n      average: parseFloat(average.toFixed(2)),\n      grade: calculateLetterGrade(average)\n    };\n  });\n  \n  const classAverage = calculateAverage(analyzed.map(s => s.average));\n  const sorted = [...analyzed].sort((a, b) => b.average - a.average);\n  const top = sorted[0];\n  const bottom = sorted[sorted.length - 1];\n  \n  return {\n    students: analyzed,\n    classAverage: parseFloat(classAverage.toFixed(2)),\n    topPerformer: top,\n    bottomPerformer: bottom\n  };\n}\n\nconst students = [\n  { name: "Munira", scores: [95, 88, 92, 90] },\n  { name: "Alex", scores: [78, 85, 82, 80] },\n  { name: "Jordan", scores: [92, 95, 88, 94] }\n];\n\nconst results = analyzeStudents(students);\nconsole.log(results);',
        },
        rightPanel: { startingCode: '// Build grade calculator\n', expectedOutput: 'Complete grade analysis with statistics' },
      },
    },
    {
      sectionId: 'js-section-2',
      title: 'Section 2: DOM Manipulation & Events',
      learningObjective: 'Learn to interact with web pages using the DOM API, handle events, and create dynamic user interfaces.',
      order: 2,
      isLocked: true,
      xpReward: 100,
      keyConcepts: ['DOM Selection', 'DOM Manipulation', 'Event Handling', 'Event Bubbling', 'Forms', 'LocalStorage'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'js-06', title: 'DOM Selection & Manipulation', type: 'learn', difficulty: 'intermediate', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'The DOM (Document Object Model) represents HTML as a tree of objects. Select elements: document.getElementById(), document.querySelector(), document.querySelectorAll(). Manipulate: element.textContent, element.innerHTML, element.style.color, element.classList.add(). Create elements: document.createElement(). Append: parent.appendChild(child). Template literals make building HTML easier.',
            instructions: 'Select an element by ID, change its text content, and add a CSS class.',
          },
          utilities: {
            hint: 'const title = document.getElementById("title");\ntitle.textContent = "New Title";\ntitle.classList.add("highlight");',
            flashcard: { front: 'What is the difference between textContent and innerHTML?', back: 'textContent sets/gets only text content (safe from XSS). innerHTML sets/gets HTML including tags (dangerous if user input). Use textContent for text, innerHTML only with trusted content.' },
            solution: 'const title = document.getElementById("main-title");\ntitle.textContent = "Welcome to JavaScript!";\ntitle.classList.add("text-primary", "font-bold");\ntitle.style.color = "#8B5CF6";',
          },
          rightPanel: { startingCode: '// Select and manipulate DOM element\n', expectedOutput: 'Element with new content and class' },
        },
        {
          lessonId: 'js-07', title: 'Event Handling', type: 'learn', difficulty: 'intermediate', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Events are actions that occur in the browser: click, submit, keydown, scroll. Add listeners: element.addEventListener("click", handler). The event object (e) contains information: e.target, e.preventDefault(), e.stopPropagation(). Remove listeners: removeEventListener(). Event delegation attaches one listener to a parent to handle child events via bubbling. This is more efficient for many elements.',
            instructions: 'Add a click event listener to a button that logs a message and prevents default behavior.',
          },
          utilities: {
            hint: 'const button = document.querySelector("button");\nbutton.addEventListener("click", (e) => {\n  e.preventDefault();\n  console.log("Button clicked!");\n});',
            flashcard: { front: 'What is event bubbling and how do you stop it?', back: 'Bubbling means events propagate from target to parent elements. e.stopPropagation() stops propagation. e.preventDefault() stops default browser behavior (form submission, link navigation). Use both to fully control event handling.' },
            solution: 'const button = document.querySelector("#submit-btn");\nbutton.addEventListener("click", (event) => {\n  event.preventDefault();\n  console.log("Form submission prevented");\n  console.log("Button was clicked");\n  console.log("Event target:", event.target);\n});',
          },
          rightPanel: { startingCode: '// Add event listener to button\n', expectedOutput: 'Click handler with preventDefault' },
        },
        {
          lessonId: 'js-08', title: 'Form Handling & Validation', type: 'learn', difficulty: 'intermediate', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'Forms collect user input. Access values: form.elements.name.value or input.value. Validate: check required fields, validate email format, ensure number ranges. HTML5 validation: required, pattern, type="email". Custom validation: checkValidity(), setCustomValidity(). Submit event: form.addEventListener("submit", handler). FormData API simplifies handling: new FormData(form).',
            instructions: 'Create a form handler that validates email and password, then logs the form data.',
          },
          utilities: {
            hint: 'form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const email = form.email.value;\n  const password = form.password.value;\n  // validate and log\n});',
            flashcard: { front: 'What is the FormData API used for?', back: 'FormData creates an object representing form fields and values, making it easy to send form data via fetch() or XMLHttpRequest. It handles file uploads automatically and works with all input types.' },
            solution: 'const form = document.querySelector("#login-form");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  \n  const email = form.email.value;\n  const password = form.password.value;\n  \n  // Validation\n  if (!email.includes("@")) {\n    alert("Please enter a valid email");\n    return;\n  }\n  \n  if (password.length < 8) {\n    alert("Password must be at least 8 characters");\n    return;\n  }\n  \n  const formData = new FormData(form);\n  console.log("Form data:", Object.fromEntries(formData));\n  console.log("Email:", email);\n  console.log("Password length:", password.length);\n});',
          },
          rightPanel: { startingCode: '// Create form handler with validation\n', expectedOutput: 'Validated form data logged' },
        },
        {
          lessonId: 'js-09', title: 'LocalStorage & SessionStorage', type: 'practice', difficulty: 'intermediate', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Web Storage API persists data in the browser. localStorage: persists across sessions (survives browser close). sessionStorage: cleared when session ends (tab close). Methods: setItem(key, value), getItem(key), removeItem(key), clear(). Values are stored as strings — use JSON.stringify() for objects and JSON.parse() to retrieve. Storage is limited (~5MB) and synchronous.',
            instructions: 'Save user preferences to localStorage and retrieve them on page load.',
          },
          utilities: {
            hint: '// Save\nlocalStorage.setItem("theme", "dark");\nlocalStorage.setItem("user", JSON.stringify({name: "Munira"}));\n// Load\nconst theme = localStorage.getItem("theme");\nconst user = JSON.parse(localStorage.getItem("user"));',
            flashcard: { front: 'What is the storage limit for localStorage?', back: 'Typically 5MB per domain. Exceeding it throws a QuotaExceededError. Always wrap storage operations in try/catch. For more data, use IndexedDB or server-side storage.' },
            solution: '// Save preferences\nfunction savePreferences(preferences) {\n  try {\n    localStorage.setItem("userPreferences", JSON.stringify(preferences));\n    console.log("Preferences saved");\n  } catch (error) {\n    console.error("Storage error:", error);\n  }\n}\n\n// Load preferences\nfunction loadPreferences() {\n  try {\n    const stored = localStorage.getItem("userPreferences");\n    if (stored) {\n      return JSON.parse(stored);\n    }\n    return { theme: "light", fontSize: 16 };\n  } catch (error) {\n    console.error("Load error:", error);\n    return { theme: "light", fontSize: 16 };\n  }\n}\n\nconst preferences = { theme: "dark", fontSize: 18, language: "en" };\nsavePreferences(preferences);\n\nconst loaded = loadPreferences();\nconsole.log("Loaded preferences:", loaded);',
          },
          rightPanel: { startingCode: '// Implement localStorage save/load\n', expectedOutput: 'Preferences saved and loaded' },
        },
        {
          lessonId: 'js-10', title: 'Dynamic DOM Creation', type: 'practice', difficulty: 'intermediate', track: 'javascript', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'Create elements dynamically: document.createElement(tag). Set properties: element.textContent, element.className, element.id. Add attributes: element.setAttribute(). Append to DOM: parent.appendChild(child). Insert before: parent.insertBefore(new, reference). Remove: parent.removeChild(child). Template strings make building complex HTML easier. DocumentFragment improves performance for batch inserts.',
            instructions: 'Create a todo list app that dynamically adds todo items from user input.',
          },
          utilities: {
            hint: 'function addTodo(text) {\n  const li = document.createElement("li");\n  li.textContent = text;\n  document.querySelector("#todo-list").appendChild(li);\n}',
            flashcard: { front: 'What is DocumentFragment and when should you use it?', back: 'DocumentFragment is a lightweight DOM container that holds nodes without being part of the main DOM. Use it when inserting multiple elements — append all to fragment, then append fragment once. This reduces reflows and improves performance.' },
            solution: 'const form = document.querySelector("#todo-form");\nconst input = document.querySelector("#todo-input");\nconst list = document.querySelector("#todo-list");\n\nfunction createTodoItem(text) {\n  const li = document.createElement("li");\n  li.className = "todo-item";\n  \n  const span = document.createElement("span");\n  span.textContent = text;\n  \n  const deleteBtn = document.createElement("button");\n  deleteBtn.textContent = "×";\n  deleteBtn.className = "delete-btn";\n  deleteBtn.onclick = () => li.remove();\n  \n  li.appendChild(span);\n  li.appendChild(deleteBtn);\n  \n  return li;\n}\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const text = input.value.trim();\n  if (text) {\n    const todo = createTodoItem(text);\n    list.appendChild(todo);\n    input.value = "";\n  }\n});',
          },
          rightPanel: { startingCode: '// Create dynamic todo list\n', expectedOutput: 'Functional todo list with dynamic items' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'js-super-02', title: 'Event Delegation', type: 'supercharge', difficulty: 'advanced', track: 'javascript', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'Event delegation attaches one listener to a parent element to handle events on child elements. It works because events bubble up. Benefits: fewer listeners (better performance), handles dynamically added elements automatically, simpler code. Use e.target to identify which child triggered the event. e.target.closest() finds the matching ancestor. Essential for lists, tables, and dynamic content.',
            instructions: 'Refactor a list with individual click handlers to use event delegation on the parent.',
          },
          utilities: {
            hint: 'list.addEventListener("click", (e) => {\n  const item = e.target.closest(".list-item");\n  if (item) {\n    // handle click on item\n  }\n});',
            flashcard: { front: 'Why is event delegation better than individual listeners?', back: 'One listener instead of hundreds = better performance. Automatically handles dynamically added elements. Simpler code. Less memory usage. Essential for large lists or dynamic content where elements are added/removed frequently.' },
            solution: '// Before: Individual listeners (bad for performance)\n// items.forEach(item => item.addEventListener("click", handler));\n\n// After: Event delegation (better)\nconst list = document.querySelector("#todo-list");\n\nlist.addEventListener("click", (event) => {\n  const deleteBtn = event.target.closest(".delete-btn");\n  const todoItem = event.target.closest(".todo-item");\n  \n  if (deleteBtn && todoItem) {\n    todoItem.remove();\n    console.log("Removed:", todoItem.textContent);\n  } else if (todoItem) {\n    todoItem.classList.toggle("completed");\n    console.log("Toggled:", todoItem.textContent);\n  }\n});\n\n// This works even for dynamically added todos!',
          },
          rightPanel: { startingCode: '// Implement event delegation\n', expectedOutput: 'Event delegation pattern implemented' },
        },
      ],
      sectionProject: {
        lessonId: 'js-project-2', title: 'Section Project: Interactive Task Manager', type: 'project', difficulty: 'intermediate', track: 'javascript', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build an interactive task manager using DOM manipulation, events, and localStorage. This project will demonstrate dynamic UI creation, form handling, and data persistence.',
          instructions: 'Build a task manager with:\n  • Add tasks via form\n  • Mark tasks complete\n  • Delete tasks\n  • Filter tasks (all/active/completed)\n  • Persist to localStorage\n  • Event delegation for efficiency',
        },
        utilities: {
          hint: 'Use event delegation for task list. Use localStorage for persistence. Use filter array method for filtering. Use classList for state. Create helper functions for rendering. Handle edge cases.',
          flashcard: { front: 'What makes a good interactive JavaScript application?', back: 'Clean DOM manipulation, event delegation for performance, localStorage for persistence, form validation, error handling, accessible markup, keyboard navigation, and smooth user feedback.' },
          solution: 'class TaskManager {\n  constructor() {\n    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];\n    this.filter = "all";\n    this.init();\n  }\n  \n  init() {\n    this.render();\n    this.setupEventListeners();\n  }\n  \n  setupEventListeners() {\n    const form = document.querySelector("#task-form");\n    const filterBtns = document.querySelectorAll(".filter-btn");\n    \n    form.addEventListener("submit", (e) => {\n      e.preventDefault();\n      this.addTask(form.input.value.trim());\n      form.input.value = "";\n    });\n    \n    filterBtns.forEach(btn => {\n      btn.addEventListener("click", () => {\n        this.filter = btn.dataset.filter;\n        this.render();\n      });\n    });\n    \n    document.querySelector("#task-list").addEventListener("click", (e) => {\n      const task = e.target.closest(".task-item");\n      if (!task) return;\n      const id = parseInt(task.dataset.id);\n      \n      if (e.target.closest(".delete-btn")) {\n        this.deleteTask(id);\n      } else {\n        this.toggleTask(id);\n      }\n    });\n  }\n  \n  addTask(text) {\n    const task = {\n      id: Date.now(),\n      text,\n      completed: false,\n      createdAt: new Date().toISOString()\n    };\n    this.tasks.push(task);\n    this.save();\n    this.render();\n  }\n  \n  toggleTask(id) {\n    const task = this.tasks.find(t => t.id === id);\n    if (task) {\n      task.completed = !task.completed;\n      this.save();\n      this.render();\n    }\n  }\n  \n  deleteTask(id) {\n    this.tasks = this.tasks.filter(t => t.id !== id);\n    this.save();\n    this.render();\n  }\n  \n  save() {\n    localStorage.setItem("tasks", JSON.stringify(this.tasks));\n  }\n  \n  getFilteredTasks() {\n    switch (this.filter) {\n      case "active": return this.tasks.filter(t => !t.completed);\n      case "completed": return this.tasks.filter(t => t.completed);\n      default: return this.tasks;\n    }\n  }\n  \n  render() {\n    const list = document.querySelector("#task-list");\n    const filtered = this.getFilteredTasks();\n    \n    list.innerHTML = filtered.map(task => `\n      <li class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">\n        <span>${task.text}</span>\n        <button class="delete-btn">×</button>\n      </li>\n    `).join("");\n  }\n}\n\nnew TaskManager();',
        },
        rightPanel: { startingCode: '// Build task manager class\n', expectedOutput: 'Complete task manager with all features' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'js-capstone', title: 'Course Capstone: AcademicQuest Interactive Dashboard', type: 'project', difficulty: 'advanced', track: 'javascript', xpReward: 100,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build a complete interactive dashboard for AcademicQuest using all JavaScript concepts learned. This capstone will demonstrate DOM manipulation, event handling, data persistence, modular code, and modern JavaScript patterns.',
      instructions: 'Build an interactive dashboard with:\n  • Course progress tracking\n  • XP calculator\n  • Dynamic statistics charts\n  • User profile management\n  • LocalStorage persistence\n  • Event delegation\n  • Modular class-based architecture\n  • Error handling throughout',
    },
    utilities: {
      hint: 'Use classes for modular organization. Use localStorage for all data. Use event delegation for lists. Create separate classes for different features. Add comprehensive error handling. Use modern ES6+ features throughout.',
      flashcard: { front: 'What makes a production-ready JavaScript application?', back: 'Modular architecture (classes/modules), error handling, input validation, data persistence, performance optimization (event delegation), accessibility, responsive design, testing, and clear documentation.' },
      solution: 'class Dashboard {\n  constructor() {\n    this.userData = this.loadData();\n    this.courses = this.getCoursesData();\n    this.init();\n  }\n  \n  loadData() {\n    try {\n      return JSON.parse(localStorage.getItem("dashboardData")) || this.getDefaultData();\n    } catch {\n      return this.getDefaultData();\n    }\n  }\n  \n  getDefaultData() {\n    return {\n      name: "Student",\n      xp: 0,\n      level: 1,\n      completedCourses: [],\n      currentProgress: {}\n    };\n  }\n  \n  saveData() {\n    localStorage.setItem("dashboardData", JSON.stringify(this.userData));\n  }\n  \n  getCoursesData() {\n    return [\n      { id: "py1", title: "Python", xp: 200, lessons: 10 },\n      { id: "web1", title: "HTML", xp: 150, lessons: 10 },\n      { id: "web2", title: "CSS", xp: 200, lessons: 10 },\n      { id: "web3", title: "JavaScript", xp: 300, lessons: 10 }\n    ];\n  }\n  \n  init() {\n    this.renderUserInfo();\n    this.renderCourses();\n    this.renderStats();\n    this.setupEventListeners();\n  }\n  \n  renderUserInfo() {\n    document.querySelector("#user-name").textContent = this.userData.name;\n    document.querySelector("#user-xp").textContent = this.userData.xp;\n    document.querySelector("#user-level").textContent = this.userData.level;\n  }\n  \n  renderCourses() {\n    const container = document.querySelector("#courses-container");\n    container.innerHTML = this.courses.map(course => {\n      const progress = this.userData.currentProgress[course.id] || 0;\n      const isCompleted = this.userData.completedCourses.includes(course.id);\n      return `\n        <div class="course-card ${isCompleted ? "completed" : ""}" data-id="${course.id}">\n          <h3>${course.title}</h3>\n          <div class="progress-bar">\n            <div class="progress-fill" style="width: ${progress}%"></div>\n          </div>\n          <p>${progress}% Complete</p>\n          <button class="update-progress">Update Progress</button>\n        </div>\n      `;\n    }).join("");\n  }\n  \n  renderStats() {\n    const totalXP = this.userData.xp;\n    const completedCount = this.userData.completedCourses.length;\n    const totalCourses = this.courses.length;\n    const completionRate = Math.round((completedCount / totalCourses) * 100);\n    \n    document.querySelector("#stat-xp").textContent = totalXP;\n    document.querySelector("#stat-completed").textContent = completedCount;\n    document.querySelector("#stat-rate").textContent = completionRate + "%";\n  }\n  \n  setupEventListeners() {\n    document.querySelector("#courses-container").addEventListener("click", (e) => {\n      const btn = e.target.closest(".update-progress");\n      const card = e.target.closest(".course-card");\n      if (btn && card) {\n        this.updateProgress(card.dataset.id);\n      }\n    });\n    \n    document.querySelector("#reset-btn").addEventListener("click", () => {\n      if (confirm("Reset all progress?")) {\n        localStorage.removeItem("dashboardData");\n        location.reload();\n      }\n    });\n  }\n  \n  updateProgress(courseId) {\n    const course = this.courses.find(c => c.id === courseId);\n    if (!course) return;\n    \n    const current = this.userData.currentProgress[courseId] || 0;\n    const newProgress = Math.min(current + 25, 100);\n    this.userData.currentProgress[courseId] = newProgress;\n    \n    if (newProgress === 100 && !this.userData.completedCourses.includes(courseId)) {\n      this.userData.completedCourses.push(courseId);\n      this.userData.xp += course.xp;\n      this.userData.level = Math.floor(this.userData.xp / 500) + 1;\n    }\n    \n    this.saveData();\n    this.renderCourses();\n    this.renderStats();\n    this.renderUserInfo();\n  }\n}\n\nnew Dashboard();',
    },
    rightPanel: { startingCode: '// Build complete interactive dashboard\n', expectedOutput: 'Production-ready dashboard application' },
  },
  totalLessons: 10,
  totalXP: 300,
};
