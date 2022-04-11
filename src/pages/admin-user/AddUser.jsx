import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import "./admin-user.scss";
import Checkbox from "../../components/checkbox/Checkbox";

const AddUser = props => {

  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Bắt buộc").min(3, "Tối thiểu 3 kí tự").matches(/[a-zA-Z-_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
        , "Không chứa ký tự dặc biệt"),
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        ),
      address: Yup.string(),
      phone: Yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "SĐT không hợp lệ"),
      password: Yup.string().required("Bắt buộc").min(8, "Tối thiểu 8 kí tự"),
      confirmPassword: Yup.string().required("Bắt buộc").oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: (values) => {
      const newUser = {
        name: values.name,
        phone: values.phone,
        password: values.password,
        address: values.address,
        email: values.email,
        isAdmin: isAdmin
      }
      const postUser = async () => {
        try {
          const res = await adminApi.addUser(newUser)
          notifySuccess(res.message)
          formik.resetForm({
            name: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            confirmPassword: ''
          })
        } catch (error) {
          notifyError(
            error.response.data.message ||
              error.response.data.email ||
              error.response.data.name ||
              error.response.data.password
          );
        }
      }
      postUser()
    },
  });

  const handleBack = () => {
    navigate('/admin/users')
  }

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  return (
    <>
      <Helmet title="Thêm người dùng">
        <div className="grid">
          <div className="card">
            <div className="add-user">
              <div className="add-user__header">
                <div className="card__header">
                  <h3>Thêm người dùng</h3>
                </div>
                <div className="add-user__header__right">
                  <div onClick={() => handleBack()} className="add-user__header__right-btn btn--cancel">
                    Quay lại
                  </div>
                  <div onClick={() => handleSubmit()} className="add-user__header__right-btn btn--confirm">
                    Thêm
                  </div>
                </div>
              </div>
              <div className="add-user__body">
                <Form>
                  <FormField>
                    <FormInput type="text"
                      name="name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="name" label="Tên"/>
                    <FormMessageError message={formik.errors.name}/>
                  </FormField>
                  <FormField>
                    <FormInput type="email"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="email" label="Email"/>
                    <FormMessageError message={formik.errors.email}/>
                  </FormField>
                  <FormField>
                  <FormInput 
                  id="password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <FormLabel for="password" label="Mật khẩu" />
                  <FormMessageError message={formik.errors.password}/>
                </FormField>
                <FormField>
                  <FormInput 
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <FormLabel for="confirmPassword" label="Nhập lại mật khẩu" />
                  <FormMessageError message={formik.errors.confirmPassword}/>
                </FormField>
                  <FormField>
                    <FormInput type="text"
                      name="phone"
                      id="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="phone" label="Số điện thoại"/>
                    <FormMessageError message={formik.errors.phone}/>
                  </FormField>
                  <FormField>
                    <FormInput type="text"
                      name="address"
                      id="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    <FormLabel for="address" label="Địa chỉ"/>
                    <FormMessageError message={formik.errors.address}/>
                  </FormField>
                  <FormField>
                    <Checkbox checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} label="Admin"/> 
                  </FormField>
                  
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Helmet>
    </>
  )
}



export default AddUser