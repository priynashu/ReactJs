import React from "react";
import { Select } from "antd";
const { Option } = Select;
const productCreateForm = (props) => {
  //destructure
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    categories,
  } = props.values;
  const {
    handleSubmit,
    handleChange,
    handleCategoryChange,
    showSub,
    subOptions,
    setValues,
    values,
  } = props;
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          className="form-control"
          onChange={handleChange}
          required
          placeholder="Enter the name"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          className="form-control"
          onChange={handleChange}
          required
          placeholder="Enter some details"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          className="form-control "
          onChange={handleChange}
          required
          placeholder="Enter the price"
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          required
        >
          <option value="">Please Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          className="form-control "
          onChange={handleChange}
          required
          placeholder="Enter the quantity"
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          name="color"
          className="form-control"
          onChange={handleChange}
          required
        >
          <option value="">Please Select</option>
          {colors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleChange}
          required
        >
          <option value="">Please Select</option>
          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          className="form-control"
          aria-label=".form-select-lg example"
          name="category"
          onChange={handleCategoryChange}
        >
          <option value="" selected>
            Select a Parent{" "}
          </option>
          {categories.length > 0 &&
            categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      {/*JSON.stringify(subOptions)*/}
      {showSub && (
        <div className="form-group">
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <br />

      {/*subOptions.length*/}
      <button type="submit" className="btn btn-outline-primary">
        Save
      </button>
    </form>
  );
};
export default productCreateForm;
