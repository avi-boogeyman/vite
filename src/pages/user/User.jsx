import { Button } from "antd";
import { useNavigate } from "react-router";
import { Typography } from "antd";
const { Title } = Typography;

import { Table } from "antd";
import { APP_PATHS } from "../../constants/appRoutes";
import useApiService from "../../hooks/apiService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.usersSlice.users);
  const { getUsers, deleteUser } = useApiService();

  console.log(user);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    // setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response); // Ensure you access `data`
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      // setLoading(false);
    }
  };

  const removeUser = async (userId) => {
    // setLoading(true);
    try {
      const response = await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      // render: (value, record, index) => {

      // }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (value, record) => (
        <div className="flex gap-2">
          {/* <Link to={APP_PATHS.USER_EDIT}>Edit</Link> */}

          <Button
            type="link"
            className="!p-0"
            onClick={() => {
              navigate(`${APP_PATHS.USER_EDIT.replace(":userId", record.id)}`);
            }}
          >
            Edit
          </Button>

          <Button
            type="link"
            className="!p-0"
            danger
            onClick={() => {
              removeUser(record.id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex">
        <Title level={3} className="flex-grow">
          Users
        </Title>

        <Button
          type="primary"
          onClick={() => {
            navigate(APP_PATHS.USER_CREATE);
          }}
        >
          Create User
        </Button>
      </div>

      <Table rowKey={(record) => `${record.id}_${record.email}`} columns={columns} dataSource={users} size="small" />
    </>
  );
};

export default User;
