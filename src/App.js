import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pagination from "./Pagination";
import "./App.css";

export default function App() {
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);

  const handlePageNumbers = (pageNumber) => {
    setPage(pageNumber);
  };

  const fetchProducts = async () => {
    try {
      const response = await Axios.get(
        `https://dummyjson.com/products?page=${page}`
      );
      setProducts(response.data.products);
      setTotalPages(Math.floor(response?.data?.products?.length / 5));
      setCategory(response?.data?.products[page + page * 4]?.category);
      console.log(response.data.products[page + page * 4].category);
      // console.log("totalPages: ", response);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setCategory(products[page + page * 4]?.category);
  }, [page]);

  useEffect(() => {
    fetchProducts();
  });

  return (
    <div className="App">
      <div className="header">
        <h1>Products with Pagination</h1>
      </div>
      <div className="container">
        <p style={{ color: "blue", padding: "10px", fontFamily: "Arial" }}>
          Page Number: {page + 1}
        </p>
        <strong>Category is {category}</strong>
        <div>
          {products.slice(page + page * 4, page * 5 + 5).map((product) => (
            <div key={product.id} className="products-container">
              <div className="data-products">
                <span style={{ color: "red", fontSize: "40px" }}>
                  {product.title}
                </span>
                <img src={product.thumbnail} alt={product.title} />
                <span> Description: {product.description}</span>
                <span>
                  {" "}
                  Brand: {product.brand ? product.brand : "No Brand"}
                </span>
                <span>
                  {" "}
                  Price: $
                  {product.price > 200 && product.price
                    ? product.price + " (Expensive) "
                    : product.price + " (Cheap)"}
                </span>
                <span>
                  Rating:{" "}
                  {product.rating >= 3.5
                    ? product.rating + " /5 " + "(good)"
                    : product.rating + " /5" + " (bad)"}{" "}
                </span>
                <span>
                  Avaliable:{" "}
                  {product.stock > 50
                    ? product.stock + "(Avaliable)"
                    : product.stock + "(Hurry!)"}{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageNumbers}
      />
      <strong>Page Numbers</strong>
    </div>
  );
}
