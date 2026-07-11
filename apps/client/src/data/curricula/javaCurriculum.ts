import type { Course } from '../../types/curriculum';

export const javaCourse: Course = {
  id: 'eng1',
  title: 'Java',
  tagline: 'Build robust, scalable applications',
  philosophy: 'Java is taught through object-oriented principles — classes, inheritance, and the JVM ecosystem used in enterprise.',
  icon: '☕',
  color: 'from-red-500 to-red-700',
  level: 'BEGINNER',
  pillar: 'Core Engineering',
  xp: 300,
  sections: [
    {
      sectionId: 'java-section-1',
      title: 'Section 1: Java Fundamentals',
      learningObjective: 'Master the core concepts of Java including syntax, data types, control flow, and basic OOP principles.',
      order: 1,
      isLocked: false,
      xpReward: 100,
      keyConcepts: ['Syntax', 'Data Types', 'Control Flow', 'Methods', 'Arrays', 'Basic OOP'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'java-01', title: 'Hello Java & Basic Syntax', type: 'learn', difficulty: 'beginner', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'Java is a statically-typed, object-oriented language that runs on the JVM (Java Virtual Machine). Every program needs a class with a main method: public static void main(String[] args). System.out.println() prints to console. Java uses semicolons to end statements and curly braces for blocks. The JVM compiles Java bytecode to machine code. Java is platform-independent — write once, run anywhere.',
            instructions: 'Write a Java program that prints "Hello, Java!" to the console.',
          },
          utilities: {
            hint: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}',
            flashcard: { front: 'What does public static void main(String[] args) mean?', back: 'public: accessible from anywhere. static: belongs to class, not instance. void: returns nothing. main: entry point method. String[] args: command-line arguments. This is the required signature for Java program entry.' },
            solution: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}',
          },
          rightPanel: { startingCode: 'public class Main {\n  public static void main(String[] args) {\n    // Print Hello, Java!\n  }\n}', expectedOutput: 'Hello, Java!' },
        },
        {
          lessonId: 'java-02', title: 'Variables & Data Types', type: 'learn', difficulty: 'beginner', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'Java has primitive types: int (32-bit integer), double (64-bit float), boolean (true/false), char (16-bit Unicode). Reference types: String, arrays, objects. Variables must be declared with type: int age = 25;. final makes constants: final int MAX = 100;. Type conversion: implicit (widening) and explicit (casting): double d = 10; int i = (int) d;. Java is strongly typed — type safety prevents many bugs.',
            instructions: 'Declare variables for student name (String), age (int), gpa (double), and isEnrolled (boolean). Print them.',
          },
          utilities: {
            hint: 'String name = "Munira";\nint age = 20;\ndouble gpa = 3.8;\nboolean isEnrolled = true;\nSystem.out.println(name + " " + age + " " + gpa + " " + isEnrolled);',
            flashcard: { front: 'What is the difference between primitive and reference types in Java?', back: 'Primitives (int, double, boolean) store actual values. Reference types (String, arrays, objects) store references to heap memory. Primitives are faster and have default values. References can be null.' },
            solution: 'public class Student {\n  public static void main(String[] args) {\n    String name = "Munira";\n    int age = 20;\n    double gpa = 3.8;\n    boolean isEnrolled = true;\n    \n    System.out.println("Name: " + name);\n    System.out.println("Age: " + age);\n    System.out.println("GPA: " + gpa);\n    System.out.println("Enrolled: " + isEnrolled);\n  }\n}',
          },
          rightPanel: { startingCode: 'public class Student {\n  public static void main(String[] args) {\n    // Declare and print student variables\n  }\n}', expectedOutput: 'Student information' },
        },
        {
          lessonId: 'java-03', title: 'Control Flow & Loops', type: 'learn', difficulty: 'beginner', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'if/else if/else for branching: if (condition) { ... } else { ... }. Comparison: ==, !=, <, >, <=, >=. Logical: && (and), || (or), ! (not). Loops: for (int i = 0; i < 10; i++), while (condition), do-while (at least once). Enhanced for-loop: for (int num : array). switch/case for multiple values: switch (day) { case 1: ...; break; }. break exits loops, continue skips to next iteration.',
            instructions: 'Use a for loop to print numbers 1 to 10, and an enhanced for-loop to sum an array.',
          },
          utilities: {
            hint: 'for (int i = 1; i <= 10; i++) {\n  System.out.println(i);\n}\nint[] nums = {1, 2, 3};\nint sum = 0;\nfor (int n : nums) sum += n;',
            flashcard: { front: 'What is the difference between while and do-while loops?', back: 'while checks condition before executing (may never run). do-while executes at least once, then checks condition. Use while when condition might be false initially, do-when when you need at least one iteration.' },
            solution: 'public class Loops {\n  public static void main(String[] args) {\n    // Print numbers 1-10\n    for (int i = 1; i <= 10; i++) {\n      System.out.println(i);\n    }\n    \n    // Sum array using enhanced for-loop\n    int[] numbers = {1, 2, 3, 4, 5};\n    int sum = 0;\n    for (int num : numbers) {\n      sum += num;\n    }\n    System.out.println("Sum: " + sum);\n  }\n}',
          },
          rightPanel: { startingCode: 'public class Loops {\n  public static void main(String[] args) {\n    // Implement loops\n  }\n}', expectedOutput: '1-10 and sum calculation' },
        },
        {
          lessonId: 'java-04', title: 'Methods & Parameters', type: 'practice', difficulty: 'beginner', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'Methods bundle reusable code: public static int add(int a, int b) { return a + b; }. Parameters are inputs, return type is output. void returns nothing. Method overloading: same name, different parameters. Call methods: add(5, 3). Static methods belong to class, instance methods belong to objects. Methods improve code organization and reusability. Always give methods descriptive names.',
            instructions: 'Create methods calculateArea(double radius) for circle area and calculateArea(double length, double width) for rectangle area (overloading).',
          },
          utilities: {
            hint: 'public static double calculateArea(double radius) {\n  return Math.PI * radius * radius;\n}\npublic static double calculateArea(double length, double width) {\n  return length * width;\n}',
            flashcard: { front: 'What is method overloading in Java?', back: 'Defining multiple methods with the same name but different parameter lists (different types or count). The compiler determines which to call based on arguments. Return type alone is not enough for overloading.' },
            solution: 'public class AreaCalculator {\n  public static double calculateArea(double radius) {\n    return Math.PI * radius * radius;\n  }\n  \n  public static double calculateArea(double length, double width) {\n    return length * width;\n  }\n  \n  public static void main(String[] args) {\n    System.out.println("Circle area: " + calculateArea(5.0));\n    System.out.println("Rectangle area: " + calculateArea(4.0, 6.0));\n  }\n}',
          },
          rightPanel: { startingCode: 'public class AreaCalculator {\n  // Create overloaded area methods\n}', expectedOutput: 'Area calculations' },
        },
        {
          lessonId: 'java-05', title: 'Arrays & ArrayList', type: 'practice', difficulty: 'beginner', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'Arrays are fixed-size: int[] nums = new int[5]; or int[] nums = {1, 2, 3};. Access by index: nums[0]. Length: nums.length. ArrayList is dynamic: ArrayList<String> list = new ArrayList<>();. Methods: add(), get(), remove(), size(). Arrays are faster, ArrayList more flexible. Use arrays when size is known, ArrayList when it varies. Import java.util.ArrayList.',
            instructions: 'Create an ArrayList of strings, add names, remove one, and print all using a loop.',
          },
          utilities: {
            hint: 'ArrayList<String> names = new ArrayList<>();\nnames.add("Munira");\nnames.add("Alex");\nnames.remove(0);\nfor (String name : names) System.out.println(name);',
            flashcard: { front: 'What is the difference between arrays and ArrayList in Java?', back: 'Arrays: fixed size, primitive support, faster syntax. ArrayList: dynamic size, only objects, more methods. Use arrays for performance and known size, ArrayList for flexibility and when size changes.' },
            solution: 'import java.util.ArrayList;\n\npublic class ListDemo {\n  public static void main(String[] args) {\n    ArrayList<String> names = new ArrayList<>();\n    \n    names.add("Munira");\n    names.add("Alex");\n    names.add("Jordan");\n    \n    System.out.println("Size: " + names.size());\n    System.out.println("First: " + names.get(0));\n    \n    names.remove(1);\n    \n    System.out.println("After removal:");\n    for (String name : names) {\n      System.out.println(name);\n    }\n  }\n}',
          },
          rightPanel: { startingCode: 'import java.util.ArrayList;\n// Create and manipulate ArrayList\n', expectedOutput: 'ArrayList operations' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'java-super-01', title: 'String Manipulation', type: 'supercharge', difficulty: 'intermediate', track: 'java', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'Strings are immutable in Java — operations create new strings. Common methods: length(), charAt(), substring(), toUpperCase(), toLowerCase(), trim(), equals(), contains(), startsWith(), endsWith(). StringBuilder is mutable for efficient concatenation: StringBuilder sb = new StringBuilder(); sb.append("Hello");. String concatenation with + is optimized but StringBuilder is explicit for loops.',
            instructions: 'Create a method that reverses a string and another that checks if a string is a palindrome.',
          },
          utilities: {
            hint: 'public static String reverse(String s) {\n  return new StringBuilder(s).reverse().toString();\n}\npublic static boolean isPalindrome(String s) {\n  return s.equals(new StringBuilder(s).reverse().toString());\n}',
            flashcard: { front: 'Why are Strings immutable in Java?', back: 'Immutability enables string pooling (memory efficiency), thread safety, and caching of hashcodes. Operations create new strings rather than modify existing ones. Use StringBuilder for mutable string operations.' },
            solution: 'public class StringUtils {\n  public static String reverse(String s) {\n    return new StringBuilder(s).reverse().toString();\n  }\n  \n  public static boolean isPalindrome(String s) {\n    String reversed = new StringBuilder(s).reverse().toString();\n    return s.equals(reversed);\n  }\n  \n  public static void main(String[] args) {\n    String text = "racecar";\n    System.out.println("Reverse: " + reverse(text));\n    System.out.println("Is palindrome: " + isPalindrome(text));\n  }\n}',
          },
          rightPanel: { startingCode: '// Create string manipulation methods\n', expectedOutput: 'String utilities' },
        },
      ],
      sectionProject: {
        lessonId: 'java-project-1', title: 'Section Project: Grade Calculator', type: 'project', difficulty: 'beginner', track: 'java', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a grade calculator using all Java fundamentals learned. This project will demonstrate variables, control flow, methods, arrays, and basic OOP.',
          instructions: 'Build a grade calculator that:\n  • Stores student grades in an array\n  • Calculates average, highest, lowest\n  • Determines letter grade\n  • Uses methods for each calculation\n  • Handles edge cases',
        },
        utilities: {
          hint: 'Use array for grades. Create methods: calculateAverage, findHighest, findLowest, getLetterGrade. Use if/else for letter grades. Handle empty array case. Use main method to demonstrate.',
          flashcard: { front: 'What makes a well-structured Java program?', back: 'Clear class organization, descriptive method names, proper use of arrays/collections, input validation, error handling, comments for complex logic, and separation of concerns.' },
          solution: 'public class GradeCalculator {\n  \n  public static double calculateAverage(int[] grades) {\n    if (grades.length == 0) return 0.0;\n    int sum = 0;\n    for (int grade : grades) {\n      sum += grade;\n    }\n    return (double) sum / grades.length;\n  }\n  \n  public static int findHighest(int[] grades) {\n    if (grades.length == 0) return 0;\n    int highest = grades[0];\n    for (int grade : grades) {\n      if (grade > highest) highest = grade;\n    }\n    return highest;\n  }\n  \n  public static int findLowest(int[] grades) {\n    if (grades.length == 0) return 0;\n    int lowest = grades[0];\n    for (int grade : grades) {\n      if (grade < lowest) lowest = grade;\n    }\n    return lowest;\n  }\n  \n  public static String getLetterGrade(double average) {\n    if (average >= 90) return "A";\n    if (average >= 80) return "B";\n    if (average >= 70) return "C";\n    if (average >= 60) return "D";\n    return "F";\n  }\n  \n  public static void main(String[] args) {\n    int[] grades = {85, 92, 78, 90, 88};\n    \n    double average = calculateAverage(grades);\n    int highest = findHighest(grades);\n    int lowest = findLowest(grades);\n    String letterGrade = getLetterGrade(average);\n    \n    System.out.println("Average: " + average);\n    System.out.println("Highest: " + highest);\n    System.out.println("Lowest: " + lowest);\n    System.out.println("Letter Grade: " + letterGrade);\n  }\n}',
        },
        rightPanel: { startingCode: '// Build grade calculator\n', expectedOutput: 'Complete grade calculator' },
      },
    },
    {
      sectionId: 'java-section-2',
      title: 'Section 2: Object-Oriented Programming',
      learningObjective: 'Master OOP principles including classes, inheritance, polymorphism, and encapsulation.',
      order: 2,
      isLocked: true,
      xpReward: 100,
      keyConcepts: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Interfaces'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'java-06', title: 'Classes & Objects', type: 'learn', difficulty: 'intermediate', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'Classes define blueprints for objects: public class Student { private String name; public Student(String name) { this.name = name; } }. Objects are instances: Student s = new Student("Munira");. Constructors initialize objects. this refers to current instance. Fields (instance variables) store object state. Methods define behavior. Access modifiers: public, private, protected. OOP organizes code around real-world entities.',
            instructions: 'Create a Student class with name, age, and gpa fields, a constructor, and a method to print student info.',
          },
          utilities: {
            hint: 'public class Student {\n  private String name;\n  private int age;\n  public Student(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n  public void printInfo() {\n    System.out.println(name + " " + age);\n  }\n}',
            flashcard: { front: 'What is the difference between a class and an object?', back: 'Class is a blueprint/template defining structure and behavior. Object is an instance of a class with actual data. Class: the concept; Object: the concrete realization. One class can create many objects.' },
            solution: 'public class Student {\n  private String name;\n  private int age;\n  private double gpa;\n  \n  public Student(String name, int age, double gpa) {\n    this.name = name;\n    this.age = age;\n    this.gpa = gpa;\n  }\n  \n  public void printInfo() {\n    System.out.println("Name: " + name);\n    System.out.println("Age: " + age);\n    System.out.println("GPA: " + gpa);\n  }\n  \n  public static void main(String[] args) {\n    Student student = new Student("Munira", 20, 3.8);\n    student.printInfo();\n  }\n}',
          },
          rightPanel: { startingCode: '// Create Student class\n', expectedOutput: 'Student class with constructor' },
        },
        {
          lessonId: 'java-07', title: 'Encapsulation & Getters/Setters', type: 'learn', difficulty: 'intermediate', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Encapsulation hides internal state and requires interaction through methods. Make fields private, provide public getters/setters: public String getName() { return name; } public void setName(String name) { this.name = name; }. This allows validation and controlled access. IDEs generate getters/setters automatically. Encapsulation is a core OOP principle that improves maintainability and prevents invalid states.',
            instructions: 'Add getters and setters to Student class with validation (age must be positive, gpa 0-4).',
          },
          utilities: {
            hint: 'public void setAge(int age) {\n  if (age > 0) this.age = age;\n  else throw new IllegalArgumentException("Age must be positive");\n}',
            flashcard: { front: 'Why use getters and setters instead of public fields?', back: 'Encapsulation: control access, validate input, add logging, change implementation without affecting callers. Public fields expose internal state, making validation and future changes difficult.' },
            solution: 'public class Student {\n  private String name;\n  private int age;\n  private double gpa;\n  \n  public Student(String name, int age, double gpa) {\n    this.name = name;\n    setAge(age);\n    setGpa(gpa);\n  }\n  \n  public String getName() { return name; }\n  public void setName(String name) { this.name = name; }\n  \n  public int getAge() { return age; }\n  public void setAge(int age) {\n    if (age > 0) this.age = age;\n    else throw new IllegalArgumentException("Age must be positive");\n  }\n  \n  public double getGpa() { return gpa; }\n  public void setGpa(double gpa) {\n    if (gpa >= 0 && gpa <= 4.0) this.gpa = gpa;\n    else throw new IllegalArgumentException("GPA must be 0-4.0");\n  }\n}',
          },
          rightPanel: { startingCode: '// Add getters/setters with validation\n', expectedOutput: 'Encapsulated Student class' },
        },
        {
          lessonId: 'java-08', title: 'Inheritance & extends', type: 'learn', difficulty: 'intermediate', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'Inheritance lets classes inherit fields and methods: public class GraduateStudent extends Student { }. Child class gets parent\'s non-private members. Use super() to call parent constructor. Method overriding: child provides new implementation with @Override annotation. Single inheritance only (one parent). Promotes code reuse and "is-a" relationships. Object is the ultimate parent of all classes.',
            instructions: 'Create a GraduateStudent class that extends Student and adds a thesisTitle field.',
          },
          utilities: {
            hint: 'public class GraduateStudent extends Student {\n  private String thesisTitle;\n  public GraduateStudent(String name, int age, double gpa, String thesisTitle) {\n    super(name, age, gpa);\n    this.thesisTitle = thesisTitle;\n  }\n}',
            flashcard: { front: 'What is the difference between this and super in Java?', back: 'this refers to current instance, used for instance fields and calling other constructors. super refers to parent class, used for parent fields/methods and calling parent constructor. Both must be first line in constructor.' },
            solution: 'public class GraduateStudent extends Student {\n  private String thesisTitle;\n  \n  public GraduateStudent(String name, int age, double gpa, String thesisTitle) {\n    super(name, age, gpa);\n    this.thesisTitle = thesisTitle;\n  }\n  \n  public String getThesisTitle() { return thesisTitle; }\n  public void setThesisTitle(String thesisTitle) { this.thesisTitle = thesisTitle; }\n  \n  @Override\n  public void printInfo() {\n    super.printInfo();\n    System.out.println("Thesis: " + thesisTitle);\n  }\n}',
          },
          rightPanel: { startingCode: '// Create GraduateStudent extending Student\n', expectedOutput: 'Inheritance example' },
        },
        {
          lessonId: 'java-09', title: 'Polymorphism & Overriding', type: 'practice', difficulty: 'intermediate', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Polymorphism means "many forms" — objects of different classes can be treated as objects of a common superclass. Method overriding: subclass provides specific implementation. Use @Override annotation (catches errors). Dynamic method dispatch: actual method called depends on object type at runtime. Enables flexible, extensible code. Abstract classes cannot be instantiated and may have abstract methods.',
            instructions: 'Create an Animal class with abstract makeSound() method, and Dog/Cat subclasses with specific implementations.',
          },
          utilities: {
            hint: 'abstract class Animal {\n  abstract void makeSound();\n}\nclass Dog extends Animal {\n  void makeSound() { System.out.println("Woof"); }\n}',
            flashcard: { front: 'What is the difference between overloading and overriding?', back: 'Overloading: same method name, different parameters (compile-time). Overriding: subclass provides new implementation of parent method (runtime). Overloading within class, overriding between parent-child.' },
            solution: 'abstract class Animal {\n  private String name;\n  \n  public Animal(String name) {\n    this.name = name;\n  }\n  \n  public String getName() { return name; }\n  \n  public abstract void makeSound();\n}\n\nclass Dog extends Animal {\n  public Dog(String name) { super(name); }\n  \n  @Override\n  public void makeSound() {\n    System.out.println(getName() + " says: Woof!");\n  }\n}\n\nclass Cat extends Animal {\n  public Cat(String name) { super(name); }\n  \n  @Override\n  public void makeSound() {\n    System.out.println(getName() + " says: Meow!");\n  }\n}\n\npublic class PolymorphismDemo {\n  public static void main(String[] args) {\n    Animal[] animals = {new Dog("Buddy"), new Cat("Whiskers")};\n    for (Animal animal : animals) {\n      animal.makeSound();\n    }\n  }\n}',
          },
          rightPanel: { startingCode: '// Create polymorphic animal hierarchy\n', expectedOutput: 'Polymorphism demonstration' },
        },
        {
          lessonId: 'java-10', title: 'Interfaces & Implementation', type: 'practice', difficulty: 'intermediate', track: 'java', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'Interfaces define contracts: public interface Drawable { void draw(); }. Classes implement interfaces: public class Circle implements Drawable { public void draw() { ... } }. A class can implement multiple interfaces (solves single inheritance limit). Interface methods are implicitly public abstract. Default methods (Java 8+) provide implementation. Enable polymorphism and loose coupling.',
            instructions: 'Create a Shape interface with getArea() method, and Circle/Rectangle classes implementing it.',
          },
          utilities: {
            hint: 'interface Shape {\n  double getArea();\n}\nclass Circle implements Shape {\n  private double radius;\n  public double getArea() { return Math.PI * radius * radius; }\n}',
            flashcard: { front: 'What is the difference between abstract class and interface?', back: 'Abstract class: can have state (fields), constructors, method implementations. Single inheritance. Interface: only method signatures (mostly), no state (except constants), multiple implementation. Use abstract for shared code, interface for contracts.' },
            solution: 'interface Shape {\n  double getArea();\n  double getPerimeter();\n}\n\nclass Circle implements Shape {\n  private double radius;\n  \n  public Circle(double radius) {\n    this.radius = radius;\n  }\n  \n  @Override\n  public double getArea() {\n    return Math.PI * radius * radius;\n  }\n  \n  @Override\n  public double getPerimeter() {\n    return 2 * Math.PI * radius;\n  }\n}\n\nclass Rectangle implements Shape {\n  private double length, width;\n  \n  public Rectangle(double length, double width) {\n    this.length = length;\n    this.width = width;\n  }\n  \n  @Override\n  public double getArea() {\n    return length * width;\n  }\n  \n  @Override\n  public double getPerimeter() {\n    return 2 * (length + width);\n  }\n}',
          },
          rightPanel: { startingCode: '// Create Shape interface and implementations\n', expectedOutput: 'Interface implementation' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'java-super-02', title: 'Exception Handling', type: 'supercharge', difficulty: 'advanced', track: 'java', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'Exceptions handle runtime errors. try block contains risky code. catch handles specific exceptions: catch (IOException e) { ... }. finally always executes (cleanup). throw exceptions: throw new IllegalArgumentException("Invalid input");. Custom exceptions: extend Exception or RuntimeException. Checked exceptions must be declared or caught. Unchecked (RuntimeException) are optional. Proper exception handling prevents crashes and provides meaningful error messages.',
            instructions: 'Create a method that validates age and throws IllegalArgumentException if invalid. Handle the exception in main.',
          },
          utilities: {
            hint: 'public static void setAge(int age) {\n  if (age < 0 || age > 150) {\n    throw new IllegalArgumentException("Invalid age");\n  }\n}\ntry {\n  setAge(-5);\n} catch (IllegalArgumentException e) {\n  System.out.println(e.getMessage());\n}',
            flashcard: { front: 'What is the difference between checked and unchecked exceptions?', back: 'Checked (IOException, SQLException): must be declared in throws or caught. Unchecked (RuntimeException, NullPointerException): optional. Checked exceptions force error handling, unchecked for programming errors.' },
            solution: 'public class ExceptionDemo {\n  public static void setAge(int age) {\n    if (age < 0 || age > 150) {\n      throw new IllegalArgumentException("Age must be between 0 and 150");\n    }\n    System.out.println("Age set to: " + age);\n  }\n  \n  public static void main(String[] args) {\n    try {\n      setAge(25);\n      setAge(-5);\n    } catch (IllegalArgumentException e) {\n      System.out.println("Error: " + e.getMessage());\n    } finally {\n      System.out.println("Validation complete");\n    }\n  }\n}',
          },
          rightPanel: { startingCode: '// Implement exception handling\n', expectedOutput: 'Exception handling with try-catch' },
        },
      ],
      sectionProject: {
        lessonId: 'java-project-2', title: 'Section Project: University Management System', type: 'project', difficulty: 'intermediate', track: 'java', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build a university management system using OOP principles. This project will demonstrate classes, inheritance, polymorphism, interfaces, and encapsulation.',
          instructions: 'Build a system with:\n  • Person base class with Student and Professor subclasses\n  • Course interface with different course types\n  • Enrollment management\n  • Grade calculation\n  • Proper encapsulation throughout',
        },
        utilities: {
          hint: 'Create abstract Person class. Student and Professor extend it. Create Course interface. Lecture and Lab implement Course. Use ArrayList for enrollments. Add validation in setters. Use polymorphism for processing different person types.',
          flashcard: { front: 'What makes a good OOP design?', back: 'Clear class hierarchy, proper use of inheritance (is-a), interfaces for contracts (can-do), encapsulation (private fields, public methods), polymorphism for flexibility, and single responsibility principle.' },
          solution: 'abstract class Person {\n  private String name;\n  private int id;\n  \n  public Person(String name, int id) {\n    this.name = name;\n    this.id = id;\n  }\n  \n  public String getName() { return name; }\n  public int getId() { return id; }\n  \n  public abstract String getRole();\n}\n\nclass Student extends Person {\n  private double gpa;\n  \n  public Student(String name, int id, double gpa) {\n    super(name, id);\n    this.gpa = gpa;\n  }\n  \n  public double getGpa() { return gpa; }\n  public void setGpa(double gpa) { this.gpa = gpa; }\n  \n  @Override\n  public String getRole() { return "Student"; }\n}\n\nclass Professor extends Person {\n  private String department;\n  \n  public Professor(String name, int id, String department) {\n    super(name, id);\n    this.department = department;\n  }\n  \n  public String getDepartment() { return department; }\n  \n  @Override\n  public String getRole() { return "Professor"; }\n}\n\ninterface Course {\n  String getCode();\n  String getName();\n  int getCredits();\n}\n\nclass Lecture implements Course {\n  private String code, name;\n  private int credits;\n  \n  public Lecture(String code, String name, int credits) {\n    this.code = code;\n    this.name = name;\n    this.credits = credits;\n  }\n  \n  public String getCode() { return code; }\n  public String getName() { return name; }\n  public int getCredits() { return credits; }\n}',
        },
        rightPanel: { startingCode: '// Build university management system\n', expectedOutput: 'Complete OOP system' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'java-capstone', title: 'Course Capstone: Banking System', type: 'project', difficulty: 'advanced', track: 'java', xpReward: 100,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build a complete banking system using all Java concepts learned. This capstone will demonstrate OOP principles, exception handling, collections, and production-ready patterns.',
      instructions: 'Build a banking system with:\n  • Account hierarchy (Savings, Checking)\n  • Transaction management\n  • Exception handling for invalid operations\n  • Collections for storing accounts\n  • Interface-based design\n  • Input validation',
    },
    utilities: {
      hint: 'Create abstract Account class. Savings and Checking extend it. Use Transaction interface. Implement deposit, withdraw, transfer. Add validation. Handle insufficient funds, invalid amounts. Use ArrayList for accounts. Create Bank class to manage.',
      flashcard: { front: 'What makes a production-ready Java application?', back: 'Proper exception handling, input validation, logging, thread safety (if needed), clear documentation, modular design, comprehensive testing, and following Java conventions and best practices.' },
      solution: 'abstract class Account {\n  protected String accountNumber;\n  protected double balance;\n  protected String owner;\n  \n  public Account(String accountNumber, String owner, double initialBalance) {\n    this.accountNumber = accountNumber;\n    this.owner = owner;\n    this.balance = initialBalance;\n  }\n  \n  public void deposit(double amount) {\n    if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");\n    balance += amount;\n  }\n  \n  public abstract void withdraw(double amount) throws InsufficientFundsException;\n  \n  public double getBalance() { return balance; }\n  public String getAccountNumber() { return accountNumber; }\n}\n\nclass InsufficientFundsException extends Exception {\n  public InsufficientFundsException(String message) {\n    super(message);\n  }\n}\n\nclass SavingsAccount extends Account {\n  private double interestRate;\n  \n  public SavingsAccount(String accountNumber, String owner, double initialBalance, double interestRate) {\n    super(accountNumber, owner, initialBalance);\n    this.interestRate = interestRate;\n  }\n  \n  @Override\n  public void withdraw(double amount) throws InsufficientFundsException {\n    if (amount > balance) {\n      throw new InsufficientFundsException("Insufficient funds");\n    }\n    balance -= amount;\n  }\n  \n  public void applyInterest() {\n    balance += balance * interestRate;\n  }\n}\n\nclass CheckingAccount extends Account {\n  private double overdraftLimit;\n  \n  public CheckingAccount(String accountNumber, String owner, double initialBalance, double overdraftLimit) {\n    super(accountNumber, owner, initialBalance);\n    this.overdraftLimit = overdraftLimit;\n  }\n  \n  @Override\n  public void withdraw(double amount) throws InsufficientFundsException {\n    if (amount > balance + overdraftLimit) {\n      throw new InsufficientFundsException("Exceeds overdraft limit");\n    }\n    balance -= amount;\n  }\n}',
    },
    rightPanel: { startingCode: '// Build complete banking system\n', expectedOutput: 'Production-ready banking system' },
  },
  totalLessons: 10,
  totalXP: 300,
};
