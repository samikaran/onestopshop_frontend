import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reviews from "./Reviews";

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

const ProductTab = ({ product, specifications, seller }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(specifications);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Descriptions" {...a11yProps(0)} />
          <Tab label="Seller" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="mt-2">
          <h3 className="text-lg font-bold text-gray-800">
            Product Description
          </h3>
          <p className="text-sm text-gray-400 mt-4">{product.description}</p>
        </div>
        {specifications !== null && (
          <div>
            <hr className="my-8" />
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Specifications
            </h3>
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {specifications?.map((s, index) => (
                  <div
                    className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                    key={index}
                  >
                    <dt className="font-medium text-gray-900">{s.title}</dt>
                    <dd className="text-gray-700 sm:col-span-2">{s.content}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="mt-4">
          {seller ? seller.name : "Seller not mentioned"}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Reviews product={product} />
      </CustomTabPanel>
    </Box>
  );
};

export default ProductTab;
