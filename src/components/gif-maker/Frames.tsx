import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./Frames.module.scss";

interface FramesProps {
  urls: Array<string>;
  setUrls: (urls: Array<string>) => void;
}

const Frame = ({
  url,
  index,
  moveFrame,
}: {
  url: string;
  index: number;
  moveFrame: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "FRAME",
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveFrame(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "FRAME",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.frame}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={url} alt="single frame" className={styles.image} />
    </div>
  );
};

const Frames = ({ urls, setUrls }: FramesProps) => {
  const moveFrame = (dragIndex: number, hoverIndex: number) => {
    const newUrls = [...urls];
    const [movedFrame] = newUrls.splice(dragIndex, 1);
    newUrls.splice(hoverIndex, 0, movedFrame);
    setUrls(newUrls);
  };
  const handleDelete = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.header}>Frames of GIF:</div>
        <>Drag and drop to reorder frames!</>
        <div className={styles.imagesContainer}>
          {urls.map((url, index) => (
            <div key={index}>
              <Frame key={url} url={url} index={index} moveFrame={moveFrame} />
              <button
                onClick={() => handleDelete(index)}
                className={
                  "px-2 py-1 rounded-lg text-white bg-red-500 hover:bg-red-600 text-xs"
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Frames;
