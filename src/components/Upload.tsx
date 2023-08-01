import { useS3Upload } from "next-s3-upload";
import { ChangeEvent, useState } from "react";
import styles from "./Upload.module.scss";

interface UploadProps {
  handleFinish: (urls: Array<string>) => void;
}

const Upload = ({ handleFinish }: UploadProps) => {
  const [showProgress, setShowProgress] = useState(false);
  let { uploadToS3, files, resetFiles } = useS3Upload();

  let handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      setShowProgress(true);
      const s3Urls = [];
      const files = event.target.files;
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const { url } = await uploadToS3(file);
        s3Urls.push(url);
      }
      setTimeout(() => {
        setShowProgress(false);
      }, 1500);
      handleFinish(s3Urls);
      resetFiles();
    }
  };

  const renderShowProgress = () => {
    return (
      <div className={styles.progress}>
        {files.map((file, index) => {
          return (
            <div key={index}>
              {file.file.name}: {Math.ceil(file.progress)}% uploaded
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <input onChange={handleFileChange} type="file" multiple />
      {showProgress && renderShowProgress()}
    </div>
  );
};

export default Upload;
