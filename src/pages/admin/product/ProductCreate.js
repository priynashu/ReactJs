import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/productCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/fileUpload";
import { LoadingOutlined } from "@ant-design/icons";
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subs: [],
  shipping: ["Yes", "No"],
  quantity: "",
  images: [],
  colors: ["Red", "Black", "White", "Blue", "Grey"],
  brands: ["Apple", "Samsung", "JBL", "Lenovo", "Microsoft"],
  color: "",
  brand: "",
};
const ProductCreate = () => {
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  const { user } = useSelector((state) => {
    return state;
  });
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); // now we wont loose values after another and
    // to check log(values)
    // console.log(e.target.name, "value", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });

    getCategorySubs(e.target.value).then((res) => {
      console.log(res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>"Product Create"</h4>
          )}
          <hr />
          {JSON.stringify(values.images)}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            setValues={setValues}
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
