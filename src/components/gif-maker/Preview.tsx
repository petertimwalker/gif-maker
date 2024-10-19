import React, { useEffect, useState } from "react";
import styles from "./Preview.module.scss";

interface PreviewProps {
  urls: string[];
  intervalDuration: number;
  setIntervalDuration: (duration: number) => void;
}

const Preview = ({
  urls,
  intervalDuration,
  setIntervalDuration,
}: PreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntervalDuration(Number(event.target.value));
  };
  const toggleRunning = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [urls.length, intervalDuration, isRunning]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Preview of GIF:</div>
      <div>
        <label htmlFor="interval">Set Interval (ms): </label>
        <input
          type="range"
          id="interval"
          min="100"
          max="1000"
          step="10"
          value={intervalDuration}
          onChange={handleIntervalChange}
        />
        <span>{intervalDuration} ms</span>
        <button onClick={toggleRunning}>{isRunning ? "Stop" : "Start"}</button>
      </div>
      {urls.length > 0 && (
        <img
          className={styles.image}
          src={urls[currentIndex]}
          alt={`frame-${currentIndex}`}
        />
      )}
    </div>
  );
};

export default Preview;
