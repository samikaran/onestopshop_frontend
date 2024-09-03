import { React, useEffect, useState, useContext } from "react";
import apiInstance from "../../utils/axios";
import ProductCard from "../../components/layouts/products/ProductCard";
import Loader from "../../components/layouts/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  let [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
  const [loadingStates, setLoadingStates] = useState({});
  let [loading, setLoading] = useState(true);

  const axios = apiInstance;

  useEffect(() => {
    apiInstance.get(`products/`).then((response) => {
      setProducts(response.data);
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading === false && (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-5 lg:items-start lg:gap-8">
              <div className="lg:col-span-5">
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {products?.map((i, index) => (
                    <ProductCard data={i} key={index} />
                  ))}

                  {products?.length === 0 ? (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                      No products found!
                    </h1>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {loading === true && <Loader />}
    </>
  );
};

export default Products;
