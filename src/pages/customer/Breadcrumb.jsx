import React from "react";

const Breadcrumb = ({title}) => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        {/* <nav
          aria-label="Breadcrumbs"
          className="order-first flex space-x-2 text-sm font-semibold"
        >
          <a
            className="text-slate-500 hover:text-slate-600"
            href="/components#product-application-ui"
          >
            Dashboard
          </a>
          <div aria-hidden="true" className="select-none text-slate-400">
            /
          </div>
          <a
            className="text-slate-500 hover:text-slate-600"
            href="/components#product-application-ui-headings"
          >
            Main Page
          </a>
        </nav> */}
      </div>
      <hr className="mt-4" />
    </>
  );
};

export default Breadcrumb;
