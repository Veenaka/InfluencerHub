import React, { useEffect, useState } from "react";
import axios from "axios";
const Image = () => {
  const [img, setImg] = useState();
  const [url, setUrl] = useState();
  const [photo, setPhoto] = useState();
  console.log(img);

  const postDetails = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "aoiregoj");
    data.append("cloud_name", "dwx7injsq");
    fetch("https://api.cloudinary.com/v1_1/dwx7injsq/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(setUrl(data.url));
      });
  };
  const sendRequest = async () => {
    console.log("Ji");
    console.log(url);
    await axios
      .put(
        `${process.env.REACT_APP_BASEURL}/api/users/getuser/6267fc77942556bbff0c049c`,
        {
          img: String(url),
        }
      )
      .then((res) => res.data)
      .then(() => {
        window.location.reload();
      });
  };

  useEffect(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASEURL}/api/users/getuser/6267fc77942556bbff0c049c`
      )
      .then((res) => res.data)
      .then((data) => {
        setPhoto(data.img);
      });
    // .then(setUrl(res.data.img))
  }, []);

  return (
    <div>
      <form onSubmit={postDetails}>
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        <input type="submit" />
      </form>
      <h4>{url}</h4>
      <img src={photo} alt="" />
      <button onClick={sendRequest}>send</button>
    </div>
  );
};
export default Image;
