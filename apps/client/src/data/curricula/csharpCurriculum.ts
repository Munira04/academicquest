import type { Course } from '../../types/curriculum';

export const csharpCourse: Course = {
  id: 'eng3',
  title: 'C#',
  tagline: 'Build enterprise apps and games with Microsoft\'s typed language',
  philosophy: 'C# is taught through the .NET ecosystem — classes, LINQ, and async patterns used in real production codebases.',
  icon: '🎮',
  color: 'from-violet-600 to-violet-800',
  level: 'BEGINNER',
  pillar: 'Core Engineering',
  xp: 300,
  sections: [
    {
      sectionId: 'csharp-section-1',
      title: 'Section 1: C# Fundamentals',
      learningObjective: 'Master the core concepts of C# including syntax, data types, control flow, and basic .NET features.',
      order: 1,
      isLocked: false,
      xpReward: 100,
      keyConcepts: ['Syntax', 'Types', 'Methods', 'Classes', 'Properties', 'LINQ'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'cs-01', title: 'Hello C# & Basic Syntax', type: 'learn', difficulty: 'beginner', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'C# is Microsoft\'s modern, object-oriented language for .NET. Every program needs a class with Main method: static void Main(string[] args). Console.WriteLine() prints output. using System; imports namespaces. Semicolons terminate statements. C# is compiled to IL (Intermediate Language) and runs on the CLR (Common Language Runtime). Top-level statements (C# 9+) allow simpler programs without class wrappers. Used in enterprise apps, games (Unity), and Windows development.',
            instructions: 'Write a C# program that prints "Hello from C#!" to the console.',
          },
          utilities: {
            hint: 'Console.WriteLine("Hello from C#!");',
            flashcard: { front: 'What is the CLR in .NET?', back: 'Common Language Runtime — the virtual machine that executes C# bytecode (IL). It provides garbage collection, type safety, security, and cross-platform support via .NET Core / .NET 5+. Similar to JVM for Java.' },
            solution: 'Console.WriteLine("Hello from C#!");',
          },
          rightPanel: { startingCode: '// C# Lesson 1\n// Print Hello from C#!\n', expectedOutput: 'Hello from C#!' },
        },
        {
          lessonId: 'cs-02', title: 'Variables & Types', type: 'learn', difficulty: 'beginner', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'C# types include int, double, bool, string, and var for inferred types. Strings support interpolation: $"User {name} has {xp} XP". Constants: const int MAX = 100;. Nullable types: int? can be null. Type conversion: explicit (int)double, implicit (no cast needed). C# is strongly typed — type safety prevents many bugs. Use var when type is obvious, explicit types when clarity is needed.',
            instructions: 'Declare string username = "munira04" and int xp = 250. Print using string interpolation.',
          },
          utilities: {
            hint: 'string username = "munira04";\nint xp = 250;\nConsole.WriteLine($"User {username} has {xp} XP");',
            flashcard: { front: 'When should you use var vs explicit type in C#?', back: 'Use var when type is obvious from right-hand side (var x = 5;). Avoid var when type is unclear or important for readability (var result = GetData() where return type is unclear). Prefer explicit types for public APIs.' },
            solution: 'string username = "munira04";\nint xp = 250;\nConsole.WriteLine($"User {username} has {xp} XP");',
          },
          rightPanel: { startingCode: 'string username = "munira04";\nint xp = 250;\n// Print with interpolation\n', expectedOutput: 'User munira04 has 250 XP' },
        },
        {
          lessonId: 'cs-03', title: 'Methods & Classes', type: 'learn', difficulty: 'beginner', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'Classes encapsulate data and behavior. Properties provide controlled access: public string Name { get; set; }. Methods define actions: public int Add(int a, int b) => a + b;. Expression-bodied members: => syntax for single-line methods. Constructors initialize objects: public Person(string name) { Name = name; }. this refers to current instance. Classes are reference types — variables point to objects on heap.',
            instructions: 'Create a Course class with properties Title (string) and Xp (int) and a method Describe() that prints "Title — Xp XP".',
          },
          utilities: {
            hint: 'class Course {\n  public string Title { get; set; }\n  public int Xp { get; set; }\n  public void Describe() => Console.WriteLine($"{Title} — {Xp} XP");\n}',
            flashcard: { front: 'What is the difference between a field and a property in C#?', back: 'Fields are raw storage (private string name;). Properties wrap access with get/set logic (public string Name { get; set; }). Public APIs should expose properties, not public fields, for encapsulation and future flexibility.' },
            solution: 'class Course {\n  public string Title { get; set; } = "";\n  public int Xp { get; set; }\n  \n  public void Describe() {\n    Console.WriteLine($"{Title} — {Xp} XP");\n  }\n}\n\nvar c = new Course { Title = "Python", Xp = 200 };\nc.Describe();',
          },
          rightPanel: { startingCode: 'class Course {\n  // Title, Xp, Describe()\n}\nvar c = new Course { Title = "Python", Xp = 200 };\nc.Describe();\n', expectedOutput: 'Python — 200 XP' },
        },
        {
          lessonId: 'cs-04', title: 'Collections & LINQ', type: 'learn', difficulty: 'beginner', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'List<T> is a dynamic array: var scores = new List<int> { 88, 92, 76 }. LINQ queries collections declaratively: scores.Where(s => s >= 90).Average(). Common LINQ: Where (filter), Select (transform), OrderBy (sort), First/FirstOrDefault, Any/All. LINQ is chainable and readable. Use LINQ for complex queries, loops for simple operations. LINQ to Objects works on in-memory collections.',
            instructions: 'Given scores List<int>, use LINQ to print the count of scores >= 80 and their average.',
          },
          utilities: {
            hint: 'var high = scores.Where(s => s >= 80);\nConsole.WriteLine($"Count: {high.Count()}");\nConsole.WriteLine($"Avg: {high.Average()}");',
            flashcard: { front: 'What is LINQ in C#?', back: 'Language Integrated Query — a set of extension methods (Where, Select, OrderBy) that query collections, arrays, and databases with a consistent, declarative syntax. Makes data manipulation code more readable and maintainable.' },
            solution: 'var scores = new List<int> { 88, 92, 76, 95, 81 };\nvar high = scores.Where(s => s >= 80).ToList();\nConsole.WriteLine($"Count: {high.Count}");\nConsole.WriteLine($"Avg: {high.Average()}");',
          },
          rightPanel: { startingCode: 'var scores = new List<int> { 88, 92, 76, 95, 81 };\n// LINQ: count and average for scores >= 80\n', expectedOutput: 'Count: 4' },
        },
        {
          lessonId: 'cs-05', title: 'Async/Await', type: 'practice', difficulty: 'beginner', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'async/await handles I/O without blocking threads. async Task MethodName() returns a Task. await pauses until the operation completes, then resumes. Task represents an async operation with no return value. Task<T> returns a value. Use ConfigureAwait(false) in library code to avoid deadlocks. Async methods should have "Async" suffix. Exception handling with try/catch around await.',
            instructions: 'Write async Task FetchData() that awaits Task.Delay(100), then prints "Data loaded". Call it from Main with await.',
          },
          utilities: {
            hint: 'async Task FetchData() {\n  await Task.Delay(100);\n  Console.WriteLine("Data loaded");\n}',
            flashcard: { front: 'What is the difference between Task and Task<T> in C#?', back: 'Task represents an async operation with no return value (void). Task<T> returns a value of type T when the operation completes. Use Task for fire-and-forget operations, Task<T> when you need the result.' },
            solution: 'async Task FetchData() {\n  await Task.Delay(100);\n  Console.WriteLine("Data loaded");\n}\n\nawait FetchData();',
          },
          rightPanel: { startingCode: 'async Task FetchData() {\n  // delay then print Data loaded\n}\nawait FetchData();\n', expectedOutput: 'Data loaded' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'cs-super-01', title: 'Exception Handling', type: 'supercharge', difficulty: 'intermediate', track: 'csharp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'C# exceptions handle runtime errors. try block contains risky code. catch handles specific exceptions: catch (InvalidOperationException e) { ... }. finally always executes (cleanup). throw exceptions: throw new ArgumentException("Invalid input");. Custom exceptions: inherit from Exception. Use specific exception types. Avoid catching Exception unless necessary. Use exception filters: catch (Exception e) when (e.InnerException != null).',
            instructions: 'Create a method that validates age and throws ArgumentException if invalid. Handle with try-catch-finally.',
          },
          utilities: {
            hint: 'void ValidateAge(int age) {\n  if (age < 0 || age > 150) {\n    throw new ArgumentException("Invalid age");\n  }\n}\ntry {\n  ValidateAge(-5);\n} catch (ArgumentException e) {\n  Console.WriteLine(e.Message);\n}',
            flashcard: { front: 'What is the difference between throw and throw e in catch blocks?', back: 'throw preserves the original stack trace. throw e resets the stack trace to the catch block, losing original context. Always use throw when re-throwing exceptions to preserve debugging information.' },
            solution: 'void ValidateAge(int age) {\n  if (age < 0 || age > 150) {\n    throw new ArgumentException("Age must be between 0 and 150");\n  }\n  Console.WriteLine($"Valid age: {age}");\n}\n\ntry {\n  ValidateAge(25);\n  ValidateAge(-5);\n} catch (ArgumentException ex) {\n  Console.WriteLine($"Error: {ex.Message}");\n} finally {\n  Console.WriteLine("Validation complete");\n}',
          },
          rightPanel: { startingCode: '// Implement exception handling\n', expectedOutput: 'Exception handling with try-catch-finally' },
        },
      ],
      sectionProject: {
        lessonId: 'cs-project-1', title: 'Section Project: Student Management System', type: 'project', difficulty: 'beginner', track: 'csharp', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a student management system using C# fundamentals. This project will demonstrate classes, collections, LINQ, and exception handling.',
          instructions: 'Build a system with:\n  • Student class with properties\n  • List<Student> for storage\n  • LINQ queries for statistics\n  • Input validation with exceptions\n  • Methods for CRUD operations',
        },
        utilities: {
          hint: 'Create Student class with Name, Age, Grades. Use List<Student> for collection. Use LINQ for filtering and statistics. Add validation in setters. Use try-catch for error handling. Use properties with validation logic.',
          flashcard: { front: 'What makes a good C# class design?', back: 'Properties instead of public fields, validation in setters, meaningful method names, proper use of access modifiers (private, public, protected), constructor overloading, and following C# naming conventions (PascalCase for public members).' },
            solution: 'class Student {\n  private string _name;\n  private int _age;\n  private List<int> _grades = new List<int>();\n  \n  public string Name {\n    get => _name;\n    set {\n      if (string.IsNullOrWhiteSpace(value))\n        throw new ArgumentException("Name required");\n      _name = value;\n    }\n  }\n  \n  public int Age {\n    get => _age;\n    set {\n      if (value < 0 || value > 100)\n        throw new ArgumentException("Invalid age");\n      _age = value;\n    }\n  }\n  \n  public List<int> Grades => _grades;\n  \n  public double AverageGrade => Grades.Count > 0 ? Grades.Average() : 0;\n  \n  public void AddGrade(int grade) {\n    if (grade < 0 || grade > 100)\n      throw new ArgumentException("Grade must be 0-100");\n    _grades.Add(grade);\n  }\n}\n\nvar students = new List<Student> {\n  new Student { Name = "Munira", Age = 20 },\n  new Student { Name = "Alex", Age = 22 }\n};\n\nstudents[0].AddGrade(85);\nstudents[0].AddGrade(92);\nstudents[1].AddGrade(78);\n\nvar topStudent = students.OrderByDescending(s => s.AverageGrade).First();\nConsole.WriteLine($"Top student: {topStudent.Name} with {topStudent.AverageGrade:F1} average");',
        },
        rightPanel: { startingCode: '// Build student management system\n', expectedOutput: 'Complete student management system' },
      },
    },
    {
      sectionId: 'csharp-section-2',
      title: 'Section 2: Advanced C# & .NET',
      learningObjective: 'Learn advanced C# features including interfaces, generics, dependency injection, and .NET ecosystem patterns.',
      order: 2,
      isLocked: true,
      xpReward: 100,
      keyConcepts: ['Interfaces', 'Generics', 'Dependency Injection', 'Events', 'Delegates', '.NET APIs'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'cs-06', title: 'Interfaces & Implementation', type: 'learn', difficulty: 'intermediate', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'Interfaces define contracts: public interface IRepository { void Save(T item); }. Classes implement: public class Repository : IRepository { ... }. Multiple interfaces allowed. Default interface methods (C# 8+) provide implementation. Interfaces enable polymorphism and loose coupling. Use interfaces for abstractions, classes for implementations. Dependency injection relies on interfaces.',
            instructions: 'Create an ILogger interface with Log(string message) method, and ConsoleLogger class implementing it.',
          },
          utilities: {
            hint: 'public interface ILogger {\n  void Log(string message);\n}\n\npublic class ConsoleLogger : ILogger {\n  public void Log(string message) => Console.WriteLine(message);\n}',
            flashcard: { front: 'What is the difference between abstract class and interface in C#?', back: 'Abstract class: can have implementation, single inheritance, can have fields. Interface: only signatures (mostly), multiple inheritance, no fields. Use abstract class for shared code, interface for contracts and multiple inheritance.' },
            solution: 'public interface ILogger {\n  void Log(string message);\n  void LogError(string error);\n}\n\npublic class ConsoleLogger : ILogger {\n  public void Log(string message) {\n    Console.WriteLine($"[INFO] {DateTime.Now}: {message}");\n  }\n  \n  public void LogError(string error) {\n    Console.WriteLine($"[ERROR] {DateTime.Now}: {error}");\n  }\n}\n\npublic class FileLogger : ILogger {\n  private readonly string _filePath;\n  \n  public FileLogger(string filePath) {\n    _filePath = filePath;\n  }\n  \n  public void Log(string message) {\n    File.AppendAllText(_filePath, $"[INFO] {message}\\n");\n  }\n  \n  public void LogError(string error) {\n    File.AppendAllText(_filePath, $"[ERROR] {error}\\n");\n  }\n}',
          },
          rightPanel: { startingCode: '// Create ILogger interface and implementations\n', expectedOutput: 'Interface implementation example' },
        },
        {
          lessonId: 'cs-07', title: 'Generics & Constraints', type: 'learn', difficulty: 'intermediate', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Generics enable type-safe reusable code: public class Repository<T> { }. Constraints limit types: where T : class, where T : new(). Generic methods: T Create<T>(). Covariance/contravariance for interfaces. Generics are resolved at compile time (no runtime overhead). Used throughout .NET (List<T>, Task<T>, IEnumerable<T>). Enable type safety without code duplication.',
            instructions: 'Create a generic Stack<T> class with Push, Pop, and Peek methods. Add constraint where T : class.',
          },
          utilities: {
            hint: 'public class Stack<T> where T : class {\n  private List<T> _items = new List<T>();\n  public void Push(T item) => _items.Add(item);\n  public T Pop() {\n    var item = _items.Last();\n    _items.RemoveAt(_items.Count - 1);\n    return item;\n  }\n}',
            flashcard: { front: 'What are generic constraints in C#?', back: 'Constraints limit what types can be used as generic parameters: where T : class (reference type), where T : struct (value type), where T : new (has parameterless constructor), where T : SomeClass (inherits from). Enable compile-time type checking.' },
            solution: 'public class Stack<T> where T : class {\n  private readonly List<T> _items = new List<T>();\n  \n  public void Push(T item) {\n    if (item == null)\n      throw new ArgumentNullException(nameof(item));\n    _items.Add(item);\n  }\n  \n  public T Pop() {\n    if (_items.Count == 0)\n      throw new InvalidOperationException("Stack empty");\n    \n    var item = _items.Last();\n    _items.RemoveAt(_items.Count - 1);\n    return item;\n  }\n  \n  public T Peek() {\n    if (_items.Count == 0)\n      throw new InvalidOperationException("Stack empty");\n    return _items.Last();\n  }\n  \n  public int Count => _items.Count;\n  public bool IsEmpty => _items.Count == 0;\n}',
          },
          rightPanel: { startingCode: '// Create generic Stack<T> with constraints\n', expectedOutput: 'Generic stack implementation' },
        },
        {
          lessonId: 'cs-08', title: 'Delegates & Events', type: 'learn', difficulty: 'intermediate', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'Delegates are type-safe function pointers: public delegate void EventHandler(object sender, EventArgs e);. Action<T> for void return, Func<T> for return value. Events are delegates with restricted access: public event EventHandler Clicked;. += subscribes, -= unsubscribes. Lambda expressions: () => { ... }. Used extensively in UI frameworks and async patterns. Enable loose coupling and extensibility.',
            instructions: 'Create a Publisher class with an event, and a Subscriber that handles the event.',
          },
          utilities: {
            hint: 'public class Publisher {\n  public event EventHandler SomethingHappened;\n  public void DoSomething() {\n    SomethingHappened?.Invoke(this, EventArgs.Empty);\n  }\n}',
            flashcard: { front: 'What is the difference between Action and Func in C#?', back: 'Action<T> represents a method that returns void (no return value). Func<T> represents a method that returns a value. Action has up to 16 parameters, Func has up to 16 parameters plus return type.' },
            solution: 'public class Publisher {\n  public event EventHandler<string> MessagePublished;\n  \n  public void Publish(string message) {\n    Console.WriteLine($"Publishing: {message}");\n    MessagePublished?.Invoke(this, message);\n  }\n}\n\npublic class Subscriber {\n  private readonly string _name;\n  \n  public Subscriber(string name, Publisher publisher) {\n    _name = name;\n    publisher.MessagePublished += OnMessagePublished;\n  }\n  \n  private void OnMessagePublished(object sender, string message) {\n    Console.WriteLine($"{_name} received: {message}");\n  }\n  \n  public void Unsubscribe(Publisher publisher) {\n    publisher.MessagePublished -= OnMessagePublished;\n  }\n}',
          },
          rightPanel: { startingCode: '// Create publisher/subscriber with events\n', expectedOutput: 'Event-driven communication' },
        },
        {
          lessonId: 'cs-09', title: 'Dependency Injection', type: 'practice', difficulty: 'intermediate', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Dependency Injection (DI) passes dependencies via constructor: public Service(ILogger logger) { _logger = logger; }. Inversion of Control (IoC) container manages object lifetimes. Services registered in DI container: services.AddScoped<ILogger, ConsoleLogger>();. Enables testability, loose coupling, and configuration. Three lifetimes: Transient (new each time), Scoped (same per request), Singleton (single instance). Built-in DI in ASP.NET Core.',
            instructions: 'Create a service that depends on ILogger, and show constructor injection.',
          },
          utilities: {
            hint: 'public class UserService {\n  private readonly ILogger _logger;\n  \n  public UserService(ILogger logger) {\n    _logger = logger;\n  }\n}',
            flashcard: { front: 'What are the three service lifetimes in .NET DI?', back: 'Transient: new instance each time requested (stateless services). Scoped: same instance within a scope (HTTP request). Singleton: single instance for app lifetime (stateful services). Choose based on state management needs.' },
            solution: 'public interface IDataRepository {\n  void Save(string data);\n  string Load();\n}\n\npublic class DatabaseRepository : IDataRepository {\n  private readonly ILogger _logger;\n  \n  public DatabaseRepository(ILogger logger) {\n    _logger = logger;\n  }\n  \n  public void Save(string data) {\n    _logger.Log("Saving to database");\n    // Database save logic\n  }\n  \n  public string Load() {\n    _logger.Log("Loading from database");\n    return "loaded data";\n  }\n}\n\npublic class DataService {\n  private readonly IDataRepository _repository;\n  \n  public DataService(IDataRepository repository) {\n    _repository = repository;\n  }\n  \n  public void ProcessData(string data) {\n    _repository.Save(data);\n    var loaded = _repository.Load();\n    Console.WriteLine($"Processed: {loaded}");\n  }\n}',
          },
          rightPanel: { startingCode: '// Implement dependency injection\n', expectedOutput: 'DI pattern implementation' },
        },
        {
          lessonId: 'cs-10', title: '.NET APIs & File I/O', type: 'practice', difficulty: 'intermediate', track: 'csharp', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: '.NET provides rich APIs: File.ReadAllText(), File.WriteAllLines(), Directory.GetFiles(). HttpClient for HTTP requests: var client = new HttpClient(); var response = await client.GetAsync(url);. JSON serialization: JsonSerializer.Serialize(obj), JsonSerializer.Deserialize<T>(json). Configuration: IConfiguration from appsettings.json. Use using statements for disposable resources. Async APIs throughout .NET.',
            instructions: 'Read a file, process its contents, and write results to another file using async methods.',
          },
          utilities: {
            hint: 'var content = await File.ReadAllTextAsync("input.txt");\nvar processed = content.ToUpper();\nawait File.WriteAllTextAsync("output.txt", processed);',
            flashcard: { front: 'Why use async file I/O in .NET?', back: 'Async file operations don\'t block threads while waiting for I/O. Better scalability for server applications, responsive UI for client apps. Use *Async methods (ReadAllTextAsync vs ReadAllText) whenever possible.' },
            solution: 'public async Task ProcessFileAsync(string inputPath, string outputPath) {\n  try {\n    var content = await File.ReadAllTextAsync(inputPath);\n    \n    var lines = content.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);\n    var processedLines = lines\n      .Where(line => !string.IsNullOrWhiteSpace(line))\n      .Select(line => line.Trim().ToUpper())\n      .ToList();\n    \n    var output = string.Join(Environment.NewLine, processedLines);\n    await File.WriteAllTextAsync(outputPath, output);\n    \n    Console.WriteLine($"Processed {lines.Count} lines to {outputPath}");\n  }\n  catch (FileNotFoundException) {\n    Console.WriteLine($"File not found: {inputPath}");\n  }\n  catch (Exception ex) {\n    Console.WriteLine($"Error: {ex.Message}");\n  }\n}',
          },
          rightPanel: { startingCode: '// Implement async file processing\n', expectedOutput: 'Async file I/O implementation' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'cs-super-02', title: 'Parallel Programming', type: 'supercharge', difficulty: 'advanced', track: 'csharp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'Parallel programming uses multiple CPU cores. Parallel.For() for parallel loops. Parallel.ForEach() for parallel iteration. Task.WhenAll() for parallel async operations. PLINQ (Parallel LINQ): items.AsParallel().Where(...). Thread-safe collections: ConcurrentDictionary<T>, ConcurrentBag<T>. Lock for synchronization: lock (obj) { ... }. Avoid deadlocks. Use async/await for I/O, parallel for CPU-bound work.',
            instructions: 'Use Parallel.ForEach to process a collection in parallel, and Task.WhenAll for async parallel operations.',
          },
          utilities: {
            hint: 'Parallel.ForEach(items, item => {\n  Process(item);\n});\n\nawait Task.WhenAll(tasks);',
            flashcard: { front: 'What is the difference between async/await and parallel programming?', back: 'async/await: single thread, non-blocking I/O (network, file). Parallel: multiple threads, CPU-bound work (calculations). Use async for I/O-bound, parallel for CPU-bound. Never use Task.Run for I/O (wastes thread).' },
            solution: 'public async Task ProcessInParallelAsync() {\n  var items = Enumerable.Range(1, 100).ToList();\n  \n  // CPU-bound parallel processing\n  Parallel.ForEach(items, item => {\n    var result = HeavyCalculation(item);\n    Console.WriteLine($"Processed {item}: {result}");\n  });\n  \n  // Async parallel operations\n  var urls = new[] { "url1", "url2", "url3" };\n  var tasks = urls.Select(url => FetchDataAsync(url));\n  var results = await Task.WhenAll(tasks);\n  \n  Console.WriteLine($"Fetched {results.Length} items");\n}\n\nprivate int HeavyCalculation(int input) {\n  // Simulate CPU-bound work\n  Thread.Sleep(100);\n  return input * 2;\n}\n\nprivate async Task<string> FetchDataAsync(string url) {\n  await Task.Delay(100);\n  return $"Data from {url}";\n}',
          },
          rightPanel: { startingCode: '// Implement parallel processing\n', expectedOutput: 'Parallel programming demonstration' },
        },
      ],
      sectionProject: {
        lessonId: 'cs-project-2', title: 'Section Project: REST API Service', type: 'project', difficulty: 'intermediate', track: 'csharp', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build a REST API service using advanced C# and .NET features. This project will demonstrate dependency injection, async programming, and .NET APIs.',
          instructions: 'Build an API service with:\n  • Service layer with DI\n  • Repository pattern with interfaces\n  • Async CRUD operations\n  • Exception handling middleware\n  • Configuration management',
        },
        utilities: {
          hint: 'Create interfaces for services and repositories. Use constructor injection. Implement async methods. Add exception handling. Use IConfiguration for settings. Follow REST conventions. Use async/await throughout.',
          flashcard: { front: 'What makes a well-architected .NET service?', back: 'Layered architecture (API, Service, Repository), dependency injection, async/await for I/O, proper exception handling, configuration management, logging, validation, and following SOLID principles.' },
            solution: 'public interface IUserRepository {\n  Task<User> GetByIdAsync(int id);\n  Task<IEnumerable<User>> GetAllAsync();\n  Task<User> AddAsync(User user);\n  Task UpdateAsync(User user);\n  Task DeleteAsync(int id);\n}\n\npublic class UserRepository : IUserRepository {\n  private readonly ILogger<UserRepository> _logger;\n  private readonly List<User> _users = new();\n  \n  public UserRepository(ILogger<UserRepository> logger) {\n    _logger = logger;\n  }\n  \n  public async Task<User> GetByIdAsync(int id) {\n    await Task.Delay(100); // Simulate DB\n    return _users.FirstOrDefault(u => u.Id == id);\n  }\n  \n  public async Task<IEnumerable<User>> GetAllAsync() {\n    await Task.Delay(100);\n    return _users.AsReadOnly();\n  }\n  \n  public async Task<User> AddAsync(User user) {\n    await Task.Delay(100);\n    user.Id = _users.Count + 1;\n    _users.Add(user);\n    _logger.LogInformation($"Added user {user.Name}");\n    return user;\n  }\n  \n  public async Task UpdateAsync(User user) {\n    await Task.Delay(100);\n    var existing = await GetByIdAsync(user.Id);\n    if (existing != null) {\n      existing.Name = user.Name;\n      existing.Email = user.Email;\n    }\n  }\n  \n  public async Task DeleteAsync(int id) {\n    await Task.Delay(100);\n    var user = await GetByIdAsync(id);\n    if (user != null) {\n      _users.Remove(user);\n    }\n  }\n}',
        },
        rightPanel: { startingCode: '// Build REST API service\n', expectedOutput: 'Complete API service architecture' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'cs-capstone', title: 'Course Capstone: Enterprise Application', type: 'project', difficulty: 'advanced', track: 'csharp', xpReward: 100,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build a complete enterprise application using all C# and .NET concepts learned. This capstone will demonstrate advanced patterns, DI, async programming, and production-ready practices.',
      instructions: 'Build an enterprise app with:\n  • Layered architecture (API, Service, Repository)\n  • Dependency injection throughout\n  • Async/await for all I/O\n  • Exception handling middleware\n  • Configuration management\n  • Logging and monitoring\n  • Unit testable design',
    },
    utilities: {
      hint: 'Implement clean architecture with clear layers. Use interfaces for all dependencies. Use constructor injection. Make all I/O async. Add global exception handling. Use appsettings.json for config. Add structured logging. Design for testability.',
      flashcard: { front: 'What makes a production-ready .NET application?', back: 'Clean architecture, dependency injection, async/await, proper exception handling, logging, configuration management, validation, security (authentication, authorization), performance optimization, and comprehensive testing.' },
            solution: '// Startup.cs - Dependency Injection Configuration\npublic void ConfigureServices(IServiceCollection services) {\n  // Register services with appropriate lifetimes\n  services.AddScoped<IUserRepository, UserRepository>();\n  services.AddScoped<IUserService, UserService>();\n  services.AddScoped<IEmailService, EmailService>();\n  \n  // Singleton for stateless services\n  services.AddSingleton<ICacheService, MemoryCacheService>();\n  \n  // HttpClient factory\n  services.AddHttpClient<IExternalApiService, ExternalApiService>();\n  \n  // Configuration\n  services.Configure<AppSettings>(Configuration.GetSection("App"));\n  \n  // Logging\n  services.AddLogging();\n}\n\n// Service Layer with DI\npublic class UserService : IUserService {\n  private readonly IUserRepository _repository;\n  private readonly IEmailService _emailService;\n  private readonly ILogger<UserService> _logger;\n  private readonly AppSettings _settings;\n  \n  public UserService(\n    IUserRepository repository,\n    IEmailService emailService,\n    ILogger<UserService> logger,\n    IOptions<AppSettings> settings) {\n    _repository = repository;\n    _emailService = emailService;\n    _logger = logger;\n    _settings = settings.Value;\n  }\n  \n  public async Task<UserDto> CreateUserAsync(CreateUserRequest request) {\n    try {\n      var user = new User {\n        Name = request.Name,\n        Email = request.Email\n      };\n      \n      var created = await _repository.AddAsync(user);\n      \n      await _emailService.SendWelcomeEmailAsync(created.Email);\n      \n      _logger.LogInformation("User created: {UserId}", created.Id);\n      \n      return MapToDto(created);\n    }\n    catch (Exception ex) {\n      _logger.LogError(ex, "Error creating user");\n      throw;\n    }\n  }\n}',
    },
    rightPanel: { startingCode: '// Build enterprise application\n', expectedOutput: 'Production-ready enterprise application' },
  },
  totalLessons: 10,
  totalXP: 300,
};
