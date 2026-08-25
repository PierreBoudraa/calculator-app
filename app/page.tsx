"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(display);

    if (previousValue !== null && operator && !waitingForNewValue) {
      const result = calculate(previousValue, current, operator);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(current);
    }

    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : 0;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operator === null) return;
    const current = parseFloat(display);
    const result = calculate(previousValue, current, operator);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const numStyle =
    "aspect-square rounded-full bg-[#2c2c2e] text-white text-2xl font-medium flex items-center justify-center hover:bg-[#3c3c3e] transition-colors";
  const opStyle =
    "aspect-square rounded-full bg-[#ff9500] text-white text-2xl font-medium flex items-center justify-center hover:bg-[#ffab33] transition-colors";
  const fnStyle =
    "aspect-square rounded-full bg-[#a5a5a5] text-black text-2xl font-medium flex items-center justify-center hover:bg-[#b8b8b8] transition-colors";

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <div className="text-right mb-4 px-2">
          <p className="text-white text-6xl font-light tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
  {display}
</p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Ligne 1 : Clear + division */}
          <div className="grid grid-cols-4 gap-3">
            <button onClick={handleClear} className={`${fnStyle} col-span-3 justify-start pl-6 !aspect-auto h-16`}>
              C
            </button>
            <button onClick={() => handleOperator("÷")} className={opStyle}>÷</button>
          </div>

          {/* Ligne 2 : 7 8 9 × */}
          <div className="grid grid-cols-4 gap-3">
            <button onClick={() => handleNumber("7")} className={numStyle}>7</button>
            <button onClick={() => handleNumber("8")} className={numStyle}>8</button>
            <button onClick={() => handleNumber("9")} className={numStyle}>9</button>
            <button onClick={() => handleOperator("×")} className={opStyle}>×</button>
          </div>

          {/* Ligne 3 : 4 5 6 − */}
          <div className="grid grid-cols-4 gap-3">
            <button onClick={() => handleNumber("4")} className={numStyle}>4</button>
            <button onClick={() => handleNumber("5")} className={numStyle}>5</button>
            <button onClick={() => handleNumber("6")} className={numStyle}>6</button>
            <button onClick={() => handleOperator("-")} className={opStyle}>−</button>
          </div>

          {/* Ligne 4 : 1 2 3 + */}
          <div className="grid grid-cols-4 gap-3">
            <button onClick={() => handleNumber("1")} className={numStyle}>1</button>
            <button onClick={() => handleNumber("2")} className={numStyle}>2</button>
            <button onClick={() => handleNumber("3")} className={numStyle}>3</button>
            <button onClick={() => handleOperator("+")} className={opStyle}>+</button>
          </div>

          {/* Ligne 5 : 0 . = */}
          <div className="grid grid-cols-4 gap-3">
            <button onClick={() => handleNumber("0")} className={`${numStyle} col-span-2 justify-start pl-6 !aspect-auto h-16`}>
              0
            </button>
            <button onClick={handleDecimal} className={numStyle}>.</button>
            <button onClick={handleEquals} className={opStyle}>=</button>
          </div>
        </div>
      </div>
    </main>
  );
}