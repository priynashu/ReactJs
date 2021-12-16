import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/fileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/productUpdateForm";

const ProductUpdate = ({ match }) => {
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
  const { slug } = match.params;
  const { user } = useSelector((state) => {
    return state;
  });
  const [values, setValues] = useState(initialState); // values is an object
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      console.log(res.data);
      setValues({ ...values, ...res.data }); // ...values is used if it has some pre values
      // and ...res.data is used for the data to be uploaded to the values
    });
  };
  const handleSubmit = () => {};
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); // now we wont loose values after another and
    // to check log(values)
    // console.log(e.target.name, "value", e.target.value);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          {JSON.stringify(values)}
          <ProductUpdateForm
            values={values}
            setValues={setValues}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
