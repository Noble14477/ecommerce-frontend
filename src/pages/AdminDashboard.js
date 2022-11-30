import React, { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminActionBtn from "./AdminActionBtn";

//redux
import { useDispatch} from "react-redux"
import { getCategories } from "../redux/actions/categoryAction";
import { getProducts } from "../redux/actions/productActions";
import AdminBody from "./AdminBody";

const AdminDashboard = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCategories())

  },[dispatch])
  useEffect(()=>{
    dispatch(getProducts())

  },[dispatch])

  return (
    <section>
      <AdminHeader />
      <AdminActionBtn />
      <AdminBody/>
    </section>
  );
};

export default AdminDashboard;
