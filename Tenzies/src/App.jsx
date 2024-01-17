import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./Components/Die.jsx";
import Confetti from "./Components/Confetti.jsx";
export default function App() {
  const [allDice, setAllDice] = useState(allNewDice());
  const [gameWin, setGameWinCondition] = useState(false);
  useEffect(() => {
    let flag = true;
    let dieFaceValue = allDice[0].value;
    if (allDice.every((die) => die.onHold && die.value === dieFaceValue))
      setGameWinCondition(true);
    console.log(gameWin);
  }, [allDice]);
  function newGame() {}
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++)
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        onHold: false,
        id: nanoid(),
      });
    return newDice;
  }
  const diceElements = allDice.map((die) => (
    <Die die={die} key={die.id} holdDice={() => holdDice(die.id)}></Die>
  ));
  function rollNewDice() {
    setAllDice((oldAllDice) => {
      const newDice = allNewDice();
      return oldAllDice.map((die, index) =>
        die.onHold ? die : newDice[index]
      );
    });
  }
  function holdDice(id) {
    console.log(id);
    setAllDice((oldAllDice) =>
      oldAllDice.map((die) =>
        die.id === id ? { ...die, onHold: !die.onHold } : die
      )
    );
  }
  return (
    <main>
      {gameWin && <Confetti></Confetti>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">{diceElements}</div>
      <button onClick={rollNewDice} className="roll-dice">
        {gameWin ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
