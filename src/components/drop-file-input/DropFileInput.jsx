import React, { useEffect, useRef, useState, memo } from "react";

import { notifyError, notifySuccess } from "../../components/toast/Toast";
import uploadFiles from "../../config/uploadImg";
import "./drop-file-input.scss";
import uploadImg from "../../assets/images/cloud-upload-regular-240.png";
const DropFileInput = (props) => {
  const wrapperRef = useRef();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([])
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files;
    if (newFile) {
      [...newFile].map((item) => (item.preview = URL.createObjectURL(item)));
      const updateList = [...fileList, ...newFile];
      setFileList(updateList);
    }
  };


  const fileRemove = (file) => {
    const updateList = [...fileList];
    updateList.splice(fileList.indexOf(file), 1);
    URL.revokeObjectURL(file.preview)
    setFileList(updateList);
  };

  const handleUpload = async () => {
    setLoading(true)
    try {
      const res = await uploadFiles(fileList)
      setLoading(false)
      props.onFileChange(res);
      notifySuccess('Upload thành công')
      } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    setFileList([])
  }, [props.submitted])

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file__lable">
          <img src={uploadImg} alt="" />
          <p>Kéo thả file vào đây</p>
        </div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple="multiple"
          name={props.name}
          value=""
          onChange={onFileDrop}
        />
      </div>
      {fileList.length > 0 ? (
        <>
        <div className="file-list">
          <div className="row">
            {fileList.map((item, index) => (
              <div key={index} className="col l-3 m-4 c-12">
                <div  className="file-list-preview__item">
              <img src={item.preview} alt="" />
              <div
                onClick={() => fileRemove(item)}
                className="file-list-preview__item--del"
              >
                <i className="bx bx-x"></i>
              </div>
            </div>
              </div>
            
          ))}
          </div>
          
        </div>
        <div onClick={() => handleUpload()} className="upload-btn">
        <span className={`spinner ${loading && "active"}`}>
          <i className="bx bx-loader-alt bx-spin"></i>
        </span>
        <span className="txt">Upload ảnh</span>
      </div>
      </>
      ) : null}
    </>
  );
};

export default DropFileInput;
