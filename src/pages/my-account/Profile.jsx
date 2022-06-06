import React, { useEffect, useState } from "react";

import Form, {
  FormField,
  FormInput,
  FormMessageError,
  FormLabel,
} from "../../components/form/Form";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import userApi from "../../api/userApi";
import { notifyError, notifySuccess } from "../../components/toast/Toast";
import Dialog from "../../components/dialog/Dialog";
import { loginSuccess } from "../../redux/auth/authSlice";
import Helmet from "../../components/helmet/Helmet";
import "./profile.scss";
const Profile = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [dialog, setDialog] = useState({
    type: "",
    title: "",
    body: "",
    text_confirm: "",
    text_cancel: "",
  });

  const [openDialog, setOpenDialog] = useState(false);


  const changeInfoUser = useFormik({
    initialValues: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        ),
        name: Yup.string().required("Bắt buộc").min(3, "Tối thiểu 3 kí tự").matches(/[a-zA-Z-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
        , "Không chứa ký tự dặc biệt"),
      address: Yup.string(),
      phone: Yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "SĐT không hợp lệ"),
    }),
    onSubmit: (values) => {
      const newInfo = {
        name: values.name.trim(),
        address: values.address.trim(),
        phone: values.phone.trim(),
      };
      const fetchChangeInfo = async () => {
        try {
          const res = await userApi.changeInfo(newInfo);
          notifySuccess(res.message);
          dispatch(loginSuccess(res.user))
        } catch (error) {
          notifyError(error.response.data);
        }
      };
      fetchChangeInfo();
    },
  });

  const changePassword = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Bắt buộc").min(8, "Tối thiểu 8 kí tự"),
      newPassword: Yup.string()
        .required("Bắt buộc")
        .min(8, "Tối thiểu 8 kí tự"),
      confNewPassword: Yup.string()
        .required("Bắt buộc")
        .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: (values) => {
      const newPassword = {
        password: values.password,
        newPassword: values.newPassword,
      };
      const fetchChangePassword = async () => {
        try {
          const res = await userApi.changePassword(newPassword);
          notifySuccess(res.message);
          changePassword.resetForm({
            password: '',
            newPassword: '',
            confNewPassword: '',
          });
        } catch (error) {
          console.log(error)
          notifyError(error.response.data.message);
        }
      }
      fetchChangePassword()
    },
  });

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await userApi.getInfoUser();
        setUser(res.user);
      } catch (error) {
        console.log(error);
        notifyError(error.response.data.message);
      }
    };
    getInfoUser();
  }, []);

  const handleChangeInfo = () => {
    setDialog({
      type: "info",
      title: "Thay đổi thông tin",
      content: "Bạn muốn thay đổi thông tin cá nhân?",
      text_cancel: "Hủy",
      text_confirm: "Xác nhận",
    });
    setOpenDialog(!openDialog);
  };
 
  const handleChangePassword = () => {
    setDialog({
      type: "password",
      title: "Thay đổi mật khẩu",
      content: "Bạn muốn thay đổi mật khẩu?",
      text_cancel: "Hủy",
      text_confirm: "Xác nhận",
    });
    setOpenDialog(!openDialog);
  };

  const handleConfirm = () => {
    if(dialog.type === 'info') {
      changeInfoUser.handleSubmit()
    }else {
      changePassword.handleSubmit()
    }
    setOpenDialog(!openDialog)
  }
  const handleCancel= () => {
    setOpenDialog(!openDialog)
  }

  return (
    <>
      <Helmet title="Tài khoản">
      <Dialog
        active={openDialog}
        title={dialog.title}
        content={dialog.content}
        text_cancel={dialog.text_cancel}
        text_confirm={dialog.text_confirm}
        confirm={() => handleConfirm()}
        cancel={() => handleCancel()}
      />
      <div className="profile">
        <div className="row">
          <div className="col l-8 m-6 c-12">
            <div className="profile__info">
              <div className="profile__title">Thông tin cá nhân</div>
              <Form>
                <FormField>
                  <FormInput
                    id="name"
                    type="text"
                    name="name"
                    value={changeInfoUser.values.name}
                    onChange={changeInfoUser.handleChange}
                  />
                  <FormLabel for="name" label="Tên" />
                  <FormMessageError message={changeInfoUser.errors.name} />
                </FormField>
                <FormField>
                  <FormInput
                    id="email"
                    type="email"
                    name="email"
                    disabled={true}
                    value={changeInfoUser.values.email}
                    onChange={changeInfoUser.handleChange}
                  />
                  <FormLabel for="email" label="Email" />
                  <FormMessageError message={changeInfoUser.errors.email} />
                </FormField>
                <FormField>
                  <FormInput
                    type="text"
                    name="phone"
                    id="phone"
                    value={changeInfoUser.values.phone}
                    onChange={changeInfoUser.handleChange}
                  />
                  <FormLabel for="phone" label="SĐT" />
                  <FormMessageError message={changeInfoUser.errors.phone} />
                </FormField>
                <FormField>
                  <FormInput
                    type="text"
                    name="address"
                    id="address"
                    value={changeInfoUser.values.address}
                    onChange={changeInfoUser.handleChange}
                  />
                  <FormLabel for="address" label="Địa chỉ" />
                  <FormMessageError message={changeInfoUser.errors.address} />
                </FormField>
                <div
                  className="profile__info__btn"
                  onClick={() => handleChangeInfo()}
                >
                  Lưu thông tin
                </div>
              </Form>
            </div>
          </div>
          <div className="col l-4 m-6 c-12">
            <div className="profile__password">
              <div className="profile__title">Thay đổi mật khẩu</div>
              <Form>
                <FormField>
                  <FormInput
                    value={changePassword.values.password}
                    type="password"
                    name="password"
                    id="password"
                    onChange={changePassword.handleChange}
                  />
                  <FormLabel for="password" label="Mật khẩu hiện tại" />
                  <FormMessageError message={changePassword.errors.password} />
                </FormField>
                <FormField>
                  <FormInput
                    type="password"
                    name="newPassword"
                    id="new-password"
                    value={changePassword.values.newPassword}
                    onChange={changePassword.handleChange}
                  />
                  <FormLabel for="new-password" label="Nhập mật khẩu mới" />
                  <FormMessageError
                    message={changePassword.errors.newPassword}
                  />
                </FormField>
                <FormField>
                  <FormInput
                    type="password"
                    name="confNewPassword"
                    id="conf-new-password"
                    value={changePassword.values.confNewPassword}
                    onChange={changePassword.handleChange}
                  />
                  <FormLabel
                    for="conf-new-password"
                    label="Nhập lại mật khẩu mới"
                  />
                  <FormMessageError
                    message={changePassword.errors.confNewPassword}
                  />
                </FormField>
                <div
                  className="profile__password__btn"
                  onClick={() => handleChangePassword()}
                >
                  Thay đổi mật khẩu
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      </Helmet>
    </>
  );
};

export default Profile;
