import React from "react";
import "./Die.css";
export default function Die(props) {
  const styles = {
    backgroundColor: props.die.onHold ? "#59E391" : "white",
  };
  return (
    <div className="Die" style={styles} onClick={props.holdDice}>
      {props.die.value}
    </div>
  );
}
