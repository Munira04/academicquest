export const pythonFundamentals = [
  {
    lessonId: "py-fund-01",
    title: "01. Welcome to Python",
    difficulty: "beginner",
    track: "python-fundamentals",
    leftPanel: {
      chapterProgress: "Chapter 01 — 0% complete",
      conceptText: "Python was created by Guido van Rossum in the late 1980s and officially released in 1991. He named the language after the British comedy show 'Monty Python's Flying Circus' — not the snake. Python's defining feature is readability. Most languages rely on curly braces and semicolons to define structure, but Python uses indentation instead, which forces code to be written in a clean, consistent way that almost reads like plain English. This is one of the reasons Python is the most commonly recommended first language for new programmers. To talk to the computer in Python, we use functions — small reusable blocks of instructions. The very first function nearly every programmer learns is print(), which simply displays text on the screen. Whenever you want your program to communicate something to the person running it, print() is usually how you do it.",
      instructions: "In the code editor on the right, type the following on a new line: print('Hello World'). Make sure the text is wrapped in single quotes and the parentheses are closed. Then click Run to execute your code and check the terminal for the output. Once you see 'Hello World' printed correctly, click Submit Answer to complete this lesson."
    },
    utilities: {
      hint: "The print() function takes whatever is inside its parentheses and displays it. If you're printing text (not a number), that text must be wrapped in quotes — either single or double. Don't forget to close both the quotes and the parentheses.",
      flashcard: {
        front: "Why is Python named 'Python' if it has nothing to do with snakes?",
        back: "Guido van Rossum, Python's creator, was a fan of the British comedy series 'Monty Python's Flying Circus' and named the language after the show — not the reptile."
      },
      solution: "print('Hello World')"
    },
    rightPanel: {
      startingCode: "# Lesson 1: Introduction & Printing\n# Use print() to display 'Hello World'\n\n",
      expectedOutput: "Hello World"
    }
  },
  {
    lessonId: "py-fund-02",
    title: "02. Variables & Storing Strings",
    difficulty: "beginner",
    track: "python-fundamentals",
    leftPanel: {
      chapterProgress: "Chapter 02 — 20% complete",
      conceptText: "A variable is a named container that stores a value you can reuse throughout your program. Think of it like a labeled box: you put something inside it once, and from then on you can refer to it by its label instead of retyping the value every time. In Python, creating a variable is simple — you write a name, an equals sign, and the value you want to store. Text values like this are called strings, and they must always be wrapped in quotes so Python knows where the text begins and ends. Unlike many other programming languages, Python does not require you to declare what type of data a variable will hold ahead of time — it figures that out automatically based on the value you assign.",
      instructions: "Create a variable called name and assign it your own name as a string, e.g. name = 'Munira'. On the next line, use print(name) to display the value stored inside that variable. Run your code to see it print, then submit your answer."
    },
    utilities: {
      hint: "When you print() a variable, you do NOT put quotes around the variable name in the print statement. print(name) prints the value stored inside name — print('name') would just print the literal word 'name'.",
      flashcard: {
        front: "Can a Python variable name start with a number, like 1name?",
        back: "No. Python variable names cannot start with a number. They must start with a letter or an underscore, and they are case-sensitive, meaning Name and name are treated as two completely different variables."
      },
      solution: "name = 'Munira'\nprint(name)"
    },
    rightPanel: {
      startingCode: "# Lesson 2: Variables & Strings\n# Create a variable and print its value\n\n",
      expectedOutput: "Munira"
    }
  },
  {
    lessonId: "py-fund-03",
    title: "03. Numbers & Basic Math",
    difficulty: "beginner",
    track: "python-fundamentals",
    leftPanel: {
      chapterProgress: "Chapter 03 — 40% complete",
      conceptText: "Python supports two main types of numbers: integers (whole numbers like 5, -3, or 1000) and floats (decimal numbers like 3.14 or 2.5). Unlike strings, numbers are never wrapped in quotes — if you put quotes around a number, Python treats it as text and you can't do math on it. Python supports all the standard math operators: + for addition, - for subtraction, * for multiplication, / for division, and ** for exponents.",
      instructions: "Create two variables, a and b, and assign them any whole numbers (for example a = 10 and b = 5). Create a third variable called total that adds a and b together. Print the value of total. Run your code, confirm the correct number appears, then submit your answer."
    },
    utilities: {
      hint: "Make sure a and b are written without quotes — they need to be actual numbers, not text, or Python won't be able to add them together mathematically.",
      flashcard: {
        front: "What's the difference between an int and a float in Python?",
        back: "An int is a whole number with no decimal point (like 7 or -2), while a float is a number that includes a decimal point (like 7.0 or 3.14). Python automatically chooses which type to use based on how you write the number."
      },
      solution: "a = 10\nb = 5\ntotal = a + b\nprint(total)"
    },
    rightPanel: {
      startingCode: "# Lesson 3: Numbers & Basic Math\n# Add two numbers together and print the result\n\n",
      expectedOutput: "15"
    }
  },
  {
    lessonId: "py-fund-04",
    title: "04. Getting User Input",
    difficulty: "beginner",
    track: "python-fundamentals",
    leftPanel: {
      chapterProgress: "Chapter 04 — 60% complete",
      conceptText: "So far, every value in your programs has been written directly into the code. But real programs usually need to react to what a person types while the program is running. Python's input() function pauses your program, waits for the user to type something and press Enter, and then returns whatever they typed as a string. One very important detail: input() always returns a string, even if the user types a number.",
      instructions: "Use input() to ask the user 'What is your name? ' and store their answer in a variable called user_name. Then print a greeting that includes their name, like print('Hello, ' + user_name). Since this is a simulated terminal, your code will be tested with the name 'Munira' automatically."
    },
    utilities: {
      hint: "You can combine strings using the + operator. 'Hello, ' + user_name joins the text 'Hello, ' directly with whatever is stored in user_name.",
      flashcard: {
        front: "If a user types the number 25 into an input() prompt, what data type does Python store it as?",
        back: "A string. input() always returns text, even if it looks like a number. To use it in math, you would need to convert it using int(your_variable) or float(your_variable)."
      },
      solution: "user_name = input('What is your name? ')\nprint('Hello, ' + user_name)"
    },
    rightPanel: {
      startingCode: "# Lesson 4: User Input\n# Ask for the user's name and greet them\n\n",
      expectedOutput: "Hello, Munira"
    }
  },
  {
    lessonId: "py-fund-05",
    title: "05. Data Types Challenge",
    difficulty: "beginner",
    track: "python-fundamentals",
    leftPanel: {
      chapterProgress: "Chapter 05 — 80% complete",
      conceptText: "It's time to bring together everything you've learned: printing text, creating variables, working with numbers, and combining strings. In this challenge, you'll build a small program that calculates something useful — a simple age-in-months converter. Pay close attention to combining numbers and text together in a single print statement — you can separate items with commas inside print() which handles the conversion for you automatically.",
      instructions: "Create a variable age_years and set it to 20. Calculate the equivalent number of months by multiplying age_years by 12, storing the result in a variable called age_months. Print a sentence using commas inside print(), like: print('You are', age_months, 'months old.')"
    },
    utilities: {
      hint: "When you separate values with commas inside print(), Python automatically adds a space between each item and converts numbers to text for you.",
      flashcard: {
        front: "What happens if you try to use + to combine a string and a number directly, like print('Age: ' + 25)?",
        back: "Python raises a TypeError, because + cannot directly join a string and an integer. You'd need to either convert the number with str(25) first, or use a comma inside print() instead."
      },
      solution: "age_years = 20\nage_months = age_years * 12\nprint('You are', age_months, 'months old.')"
    },
    rightPanel: {
      startingCode: "# Lesson 5: Data Types Challenge\n# Convert age in years to age in months\n\n",
      expectedOutput: "You are 240 months old."
    }
  }
];

export const pythonDataScience = [
  {
    lessonId: "py-ds-01",
    title: "01. Introduction to NumPy",
    difficulty: "advanced",
    track: "python-data-science",
    leftPanel: {
      chapterProgress: "Chapter 01 — 0% complete",
      conceptText: "NumPy (Numerical Python) is the foundational library for numerical computing in Python, and nearly every data science and machine learning library — including Pandas, Scikit-learn, and TensorFlow — is built on top of it. The core object in NumPy is the ndarray (n-dimensional array). Unlike a regular Python list, a NumPy array is optimized for fast, vectorized mathematical operations across large amounts of data. One of NumPy's biggest advantages is vectorized math: instead of writing a loop to add 1 to every number in a list, you can simply write array + 1, and NumPy applies that operation to every element instantly.",
      instructions: "Import NumPy with the standard alias: import numpy as np. Create a 1-dimensional array called arr from the list [1, 2, 3, 4, 5] using np.array(). Print the array, then print arr.shape on the next line to see its dimensions."
    },
    utilities: {
      hint: "np.array() takes a Python list as its argument. The .shape attribute (no parentheses) returns a tuple describing the array's dimensions — for a 1D array of 5 elements, it will show (5,).",
      flashcard: {
        front: "Why are NumPy arrays faster than regular Python lists for numerical operations?",
        back: "NumPy arrays store data in contiguous blocks of memory using a single, fixed data type, and operations are executed using highly optimized, low-level C code. Regular Python lists store references to separate Python objects scattered in memory, making element-wise operations much slower."
      },
      solution: "import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nprint(arr)\nprint(arr.shape)"
    },
    rightPanel: {
      startingCode: "# Lesson 1: Introduction to NumPy\n# Create and inspect a 1D array\n\n",
      expectedOutput: "[1 2 3 4 5]\n(5,)"
    }
  },
  {
    lessonId: "py-ds-02",
    title: "02. NumPy Matrix Operations",
    difficulty: "advanced",
    track: "python-data-science",
    leftPanel: {
      chapterProgress: "Chapter 02 — 20% complete",
      conceptText: "Beyond simple 1D arrays, NumPy excels at working with matrices — 2-dimensional arrays organized into rows and columns. You create a 2D array by passing a list of lists into np.array(), where each inner list becomes a row. You can filter datasets using boolean conditions directly on arrays — for example, matrix[matrix > 5] returns only the elements greater than 5, flattened into a 1D array.",
      instructions: "Create a 2D array called matrix from the nested list [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. Print the full matrix. On the next line, use boolean indexing to print only the values greater than 5."
    },
    utilities: {
      hint: "Boolean indexing works by placing a condition directly inside the square brackets: matrix[matrix > 5]. NumPy evaluates the condition for every element and returns only the ones where the condition is True.",
      flashcard: {
        front: "What does the slice matrix[:, 0] return on a 2D NumPy array?",
        back: "It returns the entire first column of the matrix (index 0), across all rows. The colon before the comma means 'select all rows', and the 0 after the comma means 'only column index 0'."
      },
      solution: "import numpy as np\n\nmatrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(matrix)\nprint(matrix[matrix > 5])"
    },
    rightPanel: {
      startingCode: "# Lesson 2: NumPy Matrix Operations\n# Create a matrix and filter it with boolean indexing\n\n",
      expectedOutput: "[[1 2 3]\n [4 5 6]\n [7 8 9]]\n[6 7 8 9]"
    }
  },
  {
    lessonId: "py-ds-03",
    title: "03. Introduction to Pandas",
    difficulty: "advanced",
    track: "python-data-science",
    leftPanel: {
      chapterProgress: "Chapter 03 — 40% complete",
      conceptText: "While NumPy handles raw numerical arrays, Pandas builds on top of it to provide labeled, tabular data structures. The core object in Pandas is the DataFrame — essentially a spreadsheet-like table with labeled rows and columns. You typically create a DataFrame from a Python dictionary, where each key becomes a column name and each value (a list) becomes that column's data.",
      instructions: "Import Pandas with the standard alias: import pandas as pd. Create a dictionary called data with three keys: 'username', 'minutes_studied', and 'xp_earned', each mapping to a list of 3 values. Convert it into a DataFrame called df using pd.DataFrame(data), then print df."
    },
    utilities: {
      hint: "Each key in your dictionary must map to a list of the SAME length — if you have 3 usernames, you need exactly 3 corresponding values in each of the other lists.",
      flashcard: {
        front: "What is the difference between a Pandas Series and a Pandas DataFrame?",
        back: "A Series is a single labeled column of data (essentially a 1D array with an index), while a DataFrame is a full table made up of multiple Series objects combined together."
      },
      solution: "import pandas as pd\n\ndata = {\n    'username': ['munira04', 'fox_coder', 'panda_py'],\n    'minutes_studied': [45, 30, 60],\n    'xp_earned': [120, 80, 150]\n}\ndf = pd.DataFrame(data)\nprint(df)"
    },
    rightPanel: {
      startingCode: "# Lesson 3: Introduction to Pandas\n# Build a DataFrame of mock user activity\n\n",
      expectedOutput: "   username  minutes_studied  xp_earned\n0  munira04               45        120\n1  fox_coder               30         80\n2  panda_py                60        150"
    }
  },
  {
    lessonId: "py-ds-04",
    title: "04. Pandas Data Cleaning",
    difficulty: "advanced",
    track: "python-data-science",
    leftPanel: {
      chapterProgress: "Chapter 04 — 60% complete",
      conceptText: "Real-world datasets are almost never perfectly clean. In Pandas, missing values are represented as NaN. You can detect them using .isnull(), drop incomplete rows with .dropna(), or fill gaps with .fillna(). Choosing between these depends on context — dropping rows is appropriate when missing data is rare, while filling values preserves every row.",
      instructions: "Create a DataFrame with a missing value: data = {'username': ['munira04', 'fox_coder', 'panda_py'], 'minutes_studied': [45, None, 60]}. Use df['minutes_studied'].fillna(0) to replace the missing value with 0, storing the result back into the same column. Print the cleaned DataFrame."
    },
    utilities: {
      hint: "To overwrite a column with its cleaned version, assign the result back: df['minutes_studied'] = df['minutes_studied'].fillna(0). Without reassigning it, fillna() returns a new Series but doesn't change the original DataFrame.",
      flashcard: {
        front: "What's the key difference between .dropna() and .fillna() in Pandas?",
        back: ".dropna() removes entire rows that contain any missing values, reducing your dataset size. .fillna(value) replaces missing values with a value you specify, keeping every row intact."
      },
      solution: "import pandas as pd\n\ndata = {\n    'username': ['munira04', 'fox_coder', 'panda_py'],\n    'minutes_studied': [45, None, 60]\n}\ndf = pd.DataFrame(data)\ndf['minutes_studied'] = df['minutes_studied'].fillna(0)\nprint(df)"
    },
    rightPanel: {
      startingCode: "# Lesson 4: Pandas Data Cleaning\n# Fill missing values in a DataFrame\n\n",
      expectedOutput: "   username  minutes_studied\n0  munira04             45.0\n1  fox_coder              0.0\n2  panda_py             60.0"
    }
  },
  {
    lessonId: "py-ds-05",
    title: "05. Matplotlib Visualization",
    difficulty: "advanced",
    track: "python-data-science",
    leftPanel: {
      chapterProgress: "Chapter 05 — 80% complete",
      conceptText: "Matplotlib is Python's foundational plotting library. The most basic chart type is the line plot, created using plt.plot(x_values, y_values). You can label your axes with plt.xlabel() and plt.ylabel(), give your chart a title with plt.title(), and render it with plt.show().",
      instructions: "Import matplotlib.pyplot as plt. Create two lists: sessions = [1, 2, 3, 4, 5] and xp = [50, 120, 180, 260, 310]. Plot xp against sessions using plt.plot(sessions, xp). Add the title 'XP Growth Over Sessions', then print('Plot generated successfully')."
    },
    utilities: {
      hint: "In a real coding environment, plt.show() would open a window displaying your chart. Since our terminal is text-based, we confirm success with a print statement instead.",
      flashcard: {
        front: "What is the relationship between Matplotlib and Pandas/Seaborn?",
        back: "Matplotlib is the foundational, lower-level plotting library. Pandas has built-in plotting shortcuts that call Matplotlib under the hood, and Seaborn is a higher-level library built entirely on top of Matplotlib."
      },
      solution: "import matplotlib.pyplot as plt\n\nsessions = [1, 2, 3, 4, 5]\nxp = [50, 120, 180, 260, 310]\nplt.plot(sessions, xp)\nplt.title('XP Growth Over Sessions')\nprint('Plot generated successfully')"
    },
    rightPanel: {
      startingCode: "# Lesson 5: Matplotlib Visualization\n# Plot XP growth across study sessions\n\n",
      expectedOutput: "Plot generated successfully"
    }
  }
];