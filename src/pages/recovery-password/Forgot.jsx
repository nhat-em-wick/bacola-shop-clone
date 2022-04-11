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
import mailApi from "../../api/mailApi";


import "./recovery.scss";
import { notifyError, notifySuccess } from "../../components/toast/Toast";

const Forgot = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        ),
    }),
    onSubmit: (values) => {
      const email = {
        email: values.email,
      };
      const checkMail = async () => {
        try {
          const res = await mailApi.forgotPass(email)
          notifySuccess(res.message)
        } catch (error) {
          console.log(error)
          notifyError(error.response.data.message)
        }
      }
      checkMail()
    },
  });

  return (
    <Helmet title="Kiểm tra email">
    <Section>
      <SectionBody>
        <div className="row">
          <div className="l-4 l-o-4 m-8 m-o-2 c-12">
            <div className="form-forgot">
              <h1 className="form-forgot__title">Nhập email của bạn</h1>
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
                <button type="submit" className="form-forgot__btn">
                  Xác minh email
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

export default Forgot;
