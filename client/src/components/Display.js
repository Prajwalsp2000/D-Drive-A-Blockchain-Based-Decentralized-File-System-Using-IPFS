import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

const checkContentType = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.includes("pdf");
  } catch (err) {
    return false;
  }
};

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log("Fetched data for address:", Otheraddress, dataArray);
      } else {
        dataArray = await contract.display(account);
        console.log("Fetched data for your account:", dataArray);
      }
    } catch (e) {
      alert("You don't have access");
      console.error("Smart contract display error:", e);
      return;
    }
    //const isEmpty = Object.keys(dataArray).length === 0;
    if (!dataArray || Object.keys(dataArray).length === 0) {
      alert("No image or file to display");
      return;
    }
   

      const str = dataArray.toString();
      const str_array = str.split(",");
      
const images = await Promise.all(
  str_array.map(async (item, i) => {
    let finalUrl = item;

    if (item.startsWith("ipfs://")) {
      finalUrl = `https://cloudflare-ipfs.com/ipfs/${item.slice(7)}`;
    }

    const isPdf = await checkContentType(finalUrl);

    return isPdf ? (
      <a href={finalUrl} key={i} target="_blank" rel="noreferrer">
        <img
  src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
  alt={`PDF ${i + 1}`}
  className="pdf-icon"
/>

      </a>
    ) : (
      <a href={finalUrl} key={i} target="_blank" rel="noreferrer">
        <img
          src={finalUrl}
          alt="uploaded"
          className="image-list"
        />
      </a>
    );
  })
);

      setData(images);
  
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;
