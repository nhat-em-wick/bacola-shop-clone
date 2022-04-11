import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
import userApi from "../../api/userApi";

import "./recovery.scss";
import { notifyError, notifySuccess } from "../../components/toast/Toast";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  
  const formik = useFormik({
    initialValues: {
      password: "",
      confPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Bắt buộc").min(8, "Tối thiểu 8 kí tự"),
      confPassword: Yup.string()
      .required("Bắt buộc")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: (values) => {
      const newPass = {
        password: values.password,
       token: searchParams.get("token")
      };
      const recovery = async () => {
        try {
          const res = await userApi.recoveryPassword(newPass)
          notifySuccess(res.message)
          navigate('/login')
        } catch (error) {
          console.log(error)
          notifyError(error.response.data)
        }
      }
      recovery()
    },
  });

  return (
    <Helmet title="Khôi phục mật khẩu">
    <Section>
      <SectionBody>
        <div className="row">
          <div className="l-4 l-o-4 m-8 m-o-2 c-12">
            <div className="form-recovery">
              <h1 className="form-recovery__title">Thay đổi mật khẩu</h1>
              <Form onSubmit={formik.handleSubmit}>
                <FormField>
                  <FormInput
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    id="password"
                  />
                  <FormLabel for="password" label="Mật khẩu mới" />
                  <FormMessageError message={formik.errors.password} />
                </FormField>
                <FormField>
                  <FormInput
                    type="password"
                    name="confPassword"
                    id="confPassword"
                    value={formik.values.confPassword}
                    onChange={formik.handleChange}
                  />
                  <FormLabel for="confPassword" label="Nhập lại mật khẩu" />
                  <FormMessageError message={formik.errors.confPassword} />
                </FormField>
                <button type="submit" className="form-recovery__btn">
                  thay đổi
                </button>
              </Form>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
    </Helmet>
  );
};

export default RecoveryPassword;
