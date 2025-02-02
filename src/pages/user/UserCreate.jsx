import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router";
import { Typography } from "antd";
const { Title } = Typography;
import { APP_PATHS } from "../../constants/appRoutes";
import { useFormik } from "formik";
import { FORM_STYLES } from "../../constants/tailwindStyles";
import * as Yup from "yup";
import { EMAIL_VALIDATION_SCHEMA } from "../../constants/validationSchemas";
import useApiService from "../../hooks/apiService";

const UserCreate = () => {
  const navigate = useNavigate();
  const { addUser } = useApiService();

  const userFormik = useFormik({
    initialValues: {
      name: null,
      email: null,
      role: null,
      status: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: EMAIL_VALIDATION_SCHEMA,
      role: Yup.string().required("Role is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: async (values) => {
      console.log("userFormik >>> ", values);

      try {
        await addUser(values);
        navigate(APP_PATHS.USER);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        //
      }
    },
  });

  return (
    <>
      <div className="flex gap-2">
        <Button
          icon={<p> B </p>}
          onClick={() => {
            navigate(APP_PATHS.USER);
          }}
        />

        <Title level={3}>User Create</Title>
      </div>

      <form onSubmit={userFormik.handleSubmit}>
        <div className={FORM_STYLES.GROUP}>
          <label htmlFor="name" className={`${FORM_STYLES.LABEL}`}>
            Name
          </label>

          <Input
            id="name"
            name="name"
            placeholder="Name"
            onChange={userFormik.handleChange}
            value={userFormik.values.name}
            status={userFormik.touched.name && userFormik.errors.name ? "error" : ""}
          />

          {userFormik.touched.name && userFormik.errors.name && (
            <p className={FORM_STYLES.ERROR}>{userFormik.errors.name}</p>
          )}
        </div>

        <div className={FORM_STYLES.GROUP}>
          <label htmlFor="email" className={`${FORM_STYLES.LABEL}`}>
            Email
          </label>

          <Input
            id="email"
            name="email"
            placeholder="Email"
            onChange={userFormik.handleChange}
            value={userFormik.values.email}
            status={userFormik.touched.email && userFormik.errors.email ? "error" : ""}
          />

          {userFormik.touched.email && userFormik.errors.email && (
            <p className={FORM_STYLES.ERROR}>{userFormik.errors.email}</p>
          )}
        </div>

        <div className={FORM_STYLES.GROUP}>
          <label htmlFor="role" className={`${FORM_STYLES.LABEL}`}>
            Role
          </label>

          <Select
            id="role"
            name="role"
            placeholder="Role"
            className="w-full"
            onChange={(value) => {
              userFormik.setFieldValue("role", value);
            }}
            value={userFormik.values.role}
            status={userFormik.touched.role && userFormik.errors.role ? "error" : ""}
            options={[
              {
                value: "admin",
                label: "Admin",
              },
              {
                value: "user",
                label: "User",
              },
              {
                value: "editor",
                label: "Editor",
              },
            ]}
          />

          {userFormik.touched.role && userFormik.errors.role && (
            <p className={FORM_STYLES.ERROR}>{userFormik.errors.role}</p>
          )}
        </div>

        <div className={FORM_STYLES.GROUP}>
          <label htmlFor="role" className={`${FORM_STYLES.LABEL}`}>
            Status
          </label>

          <Select
            id="status"
            name="status"
            placeholder="Status"
            className="w-full"
            onChange={(value) => {
              userFormik.setFieldValue("status", value);
            }}
            value={userFormik.values.status}
            status={userFormik.touched.status && userFormik.errors.status ? "error" : ""}
            options={[
              {
                value: "active",
                label: "Active",
              },
              {
                value: "inactive",
                label: "Inactive",
              },
            ]}
          />

          {userFormik.touched.status && userFormik.errors.status && (
            <p className={FORM_STYLES.ERROR}>{userFormik.errors.status}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            onClick={() => {
              userFormik.resetForm();
            }}
          >
            Clear
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserCreate;
