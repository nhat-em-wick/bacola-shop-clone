import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Section, { SectionBody } from "../../components/section/Section";
import Form, {
  FormField,
  FormInput,
  FormMessageError,
  FormLabel,
} from "../../components/form/Form";
import Helmet from "../../components/helmet/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/apiRequest";

import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        ),
      password: Yup.string().required("Bắt buộc").min(8, "Tối thiểu 8 kí tự"),
    }),
    onSubmit: (values) => {
      const newUser = {
        email: values.email,
        password: values.password,
      };
      loginUser(newUser, dispatch, navigate, location)
    },
  });

  return (
    <Helmet title="Đăng nhập">
    <Section>
      <SectionBody>
        <div className="row">
          <div className="l-4 l-o-4 m-8 m-o-2 c-12">
            <div className="form-login">
              <h1 className="form-login__title">Đăng nhập</h1>
              <Form onSubmit={formik.handleSubmit}>
                <FormField>
                  <FormInput
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <FormLabel label="Email" />
                  <FormMessageError message={formik.errors.email} />
                </FormField>
                <FormField>
                  <FormInput
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <FormLabel label="Mật khẩu" />
                  <FormMessageError message={formik.errors.password} />
                </FormField>
                <button type="submit" className="form-login__btn">
                  Đăng nhập
                </button>
              </Form>
              <div className="form-login__link">
                <Link to="/forgot" className="form-login__link__forgot">
                  Quên mật khẩu?
                </Link>
                <div className="form-login__link__txt">
                  Bạn chưa có tài khoản?{" "}
                  <Link to="/register" className="form-login__link__register">
                    Tạo tài khoản
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
    </Helmet>
  );
};

export default Login;
