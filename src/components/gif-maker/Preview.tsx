import React, { useEffect, useState } from "react";
import styles from "./Preview.module.scss";

interface PreviewProps {
  urls: string[];
  intervalDuration: number;
  setIntervalDuration: (duration: number) => void;
  dimensions: { width: number; height: number };
  setDimensions: (dimensions: { width: number; height: number }) => void;
}

const Preview = ({
  urls,
  intervalDuration,
  setIntervalDuration,
  dimensions,
  setDimensions,
}: PreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const handleDimensionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: "width" | "height"
  ) => {
    setDimensions({
      ...dimensions,
      [key]: Number(event.target.value),
    });
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntervalDuration(Number(event.target.value));
  };
  const toggleRunning = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const dimensionControls = () => {
    return (
      <>
        <label>
          Height: {dimensions.height}px
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={dimensions.height}
            onChange={(e) => handleDimensionChange(e, "height")}
          />
        </label>
        <label>
          Width: {dimensions.width}px
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={dimensions.width}
            onChange={(e) => handleDimensionChange(e, "width")}
          />
        </label>
      </>
    );
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
        {dimensionControls()}
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
      {previewControls()}
      {urls.length > 0 && (
        <img
          className={styles.preview}
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
          src={urls[currentIndex]}
          alt={`frame-${currentIndex}`}
        />
      )}
    </div>
  );
};

export default Preview;
