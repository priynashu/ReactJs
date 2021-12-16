import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";

const FileUpload = ({ setLoading, setValues, values }) => {
  const { user } = useSelector((state) => {
    return state;
  });

  const fileUploadAndResize = (e) => {
    //
    const files = e.target.files;
    const allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri }, //this will appear in the DB
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                // console.log("IMAGE UPLOAD RES", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR");
              });
          },
          "base64"
        );
      }
    }
  };
  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log(public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        {
          public_id: public_id,
        },
        { headers: { authtoken: user ? user.token : "" } }
      )
      .then((res) => {
        setLoading(false);
        const filteredImages = values.images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log("image delete error", err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        <label className="btn btn-outline-success" data-mdb-ripple-color="dark">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            className="form-control"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
      <div className="row">
        {values.images &&
          values.images.map((item) => {
            return (
              <Badge
                count="X"
                key={item.public_id}
                onClick={() => handleImageRemove(item.public_id)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  src={item.url}
                  size={100}
                  shape="square"
                  className="ml-3"
                />
              </Badge>
            );
          })}
      </div>
    </>
  );
};

export default FileUpload;
