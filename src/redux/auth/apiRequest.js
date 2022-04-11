import auth from "../../api/authApi";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} from "./authSlice";
import Cookies from "universal-cookie";
import {notifyError, notifySuccess} from '../../components/toast/Toast'




const cookies = new Cookies();

export const loginUser = async (user, dispatch, navigate, location) => {
  dispatch(loginStart());
  try {
    const res = await auth.login(user);
    dispatch(loginSuccess(res.user));
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    if(res.user.admin) {
      navigate('/admin/dashboard')
    }else {
      navigate('/')
    }
  } catch (error) {
    dispatch(loginFailed());
    notifyError(error.response.data.message);
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await auth.register(user);
    dispatch(registerSuccess());
    navigate("/login");
    notifySuccess(res.message);
  } catch (error) {
    console.log(error)
    dispatch(registerFailed());
    notifyError(
      error.response.data.message ||
        error.response.data.email ||
        error.response.data.name ||
        error.response.data.password
    );
    
  }
};

export const logoutUser = (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
   
    dispatch(logoutSuccess());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
    notifyError(error.response.data.message);
  }
};
