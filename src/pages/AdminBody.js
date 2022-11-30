import React from "react";
import Card from "./Card";

//redux
import { useSelector } from "react-redux";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <div className="m-4">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {products && products.map((product) => {
          return (
                <Card product={product} key={product._id} adminPage={true}/>
            
          );
        })}
      </div>
    </div>
  );
};

export default AdminBody;
