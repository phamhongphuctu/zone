import { useState } from "react";

const symbols = ["🍒", "🍋", "🍇", "🔔", "💎"];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export default function SlotGame() {
  const [slots, setSlots] = useState(["🍒", "🍋", "🍇"]);
  const [msg, setMsg] = useState("");

  const spin = () => {
    const newSlots = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setSlots(newSlots);
    if (newSlots.every((s) => s === newSlots[0])) {
      setMsg("🎉 Trúng thưởng!");
    } else {
      setMsg("😢 Không trúng, quay lại!");
    }
  };

  return (
    <div>
      <div style={{ fontSize: "4rem" }}>{slots.join(" ")}</div>
      <button onClick={spin} style={{ padding: "10px 30px", fontSize: "1.2rem" }}>
        Quay
      </button>
      <p>{msg}</p>
    </div>
  );
}
