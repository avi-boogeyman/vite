import { useDispatch } from "react-redux";
import { API_PATHS } from "../constants/apiRoutes";
import useAxios from "./useAxios";
import { setUsers } from "../slices/usersSlice";

const useApiService = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.GET_USERS);
      console.log("GET_USERS >>> ", response);
      dispatch(setUsers(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (payload) => {
    try {
      const response = await axiosInstance.post(API_PATHS.GET_USERS, payload);
      console.log("ADD_USERS >>> ", response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await axiosInstance.get(`${API_PATHS.GET_USERS}/${userId}`);
      console.log("getUserById >>> ", response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userId, payload) => {
    try {
      const response = await axiosInstance.put(`${API_PATHS.GET_USERS}/${userId}`, payload);
      console.log("updateUser >>> ", response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axiosInstance.delete(`${API_PATHS.GET_USERS}/${userId}`);
      console.log("updateUser >>> ", response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
  };
};

export default useApiService;
