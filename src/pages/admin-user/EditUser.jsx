import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form, {
  FormField,
  FormInput,
  FormLabel,
  FormTextarea,
  FormMessageError,
  FormSelect,
} from "../../components/form/Form";
import { notifyError, notifySuccess } from "../../components/toast/Toast";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Helmet from "../../components/helmet/Helmet";
import adminApi from "../../api/adminApi";
import userApi from "../../api/userApi";
import "./admin-user.scss";
import Checkbox from "../../components/checkbox/Checkbox";

const EditUser = (props) => {
  const params = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Bắt buộc")
        .min(3, "Tối thiểu 3 kí tự")
        .matches(
          /[a-zA-Z-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/,
          "Không chứa ký tự dặc biệt"
        ),
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        ),
      address: Yup.string(),
      phone: Yup.string().matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "SĐT không hợp lệ"
      ),
    }),
    onSubmit: (values) => {
      const editUser = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        isAdmin: isAdmin,
      };
      const putUser = async () => {
        try {
          const id = params.id;
          const res = await adminApi.putUser(id, editUser);
          notifySuccess(res.message);
        } catch (error) {
          notifyError(
            error.response.data.errors.email || error.response.data.errors.name
          );
        }
      };
      putUser();
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = params.id;
        const res = await adminApi.getInfoUser(id);
        setUser(res.user);
        setIsAdmin(res.user.isAdmin);
      } catch (error) {
        notifyError(error.response.data.message);
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleBack = () => {
    navigate("/admin/users");
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <Helmet title="Sửa người dùng">
        <div className="grid">
          <div className="card">
            <div className="edit-user">
              <div className="edit-user__header">
                <div className="card__header">
                  <h3>Sửa người dùng</h3>
                </div>
                <div className="edit-user__header__right">
                  <div
                    onClick={() => handleBack()}
                    className="edit-user__header__right-btn btn--cancel"
                  >
                    Quay lại
                  </div>
                  <div
                    onClick={() => handleSubmit()}
                    className="edit-user__header__right-btn btn--confirm"
                  >
                    Sửa
                  </div>
                </div>
              </div>
              <div className="edit-user__body">
                <Form>
                  <FormField>
                    <FormInput
                      type="text"
                      name="name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="name" label="Tên" />
                    <FormMessageError message={formik.errors.name} />
                  </FormField>
                  <FormField>
                    <FormInput
                      type="email"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="email" label="Email" />
                    <FormMessageError message={formik.errors.email} />
                  </FormField>

                  <FormField>
                    <FormInput
                      type="text"
                      name="phone"
                      id="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="phone" label="Số điện thoại" />
                    <FormMessageError message={formik.errors.phone} />
                  </FormField>
                  <FormField>
                    <FormInput
                      type="text"
                      name="address"
                      id="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="address" label="Địa chỉ" />
                    <FormMessageError message={formik.errors.address} />
                  </FormField>
                  <FormField>
                    <Checkbox
                      checked={isAdmin}
                      onChange={() => setIsAdmin(!isAdmin)}
                      label="Admin"
                    />
                  </FormField>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default EditUser;
