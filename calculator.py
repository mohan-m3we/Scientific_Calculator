def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero"
    return a / b

def modulus(a, b):
    if b == 0:
        return "Error: Cannot divide by zero"
    return a % b

def power(a, b):
    return a ** b

if __name__ == "__main__":
    print("=== Arithmetic Operations Calculator ===\n")
    
    # Get user input
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    
    print("\n--- Results ---")
    print(f"{num1} + {num2} = {add(num1, num2)}")
    print(f"{num1} - {num2} = {subtract(num1, num2)}")
    print(f"{num1} * {num2} = {multiply(num1, num2)}")
    print(f"{num1} / {num2} = {divide(num1, num2)}")
    print(f"{num1} % {num2} = {modulus(num1, num2)}")
    print(f"{num1} ** {num2} = {power(num1, num2)}")
