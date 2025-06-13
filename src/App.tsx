import { useEffect, useState } from "react";
import { initPi, loginWithPi } from "./pi";
import SlotGame from "./SlotGame";

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    initPi();
    loginWithPi().then(setUsername);
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Pi Slot Game</h1>
      {username ? (
        <>
          <p>Xin chào, {username}!</p>
          <SlotGame />
        </>
      ) : (
        <p>Đang đăng nhập bằng Pi...</p>
      )}
    </div>
  );
}

export default App;
