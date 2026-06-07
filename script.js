let angleMode = 'degrees';
let memory = 0;
let calculationHistory = [];
let currentDisplay = '0';

const PI = Math.PI;
const E = Math.E;

// Display management
function updateDisplay() {
    document.getElementById('result-display').textContent = currentDisplay;
    document.getElementById('memory-display').textContent = memory !== 0 ? `M: ${memory.toFixed(4)}` : '';
}

function appendToDisplay(value) {
    if (value === 'π') {
        currentDisplay = currentDisplay === '0' ? PI.toString() : currentDisplay + PI.toString();
    } else if (value === 'e') {
        currentDisplay = currentDisplay === '0' ? E.toString() : currentDisplay + E.toString();
    } else if (value === '%') {
        const num = parseFloat(currentDisplay);
        currentDisplay = (num / 100).toString();
    } else {
        if (currentDisplay === '0') currentDisplay = value;
        else currentDisplay += value;
    }
    updateDisplay();
}

function clearEntry() {
    currentDisplay = '0';
    updateDisplay();
}

// Memory functions
function memoryClear() {
    memory = 0;
    updateDisplay();
}

function memoryRecall() {
    currentDisplay = memory.toString();
    updateDisplay();
}

function memoryAdd() {
    const num = parseFloat(currentDisplay);
    if (!isNaN(num)) {
        memory += num;
        updateDisplay();
    }
}

function memorySubtract() {
    const num = parseFloat(currentDisplay);
    if (!isNaN(num)) {
        memory -= num;
        updateDisplay();
    }
}

function setAngleMode(mode) {
    angleMode = mode;
    document.getElementById('degrees-btn').classList.toggle('active', mode === 'degrees');
    document.getElementById('radians-btn').classList.toggle('active', mode === 'radians');
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function factorial(n) {
    if (n < 0) return 'Error: Negative factorial';
    if (n === 0 || n === 1) return 1;
    if (n > 170) return 'Error: Too large';
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function reciprocal() {
    const num = parseFloat(currentDisplay);
    if (num === 0) {
        currentDisplay = 'Error: Division by zero';
    } else {
        currentDisplay = (1 / num).toString();
    }
    updateDisplay();
}

function square() {
    const num = parseFloat(currentDisplay);
    currentDisplay = (num * num).toString();
    updateDisplay();
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

function addToHistory(expression, result) {
    const historyItem = `${expression} = ${result}`;
    calculationHistory.unshift(historyItem);
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<div class="history-item">No history yet</div>';
        return;
    }
    historyList.innerHTML = calculationHistory.map(item => 
        `<div class="history-item">${item}</div>`
    ).join('');
}

function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
}

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    // Validation
    if (isNaN(num1) || isNaN(num2)) {
        alert('Please enter valid numbers');
        return;
    }

    // Check which operations are selected
    const selectedOps = {
        add: document.getElementById('op-add').checked,
        subtract: document.getElementById('op-subtract').checked,
        multiply: document.getElementById('op-multiply').checked,
        divide: document.getElementById('op-divide').checked,
        modulus: document.getElementById('op-modulus').checked,
        power: document.getElementById('op-power').checked
    };

    // Check which scientific functions are selected
    const selectedSci = {
        sqrt: document.getElementById('sci-sqrt').checked,
        cbrt: document.getElementById('sci-cbrt').checked,
        sin: document.getElementById('sci-sin').checked,
        cos: document.getElementById('sci-cos').checked,
        tan: document.getElementById('sci-tan').checked,
        log: document.getElementById('sci-log').checked,
        ln: document.getElementById('sci-ln').checked,
        exp: document.getElementById('sci-exp').checked,
        abs: document.getElementById('sci-abs').checked,
        factorial: document.getElementById('sci-factorial').checked,
        asin: document.getElementById('sci-asin').checked,
        acos: document.getElementById('sci-acos').checked,
        atan: document.getElementById('sci-atan').checked,
        sinh: document.getElementById('sci-sinh').checked,
        cosh: document.getElementById('sci-cosh').checked,
        tanh: document.getElementById('sci-tanh').checked
    };

    // Perform calculations
    const results = {
        add: num1 + num2,
        subtract: num1 - num2,
        multiply: num1 * num2,
        divide: num2 === 0 ? 'Error: Cannot divide by zero' : (num1 / num2).toFixed(6),
        modulus: num2 === 0 ? 'Error: Cannot divide by zero' : num1 % num2,
        power: Math.pow(num1, num2)
    };

    // Display results based on selected operations
    document.getElementById('result-add').parentElement.style.display = selectedOps.add ? 'flex' : 'none';
    document.getElementById('result-subtract').parentElement.style.display = selectedOps.subtract ? 'flex' : 'none';
    document.getElementById('result-multiply').parentElement.style.display = selectedOps.multiply ? 'flex' : 'none';
    document.getElementById('result-divide').parentElement.style.display = selectedOps.divide ? 'flex' : 'none';
    document.getElementById('result-modulus').parentElement.style.display = selectedOps.modulus ? 'flex' : 'none';
    document.getElementById('result-power').parentElement.style.display = selectedOps.power ? 'flex' : 'none';

    // Update result values
    document.getElementById('result-add').textContent = results.add;
    document.getElementById('result-subtract').textContent = results.subtract;
    document.getElementById('result-multiply').textContent = results.multiply;
    
    if (typeof results.divide === 'string') {
        document.getElementById('result-divide').textContent = results.divide;
        document.getElementById('result-divide').className = 'error';
    } else {
        document.getElementById('result-divide').textContent = results.divide;
        document.getElementById('result-divide').className = 'answer';
    }

    if (typeof results.modulus === 'string') {
        document.getElementById('result-modulus').textContent = results.modulus;
        document.getElementById('result-modulus').className = 'error';
    } else {
        document.getElementById('result-modulus').textContent = results.modulus;
        document.getElementById('result-modulus').className = 'answer';
    }

    document.getElementById('result-power').textContent = results.power;

    // Calculate scientific functions (using num1)
    const scientificResults = {};
    
    if (selectedSci.sqrt) {
        scientificResults.sqrt = num1 < 0 ? 'Error: Negative value' : Math.sqrt(num1).toFixed(6);
    }
    if (selectedSci.cbrt) {
        scientificResults.cbrt = Math.cbrt(num1).toFixed(6);
    }
    if (selectedSci.sin) {
        const angle = angleMode === 'degrees' ? toRadians(num1) : num1;
        scientificResults.sin = Math.sin(angle).toFixed(6);
    }
    if (selectedSci.cos) {
        const angle = angleMode === 'degrees' ? toRadians(num1) : num1;
        scientificResults.cos = Math.cos(angle).toFixed(6);
    }
    if (selectedSci.tan) {
        const angle = angleMode === 'degrees' ? toRadians(num1) : num1;
        scientificResults.tan = Math.tan(angle).toFixed(6);
    }
    if (selectedSci.log) {
        scientificResults.log = num1 <= 0 ? 'Error: Log of non-positive' : Math.log10(num1).toFixed(6);
    }
    if (selectedSci.ln) {
        scientificResults.ln = num1 <= 0 ? 'Error: Ln of non-positive' : Math.log(num1).toFixed(6);
    }
    if (selectedSci.exp) {
        scientificResults.exp = Math.exp(num1).toFixed(6);
    }
    if (selectedSci.abs) {
        scientificResults.abs = Math.abs(num1).toFixed(6);
    }
    if (selectedSci.factorial) {
        scientificResults.factorial = factorial(num1);
    }

    // Display scientific function results
    document.getElementById('result-sqrt').parentElement.style.display = selectedSci.sqrt ? 'flex' : 'none';
    document.getElementById('result-cbrt').parentElement.style.display = selectedSci.cbrt ? 'flex' : 'none';
    document.getElementById('result-sin').parentElement.style.display = selectedSci.sin ? 'flex' : 'none';
    document.getElementById('result-cos').parentElement.style.display = selectedSci.cos ? 'flex' : 'none';
    document.getElementById('result-tan').parentElement.style.display = selectedSci.tan ? 'flex' : 'none';
    document.getElementById('result-log').parentElement.style.display = selectedSci.log ? 'flex' : 'none';
    document.getElementById('result-ln').parentElement.style.display = selectedSci.ln ? 'flex' : 'none';
    document.getElementById('result-exp').parentElement.style.display = selectedSci.exp ? 'flex' : 'none';
    document.getElementById('result-abs').parentElement.style.display = selectedSci.abs ? 'flex' : 'none';
    document.getElementById('result-factorial').parentElement.style.display = selectedSci.factorial ? 'flex' : 'none';

    // Update scientific results
    if (scientificResults.sqrt) document.getElementById('result-sqrt').textContent = scientificResults.sqrt;
    if (scientificResults.cbrt) document.getElementById('result-cbrt').textContent = scientificResults.cbrt;
    if (scientificResults.sin) document.getElementById('result-sin').textContent = scientificResults.sin;
    if (scientificResults.cos) document.getElementById('result-cos').textContent = scientificResults.cos;
    if (scientificResults.tan) document.getElementById('result-tan').textContent = scientificResults.tan;
    if (scientificResults.log) document.getElementById('result-log').textContent = scientificResults.log;
    if (scientificResults.ln) document.getElementById('result-ln').textContent = scientificResults.ln;
    if (scientificResults.exp) document.getElementById('result-exp').textContent = scientificResults.exp;
    if (scientificResults.abs) document.getElementById('result-abs').textContent = scientificResults.abs;
    if (scientificResults.factorial) document.getElementById('result-factorial').textContent = scientificResults.factorial;

    // Advanced functions (asin, acos, atan, sinh, cosh, tanh)
    const advancedResults = {};
    
    if (selectedSci.asin) {
        const val = Math.asin(num1);
        advancedResults.asin = isNaN(val) ? 'Error: Out of range' : (angleMode === 'degrees' ? toDegrees(val) : val).toFixed(6);
    }
    if (selectedSci.acos) {
        const val = Math.acos(num1);
        advancedResults.acos = isNaN(val) ? 'Error: Out of range' : (angleMode === 'degrees' ? toDegrees(val) : val).toFixed(6);
    }
    if (selectedSci.atan) {
        const val = Math.atan(num1);
        advancedResults.atan = (angleMode === 'degrees' ? toDegrees(val) : val).toFixed(6);
    }
    if (selectedSci.sinh) {
        advancedResults.sinh = Math.sinh(num1).toFixed(6);
    }
    if (selectedSci.cosh) {
        advancedResults.cosh = Math.cosh(num1).toFixed(6);
    }
    if (selectedSci.tanh) {
        advancedResults.tanh = Math.tanh(num1).toFixed(6);
    }

    // Display advanced function results
    document.getElementById('result-asin').parentElement.style.display = selectedSci.asin ? 'flex' : 'none';
    document.getElementById('result-acos').parentElement.style.display = selectedSci.acos ? 'flex' : 'none';
    document.getElementById('result-atan').parentElement.style.display = selectedSci.atan ? 'flex' : 'none';
    document.getElementById('result-sinh').parentElement.style.display = selectedSci.sinh ? 'flex' : 'none';
    document.getElementById('result-cosh').parentElement.style.display = selectedSci.cosh ? 'flex' : 'none';
    document.getElementById('result-tanh').parentElement.style.display = selectedSci.tanh ? 'flex' : 'none';

    // Update advanced results
    if (advancedResults.asin) document.getElementById('result-asin').textContent = advancedResults.asin;
    if (advancedResults.acos) document.getElementById('result-acos').textContent = advancedResults.acos;
    if (advancedResults.atan) document.getElementById('result-atan').textContent = advancedResults.atan;
    if (advancedResults.sinh) document.getElementById('result-sinh').textContent = advancedResults.sinh;
    if (advancedResults.cosh) document.getElementById('result-cosh').textContent = advancedResults.cosh;
    if (advancedResults.tanh) document.getElementById('result-tanh').textContent = advancedResults.tanh;

    // Add to history
    const mainResult = results.add;
    addToHistory(`${num1} + ${num2}`, mainResult);

    // Show results section
    document.getElementById('results').style.display = 'block';
}

function clearInputs() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('num1').focus();
}

// Allow Enter key to calculate
document.getElementById('num1').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') calculate();
});

document.getElementById('num2').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') calculate();
});
