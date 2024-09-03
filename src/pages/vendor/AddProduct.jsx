import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// For MUI Tab
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";

import Swal from "sweetalert2";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from "react-toastify";

import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import apiInstance from "../../utils/axios";
import UserData from "../../components/plugin/UserData";
import { FiPlus } from "react-icons/fi";

// For MUI Tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AddProduct = () => {
  // For MUI Tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userData = UserData();

  if (UserData()?.vendor_id === 0) {
    window.location.href = "/vendor/register/";
  }

  const [product, setProduct] = useState({
    title: "",
    image: null,
    description: "",
    category: "",
    tags: "",
    brand: "",
    price: "",
    old_price: "",
    shipping_amount: "",
    stock_qty: "",
    vendor: userData?.vendor_id,
  });
  const [specifications, setSpecifications] = useState([
    { title: "", content: "" },
  ]);
  const [colors, setColors] = useState([
    { name: "", color_code: "", image: null },
  ]);
  const [sizes, setSizes] = useState([{ name: "", price: 0.0 }]);
  const [gallery, setGallery] = useState([{ image: null }]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axios = apiInstance;
  const navigate = useNavigate();
  const handleAddMore = (setStateFunction) => {
    setStateFunction((prevState) => [...prevState, {}]);
  };

  // console.log(product.category);

  const handleRemove = (index, setStateFunction) => {
    setStateFunction((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const handleInputChange = (index, field, value, setStateFunction) => {
    setStateFunction((prevState) => {
      const newState = [...prevState];
      newState[index][field] = value;
      return newState;
    });
  };

  const handleImageChange = (index, event, setStateFunction) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setStateFunction((prevState) => {
          const newState = [...prevState];
          newState[index].image = { file, preview: reader.result };
          return newState;
        });
      };

      reader.readAsDataURL(file);
    } else {
      // Handle the case when no file is selected
      setStateFunction((prevState) => {
        const newState = [...prevState];
        newState[index].image = null; // Set image to null
        newState[index].preview = null; // Optionally set preview to null
        return newState;
      });
    }
  };

  const handleProductInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleProductFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProduct({
          ...product,
          image: {
            file: event.target.files[0],
            preview: reader.result,
          },
        });
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      axios.get("category/").then((res) => {
        setCategory(res.data);
      });
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      product.title == "" ||
      product.description == "" ||
      product.price == "" ||
      product.category === null ||
      product.shipping_amount == "" ||
      product.stock_qty == "" ||
      product.image === null
    ) {
      // If any required field is missing, show an error message or take appropriate action
      // console.log("Please fill in all required fields");
      setIsLoading(false);

      // Swal.fire({
      //   icon: "warning",
      //   title: "Missing Fields!",
      //   text: "All fields are required to create a product",
      // });
      toast.warning("All fields with * are required to create a product");
      return;
    }

    try {
      // Create a FormData object
      setIsLoading(true);
      const formData = new FormData();

      // Append product data
      Object.entries(product).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append(key, value.file); // Assuming 'value' is an object with 'file' property
        } else {
          formData.append(key, value);
        }
      });

      // Append specifications data
      specifications.forEach((specification, index) => {
        Object.entries(specification).forEach(([key, value]) => {
          formData.append(`specifications[${index}][${key}]`, value);
        });
      });

      colors.forEach((color, index) => {
        Object.entries(color).forEach(([key, value]) => {
          if (
            key === "image" &&
            value &&
            value.file &&
            value.file.type.startsWith("image/")
          ) {
            formData.append(
              `colors[${index}][${key}]`,
              value.file,
              value.file.name
            );
          } else {
            // console.log(String(value));
            formData.append(`colors[${index}][${key}]`, String(value)); // Convert `value` to a string
          }
        });
      });

      // Append sizes data
      sizes.forEach((size, index) => {
        Object.entries(size).forEach(([key, value]) => {
          formData.append(`sizes[${index}][${key}]`, value);
        });
      });

      // Append gallery data
      gallery.forEach((item, index) => {
        if (item.image) {
          formData.append(`gallery[${index}][image]`, item.image.file);
        }
      });

      // console.log(formData);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await apiInstance.post(
        `vendor-product-create/${userData?.vendor_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // navigate('/vendor/products/')

      // Swal.fire({
      //   icon: "success",
      //   title: "Product Created Successfully",
      //   text: "This product has been successfully created",
      // });

      toast.success("Product creation request has been successfully sent!");

      // const data = await response.json();
      navigate("/vendor/products");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
      // toast.error(error.message);
    }
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-1 lg:py-12">
              <Sidebar route="addproduct" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
              <Breadcrumb title="Add New Product" />

              {/* Contents Here */}
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Basic Informations" {...a11yProps(0)} />
                    <Tab label="Gallery" {...a11yProps(1)} />
                    <Tab label="Specifications" {...a11yProps(2)} />
                    <Tab label="Size" {...a11yProps(3)} />
                    <Tab label="Color" {...a11yProps(4)} />
                  </Tabs>
                </Box>
                <form
                  className="main-body"
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <CustomTabPanel value={value} index={0}>
                    <div className="overflow-x-auto mt-5">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="...">
                          <header className="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
                            {product.image && product.image.preview ? (
                              <img
                                className="inline-flex object-cover border-2 border-[#fff] "
                                //   rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48
                                src={product.image.preview}
                                alt="Product Thumbnail Preview"
                              />
                            ) : (
                              <img
                                className="inline-flex object-cover border-2 border-[#fff] "
                                //   rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48
                                src={
                                  "/default/elementor-placeholder-image.webp"
                                }
                                alt=""
                              />
                            )}
                            {product.title !== "" && (
                              <h4 className="text-2xl text-gray-500 font-bold mt-2">
                                {product.title}
                              </h4>
                            )}
                            {product.title === "" && (
                              <h4 className="text-2xl text-gray-500 font-bold mt-2">
                                Product Title
                              </h4>
                            )}
                          </header>
                        </div>
                        <div className="col-span-2 ...">
                          <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
                            <div className="grid sm:grid-cols-1 gap-y-7 gap-x-12">
                              <div>
                                <label className="text-sm mb-2 block">
                                  Product Thumbnail{" "}
                                  <code className="text-red-700">*</code>
                                </label>
                                <input
                                  type="file"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  name="image"
                                  id=""
                                  onChange={handleProductFileChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Title <code className="text-red-700">*</code>
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter product title"
                                  value={product.title || ""}
                                  onChange={handleProductInputChange}
                                  name="title"
                                />
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-1 gap-y-7 gap-x-12 mt-5">
                              <div>
                                <label className="text-sm mb-2 block">
                                  Description{" "}
                                  <code className="text-red-700">*</code>
                                </label>
                                <textarea
                                  className="bg-gray-100 w-full text-sm"
                                  id=""
                                  cols={30}
                                  rows={10}
                                  name="description"
                                  value={product.description || ""}
                                  onChange={handleProductInputChange}
                                  placeholder="Enter product descriptions"
                                />
                                {/* <textarea
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  onChange={handleShopInputChange}
                                  name="description"
                                  value={vendorData?.description}
                                >
                                  {vendorData?.description}
                                </textarea> */}
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12 mt-5">
                              <div>
                                <label className="text-sm mb-2 block">
                                  Category{" "}
                                  <code className="text-red-700">*</code>
                                </label>
                                <select
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  id=""
                                  name="category"
                                  value={product.category || ""}
                                  onChange={handleProductInputChange}
                                >
                                  <option value="">- Select Category -</option>
                                  {category.map((c, index) => (
                                    <option key={index} value={c.id}>
                                      {c.title}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Brand
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter brand"
                                  name="brand"
                                  value={product.brand || ""}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Sale Price{" "}
                                  <code className="text-red-700">*</code>
                                </label>
                                <input
                                  type="number"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter sales price"
                                  name="price"
                                  value={product.price || ""}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Regular Price
                                </label>
                                <input
                                  type="number"
                                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter market price"
                                  name="old_price"
                                  value={product.old_price || ""}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Shipping Amount{" "}
                                  <code className="text-red-700">*</code>
                                </label>
                                <input
                                  type="number"
                                  className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter shipping amount"
                                  name="shipping_amount"
                                  value={product.shipping_amount || ""}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div>
                                <label className="text-sm mb-2 block">
                                  Stock Qty{" "}
                                  <code className="text-red-700">*</code>
                                </label>
                                <input
                                  type="number"
                                  className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter stock quantity"
                                  name="stock_qty"
                                  value={product.stock_qty || ""}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-1 gap-y-7 gap-x-12 mt-5">
                              <div>
                                <label className="text-sm mb-2 block">
                                  Tags
                                </label>
                                <input
                                  type="text"
                                  className="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                  placeholder="Enter tags"
                                  name="tags"
                                  value={product.tags || ""}
                                  onChange={handleProductInputChange}
                                />
                                <span
                                  style={{ fontSize: 12 }}
                                  className="text-muted"
                                >
                                  NOTE: Seperate tags with comma
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    {/* Gallery Tab */}
                    <div className="overflow-x-auto mt-5">
                      {gallery.map((item, index) => (
                        <div className="grid grid-cols-5 gap-4 mb-4">
                          <div className="">
                            {item.image && (
                              <img
                                className="inline-flex object-cover border-2 border-[#fff] "
                                //   rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48
                                src={item.image.preview}
                                alt={`Preview for gallery item ${index + 1}`}
                              />
                            )}

                            {!item.image && (
                              <img
                                className="inline-flex object-cover border-2 border-[#fff] "
                                //   rounded-full bg-indigo-50 h-24 w-24 !h-48 !w-48
                                src={
                                  "/default/elementor-placeholder-image.webp"
                                }
                                alt={`Preview for gallery item ${index + 1}`}
                              />
                            )}
                          </div>
                          <div className="col-span-3">
                            <div>
                              <label className="text-sm mb-2 block">
                                Product Image
                              </label>
                              <input
                                type="file"
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                name=""
                                id=""
                                onChange={(e) =>
                                  handleImageChange(index, e, setGallery)
                                }
                              />
                            </div>
                          </div>
                          <div className="">
                            <button
                              onClick={() => handleRemove(index, setGallery)}
                              type="button"
                              className="text-red-500 hover:underline mt-10"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      {gallery < 1 && <h4>No Images Selected</h4>}
                      <button
                        type="button"
                        onClick={() => handleAddMore(setGallery)}
                        className="text-green-500 hover:underline mt-10"
                      >
                        Add More Images
                      </button>
                    </div>
                  </CustomTabPanel>
                  {/* Specification Tab */}
                  <CustomTabPanel value={value} index={2}>
                    <div className="overflow-x-auto mt-5">
                      {specifications.map((specification, index) => (
                        <div className="grid grid-cols-6 gap-4 mb-4">
                          <div className="col-span-2">
                            <div>
                              <label className="text-sm mb-2 block">
                                Title
                              </label>
                              <input
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                placeholder="Enter title"
                                value={specification.title || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "title",
                                    e.target.value,
                                    setSpecifications
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div>
                              <label className="text-sm mb-2 block">
                                Content
                              </label>
                              <input
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                placeholder="Enter details"
                                value={specification.content || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "content",
                                    e.target.value,
                                    setSpecifications
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="">
                            <button
                              type="button"
                              className="text-red-500 hover:underline mt-10"
                              onClick={() =>
                                handleRemove(index, setSpecifications)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      {specifications.length < 1 && (
                        <h4>No Specification Form</h4>
                      )}
                      <button
                        type="button"
                        className="text-green-500 hover:underline mt-10"
                        onClick={() => handleAddMore(setSpecifications)}
                      >
                        Add More Specifications
                      </button>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={3}>
                    {/* Sizes Tab */}
                    <div className="overflow-x-auto mt-5">
                      {sizes.map((s, index) => (
                        <div className="grid grid-cols-6 gap-4 mb-4">
                          <div className="col-span-2">
                            <div>
                              <label className="text-sm mb-2 block">
                                Title
                              </label>
                              <input
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                name=""
                                placeholder="Enter title ( eg.: XXL )"
                                id=""
                                value={s.name || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "name",
                                    e.target.value,
                                    setSizes
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div>
                              <label className="text-sm mb-2 block">
                                Price
                              </label>
                              <input
                                type="number"
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                placeholder="Enter price"
                                name=""
                                id=""
                                value={s.price || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "price",
                                    e.target.value,
                                    setSizes
                                  )
                                }
                              />
                              <span
                                  style={{ fontSize: 12 }}
                                  className="text-muted"
                                >
                                  NOTE: Applicable if price are different according to sizes
                                </span>
                            </div>
                          </div>
                          <div className="">
                            <button
                              type="button"
                              className="text-red-500 hover:underline mt-10"
                              onClick={() => handleRemove(index, setSizes)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      {sizes < 1 && <h4>No Size Added</h4>}
                      <button
                        type="button"
                        className="text-green-500 hover:underline mt-10"
                        onClick={() => handleAddMore(setSizes)}
                      >
                        Add More Sizes
                      </button>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={4}>
                    {/* Colors Tab */}
                    <div className="overflow-x-auto mt-5">
                      {colors.map((c, index) => (
                        <div className="grid grid-cols-11 gap-4 mb-4">
                          <div className="col-span-2">
                            <div>
                              <label className="text-sm mb-2 block">Name</label>
                              <input
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                name=""
                                placeholder="Green"
                                id=""
                                value={c.name || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "name",
                                    e.target.value,
                                    setColors
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div>
                              <label className="text-sm mb-2 block">Code</label>
                              <input
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                placeholder="#f4f7f6"
                                name=""
                                id=""
                                value={c.color_code || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "color_code",
                                    e.target.value,
                                    setColors
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-span-4">
                            <div>
                              <label className="text-sm mb-2 block">
                                Image
                              </label>
                              <input
                                type="file"
                                className=""
                                name=""
                                id=""
                                onChange={(e) =>
                                  handleImageChange(index, e, setColors)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-span-2">
                            {c.image && (
                              <img
                                src={c.image.preview}
                                alt={`Preview for gallery item ${index + 1}`}
                                className="inline-flex object-cover border-2 border-[#fff] h-20 w-auto"
                              />
                            )}
                            {!c.image && (
                              <img
                                src="/default/elementor-placeholder-image.webp"
                                alt={`Preview for gallery item ${index + 1}`}
                                className="inline-flex object-cover border-2 border-[#fff] h-20 w-auto "
                              />
                            )}
                          </div>
                          <div className="col-span-1">
                            <button
                              type="button"
                              className="text-red-500 hover:underline mt-10"
                              onClick={() => handleRemove(index, setColors)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      {colors < 1 && <h4>No Colors Added</h4>}
                      <button
                        type="button"
                        className="text-green-500 hover:underline mt-10"
                        onClick={() => handleAddMore(setColors)}
                      >
                        Add More Colors
                      </button>
                    </div>
                  </CustomTabPanel>
                  <div className="overflow-x-auto mt-5">
                    <div className="d-flex justify-content-center mb-5">
                      {isLoading === false && (
                        <button
                          className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
                          type="submit"
                        >
                          Create Product
                        </button>
                      )}

                      {isLoading === true && (
                        <button
                          className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm font-semibold bg-gray-500 text-white rounded hover:bg-gray-600"
                          disabled
                        >
                          Creating...
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
