document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            const action = button.dataset.action;

            if (value) {
                handleNumber(value);
            } else if (action) {
                handleAction(action);
            }
        });
    });

    function handleNumber(value) {
        if (currentInput === '0' && value === '0') {
            return; // Prevent multiple zeros at the start
        }

        if (currentInput === '' && value === '.') {
            currentInput = '0.'; // Ensure proper decimal formatting
        } else {
            currentInput += value;
        }

        updateDisplay(currentInput);
    }

    function handleAction(action) {
        switch (action) {
            case 'clear':
                clearDisplay();
                break;
            case 'backspace':
                backspace();
                break;
            case 'percent':
                calculatePercent();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleOperator(action);
                break;
            case 'calculate':
                calculateResult();
                break;
        }
    }

    function handleOperator(action) {
        if (currentInput === '' && previousInput === '') return;
        if (previousInput && currentInput) {
            calculateResult();
        }
        operator = action;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculateResult() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                result = prev / current;
                break;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay(currentInput);
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            updateDisplay('0');
        } else {
            updateDisplay(currentInput);
        }
    }

    function calculatePercent() {
        if (currentInput !== '') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
        }
    }

    function updateDisplay(value) {
        display.textContent = value;
    }
});
