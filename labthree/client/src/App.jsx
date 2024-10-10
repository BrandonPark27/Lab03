import React, { useState } from "react";

function App() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fetchedSingleFile, setFetchedSingleFile] = useState(null);
  const [dogImageBlob, setDogImageUrl] = useState(null);

  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const handleMultipleFilesChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);

    try {
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading single file:", error);
    }
  };

  const uploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }

    try {
      const response = await fetch("http://localhost:8000/save/multiple", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading multiple files:", error);
    }
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/single");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      console.log(url)
      setFetchedSingleFile(url);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };
  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const dogImageUrl = data.message;
      setDogImageUrl(dogImageUrl);
  
      
      const imageResponse = await fetch(dogImageUrl);
      const dogImageBlob = await imageResponse.blob();
  
  
      const formData = new FormData();
      formData.append('file', dogImageBlob, 'random-dog.jpg');
  
      
      const uploadResponse = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload the image to the server");
      }
  
      const uploadResult = await uploadResponse.json();
      console.log(uploadResult); 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  









  return (
    <div style={{ padding: "20px" }}>
      <h1>File Upload and Fetch App</h1>
      <div>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button onClick={uploadSingleFile}>Upload Single File</button>
      </div>

      <div>
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFilesChange} />
        <button onClick={uploadMultipleFiles}>Upload Multiple Files</button>
      </div>
      <div>
      <h2>Random Dog Image</h2>
        <button onClick={fetchRandomDogImage}>Get Random Dog Image</button>
        {dogImageBlob && (
          <div>
            <h3>Random Dog</h3>
            <img
              src={dogImageBlob}
              alt="Fetched Single"
              style={{ width: "200px", marginTop: "10px" }}
            />
          </div>
        )} 
      </div>

      <div>
        <h2>Fetch Single File</h2>
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        {fetchedSingleFile && (
          <div>
            <h3>Single File</h3>
            <img
              src={fetchedSingleFile}
              alt="Fetched Single"
              style={{ width: "200px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;