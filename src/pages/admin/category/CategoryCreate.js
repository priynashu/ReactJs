import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/categoryForms";
import LocalSearch from "../../../components/forms/LocalSearch";
const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  //step1 for searching
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  //step2

  //step 4
  const searched = (keyword) => (c) => {
    // console.log(keyword.toString().toLowerCase());

    return c.name.toLowerCase().includes(keyword.toString().toLowerCase());
  }; //here c is category

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        loadCategories();
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // console.log(window.confirm("Are you sure?")); // it return true or false // like yes or cancel
    if (window.confirm("Are you sure?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warning(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}
          <CategoryForm
            name={name}
            handleSubmit={handleSubmit}
            setName={setName}
          />
          {/* step3*/}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />
          <h4>Categories</h4>
          {/*step5 filter is a js method*/}
          {categories.filter(searched(keyword)).map((item) => (
            <div className="alert alert-success" key={item._id}>
              {item.name}{" "}
              <span
                onClick={() => {
                  handleRemove(item.slug);
                }}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined />
              </span>
              <Link to={`/admin/category/${item.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
