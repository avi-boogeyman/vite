import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { APP_PATHS } from "../constants/appRoutes";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const location = useLocation();

  const items = [
    {
      key: APP_PATHS.HOME,
      // icon: React.createElement(icon),
      label: <NavLink to={APP_PATHS.HOME}>Home</NavLink>,
    },
    {
      key: APP_PATHS.USER,
      // icon: React.createElement(icon),
      label: <NavLink to={APP_PATHS.USER}>User</NavLink>,
      // children: [
      //   {
      //     key: "/user/create",
      //     label: <NavLink to="/user/create">User Create</NavLink>,
      //   },
      //   {
      //     key: "/user/edit",
      //     label: <NavLink to="/user/edit">User Edit</NavLink>,
      //   },
      // ],
    },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState([]);

  useEffect(() => {
    console.log("location", location.pathname.split("/"));
    setSelectedMenuItem([`/${location.pathname.split("/")[1]}`]);
  }, [location]);

  return (
    <Layout className="h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedMenuItem} items={items} />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: "gray",
          }}
          className="mb-6"
        /> */}
        <Content className="mx-6 my-6">
          <div
            // style={{
            //   padding: 24,
            //   minHeight: 360,
            //   //   background: "pink",
            //   //   borderRadius: "1rem",
            // }}
            className="border rounded-lg shadow-lg p-5 min-h-[100%]"
          >
            {/* min-h-[calc(100%_-_64px)] */}
            <Outlet />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
