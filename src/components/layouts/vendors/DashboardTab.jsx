import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

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

const DashboardTab = ({ products, orders }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Products" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white font-[sans-serif]">
            <thead className="bg-[#3e4095] whitespace-nowrap">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  #ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap divide-y divide-gray-200">
              {products?.map((p, index) => (
                <tr className="hover:bg-blue-50" key={index}>
                  <td className="px-6 py-4 text-sm">{p.sku}</td>
                  <td className="px-6 py-4 text-sm" title={p.title}>
                    {p.title.length > 40
                      ? p.title.slice(0, 40) + "..."
                      : p.title}
                  </td>
                  <td className="px-6 py-4 text-sm">${p.price}</td>
                  <td className="px-6 py-4 text-sm">{p.stock_qty}</td>
                  <td className="px-6 py-4 text-sm">{p.order_count}</td>
                  <td className="px-6 py-4 text-sm">
                    {p?.status?.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 flex">
                    <Link
                      to={`/product/${p.slug}/${p.id}`}
                      className="mr-2"
                      title="View"
                    >
                      <FaEye className="w-5 fill-blue-500 hover:fill-blue-700" />
                    </Link>
                    <Link to={"/"} className="mr-2" title="Edit">
                      <FiEdit className="w-5 text-green-500 hover:text-green-700" />
                    </Link>
                    <Link to={"/"} title="Delete">
                      <RiDeleteBin6Line className="w-5 fill-red-500 hover:fill-red-700" />
                    </Link>
                  </td>
                </tr>
              ))}

              {products < 1 && <h5 className="mt-4 p-3">No products yet</h5>}
            </tbody>
          </table>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white font-[sans-serif]">
            <thead className="bg-[#3e4095] whitespace-nowrap">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  #ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap divide-y divide-gray-200">
              {orders?.map((o, index) => (
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 text-sm">#{o.oid}</td>
                  <td className="px-6 py-4 text-sm">{o.full_name}</td>
                  <td className="px-6 py-4 text-sm">
                    {moment(o.date).format("MMM D, YYYY")}
                  </td>
                  <td className="px-6 py-4 text-sm">{o.order_status}</td>
                  <td className="px-6 py-4">
                    <Link>
                      <FaEye className="w-5 fill-blue-500 hover:fill-blue-700" />
                    </Link>
                  </td>
                </tr>
              ))}

              {orders < 1 && <h5 className="mt-4 p-3">No orders yet</h5>}
            </tbody>
          </table>
        </div>
      </CustomTabPanel>
    </Box>
  );
};

export default DashboardTab;
