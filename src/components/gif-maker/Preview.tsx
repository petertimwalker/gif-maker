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

  const previewControls = () => {
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Set Interval (ms):
        </label>
        <input
          type="range"
          id="interval"
          min="100"
          max="1000"
          step="10"
          value={intervalDuration}
          onChange={handleIntervalChange}
          className="w-full mb-4"
        />
        <span className="block text-sm text-gray-700 mb-4">
          {intervalDuration} ms
        </span>
        <button
          onClick={toggleRunning}
          className={`px-4 py-2 rounded-lg text-white ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    );
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
      {urls.length > 0 && (
        <img
          className={styles.image}
          src={urls[currentIndex]}
          alt={`frame-${currentIndex}`}
        />
      )}
      {previewControls()}
    </div>
  );
};

export default Preview;
