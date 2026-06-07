# 🧮 Scientific Calculator

A comprehensive calculator application available in both Python CLI and interactive web-based interfaces. Perform arithmetic operations, scientific calculations, and manage memory operations with ease.

## ✨ Features

### Core Arithmetic Operations
- ➕ Addition
- ➖ Subtraction  
- ✖️ Multiplication
- ➗ Division (with zero-division error handling)
- 📊 Modulus (remainder)
- ⚡ Power (exponentiation)

### Web Calculator Features
- 🧠 Memory Operations (MC, MR, M+, M-)
- 📐 Angle Mode Toggle (Degrees/Radians)
- 📚 Calculation History
- ⌨️ Keyboard Support
- 🎯 Quick Function Buttons
- 📱 Responsive Design

## 🛠️ Technologies Used

- **Python 3.x** - Backend arithmetic operations
- **HTML5** - Web interface structure
- **CSS3** - Styling and responsive design
- **JavaScript** - Web calculator interactivity

## 📦 Project Structure

```
arithmetic_ops/
├── calculator.py       # Python CLI calculator
├── index.html         # Web calculator interface
├── script.js          # JavaScript calculator logic
├── style.css          # Styling
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Python Calculator

**Requirements:** Python 3.x

**Usage:**
```bash
python calculator.py
```

Follow the prompts to enter two numbers and view all arithmetic operation results.

### Web Calculator

**Requirements:** Any modern web browser

**Usage:**
1. Open `index.html` in your web browser
2. Enter two numbers in the input fields
3. Select your desired operation
4. Toggle angle mode between Degrees and Radians if needed
5. Use memory buttons (MC, MR, M+, M-) for memory operations

**Running locally with a server:**
```bash
# Using Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

## 💡 Usage Examples

### Python CLI
```
=== Arithmetic Operations Calculator ===

Enter first number: 10
Enter second number: 5

--- Results ---
10.0 + 5 = 15.0
10.0 - 5 = 5.0
10.0 * 5 = 50.0
10.0 / 5 = 2.0
10.0 % 5 = 0.0
10.0 ** 5 = 100000.0
```

### Web Calculator
- Enter numbers in the input fields
- View results in the display section
- Track calculation history
- Use memory operations for complex calculations

## ✅ Error Handling

- **Division by Zero:** Returns error message to prevent calculation errors
- **Invalid Input:** Validates numeric input from users
- **Keyboard Support:** Press Enter to calculate using the keyboard

## 🎨 Features Highlight

| Feature | Python | Web |
|---------|--------|-----|
| Basic Arithmetic | ✅ | ✅ |
| Memory Operations | ❌ | ✅ |
| Calculation History | ❌ | ✅ |
| Angle Mode Support | ❌ | ✅ |
| Error Handling | ✅ | ✅ |
| Responsive Design | N/A | ✅ |

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created and maintained by [mohan-m3we](https://github.com/mohan-m3we)

---

**Happy Calculating!** 🎉