import React from "react";
import AdminHomePage from "../containers/AdminHomePage";
import TaskBoard from "../containers/TaskBoard";
import HomeIcon from "@material-ui/icons/Home";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import NotFound from "../containers/NotFound";
import Orders from "../containers/Orders";
import OrdersConfig from "../containers/OrdersConfig";
import OrderInfo from "../containers/OrderInfo";
import SigninPage from "../containers/SigninPage/index";
import SignupPage from "../containers/SignupPage";


export const ROUTES = [
  {
    name: "Đăng nhập",
    path: "/signin",
    component: SigninPage,
    exact: true
  },
  {
    name: "Đăng ký",
    path: "/signup",
    component: SignupPage,
    exact: true
  },
  {
    path: "",
    name: "Lỗi",
    component: NotFound,
    exact: true
  }
];
export const ADMIN_ROUTES = [
  {
    path: "/",
    name: "TRANG QUẢN TRỊ",
    exact: true,
    component: AdminHomePage,
    icon: <HomeIcon />
  },
  {
    path: "/admin/task-board",
    name: "QUẢN LÝ SẢN PHẨM",
    exact: true,
    component: TaskBoard,
    icon: <FormatListBulletedIcon />
  },
  {
    path: "/admin/orders",
    name: "DANH SÁCH ĐƠN HÀNG",
    exact: true,
    component: Orders,
    icon: <FormatListBulletedIcon />
  },
  {
    path: "/admin/orders-table",
    name: "QUẢN LÝ ĐƠN HÀNG",
    exact: true,
    component: OrdersConfig,
    icon: <FormatListBulletedIcon />
  },
  {
    path: "/admin/orders-table/:id",
    name: "CHI TIẾT ĐƠN HÀNG",
    exact: false,
    component: OrderInfo
  },
  // {
  //   path: "",
  //   name: "Lỗi",
  //   component: NotFound,
  //   exact: true
  // }
];
