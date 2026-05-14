import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Sidebar } from "./components/sidebar/sidebar";
import { Container } from "./components/container/container";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Container>
        <main>
          <h1>Welcome to Tauri + React</h1>

          <form
            className="row"
            onSubmit={(e) => {
              e.preventDefault();
              greet();
            }}
          >
            <input
              id="greet-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter a name..."
            />
            <button type="submit">Greet</button>
          </form>
          <p>{greetMsg}</p>
        </main>
      </Container>
    </div>
  );
}

export default App;
