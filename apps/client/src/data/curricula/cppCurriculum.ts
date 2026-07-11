import type { Course } from '../../types/curriculum';

export const cppCourse: Course = {
  id: 'eng2',
  title: 'C++',
  tagline: 'High-performance systems programming',
  philosophy: 'C++ is taught through memory management and performance — pointers, references, and the STL used in game engines and systems.',
  icon: '⚙️',
  color: 'from-blue-700 to-blue-900',
  level: 'INTERMEDIATE',
  pillar: 'Core Engineering',
  xp: 350,
  sections: [
    {
      sectionId: 'cpp-section-1',
      title: 'Section 1: C++ Fundamentals',
      learningObjective: 'Master the core concepts of C++ including syntax, data types, control flow, and basic memory management.',
      order: 1,
      isLocked: false,
      xpReward: 125,
      keyConcepts: ['Syntax', 'Pointers', 'References', 'Control Flow', 'Functions', 'Memory'],
      estimatedMinutes: 90,
      lessons: [
        {
          lessonId: 'cpp-01', title: 'Hello C++ & Basic Syntax', type: 'learn', difficulty: 'intermediate', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'C++ is a powerful, high-performance language for systems programming. Every program needs main(): int main() { return 0; }. std::cout prints to console: std::cout << "Hello" << std::endl;. Include headers: #include <iostream>. Semicolons terminate statements. C++ is compiled to machine code for maximum performance. It gives low-level memory control while providing high-level abstractions. Used in game engines, operating systems, and high-frequency trading.',
            instructions: 'Write a C++ program that prints "Hello, C++!" to the console.',
          },
          utilities: {
            hint: '#include <iostream>\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}',
            flashcard: { front: 'What does std::endl do vs \\n?', back: 'std::endl flushes the buffer AND adds newline (slower). \\n just adds newline (faster). Use std::endl when you need immediate output (like debugging), \\n for performance-critical code.' },
            solution: '#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n\nint main() {\n  // Print Hello, C++!\n  return 0;\n}', expectedOutput: 'Hello, C++!' },
        },
        {
          lessonId: 'cpp-02', title: 'Variables, Types & References', type: 'learn', difficulty: 'intermediate', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'C++ has primitive types: int, double, bool, char. Variables must be declared with type: int age = 25;. References are aliases: int& ref = variable;. References must be initialized and cannot be reassigned. const makes variables immutable: const int MAX = 100;. Type inference with auto: auto x = 5;. C++ is statically typed — type safety catches errors at compile time. Use references to avoid copying large objects.',
            instructions: 'Declare variables for name (string), age (int), and a reference to age. Modify through the reference.',
          },
          utilities: {
            hint: '#include <string>\nstd::string name = "Munira";\nint age = 20;\nint& ageRef = age;\nageRef = 21;',
            flashcard: { front: 'What is the difference between a pointer and a reference in C++?', back: 'Pointer: can be null, can be reassigned, needs dereferencing (*). Reference: cannot be null, cannot be reassigned, no dereferencing needed. Use references when you need a guaranteed valid alias, pointers when null is possible.' },
            solution: '#include <iostream>\n#include <string>\n\nint main() {\n  std::string name = "Munira";\n  int age = 20;\n  int& ageRef = age;\n  \n  ageRef = 21;\n  \n  std::cout << "Name: " << name << std::endl;\n  std::cout << "Age: " << age << std::endl;\n  std::cout << "Age via reference: " << ageRef << std::endl;\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <string>\n\nint main() {\n  // Declare variables and reference\n  return 0;\n}', expectedOutput: 'Variables with reference' },
        },
        {
          lessonId: 'cpp-03', title: 'Pointers & Memory', type: 'learn', difficulty: 'intermediate', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'Pointers store memory addresses: int* ptr = &variable;. & gets address, * dereferences. Dynamic allocation: new int(5) allocates on heap, delete ptr frees it. Memory leaks occur when you forget delete. Smart pointers (C++11): std::unique_ptr, std::shared_ptr manage memory automatically. Always use smart pointers in modern C++. Raw pointers are for performance-critical code or interfacing with C APIs.',
            instructions: 'Create a pointer, allocate memory dynamically, use it, then free it.',
          },
          utilities: {
            hint: 'int* ptr = new int(42);\nstd::cout << *ptr << std::endl;\ndelete ptr;\nptr = nullptr;',
            flashcard: { front: 'Why use smart pointers instead of raw pointers?', back: 'Smart pointers automatically manage memory (RAII), preventing leaks and dangling pointers. unique_ptr for exclusive ownership, shared_ptr for shared ownership. Raw pointers require manual delete, error-prone.' },
            solution: '#include <iostream>\n#include <memory>\n\nint main() {\n  // Raw pointer (modern C++ prefers smart pointers)\n  int* rawPtr = new int(42);\n  std::cout << "Value: " << *rawPtr << std::endl;\n  std::cout << "Address: " << rawPtr << std::endl;\n  delete rawPtr;\n  rawPtr = nullptr;\n  \n  // Smart pointer (preferred)\n  std::unique_ptr<int> smartPtr = std::make_unique<int>(100);\n  std::cout << "Smart value: " << *smartPtr << std::endl;\n  // No delete needed - automatic cleanup\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <memory>\n\nint main() {\n  // Demonstrate pointers and smart pointers\n  return 0;\n}', expectedOutput: 'Pointer demonstration' },
        },
        {
          lessonId: 'cpp-04', title: 'Control Flow & Loops', type: 'practice', difficulty: 'intermediate', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'if/else if/else for branching: if (condition) { ... }. Comparison: ==, !=, <, >, <=, >=. Logical: && (and), || (or), ! (not). Loops: for (int i = 0; i < 10; ++i), while (condition), do-while. Range-based for: for (int num : array). switch/case for multiple values. break exits loops, continue skips iteration. C++ uses ++i (pre-increment) over i++ for performance in loops.',
            instructions: 'Use a for loop to print numbers 1-10, and range-based for to sum an array.',
          },
          utilities: {
            hint: 'for (int i = 1; i <= 10; ++i) {\n  std::cout << i << " ";\n}\nint arr[] = {1, 2, 3};\nint sum = 0;\nfor (int n : arr) sum += n;',
            flashcard: { front: 'Why prefer ++i over i++ in C++ loops?', back: '++i increments and returns the new value (no temporary). i++ creates a temporary copy of the original value before incrementing. For primitive types the compiler optimizes, but for iterators ++i is always more efficient.' },
            solution: '#include <iostream>\n\nint main() {\n  // Print 1-10\n  for (int i = 1; i <= 10; ++i) {\n    std::cout << i << " ";\n  }\n  std::cout << std::endl;\n  \n  // Sum array using range-based for\n  int numbers[] = {1, 2, 3, 4, 5};\n  int sum = 0;\n  for (int num : numbers) {\n    sum += num;\n  }\n  std::cout << "Sum: " << sum << std::endl;\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n\nint main() {\n  // Implement loops\n  return 0;\n}', expectedOutput: '1-10 and sum' },
        },
        {
          lessonId: 'cpp-05', title: 'Functions & Parameters', type: 'practice', difficulty: 'intermediate', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'Functions: int add(int a, int b) { return a + b; }. Pass by value (copies), pass by reference (&) avoids copying, pass by const reference (const T&) for read-only. Default parameters: int func(int x = 10). Function overloading: same name, different parameters. Inline functions for performance: inline int fast() { ... }. Lambda functions (C++11): auto lambda = []() { return 42; };. Use const references for large objects to avoid copying.',
            instructions: 'Create functions that calculate area by value and by reference. Demonstrate the difference.',
          },
          utilities: {
            hint: 'void modifyByRef(int& x) { x = 10; }\nvoid modifyByValue(int x) { x = 10; }\nint a = 5;\nmodifyByRef(a); // a is now 10\nmodifyByValue(a); // a unchanged',
            flashcard: { front: 'When should you pass by const reference vs by value?', back: 'Pass by const reference (const T&) for large objects (strings, vectors, custom classes) to avoid copying. Pass by value for small types (int, double, pointers) where copying is cheap or when you need a copy.' },
            solution: '#include <iostream>\n\n// Pass by value (creates copy)\nvoid incrementByValue(int x) {\n  x++;\n  std::cout << "Inside (value): " << x << std::endl;\n}\n\n// Pass by reference (modifies original)\nvoid incrementByRef(int& x) {\n  x++;\n  std::cout << "Inside (ref): " << x << std::endl;\n}\n\n// Pass by const reference (read-only, no copy)\nvoid printConstRef(const int& x) {\n  std::cout << "Const ref: " << x << std::endl;\n}\n\nint main() {\n  int num = 5;\n  \n  std::cout << "Before: " << num << std::endl;\n  incrementByValue(num);\n  std::cout << "After value: " << num << std::endl;\n  \n  incrementByRef(num);\n  std::cout << "After ref: " << num << std::endl;\n  \n  printConstRef(num);\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n\n// Create functions with different parameter passing\n\nint main() {\n  return 0;\n}', expectedOutput: 'Parameter passing demonstration' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'cpp-super-01', title: 'STL Containers', type: 'supercharge', difficulty: 'advanced', track: 'cpp', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'The STL (Standard Template Library) provides containers: std::vector (dynamic array), std::list (linked list), std::map (key-value pairs), std::set (unique sorted elements), std::unordered_map (hash map). Algorithms: std::sort, std::find, std::transform. Iterators traverse containers: auto it = vec.begin();. Use #include <vector>, <map>, etc. STL is highly optimized and type-safe via templates.',
            instructions: 'Use std::vector to store numbers, sort them, and find a specific value.',
          },
          utilities: {
            hint: '#include <vector>\n#include <algorithm>\nstd::vector<int> nums = {3, 1, 4, 1, 5};\nstd::sort(nums.begin(), nums.end());\nauto it = std::find(nums.begin(), nums.end(), 4);',
            flashcard: { front: 'What is the difference between std::vector and std::list?', back: 'vector: contiguous memory, fast random access (O(1)), slow insert/delete in middle (O(n)). list: non-contiguous, slow random access (O(n)), fast insert/delete anywhere (O(1)). Usevector by default, list for frequent middle insertions.' },
            solution: '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n  std::vector<int> numbers = {5, 2, 8, 1, 9, 3};\n  \n  std::cout << "Original: ";\n  for (int n : numbers) {\n    std::cout << n << " ";\n  }\n  std::cout << std::endl;\n  \n  // Sort\n  std::sort(numbers.begin(), numbers.end());\n  \n  std::cout << "Sorted: ";\n  for (int n : numbers) {\n    std::cout << n << " ";\n  }\n  std::cout << std::endl;\n  \n  // Find\n  auto it = std::find(numbers.begin(), numbers.end(), 5);\n  if (it != numbers.end()) {\n    std::cout << "Found 5 at index: " << (it - numbers.begin()) << std::endl;\n  }\n  \n  // Count\n  int count = std::count(numbers.begin(), numbers.end(), 1);\n  std::cout << "Count of 1: " << count << std::endl;\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n  // Use STL containers and algorithms\n  return 0;\n}', expectedOutput: 'STL demonstration' },
        },
      ],
      sectionProject: {
        lessonId: 'cpp-project-1', title: 'Section Project: Student Grade System', type: 'project', difficulty: 'intermediate', track: 'cpp', xpReward: 35,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a student grade system using C++ fundamentals. This project will demonstrate variables, control flow, functions, STL containers, and memory management.',
          instructions: 'Build a grade system that:\n  • Stores students in a vector\n  • Calculates average, highest, lowest grades\n  • Uses functions for each operation\n  • Uses references for efficiency\n  • Handles edge cases',
        },
        utilities: {
          hint: 'Use std::vector<Student> for storage. Create Student struct with name and grades. Use const references for parameters. Use STL algorithms. Add input validation. Use smart pointers if dynamic allocation needed.',
          flashcard: { front: 'What makes good C++ code structure?', back: 'Use RAII (Resource Acquisition Is Initialization), prefer smart pointers over raw, use const correctness, leverage STL, avoid manual memory management, use references over pointers when possible, and follow modern C++ practices.' },
          solution: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <numeric>\n\nstruct Student {\n  std::string name;\n  std::vector<int> grades;\n};\n\ndouble calculateAverage(const std::vector<int>& grades) {\n  if (grades.empty()) return 0.0;\n  return std::accumulate(grades.begin(), grades.end(), 0.0) / grades.size();\n}\n\nint findHighest(const std::vector<int>& grades) {\n  if (grades.empty()) return 0;\n  return *std::max_element(grades.begin(), grades.end());\n}\n\nint findLowest(const std::vector<int>& grades) {\n  if (grades.empty()) return 0;\n  return *std::min_element(grades.begin(), grades.end());\n}\n\nvoid printStudentInfo(const Student& student) {\n  std::cout << "Student: " << student.name << std::endl;\n  std::cout << "Grades: ";\n  for (int grade : student.grades) {\n    std::cout << grade << " ";\n  }\n  std::cout << std::endl;\n  std::cout << "Average: " << calculateAverage(student.grades) << std::endl;\n  std::cout << "Highest: " << findHighest(student.grades) << std::endl;\n  std::cout << "Lowest: " << findLowest(student.grades) << std::endl;\n  std::cout << std::endl;\n}\n\nint main() {\n  std::vector<Student> students = {\n    {"Munira", {85, 92, 78, 90}},\n    {"Alex", {76, 88, 82, 79}},\n    {"Jordan", {95, 87, 91, 93}}\n  };\n  \n  for (const auto& student : students) {\n    printStudentInfo(student);\n  }\n  \n  return 0;\n}',
        },
        rightPanel: { startingCode: '// Build student grade system\n', expectedOutput: 'Complete grade system' },
      },
    },
    {
      sectionId: 'cpp-section-2',
      title: 'Section 2: Object-Oriented C++',
      learningObjective: 'Master OOP in C++ including classes, inheritance, polymorphism, and modern C++ features.',
      order: 2,
      isLocked: true,
      xpReward: 125,
      keyConcepts: ['Classes', 'Inheritance', 'Polymorphism', 'Templates', 'RAII', 'Modern C++'],
      estimatedMinutes: 90,
      lessons: [
        {
          lessonId: 'cpp-06', title: 'Classes & Objects', type: 'learn', difficulty: 'advanced', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'Classes define blueprints: class Student { private: std::string name; public: Student(std::string n) : name(n) {} };. Objects are instances: Student s("Munira");. Constructor initializes: ClassName(params) : member(value) {}. Destructor cleans up: ~ClassName(). Access specifiers: public, private, protected. this pointer refers to current instance. Member initializer lists are more efficient than assignment in constructor body.',
            instructions: 'Create a Rectangle class with width, height, constructor, and area() method.',
          },
          utilities: {
            hint: 'class Rectangle {\nprivate:\n  double width, height;\npublic:\n  Rectangle(double w, double h) : width(w), height(h) {}\n  double area() const { return width * height; }\n};',
            flashcard: { front: 'What is the difference between initialization list and assignment in constructor?', back: 'Initialization list (member(value)) initializes members directly. Assignment in body (member = value) default-constructs then assigns. Initialization is more efficient and required for const members and references.' },
            solution: '#include <iostream>\n\nclass Rectangle {\nprivate:\n  double width;\n  double height;\n\npublic:\n  // Constructor with initialization list\n  Rectangle(double w, double h) : width(w), height(h) {\n    std::cout << "Rectangle created" << std::endl;\n  }\n  \n  // Destructor\n  ~Rectangle() {\n    std::cout << "Rectangle destroyed" << std::endl;\n  }\n  \n  double getWidth() const { return width; }\n  double getHeight() const { return height; }\n  \n  void setDimensions(double w, double h) {\n    width = w;\n    height = h;\n  }\n  \n  double area() const {\n    return width * height;\n  }\n  \n  double perimeter() const {\n    return 2 * (width + height);\n  }\n};\n\nint main() {\n  Rectangle rect(5.0, 3.0);\n  std::cout << "Area: " << rect.area() << std::endl;\n  std::cout << "Perimeter: " << rect.perimeter() << std::endl;\n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n\n// Create Rectangle class\n\nint main() {\n  return 0;\n}', expectedOutput: 'Rectangle class' },
        },
        {
          lessonId: 'cpp-07', title: 'Inheritance & Virtual Functions', type: 'learn', difficulty: 'advanced', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Inheritance: class Derived : public Base { }. Virtual functions enable polymorphism: virtual void func() = 0; for pure virtual (abstract). Override in derived: void func() override;. Virtual destructor: virtual ~Base() {} for proper cleanup. Use override keyword to catch errors. Dynamic binding happens at runtime for virtual functions. Enables runtime polymorphism and flexible designs.',
            instructions: 'Create a Shape base class with virtual area() method, and Circle/Rectangle derived classes.',
          },
          utilities: {
            hint: 'class Shape {\npublic:\n  virtual double area() const = 0;\n  virtual ~Shape() {}\n};\nclass Circle : public Shape {\n  double radius;\npublic:\n  double area() const override { return 3.14159 * radius * radius; }\n};',
            flashcard: { front: 'Why use virtual destructors in polymorphic base classes?', back: 'Without virtual destructor, deleting derived object through base pointer calls only base destructor (memory leak). Virtual destructor ensures derived destructor runs first, then base. Always use virtual destructor in polymorphic classes.' },
            solution: '#include <iostream>\n#include <cmath>\n\nclass Shape {\npublic:\n  virtual double area() const = 0;\n  virtual double perimeter() const = 0;\n  virtual ~Shape() {\n    std::cout << "Shape destroyed" << std::endl;\n  }\n};\n\nclass Circle : public Shape {\nprivate:\n  double radius;\n\npublic:\n  Circle(double r) : radius(r) {}\n  \n  double area() const override {\n    return M_PI * radius * radius;\n  }\n  \n  double perimeter() const override {\n    return 2 * M_PI * radius;\n  }\n  \n  ~Circle() override {\n    std::cout << "Circle destroyed" << std::endl;\n  }\n};\n\nclass Rectangle : public Shape {\nprivate:\n  double width, height;\n\npublic:\n  Rectangle(double w, double h) : width(w), height(h) {}\n  \n  double area() const override {\n    return width * height;\n  }\n  \n  double perimeter() const override {\n    return 2 * (width + height);\n  }\n  \n  ~Rectangle() override {\n    std::cout << "Rectangle destroyed" << std::endl;\n  }\n};\n\nint main() {\n  Shape* shapes[] = {\n    new Circle(5.0),\n    new Rectangle(4.0, 6.0)\n  };\n  \n  for (Shape* shape : shapes) {\n    std::cout << "Area: " << shape->area() << std::endl;\n    std::cout << "Perimeter: " << shape->perimeter() << std::endl;\n    delete shape;\n  }\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <cmath>\n\n// Create polymorphic shape hierarchy\n\nint main() {\n  return 0;\n}', expectedOutput: 'Polymorphic shapes' },
        },
        {
          lessonId: 'cpp-08', title: 'Templates & Generics', type: 'learn', difficulty: 'advanced', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'Templates enable generic programming: template<typename T> T max(T a, T b) { return a > b ? a : b; }. Function templates work with any type. Class templates: template<typename T> class Stack { }. Template specialization for specific types. Templates are compile-time — no runtime overhead. Used throughout STL. Enable type-safe generic code. Can have multiple template parameters and non-type parameters.',
            instructions: 'Create a template function that finds the maximum of two values, and a template Stack class.',
          },
          utilities: {
            hint: 'template<typename T>\nT maximum(T a, T b) {\n  return (a > b) ? a : b;\n}\n\ntemplate<typename T>\nclass Stack {\n  std::vector<T> items;\npublic:\n  void push(const T& item) { items.push_back(item); }\n};',
            flashcard: { front: 'What is the difference between templates and macros in C++?', back: 'Templates are type-safe, support overloading, have proper scope, and are compiled. Macros are text substitution, not type-safe, no scope, preprocessed. Templates are the modern, safe way to write generic code.' },
            solution: '#include <iostream>\n#include <vector>\n\n// Template function\ntemplate<typename T>\nT maximum(T a, T b) {\n  return (a > b) ? a : b;\n}\n\n// Template class\ntemplate<typename T>\nclass Stack {\nprivate:\n  std::vector<T> items;\n\npublic:\n  void push(const T& item) {\n    items.push_back(item);\n  }\n  \n  T pop() {\n    if (items.empty()) {\n      throw std::runtime_error("Stack empty");\n    }\n    T value = items.back();\n    items.pop_back();\n    return value;\n  }\n  \n  bool isEmpty() const {\n    return items.empty();\n  }\n  \n  size_t size() const {\n    return items.size();\n  }\n};\n\nint main() {\n  // Test template function\n  std::cout << "Max int: " << maximum(5, 10) << std::endl;\n  std::cout << "Max double: " << maximum(3.14, 2.71) << std::endl;\n  \n  // Test template class\n  Stack<int> intStack;\n  intStack.push(1);\n  intStack.push(2);\n  intStack.push(3);\n  \n  while (!intStack.isEmpty()) {\n    std::cout << "Popped: " << intStack.pop() << std::endl;\n  }\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <vector>\n\n// Create template function and class\n\nint main() {\n  return 0;\n}', expectedOutput: 'Template demonstration' },
        },
        {
          lessonId: 'cpp-09', title: 'RAII & Resource Management', type: 'practice', difficulty: 'advanced', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'RAII (Resource Acquisition Is Initialization) ties resource lifecycle to object scope. Constructor acquires, destructor releases. Prevents resource leaks. Smart pointers implement RAII: std::unique_ptr<T> ptr = std::make_unique<T>();. std::lock_guard for mutexes. File streams close automatically. No need for manual cleanup. Exception-safe by design. Core C++ idiom for reliable resource management.',
            instructions: 'Create a FileHandler class using RAII that opens a file in constructor and closes in destructor.',
          },
          utilities: {
            hint: 'class FileHandler {\n  std::ofstream file;\npublic:\n  FileHandler(const std::string& filename) : file(filename) {}\n  ~FileHandler() { file.close(); }\n  void write(const std::string& data) { file << data; }\n};',
            flashcard: { front: 'What is RAII and why is it important in C++?', back: 'RAII binds resource lifecycle to object scope. Constructor acquires, destructor releases. Ensures cleanup even with exceptions. Eliminates resource leaks. Foundation of C++ resource management. Smart pointers, locks, streams all use RAII.' },
            solution: '#include <iostream>\n#include <fstream>\n\nclass FileHandler {\nprivate:\n  std::ofstream file;\n  std::string filename;\n\npublic:\n  // Constructor opens file (RAII acquisition)\n  FileHandler(const std::string& fname) : filename(fname) {\n    file.open(filename);\n    if (!file.is_open()) {\n      throw std::runtime_error("Failed to open file: " + filename);\n    }\n    std::cout << "File opened: " << filename << std::endl;\n  }\n  \n  // Destructor closes file (RAII release)\n  ~FileHandler() {\n    if (file.is_open()) {\n      file.close();\n      std::cout << "File closed: " << filename << std::endl;\n    }\n  }\n  \n  // Delete copy constructor and assignment (unique ownership)\n  FileHandler(const FileHandler&) = delete;\n  FileHandler& operator=(const FileHandler&) = delete;\n  \n  void write(const std::string& data) {\n    if (file.is_open()) {\n      file << data << std::endl;\n    }\n  }\n};\n\nint main() {\n  try {\n    FileHandler fh("output.txt");\n    fh.write("Hello from RAII!");\n    fh.write("File closes automatically");\n    // File closes when fh goes out of scope\n  } catch (const std::exception& e) {\n    std::cerr << "Error: " << e.what() << std::endl;\n  }\n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <fstream>\n\n// Create RAII FileHandler class\n\nint main() {\n  return 0;\n}', expectedOutput: 'RAII demonstration' },
        },
        {
          lessonId: 'cpp-10', title: 'Modern C++ Features', type: 'practice', difficulty: 'advanced', track: 'cpp', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'Modern C++ (C++11/14/17/20) features: auto type deduction, range-based for, lambda expressions, smart pointers, move semantics (std::move), nullptr instead of NULL, constexpr for compile-time constants, std::thread for concurrency, structured bindings, std::optional. Use -std=c++17 or later. Modern C++ is safer, more expressive, and more efficient than legacy C++.',
            instructions: 'Demonstrate modern C++ features: auto, range-based for, lambda, smart pointer, and constexpr.',
          },
          utilities: {
            hint: 'auto x = 42; // type deduction\nfor (auto& item : vec) { } // range-based for\nauto lambda = []() { return 42; }; // lambda\nauto ptr = std::make_unique<int>(42); // smart pointer\nconstexpr int MAX = 100; // compile-time constant',
            flashcard: { front: 'What is move semantics and when should you use std::move?', back: 'Move semantics transfer ownership instead of copying. Use std::move when you no longer need the source object. Faster for large objects (vectors, strings). Enables efficient return by value. Essential for performance in modern C++.' },
            solution: '#include <iostream>\n#include <vector>\n#include <memory>\n#include <algorithm>\n\nint main() {\n  // auto type deduction\n  auto number = 42;\n  auto name = std::string("Modern C++");\n  \n  // Range-based for loop\n  std::vector<int> numbers = {5, 2, 8, 1, 9};\n  std::cout << "Numbers: ";\n  for (const auto& num : numbers) {\n    std::cout << num << " ";\n  }\n  std::cout << std::endl;\n  \n  // Lambda expression\n  auto isEven = [](int n) { return n % 2 == 0; };\n  auto evenCount = std::count_if(numbers.begin(), numbers.end(), isEven);\n  std::cout << "Even count: " << evenCount << std::endl;\n  \n  // Smart pointer\n  auto ptr = std::make_unique<int>(100);\n  std::cout << "Smart pointer value: " << *ptr << std::endl;\n  \n  // constexpr (compile-time constant)\n  constexpr int MAX_SIZE = 100;\n  std::cout << "Max size: " << MAX_SIZE << std::endl;\n  \n  // nullptr instead of NULL\n  int* rawPtr = nullptr;\n  \n  // Structured bindings (C++17)\n  std::pair<int, double> pair = {42, 3.14};\n  auto [first, second] = pair;\n  std::cout << "Pair: " << first << ", " << second << std::endl;\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <vector>\n#include <memory>\n#include <algorithm>\n\nint main() {\n  // Demonstrate modern C++ features\n  return 0;\n}', expectedOutput: 'Modern C++ features' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'cpp-super-02', title: 'Exception Handling', type: 'supercharge', difficulty: 'advanced', track: 'cpp', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'C++ exceptions handle runtime errors. try block contains risky code. catch handles specific exceptions: catch (const std::exception& e) { ... }. throw exceptions: throw std::runtime_error("Error");. Custom exceptions: inherit from std::exception. noexcept specifier indicates function doesn\'t throw. RAII ensures cleanup even with exceptions. Use exceptions for exceptional conditions, not normal control flow.',
            instructions: 'Create a function that validates input and throws exceptions for invalid values. Handle with try-catch.',
          },
          utilities: {
            hint: 'void validateAge(int age) {\n  if (age < 0 || age > 150) {\n    throw std::invalid_argument("Invalid age");\n  }\n}\ntry {\n  validateAge(-5);\n} catch (const std::exception& e) {\n  std::cerr << e.what();\n}',
            flashcard: { front: 'What is the difference between noexcept and throw() in C++?', back: 'noexcept is the modern C++11+ way to specify no exceptions. throw() is deprecated (equivalent to noexcept in C++11 but removed in C++17). Always use noexcept for new code. noexcept enables compiler optimizations.' },
            solution: '#include <iostream>\n#include <stdexcept>\n\nclass InvalidAgeException : public std::exception {\nprivate:\n  std::string message;\n\npublic:\n  InvalidAgeException(const std::string& msg) : message(msg) {}\n  \n  const char* what() const noexcept override {\n    return message.c_str();\n  }\n};\n\nvoid validateAge(int age) {\n  if (age < 0) {\n    throw InvalidAgeException("Age cannot be negative");\n  }\n  if (age > 150) {\n    throw InvalidAgeException("Age cannot exceed 150");\n  }\n}\n\nvoid processPerson(const std::string& name, int age) {\n  try {\n    validateAge(age);\n    std::cout << name << " is " << age << " years old (valid)" << std::endl;\n  } catch (const InvalidAgeException& e) {\n    std::cerr << "Validation error for " << name << ": " << e.what() << std::endl;\n  } catch (const std::exception& e) {\n    std::cerr << "Unexpected error: " << e.what() << std::endl;\n  }\n}\n\nint main() {\n  processPerson("Munira", 20);\n  processPerson("Alex", -5);\n  processPerson("Jordan", 200);\n  \n  return 0;\n}',
          },
          rightPanel: { startingCode: '#include <iostream>\n#include <stdexcept>\n\n// Implement exception handling\n\nint main() {\n  return 0;\n}', expectedOutput: 'Exception handling demonstration' },
        },
      ],
      sectionProject: {
        lessonId: 'cpp-project-2', title: 'Section Project: Game Engine Basics', type: 'project', difficulty: 'advanced', track: 'cpp', xpReward: 35,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build a basic game engine using OOP and modern C++. This project will demonstrate classes, inheritance, polymorphism, smart pointers, and RAII.',
          instructions: 'Build a game engine with:\n  • Entity base class with position\n  • GameObject derived classes (Player, Enemy)\n  • Component system using interfaces\n  • Smart pointers for memory management\n  • RAII for resource cleanup',
        },
        utilities: {
          hint: 'Create Entity base class with virtual update(). Use inheritance for GameObject. Use interfaces for Components (Renderable, Collidable). Use std::unique_ptr for entity ownership. Use RAII for resource managers. Implement basic game loop.',
          flashcard: { front: 'What makes a good C++ game engine architecture?', back: 'Entity-component system for flexibility, smart pointers for memory safety, RAII for resource management, virtual functions for polymorphism, efficient data structures (cache-friendly), and clear separation of concerns.' },
          solution: '#include <iostream>\n#include <memory>\n#include <vector>\n#include <string>\n\n// Component interface\nclass Component {\npublic:\n  virtual ~Component() = default;\n  virtual void update() = 0;\n  virtual void render() const = 0;\n};\n\n// Entity base class\nclass Entity {\nprotected:\n  std::string name;\n  float x, y;\n  std::vector<std::unique_ptr<Component>> components;\n\npublic:\n  Entity(const std::string& n, float px, float py) \n    : name(n), x(px), y(py) {}\n  \n  virtual ~Entity() = default;\n  \n  void addComponent(std::unique_ptr<Component> comp) {\n    components.push_back(std::move(comp));\n  }\n  \n  void update() {\n    for (auto& comp : components) {\n      comp->update();\n    }\n  }\n  \n  void render() const {\n    std::cout << "Rendering " << name << " at (" << x << ", " << y << ")" << std::endl;\n    for (const auto& comp : components) {\n      comp->render();\n    }\n  }\n  \n  virtual void move(float dx, float dy) {\n    x += dx;\n    y += dy;\n  }\n};\n\n// Render component\nclass RenderComponent : public Component {\n  std::string sprite;\npublic:\n  RenderComponent(const std::string& s) : sprite(s) {}\n  void update() override {}\n  void render() const override {\n    std::cout << "  Drawing sprite: " << sprite << std::endl;\n  }\n};\n\n// Player entity\nclass Player : public Entity {\n  int health;\npublic:\n  Player(const std::string& name, float x, float y) \n    : Entity(name, x, y), health(100) {}\n  \n  void move(float dx, float dy) override {\n    Entity::move(dx, dy);\n    std::cout << "Player moved to (" << x << ", " << y << ")" << std::endl;\n  }\n};\n\n// Enemy entity\nclass Enemy : public Entity {\n  int damage;\npublic:\n  Enemy(const std::string& name, float x, float y, int d) \n    : Entity(name, x, y), damage(d) {}\n  \n  void update() override {\n    Entity::update();\n    std::cout << name << " is patrolling" << std::endl;\n  }\n};\n\nint main() {\n  auto player = std::make_unique<Player>("Hero", 0.0f, 0.0f);\n  player->addComponent(std::make_unique<RenderComponent>("hero.png"));\n  \n  auto enemy = std::make_unique<Enemy>("Goblin", 10.0f, 5.0f, 15);\n  enemy->addComponent(std::make_unique<RenderComponent>("goblin.png"));\n  \n  player->render();\n  player->move(5.0f, 3.0f);\n  \n  enemy->render();\n  enemy->update();\n  \n  return 0;\n}',
        },
        rightPanel: { startingCode: '// Build game engine basics\n', expectedOutput: 'Game engine demonstration' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'cpp-capstone', title: 'Course Capstone: High-Performance Data Processing', type: 'project', difficulty: 'advanced', track: 'cpp', xpReward: 100,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build a high-performance data processing system using all C++ concepts learned. This capstone will demonstrate modern C++, STL, templates, memory management, and performance optimization.',
      instructions: 'Build a data processor with:\n  • Template-based data structures\n  • Smart pointer memory management\n  • RAII resource handling\n  • STL algorithms for processing\n  • Exception safety throughout\n  • Performance optimizations',
    },
    utilities: {
      hint: 'Use templates for generic data processing. Use smart pointers for memory. Use RAII for file/database resources. Use STL algorithms for efficiency. Add exception handling. Profile and optimize hot paths. Use move semantics for large data.',
      flashcard: { front: 'What makes a high-performance C++ application?', back: 'Efficient data structures (cache-friendly), smart pointers for safety, RAII for reliability, move semantics to avoid copies, STL algorithms over manual loops, exception safety, and profiling-driven optimization.' },
      solution: '#include <iostream>\n#include <vector>\n#include <memory>\n#include <algorithm>\n#include <fstream>\n#include <numeric>\n#include <stdexcept>\n\n// RAII File Handler\nclass DataFile {\n  std::unique_ptr<std::ifstream> file;\n  std::string filename;\n\npublic:\n  DataFile(const std::string& fname) : filename(fname) {\n    file = std::make_unique<std::ifstream>(fname);\n    if (!file->is_open()) {\n      throw std::runtime_error("Cannot open file: " + fname);\n    }\n  }\n  \n  ~DataFile() {\n    if (file && file->is_open()) {\n      file->close();\n    }\n  }\n  \n  std::vector<double> readData() {\n    std::vector<double> data;\n    double value;\n    while (*file >> value) {\n      data.push_back(value);\n    }\n    return data;\n  }\n};\n\n// Template Data Processor\ntemplate<typename T>\nclass DataProcessor {\n  std::vector<T> data;\n\npublic:\n  DataProcessor(std::vector<T> d) : data(std::move(d)) {}\n  \n  T calculateAverage() const {\n    if (data.empty()) return T{};\n    return std::accumulate(data.begin(), data.end(), T{}) / data.size();\n  }\n  \n  T findMax() const {\n    if (data.empty()) return T{};\n    return *std::max_element(data.begin(), data.end());\n  }\n  \n  T findMin() const {\n    if (data.empty()) return T{};\n    return *std::min_element(data.begin(), data.end());\n  }\n  \n  void sortData() {\n    std::sort(data.begin(), data.end());\n  }\n  \n  std::vector<T> filter(std::function<bool(const T&)> predicate) {\n    std::vector<T> result;\n    std::copy_if(data.begin(), data.end(), std::back_inserter(result), predicate);\n    return result;\n  }\n  \n  const std::vector<T>& getData() const { return data; }\n};\n\nint main() {\n  try {\n    // Simulate reading data\n    std::vector<double> sampleData = {45.5, 67.2, 34.8, 89.1, 56.3, 78.9, 23.4, 91.0};\n    \n    auto processor = std::make_unique<DataProcessor<double>>(std::move(sampleData));\n    \n    std::cout << "Data Processing Results:" << std::endl;\n    std::cout << "Average: " << processor->calculateAverage() << std::endl;\n    std::cout << "Max: " << processor->findMax() << std::endl;\n    std::cout << "Min: " << processor->findMin() << std::endl;\n    \n    processor->sortData();\n    std::cout << "Sorted data: ";\n    for (const auto& val : processor->getData()) {\n      std::cout << val << " ";\n    }\n    std::cout << std::endl;\n    \n    auto filtered = processor->filter([](const double& val) {\n      return val > 50.0;\n    });\n    \n    std::cout << "Values > 50: ";\n    for (const auto& val : filtered) {\n      std::cout << val << " ";\n    }\n    std::cout << std::endl;\n    \n  } catch (const std::exception& e) {\n    std::cerr << "Error: " << e.what() << std::endl;\n    return 1;\n  }\n  \n  return 0;\n}',
    },
    rightPanel: { startingCode: '// Build high-performance data processor\n', expectedOutput: 'Production-ready data processor' },
  },
  totalLessons: 10,
  totalXP: 350,
};
