import axios from "axios";
import { useState } from "react";

const FileUploadPage = () => {
  const [img, setImg] = useState();

  const uploadPhotos = (e) => {
    const files = e.target.files;
    let formData = new FormData();

    for (const key of Object.keys(files)) {
      formData.append("imagesArray", files[key]);
    }
    axios.post("/api/upload", formData, {}).then((response) => {
      setImg(response.data);
      console.log(response.data);
    });
  };

  return (
    <div>
      <input type="file" multiple onChange={uploadPhotos}></input>
      {img &&
        img.map((singleImg) => {
          return <img src={singleImg} alt="Asd"></img>;
        })}
    </div>
  );
};
export default FileUploadPage;
