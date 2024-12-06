import React, { useEffect, useState } from "react";
import stl from "./Home.module.css";

const Home = () => {
  const [logs, setLogs] = useState("Loading logs...");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          "https://memegodai.netlify.app/.netlify/functions/scriptfetcher"
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
        <h1>Memegod.ai</h1>
        <span className={stl.alert}>
          <div className={stl.dot}></div> Trusted execution environment live
        </span>
        <pre className={stl.preStyle}>{logs}</pre>
      </div>
      {/* <img src="./Binary.gif" alt="Terminal" className={stl.terminalBg} /> */}
    </div>
  );
};

export default Home;
