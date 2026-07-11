import type { Course } from '../../types/curriculum';

export const typescriptCourse: Course = {
  id: 'web-ts', title: 'TypeScript', tagline: 'JavaScript with superpowers',
  philosophy: 'TypeScript is taught through the problems it solves. Every lesson starts by showing a real JavaScript bug that TypeScript would have caught at compile time, then teaches the TypeScript feature that prevents it.',
  icon: '🔷', color: 'from-blue-600 to-blue-800', level: 'INTERMEDIATE', pillar: 'Full Stack', xp: 350,
  lessons: [
    {
      lessonId: 'ts-01', title: '01. Why TypeScript Exists', difficulty: 'intermediate', track: 'typescript',
      leftPanel: {
        chapterProgress: 'Chapter 1 of 5 — 0%',
        conceptText: `TypeScript is JavaScript with a type system. Microsoft created it in 2012 to solve a real problem: JavaScript's dynamic typing causes bugs that only appear at runtime — often in production, when real users are affected.\n\nConsider this JavaScript bug:\n  function calculateTotal(price, quantity) {\n    return price * quantity;\n  }\n  calculateTotal("10", 5);  // Returns "1010101010" not 50!\n\nJavaScript silently coerces the string "10" and repeats it 5 times. No error. No warning. Just a wrong answer.\n\nTypeScript catches this immediately:\n  function calculateTotal(price: number, quantity: number): number {\n    return price * quantity;\n  }\n  calculateTotal("10", 5);  // ERROR before the code ever runs\n\nTypeScript compiles to regular JavaScript — browsers don't run TypeScript directly. But during development, it acts as a powerful safety net.\n\nToday TypeScript is the standard for professional frontend development. React, Angular, and Vue all have full TypeScript support. Most major codebases at Google, Microsoft, and Airbnb use TypeScript.`,
        instructions: `Convert this JavaScript function to TypeScript by adding type annotations:\n\n  function greetUser(name, age, isPremium) {\n    if (isPremium) {\n      return "Welcome back, " + name + "! Age: " + age;\n    }\n    return "Hello, " + name;\n  }\n\nAdd types: name is string, age is number, isPremium is boolean. Add a return type annotation of string.`,
      },
      utilities: {
        hint: `function greetUser(\n  name: string,\n  age: number,\n  isPremium: boolean\n): string {\n  // function body stays the same\n}`,
        flashcard: { front: 'What does TypeScript compile to, and why does that matter?', back: 'TypeScript compiles to plain JavaScript. This means any JavaScript runtime (browser, Node.js) can run TypeScript output — TypeScript is not a different language, it\'s a superset that adds a development-time type checker. No TypeScript-specific code runs at runtime.' },
        solution: `function greetUser(\n  name: string,\n  age: number,\n  isPremium: boolean\n): string {\n  if (isPremium) {\n    return "Welcome back, " + name + "! Age: " + age;\n  }\n  return "Hello, " + name;\n}\n\nconsole.log(greetUser("Munira", 22, true));\nconsole.log(greetUser("Alex", 19, false));`,
      },
      rightPanel: {
        startingCode: `// TypeScript Lesson 1 — Add type annotations\n\nfunction greetUser(\n  name,      // add type\n  age,       // add type\n  isPremium  // add type\n)            // add return type\n{\n  if (isPremium) {\n    return "Welcome back, " + name + "! Age: " + age;\n  }\n  return "Hello, " + name;\n}\n\nconsole.log(greetUser("Munira", 22, true));\nconsole.log(greetUser("Alex", 19, false));`,
        expectedOutput: 'Welcome back, Munira! Age: 22\nHello, Alex',
      },
    },
    {
      lessonId: 'ts-02', title: '02. Interfaces — Defining Shapes', difficulty: 'intermediate', track: 'typescript',
      leftPanel: {
        chapterProgress: 'Chapter 2 of 5 — 20%',
        conceptText: `Interfaces are TypeScript's way of defining the shape of an object — what properties it must have and what types those properties must be.\n\nWithout interfaces, you'd need to re-type the same structure everywhere. With interfaces:\n\n  interface Student {\n    id: number;\n    name: string;\n    email: string;\n    gpa: number;\n    isEnrolled: boolean;\n    courses?: string[];  // ? means optional\n  }\n\nNow TypeScript enforces that every student object has those exact fields:\n\n  const student: Student = {\n    id: 669208,\n    name: "Munira",\n    email: "munira@usiu.ac.ke",\n    gpa: 3.8,\n    isEnrolled: true\n    // courses is optional — fine to omit\n  };\n\nInterfaces can extend each other:\n  interface PremiumStudent extends Student {\n    subscriptionTier: "basic" | "pro" | "enterprise";\n  }\n\nThis is how large codebases maintain consistency — one interface definition, used everywhere.`,
        instructions: `Define an interface called Product for an e-commerce store:\n  • id: number\n  • name: string\n  • price: number\n  • category: string\n  • inStock: boolean\n  • discount?: number (optional)\n\nCreate two Product objects and write a function displayProduct(product: Product) that prints all non-optional fields plus discount if present.`,
      },
      utilities: {
        hint: `interface Product {\n  id: number;\n  name: string;\n  price: number;\n  category: string;\n  inStock: boolean;\n  discount?: number;\n}\n\nfunction displayProduct(product: Product): void {\n  console.log(\`\${product.name} — $\${product.price}\`);\n  if (product.discount) {\n    console.log(\`Discount: \${product.discount}%\`);\n  }\n}`,
        flashcard: { front: 'What is the difference between an interface and a type alias in TypeScript?', back: 'Both define object shapes, but interfaces are extendable (you can add properties later with declaration merging) and more readable for object types. Type aliases are more flexible (can represent unions, tuples, primitives). Modern TypeScript style: use interface for objects, type for everything else.' },
        solution: `interface Product {\n  id: number;\n  name: string;\n  price: number;\n  category: string;\n  inStock: boolean;\n  discount?: number;\n}\n\nfunction displayProduct(product: Product): void {\n  const stockStatus = product.inStock ? "In Stock" : "Out of Stock";\n  console.log(\`[\${product.id}] \${product.name} — $\${product.price} (\${stockStatus})\`);\n  if (product.discount !== undefined) {\n    const discounted = product.price * (1 - product.discount / 100);\n    console.log(\`  Sale price: $\${discounted.toFixed(2)} (\${product.discount}% off)\`);\n  }\n}\n\nconst laptop: Product = { id: 1, name: "MacBook Pro", price: 1299, category: "Electronics", inStock: true, discount: 10 };\nconst book: Product = { id: 2, name: "Clean Code", price: 35, category: "Books", inStock: false };\n\ndisplayProduct(laptop);\ndisplayProduct(book);`,
      },
      rightPanel: {
        startingCode: `// TypeScript Lesson 2 — Interfaces\n\ninterface Product {\n  // Define your interface fields\n}\n\nfunction displayProduct(product: Product): void {\n  // Print product details\n}\n\n// Create two Product objects and call displayProduct\n`,
        expectedOutput: '[1] MacBook Pro — $1299 (In Stock)\n  Sale price: $1169.10 (10% off)\n[2] Clean Code — $35 (Out of Stock)',
      },
    },
    {
      lessonId: 'ts-03', title: '03. Union Types & Type Guards', difficulty: 'intermediate', track: 'typescript',
      leftPanel: {
        chapterProgress: 'Chapter 3 of 5 — 40%',
        conceptText: `Union types let a variable hold one of several types. This models real-world data that genuinely can be different types:\n\n  type ID = number | string;  // database IDs can be either\n  type Status = "pending" | "active" | "cancelled";  // string literal union\n\n  function processPayment(amount: number, currency: "KES" | "USD" | "EUR") {\n    console.log(\`Processing \${currency} \${amount}\`);\n  }\n\n  processPayment(500, "KES");      // valid\n  processPayment(500, "YEN");      // TYPE ERROR — not in the union\n\nString literal unions are incredibly powerful — they're essentially enums with better ergonomics and autocomplete support in your editor.\n\nType guards narrow down union types:\n  function processId(id: number | string) {\n    if (typeof id === "string") {\n      console.log(id.toUpperCase());  // TypeScript knows id is string here\n    } else {\n      console.log(id.toFixed(2));     // TypeScript knows id is number here\n    }\n  }`,
        instructions: `Build a notification system using union types:\n  • Define type NotificationType = "success" | "error" | "warning" | "info"\n  • Create interface Notification with: id, type, message, timestamp\n  • Write function formatNotification(n: Notification): string that returns different prefixes based on type:\n    success → "✓ " + message\n    error → "✗ " + message\n    warning → "⚠ " + message\n    info → "ℹ " + message`,
      },
      utilities: {
        hint: `type NotificationType = "success" | "error" | "warning" | "info";\n\ninterface Notification {\n  id: number;\n  type: NotificationType;\n  message: string;\n  timestamp: Date;\n}\n\nfunction formatNotification(n: Notification): string {\n  const prefixes: Record<NotificationType, string> = {\n    success: "✓ ", error: "✗ ", warning: "⚠ ", info: "ℹ "\n  };\n  return prefixes[n.type] + n.message;\n}`,
        flashcard: { front: 'What is a discriminated union in TypeScript?', back: 'A discriminated union is a union of types where each type has a unique "discriminant" property (usually a literal type like type: "success" | "error"). TypeScript uses the discriminant to narrow the type in switch/if statements, giving you full type safety when handling each case.' },
        solution: `type NotificationType = "success" | "error" | "warning" | "info";\n\ninterface Notification {\n  id: number;\n  type: NotificationType;\n  message: string;\n  timestamp: Date;\n}\n\nfunction formatNotification(n: Notification): string {\n  const prefixes: Record<NotificationType, string> = {\n    success: "✓ ",\n    error: "✗ ",\n    warning: "⚠ ",\n    info: "ℹ "\n  };\n  return prefixes[n.type] + n.message;\n}\n\nconst notifications: Notification[] = [\n  { id: 1, type: "success", message: "Payment processed", timestamp: new Date() },\n  { id: 2, type: "error", message: "Connection failed", timestamp: new Date() },\n  { id: 3, type: "warning", message: "Low storage space", timestamp: new Date() },\n];\n\nnotifications.forEach(n => console.log(formatNotification(n)));`,
      },
      rightPanel: {
        startingCode: `// TypeScript Lesson 3 — Union Types\ntype NotificationType = // define union\n\ninterface Notification {\n  // define interface\n}\n\nfunction formatNotification(n: Notification): string {\n  // return prefixed message\n}\n`,
        expectedOutput: '✓ Payment processed\n✗ Connection failed\n⚠ Low storage space',
      },
    },
    {
      lessonId: 'ts-04', title: '04. Generics — Reusable Type Safety', difficulty: 'intermediate', track: 'typescript',
      leftPanel: {
        chapterProgress: 'Chapter 4 of 5 — 60%',
        conceptText: `Generics let you write functions and classes that work with any type while maintaining type safety. Think of them as type variables:\n\n  // Without generics — loses type info:\n  function getFirst(arr: any[]): any {\n    return arr[0];\n  }\n\n  // With generics — preserves type info:\n  function getFirst<T>(arr: T[]): T {\n    return arr[0];\n  }\n\n  const firstNum = getFirst([1, 2, 3]);      // TypeScript knows: number\n  const firstName = getFirst(["a", "b"]);     // TypeScript knows: string\n\nGenerics power TypeScript's entire standard library:\n  Array<T>, Promise<T>, Map<K, V>\n\nReal-world example — an API response wrapper:\n  interface ApiResponse<T> {\n    data: T;\n    status: number;\n    message: string;\n    timestamp: string;\n  }\n\n  // Works for any data type:\n  type UserResponse = ApiResponse<User>;\n  type ProductsResponse = ApiResponse<Product[]>;`,
        instructions: `Create a generic Stack data structure:\n  class Stack<T> with methods:\n  • push(item: T): void — add to top\n  • pop(): T | undefined — remove from top\n  • peek(): T | undefined — view top without removing\n  • isEmpty(): boolean\n  • size(): number\n\nTest with a Stack<number> and Stack<string>.`,
      },
      utilities: {
        hint: `class Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n}`,
        flashcard: { front: 'Why are generics better than using "any" in TypeScript?', back: '"any" completely opts out of type checking — TypeScript stops tracking what type it is. Generics maintain type information throughout — when you call getFirst<string>(), TypeScript knows the return value is a string and gives you autocomplete, error checking, and documentation for string methods.' },
        solution: `class Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n\n  size(): number {\n    return this.items.length;\n  }\n}\n\nconst numStack = new Stack<number>();\nnumStack.push(10); numStack.push(20); numStack.push(30);\nconsole.log("Top:", numStack.peek());\nconsole.log("Popped:", numStack.pop());\nconsole.log("Size:", numStack.size());\n\nconst strStack = new Stack<string>();\nstrStack.push("hello"); strStack.push("world");\nconsole.log("String top:", strStack.peek());`,
      },
      rightPanel: {
        startingCode: `// TypeScript Lesson 4 — Generics\nclass Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    // add to stack\n  }\n\n  pop(): T | undefined {\n    // remove from top\n  }\n\n  peek(): T | undefined {\n    // view top\n  }\n\n  isEmpty(): boolean { return true; }\n  size(): number { return 0; }\n}\n`,
        expectedOutput: 'Top: 30\nPopped: 30\nSize: 2\nString top: world',
      },
    },
    {
      lessonId: 'ts-05', title: '05. TypeScript with async/await', difficulty: 'intermediate', track: 'typescript',
      leftPanel: {
        chapterProgress: 'Chapter 5 of 5 — 80%',
        conceptText: `TypeScript makes async code significantly safer by typing Promise return values and enforcing proper error handling.\n\n  // Return type Promise<User> tells TypeScript what .then() receives:\n  async function fetchUser(id: number): Promise<User> {\n    const response = await fetch(\`/api/users/\${id}\`);\n    if (!response.ok) {\n      throw new Error(\`Failed: \${response.status}\`);\n    }\n    const data: User = await response.json();\n    return data;\n  }\n\nTyped error handling:\n  try {\n    const user = await fetchUser(1);\n    console.log(user.name);  // TypeScript knows user has .name\n  } catch (error) {\n    if (error instanceof Error) {\n      console.error(error.message);\n    }\n  }\n\nPromise.all with types:\n  const [users, products] = await Promise.all([\n    fetchUsers(),       // Promise<User[]>\n    fetchProducts()     // Promise<Product[]>\n  ]);  // TypeScript correctly infers [User[], Product[]]`,
        instructions: `Write a typed async function that simulates fetching course data:\n  • Interface CourseData: id, title, enrollments, rating\n  • async function getCourse(id: number): Promise<CourseData>\n  • Simulate 500ms delay using Promise + setTimeout\n  • Return mock data based on the id\n  • Handle errors with typed catch blocks\n  • Log the result with full type safety`,
      },
      utilities: {
        hint: `interface CourseData {\n  id: number;\n  title: string;\n  enrollments: number;\n  rating: number;\n}\n\nasync function getCourse(id: number): Promise<CourseData> {\n  await new Promise(resolve => setTimeout(resolve, 500));\n  if (id < 1) throw new Error("Invalid course ID");\n  return { id, title: "Python Fundamentals", enrollments: 1250, rating: 4.8 };\n}`,
        flashcard: { front: 'What does Promise<void> mean as a return type?', back: 'Promise<void> means the function is async and returns a Promise, but when it resolves, the resolved value is undefined (nothing useful is returned). It\'s used for async functions that perform actions without returning data — like saving to a database, logging, or sending an email.' },
        solution: `interface CourseData {\n  id: number;\n  title: string;\n  enrollments: number;\n  rating: number;\n}\n\nconst mockCourses: Record<number, CourseData> = {\n  1: { id: 1, title: "Python Fundamentals", enrollments: 1250, rating: 4.8 },\n  2: { id: 2, title: "JavaScript Mastery", enrollments: 980, rating: 4.7 },\n};\n\nasync function getCourse(id: number): Promise<CourseData> {\n  await new Promise(resolve => setTimeout(resolve, 500));\n  const course = mockCourses[id];\n  if (!course) throw new Error(\`Course \${id} not found\`);\n  return course;\n}\n\nasync function main(): Promise<void> {\n  try {\n    const course = await getCourse(1);\n    console.log(\`Title: \${course.title}\`);\n    console.log(\`Enrollments: \${course.enrollments}\`);\n    console.log(\`Rating: \${course.rating}/5\`);\n  } catch (error) {\n    if (error instanceof Error) console.error("Error:", error.message);\n  }\n}\n\nmain();`,
      },
      rightPanel: {
        startingCode: `// TypeScript Lesson 5 — Async TypeScript\ninterface CourseData {\n  // define fields\n}\n\nasync function getCourse(id: number): Promise<CourseData> {\n  // simulate fetch with delay\n  // return mock data\n}\n\n// Call it and log results\n`,
        expectedOutput: 'Title: Python Fundamentals\nEnrollments: 1250\nRating: 4.8/5',
      },
    },
  ],
};