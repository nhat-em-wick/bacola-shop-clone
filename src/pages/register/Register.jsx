import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import Section, { SectionBody } from "../../components/section/Section";
import Form,{ FormField, FormInput, FormMessageError, FormLabel } from "../../components/form/Form";
import Helmet from "../../components/helmet/Helmet";
import { useDispatch } from "react-redux";

import { registerUser } from "../../redux/auth/apiRequest";


import './register.scss'
const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Bắt buộc").matches(/[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{3,}$/, "Từ 3 ký tự trở lên"),
      email: Yup.string().required("Bắt buộc").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Email không hợp lệ"),
      password: Yup.string().required("Bắt buộc").min(8, "Tối thiểu 8 kí tự"),
      confirmPassword: Yup.string().required("Bắt buộc").oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp")
    }),
    onSubmit: (values) => {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      registerUser(user, dispatch, navigate)
    }
  });



  return (
    <Helmet title="Đăng kí">
    <Section>
      <SectionBody>
        <div className="row">
          <div className="l-4 l-o-4 m-8 m-o-2 c-12">
            <div className="form-register">
              <h1 className="form-register__title">
                Đăng kí
              </h1>
              <Form onSubmit={formik.handleSubmit}>
                <FormField>
                  <FormInput
                  id="name"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <FormLabel for="name" label="Tên" />
                  <FormMessageError message={formik.errors.name} />
                </FormField>
                <FormField>
                  <FormInput 
                  id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <FormLabel for="email" label="Email" />
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
                <button className="form-register__btn" type="submit">đăng kí</button>
                <div className="form-register__link">
                  <div className="form-register__link__txt">
                    Đã có tài khoản? 
                  </div>
                  <Link to="/login" className="form-register__link__login">
                    Đăng nhập
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
    </Helmet>
  );
};

export default Register;
