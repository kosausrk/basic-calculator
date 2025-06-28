import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const toggleSign = () => {
    setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
    return secondOperand;
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="key key-clear" onClick={() => clearDisplay()}>AC</button>
            <button className="key key-sign" onClick={() => toggleSign()}>±</button>
            <button className="key key-percent" onClick={() => performOperation('%')}>%</button>
          </div>
          <div className="digit-keys">
            <button className="key key-0" onClick={() => inputDigit(0)}>0</button>
            <button className="key key-dot" onClick={() => inputDecimal()}>●</button>
            <button className="key key-1" onClick={() => inputDigit(1)}>1</button>
            <button className="key key-2" onClick={() => inputDigit(2)}>2</button>
            <button className="key key-3" onClick={() => inputDigit(3)}>3</button>
            <button className="key key-4" onClick={() => inputDigit(4)}>4</button>
            <button className="key key-5" onClick={() => inputDigit(5)}>5</button>
            <button className="key key-6" onClick={() => inputDigit(6)}>6</button>
            <button className="key key-7" onClick={() => inputDigit(7)}>7</button>
            <button className="key key-8" onClick={() => inputDigit(8)}>8</button>
            <button className="key key-9" onClick={() => inputDigit(9)}>9</button>
          </div>
        </div>
        <div className="operator-keys">
          <button className="key key-divide" onClick={() => performOperation('/')}>÷</button>
          <button className="key key-multiply" onClick={() => performOperation('*')}>×</button>
          <button className="key key-subtract" onClick={() => performOperation('-')}>−</button>
          <button className="key key-add" onClick={() => performOperation('+')}>+</button>
          <button className="key key-equals" onClick={() => performOperation('=')}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
