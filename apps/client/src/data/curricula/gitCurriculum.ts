import type { Course } from '../../types/curriculum';

export const pythonCourse: Course = {
  id: 'py1',
  title: 'Python',
  tagline: 'Learn programming fundamentals with the world\'s most versatile language',
  philosophy: 'Python is taught through hands-on exercises that build real skills from day one — variables, logic, and problem solving.',
  icon: '🐍',
  color: 'from-yellow-600 to-yellow-800',
  level: 'BEGINNER',
  pillar: 'Data Science',
  xp: 600,
  sections: [
    {
      sectionId: 'python-section-1',
      title: 'Section 1: Python Fundamentals',
      learningObjective: 'Master the core concepts of Python programming including variables, data types, and basic operations.',
      order: 1,
      isLocked: false, // First section is always unlocked
      xpReward: 150,
      keyConcepts: ['Variables', 'Strings', 'Numbers', 'Data Types', 'Input/Output', 'Basic Math'],
      estimatedMinutes: 45,
      lessons: [
        {
          lessonId: 'py-fund-01', title: 'Welcome to Python', type: 'learn', difficulty: 'beginner', track: 'python', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'Python was created by Guido van Rossum in the late 1980s and officially released in 1991. He named the language after the British comedy show \'Monty Python\'s Flying Circus\' — not the snake. Python\'s defining feature is readability. Most languages rely on curly braces and semicolons to define structure, but Python uses indentation instead, which forces code to be written in a clean, consistent way that almost reads like plain English. To talk to the computer in Python, we use functions — small reusable blocks of instructions. The very first function nearly every programmer learns is print(), which simply displays text on the screen.',
            instructions: 'In the code editor, type: print(\'Hello World\'). Make sure the text is wrapped in single quotes and the parentheses are closed. Click Run to execute your code and check the terminal for the output.',
          },
          utilities: {
            hint: 'The print() function takes whatever is inside its parentheses and displays it. If you\'re printing text, that text must be wrapped in quotes — either single or double.',
            flashcard: { front: 'Why is Python named \'Python\' if it has nothing to do with snakes?', back: 'Guido van Rossum, Python\'s creator, was a fan of the British comedy series \'Monty Python\'s Flying Circus\' and named the language after the show — not the reptile.' },
            solution: "print('Hello World')",
          },
          rightPanel: { startingCode: '# Lesson 1: Introduction & Printing\n# Use print() to display \'Hello World\'\n\n', expectedOutput: 'Hello World' },
        },
        {
          lessonId: 'py-fund-02', title: 'Variables & Storing Strings', type: 'learn', difficulty: 'beginner', track: 'python', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'A variable is a named container that stores a value you can reuse throughout your program. Think of it like a labeled box: you put something inside it once, and from then on you can refer to it by its label instead of retyping the value every time. In Python, creating a variable is simple — you write a name, an equals sign, and the value you want to store. Text values like this are called strings, and they must always be wrapped in quotes so Python knows where the text begins and ends.',
            instructions: 'Create a variable called name and assign it your own name as a string, e.g. name = \'Munira\'. On the next line, use print(name) to display the value stored inside that variable.',
          },
          utilities: {
            hint: 'When you print() a variable, you do NOT put quotes around the variable name in the print statement. print(name) prints the value stored inside name — print(\'name\') would just print the literal word \'name\'.',
            flashcard: { front: 'Can a Python variable name start with a number, like 1name?', back: 'No. Python variable names cannot start with a number. They must start with a letter or an underscore, and they are case-sensitive.' },
            solution: "name = 'Munira'\nprint(name)",
          },
          rightPanel: { startingCode: '# Lesson 2: Variables & Strings\n# Create a variable and print its value\n\n', expectedOutput: 'Munira' },
        },
        {
          lessonId: 'py-fund-03', title: 'Numbers & Basic Math', type: 'learn', difficulty: 'beginner', track: 'python', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'Python supports two main types of numbers: integers (whole numbers like 5, -3, or 1000) and floats (decimal numbers like 3.14 or 2.5). Unlike strings, numbers are never wrapped in quotes — if you put quotes around a number, Python treats it as text and you can\'t do math on it. Python supports all the standard math operators: + for addition, - for subtraction, * for multiplication, / for division, and ** for exponents.',
            instructions: 'Create two variables, a and b, and assign them any whole numbers (for example a = 10 and b = 5). Create a third variable called total that adds a and b together. Print the value of total.',
          },
          utilities: {
            hint: 'Make sure a and b are written without quotes — they need to be actual numbers, not text, or Python won\'t be able to add them together mathematically.',
            flashcard: { front: 'What\'s the difference between an int and a float in Python?', back: 'An int is a whole number with no decimal point (like 7 or -2), while a float is a number that includes a decimal point (like 7.0 or 3.14).' },
            solution: 'a = 10\nb = 5\ntotal = a + b\nprint(total)',
          },
          rightPanel: { startingCode: '# Lesson 3: Numbers & Basic Math\n# Add two numbers together and print the result\n\n', expectedOutput: '15' },
        },
        {
          lessonId: 'py-fund-04', title: 'Getting User Input', type: 'practice', difficulty: 'beginner', track: 'python', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'So far, every value in your programs has been written directly into the code. But real programs usually need to react to what a person types while the program is running. Python\'s input() function pauses your program, waits for the user to type something and press Enter, and then returns whatever they typed as a string. One very important detail: input() always returns a string, even if the user types a number.',
            instructions: 'Use input() to ask the user \'What is your name? \' and store their answer in a variable called user_name. Then print a greeting that includes their name, like print(\'Hello, \' + user_name).',
          },
          utilities: {
            hint: 'You can combine strings using the + operator. \'Hello, \' + user_name joins the text \'Hello, \' directly with whatever is stored in user_name.',
            flashcard: { front: 'If a user types the number 25 into an input() prompt, what data type does Python store it as?', back: 'A string. input() always returns text, even if it looks like a number. To use it in math, you would need to convert it using int() or float().' },
            solution: "user_name = input('What is your name? ')\nprint('Hello, ' + user_name)",
          },
          rightPanel: { startingCode: '# Lesson 4: User Input\n# Ask for the user\'s name and greet them\n\n', expectedOutput: 'Hello, Munira' },
        },
        {
          lessonId: 'py-fund-05', title: 'Data Types Challenge', type: 'practice', difficulty: 'beginner', track: 'python', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'It\'s time to bring together everything you\'ve learned: printing text, creating variables, working with numbers, and combining strings. In this challenge, you\'ll build a small program that calculates something useful — a simple age-in-months converter. Pay close attention to combining numbers and text together in a single print statement.',
            instructions: 'Create a variable age_years and set it to 20. Calculate the equivalent number of months by multiplying age_years by 12, storing the result in a variable called age_months. Print a sentence using commas inside print(), like: print(\'You are\', age_months, \'months old.\')',
          },
          utilities: {
            hint: 'When you separate values with commas inside print(), Python automatically adds a space between each item and converts numbers to text for you.',
            flashcard: { front: 'What happens if you try to use + to combine a string and a number directly, like print(\'Age: \' + 25)?', back: 'Python raises a TypeError, because + cannot directly join a string and an integer. You\'d need to either convert the number with str(25) first, or use a comma inside print() instead.' },
            solution: "age_years = 20\nage_months = age_years * 12\nprint('You are', age_months, 'months old.')",
          },
          rightPanel: { startingCode: '# Lesson 5: Data Types Challenge\n# Convert age in years to age in months\n\n', expectedOutput: 'You are 240 months old.' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'py-super-01', title: 'String Formatting with f-strings', type: 'supercharge', difficulty: 'intermediate', track: 'python', xpReward: 40,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'Python 3.6 introduced f-strings (formatted string literals), the most powerful and readable way to embed expressions inside string literals. An f-string is created by prefixing a string with the letter \'f\' and using curly braces {} to embed expressions. F-strings support any valid Python expression, including function calls and arithmetic operations.',
            instructions: 'Use an f-string to create a greeting. Create variables name = \'Munira\' and level = 5. Print a message like: f\'Player {name} is at level {level}\'',
          },
          utilities: {
            hint: 'F-strings start with the letter f before the opening quote: f"Your text {variable} more text". You can put any expression inside the curly braces.',
            flashcard: { front: 'What makes f-strings better than .format() or % formatting?', back: 'F-strings are faster, more readable, and support arbitrary expressions directly in the string. They also handle debugging with f"{var=}" which prints both the variable name and its value.' },
            solution: "name = 'Munira'\nlevel = 5\nprint(f'Player {name} is at level {level}')",
          },
          rightPanel: { startingCode: '# Supercharge: f-strings\n# Use f-string formatting to embed variables\n\n', expectedOutput: 'Player Munira is at level 5' },
        },
      ],
      sectionProject: {
        lessonId: 'py-project-1', title: 'Section Project: Personal Info Card', type: 'project', difficulty: 'beginner', track: 'python', xpReward: 50,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Combine all the fundamentals you\'ve learned to build a personal information card generator. This project will use variables, strings, numbers, input, and formatted output to create a simple but useful program.',
          instructions: 'Build a program that:\n  • Asks the user for their name, age, and favorite color\n  • Calculates their age in months\n  • Prints a formatted info card with all the data\n  • Uses f-strings for clean formatting',
        },
        utilities: {
          hint: 'Use input() for name and color, int() for age conversion. Store all values in variables, then use a single print() with an f-string to display the formatted card.',
          flashcard: { front: 'Why is it important to convert user input with int() before doing math?', back: 'input() always returns a string. If you try to do math on a string like "20", Python will raise a TypeError. Converting with int() turns it into a number you can calculate with.' },
          solution: "name = input('What is your name? ')\nage = int(input('What is your age? '))\ncolor = input('What is your favorite color? ')\nage_months = age * 12\nprint(f'=== INFO CARD ===')\nprint(f'Name: {name}')\nprint(f'Age: {age} ({age_months} months)')\nprint(f'Favorite Color: {color}')\nprint(f'=================')",
        },
        rightPanel: { startingCode: '# Section Project: Personal Info Card\n# Ask for user info and display a formatted card\n\n', expectedOutput: '=== INFO CARD ===\nName: Munira\nAge: 20 (240 months)\nFavorite Color: blue\n=================' },
      },
    },
    {
      sectionId: 'python-section-2',
      title: 'Section 2: Data Science Fundamentals',
      learningObjective: 'Learn the essential data science libraries: NumPy for numerical computing and Pandas for data manipulation.',
      order: 2,
      isLocked: true, // Computed dynamically based on Section 1 completion
      xpReward: 250,
      keyConcepts: ['NumPy Arrays', 'Matrix Operations', 'Pandas DataFrames', 'Data Cleaning', 'Boolean Indexing', 'Vectorized Operations'],
      estimatedMinutes: 60,
      lessons: [
        {
          lessonId: 'py-ds-01', title: 'Introduction to NumPy', type: 'learn', difficulty: 'intermediate', track: 'python', xpReward: 50,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'NumPy (Numerical Python) is the foundational library for numerical computing in Python, and nearly every data science and machine learning library — including Pandas, Scikit-learn, and TensorFlow — is built on top of it. The core object in NumPy is the ndarray (n-dimensional array). Unlike a regular Python list, a NumPy array is optimized for fast, vectorized mathematical operations across large amounts of data.',
            instructions: 'Import NumPy with the standard alias: import numpy as np. Create a 1-dimensional array called arr from the list [1, 2, 3, 4, 5] using np.array(). Print the array, then print arr.shape on the next line to see its dimensions.',
          },
          utilities: {
            hint: 'np.array() takes a Python list as its argument. The .shape attribute (no parentheses) returns a tuple describing the array\'s dimensions — for a 1D array of 5 elements, it will show (5,).',
            flashcard: { front: 'Why are NumPy arrays faster than regular Python lists for numerical operations?', back: 'NumPy arrays store data in contiguous blocks of memory using a single, fixed data type, and operations are executed using highly optimized, low-level C code.' },
            solution: 'import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nprint(arr)\nprint(arr.shape)',
          },
          rightPanel: { startingCode: '# Lesson 1: Introduction to NumPy\n# Create and inspect a 1D array\n\n', expectedOutput: '[1 2 3 4 5]\n(5,)' },
        },
        {
          lessonId: 'py-ds-02', title: 'NumPy Matrix Operations', type: 'learn', difficulty: 'intermediate', track: 'python', xpReward: 50,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Beyond simple 1D arrays, NumPy excels at working with matrices — 2-dimensional arrays organized into rows and columns. You create a 2D array by passing a list of lists into np.array(), where each inner list becomes a row. You can filter datasets using boolean conditions directly on arrays — for example, matrix[matrix > 5] returns only the elements greater than 5.',
            instructions: 'Create a 2D array called matrix from the nested list [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. Print the full matrix. On the next line, use boolean indexing to print only the values greater than 5.',
          },
          utilities: {
            hint: 'Boolean indexing works by placing a condition directly inside the square brackets: matrix[matrix > 5]. NumPy evaluates the condition for every element and returns only the ones where the condition is True.',
            flashcard: { front: 'What does the slice matrix[:, 0] return on a 2D NumPy array?', back: 'It returns the entire first column of the matrix (index 0), across all rows. The colon before the comma means \'select all rows\', and the 0 after the comma means \'only column index 0\'.' },
            solution: 'import numpy as np\n\nmatrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(matrix)\nprint(matrix[matrix > 5])',
          },
          rightPanel: { startingCode: '# Lesson 2: NumPy Matrix Operations\n# Create a matrix and filter it with boolean indexing\n\n', expectedOutput: '[[1 2 3]\n [4 5 6]\n [7 8 9]]\n[6 7 8 9]' },
        },
        {
          lessonId: 'py-ds-03', title: 'Introduction to Pandas', type: 'learn', difficulty: 'intermediate', track: 'python', xpReward: 50,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'While NumPy handles raw numerical arrays, Pandas builds on top of it to provide labeled, tabular data structures. The core object in Pandas is the DataFrame — essentially a spreadsheet-like table with labeled rows and columns. You typically create a DataFrame from a Python dictionary, where each key becomes a column name and each value (a list) becomes that column\'s data.',
            instructions: 'Import Pandas with the standard alias: import pandas as pd. Create a dictionary called data with three keys: \'username\', \'minutes_studied\', and \'xp_earned\', each mapping to a list of 3 values. Convert it into a DataFrame called df using pd.DataFrame(data), then print df.',
          },
          utilities: {
            hint: 'Each key in your dictionary must map to a list of the SAME length — if you have 3 usernames, you need exactly 3 corresponding values in each of the other lists.',
            flashcard: { front: 'What is the difference between a Pandas Series and a Pandas DataFrame?', back: 'A Series is a single labeled column of data (essentially a 1D array with an index), while a DataFrame is a full table made up of multiple Series objects combined together.' },
            solution: "import pandas as pd\n\ndata = {\n    'username': ['munira04', 'fox_coder', 'panda_py'],\n    'minutes_studied': [45, 30, 60],\n    'xp_earned': [120, 80, 150]\n}\ndf = pd.DataFrame(data)\nprint(df)",
          },
          rightPanel: { startingCode: '# Lesson 3: Introduction to Pandas\n# Build a DataFrame of mock user activity\n\n', expectedOutput: '   username  minutes_studied  xp_earned\n0  munira04               45        120\n1  fox_coder               30         80\n2  panda_py                60        150' },
        },
        {
          lessonId: 'py-ds-04', title: 'Pandas Data Cleaning', type: 'practice', difficulty: 'intermediate', track: 'python', xpReward: 50,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Real-world datasets are almost never perfectly clean. In Pandas, missing values are represented as NaN. You can detect them using .isnull(), drop incomplete rows with .dropna(), or fill gaps with .fillna(). Choosing between these depends on context — dropping rows is appropriate when missing data is rare, while filling values preserves every row.',
            instructions: 'Create a DataFrame with a missing value: data = {\'username\': [\'munira04\', \'fox_coder\', \'panda_py\'], \'minutes_studied\': [45, None, 60]}. Use df[\'minutes_studied\'].fillna(0) to replace the missing value with 0, storing the result back into the same column. Print the cleaned DataFrame.',
          },
          utilities: {
            hint: 'To overwrite a column with its cleaned version, assign the result back: df[\'minutes_studied\'] = df[\'minutes_studied\'].fillna(0). Without reassigning it, fillna() returns a new Series but doesn\'t change the original DataFrame.',
            flashcard: { front: 'What\'s the key difference between .dropna() and .fillna() in Pandas?', back: '.dropna() removes entire rows that contain any missing values, reducing your dataset size. .fillna(value) replaces missing values with a value you specify, keeping every row intact.' },
            solution: "import pandas as pd\n\ndata = {\n    'username': ['munira04', 'fox_coder', 'panda_py'],\n    'minutes_studied': [45, None, 60]\n}\ndf = pd.DataFrame(data)\ndf['minutes_studied'] = df['minutes_studied'].fillna(0)\nprint(df)",
          },
          rightPanel: { startingCode: '# Lesson 4: Pandas Data Cleaning\n# Fill missing values in a DataFrame\n\n', expectedOutput: '   username  minutes_studied\n0  munira04             45.0\n1  fox_coder              0.0\n2  panda_py             60.0' },
        },
        {
          lessonId: 'py-ds-05', title: 'Matplotlib Visualization', type: 'practice', difficulty: 'intermediate', track: 'python', xpReward: 50,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'Matplotlib is Python\'s foundational plotting library. The most basic chart type is the line plot, created using plt.plot(x_values, y_values). You can label your axes with plt.xlabel() and plt.ylabel(), give your chart a title with plt.title(), and render it with plt.show().',
            instructions: 'Import matplotlib.pyplot as plt. Create two lists: sessions = [1, 2, 3, 4, 5] and xp = [50, 120, 180, 260, 310]. Plot xp against sessions using plt.plot(sessions, xp). Add the title \'XP Growth Over Sessions\', then print(\'Plot generated successfully\').',
          },
          utilities: {
            hint: 'In a real coding environment, plt.show() would open a window displaying your chart. Since our terminal is text-based, we confirm success with a print statement instead.',
            flashcard: { front: 'What is the relationship between Matplotlib and Pandas/Seaborn?', back: 'Matplotlib is the foundational, lower-level plotting library. Pandas has built-in plotting shortcuts that call Matplotlib under the hood, and Seaborn is a higher-level library built entirely on top of Matplotlib.' },
            solution: 'import matplotlib.pyplot as plt\n\nsessions = [1, 2, 3, 4, 5]\nxp = [50, 120, 180, 260, 310]\nplt.plot(sessions, xp)\nplt.title(\'XP Growth Over Sessions\')\nprint(\'Plot generated successfully\')',
          },
          rightPanel: { startingCode: '# Lesson 5: Matplotlib Visualization\n# Plot XP growth across study sessions\n\n', expectedOutput: 'Plot generated successfully' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'py-super-02', title: 'Pandas GroupBy Operations', type: 'supercharge', difficulty: 'advanced', track: 'python', xpReward: 60,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'GroupBy is one of Pandas\' most powerful features for data analysis. It allows you to split data into groups based on some criteria, apply a function to each group independently, and combine the results. This is similar to SQL\'s GROUP BY clause and is essential for aggregating data by categories.',
            instructions: 'Create a DataFrame with user data including a \'level\' column. Use df.groupby(\'level\')[\'xp\'].mean() to calculate the average XP per level. Print the result.',
          },
          utilities: {
            hint: 'GroupBy follows the split-apply-combine pattern: df.groupby(column) splits the data, .mean() applies the aggregation function, and the result is automatically combined.',
            flashcard: { front: 'What is the split-apply-combine pattern in Pandas GroupBy?', back: 'Split: divide data into groups based on a key. Apply: perform a function (sum, mean, count, etc.) on each group. Combine: merge the results back into a single DataFrame or Series.' },
            solution: "import pandas as pd\n\ndata = {\n    'username': ['munira04', 'fox_coder', 'panda_py', 'dev_kate'],\n    'level': [3, 2, 4, 3],\n    'xp': [120, 80, 150, 110]\n}\ndf = pd.DataFrame(data)\nprint(df.groupby('level')['xp'].mean())",
          },
          rightPanel: { startingCode: '# Supercharge: Pandas GroupBy\n# Group data by level and calculate average XP\n\n', expectedOutput: 'level\n2     80.0\n3    115.0\n4    150.0\nName: xp, dtype: float64' },
        },
      ],
      sectionProject: {
        lessonId: 'py-project-2', title: 'Section Project: Data Analysis Dashboard', type: 'project', difficulty: 'intermediate', track: 'python', xpReward: 80,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build a complete data analysis pipeline using NumPy, Pandas, and Matplotlib. You\'ll create mock user activity data, clean it, analyze it with aggregations, and visualize the results.',
          instructions: 'Build a data analysis dashboard:\n  • Create a DataFrame with user activity data (username, level, xp, minutes_studied)\n  • Add some missing values and clean them\n  • Calculate statistics: average XP per level, total XP, top users\n  • Create a simple visualization of XP distribution',
        },
        utilities: {
          hint: 'Start by creating a dictionary with lists of data. Use pd.DataFrame() to convert it. Add None values for missing data, then use fillna(). Use groupby() for aggregations and matplotlib for plotting.',
          flashcard: { front: 'What are the key steps in a data analysis pipeline?', back: '1. Data collection/import 2. Data cleaning (handling missing values, outliers) 3. Exploratory analysis (statistics, aggregations) 4. Visualization 5. Insights/conclusions. Pandas and NumPy handle steps 2-3, Matplotlib handles step 4.' },
          solution: "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\ndata = {\n    'username': ['munira04', 'fox_coder', 'panda_py', 'dev_kate', 'code_ninja'],\n    'level': [3, 2, 4, 3, 5],\n    'xp': [120, 80, 150, 110, 200],\n    'minutes_studied': [45, 30, 60, 40, None]\n}\ndf = pd.DataFrame(data)\ndf['minutes_studied'] = df['minutes_studied'].fillna(df['minutes_studied'].mean())\n\nprint('=== DATA ANALYSIS DASHBOARD ===')\nprint(f'Total Users: {len(df)}')\nprint(f'Total XP: {df[\"xp\"].sum()}')\nprint(f'Average XP per Level:')\nprint(df.groupby('level')['xp'].mean())\nprint(f'\\nTop 3 Users by XP:')\nprint(df.nlargest(3, 'xp')[['username', 'xp']])\n\nplt.bar(df['username'], df['xp'])\nplt.title('XP by User')\nplt.xticks(rotation=45)\nprint('Visualization created successfully')",
        },
        rightPanel: { startingCode: '# Section Project: Data Analysis Dashboard\n# Build complete analysis pipeline with NumPy, Pandas, Matplotlib\n\n', expectedOutput: '=== DATA ANALYSIS DASHBOARD ===\nTotal Users: 5\nTotal XP: 660\nAverage XP per Level:\nlevel\n2     80.0\n3    115.0\n4    150.0\n5    200.0\nName: xp, dtype: float64\n\nTop 3 Users by XP:\n   username   xp\n4  code_ninja  200\n2   panda_py  150\n0   munira04  120\n\nVisualization created successfully' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'py-capstone', title: 'Course Capstone: AcademicQuest Analytics System', type: 'project', difficulty: 'advanced', track: 'python', xpReward: 200,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build a complete analytics system for AcademicQuest that combines everything learned: fundamentals, data structures, NumPy, Pandas, and visualization. This capstone project simulates a real data science workflow.',
      instructions: 'Build the AcademicQuest Analytics System:\n  • Generate mock user data (names, XP, levels, study time, completion rates)\n  • Store data in NumPy arrays and Pandas DataFrames\n  • Clean and preprocess the data\n  • Perform statistical analysis (averages, correlations, distributions)\n  • Create multiple visualizations (bar charts, line plots, histograms)\n  • Generate a summary report with key insights\n  • Save results to a CSV file',
    },
    utilities: {
      hint: 'Use NumPy for generating random data. Use Pandas for all data manipulation. Use Matplotlib for all visualizations. Structure your code with functions for each step: generate_data(), clean_data(), analyze_data(), visualize_data(), generate_report().',
      flashcard: { front: 'What makes a complete data science project production-ready?', back: 'A production-ready project has: clear data sources, reproducible data generation, robust data cleaning, comprehensive analysis, meaningful visualizations, actionable insights, proper documentation, and modular code structure. The capstone combines all these elements.' },
      solution: "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\n\ndef generate_data(n=100):\n    names = [f'user_{i}' for i in range(n)]\n    xp = np.random.randint(50, 500, n)\n    levels = np.random.randint(1, 6, n)\n    study_minutes = np.random.randint(10, 120, n)\n    completion_rate = np.random.uniform(0.3, 1.0, n)\n    return pd.DataFrame({\n        'username': names,\n        'xp': xp,\n        'level': levels,\n        'study_minutes': study_minutes,\n        'completion_rate': completion_rate\n    })\n\ndef clean_data(df):\n    df['study_minutes'] = df['study_minutes'].fillna(df['study_minutes'].mean())\n    df = df[df['completion_rate'] > 0]\n    return df\n\ndef analyze_data(df):\n    stats = {\n        'total_users': len(df),\n        'total_xp': df['xp'].sum(),\n        'avg_xp': df['xp'].mean(),\n        'avg_study_time': df['study_minutes'].mean(),\n        'avg_completion': df['completion_rate'].mean(),\n        'xp_level_corr': df['xp'].corr(df['level'])\n    }\n    return stats\n\ndef visualize_data(df):\n    fig, axes = plt.subplots(2, 2, figsize=(12, 10))\n    \n    axes[0, 0].bar(df['level'], df.groupby('level')['xp'].mean())\n    axes[0, 0].set_title('Average XP by Level')\n    \n    axes[0, 1].hist(df['xp'], bins=20)\n    axes[0, 1].set_title('XP Distribution')\n    \n    axes[1, 0].scatter(df['study_minutes'], df['xp'])\n    axes[1, 0].set_title('Study Time vs XP')\n    axes[1, 0].set_xlabel('Study Minutes')\n    axes[1, 0].set_ylabel('XP')\n    \n    axes[1, 1].pie(df['level'].value_counts(), labels=df['level'].unique())\n    axes[1, 1].set_title('User Distribution by Level')\n    \n    plt.tight_layout()\n    print('Visualizations created')\n\ndef generate_report(df, stats):\n    report = f'''=== ACADEMICQUEST ANALYTICS REPORT ===\nTotal Users: {stats['total_users']}\nTotal XP Earned: {stats['total_xp']}\nAverage XP per User: {stats['avg_xp']:.2f}\nAverage Study Time: {stats['avg_study_time']:.2f} minutes\nAverage Completion Rate: {stats['avg_completion']:.2%}\nXP-Level Correlation: {stats['xp_level_corr']:.2f}\n========================================'''\n    print(report)\n    return report\n\ndf = generate_data(100)\ndf = clean_data(df)\nstats = analyze_data(df)\nvisualize_data(df)\nreport = generate_report(df, stats)\n\ndf.to_csv('academicquest_analytics.csv', index=False)\nprint('Data saved to academicquest_analytics.csv')",
    },
    rightPanel: { startingCode: '# Course Capstone: AcademicQuest Analytics System\n# Build complete analytics pipeline with data generation, cleaning, analysis, and visualization\n\n', expectedOutput: '=== ACADEMICQUEST ANALYTICS REPORT ===\nTotal Users: 100\nTotal XP Earned: 27452\nAverage XP per User: 274.52\nAverage Study Time: 64.23 minutes\nAverage Completion Rate: 64.88%\nXP-Level Correlation: 0.97\n========================================\nVisualizations created\nData saved to academicquest_analytics.csv' },
  },
  totalLessons: 10,
  totalXP: 600,
};
