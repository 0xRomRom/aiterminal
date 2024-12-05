import React, { useEffect, useState } from "react";
import stl from "./Home.module.css";

const Home = () => {
  const [logs, setLogs] = useState("Loading logs...");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/.netlify/functions/scriptfetcher"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }

        const data = await response.text();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLogs("Failed to load logs.");
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className={stl.home}>
      <div className={stl.terminal}>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontFamily: "monospace",
            padding: "10px",
            color: "#0f0",
            height: "100%",
            overflowY: "auto",
          }}
        >
          {logs}
        </pre>
      </div>
      <img src="./Terminal.png" alt="Terminal" className={stl.terminalBg} />
    </div>
  );
};

export default Home;
