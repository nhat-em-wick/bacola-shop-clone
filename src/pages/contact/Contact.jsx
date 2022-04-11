import React, { useState } from "react";

import Section, {
  SectionTitle,
  SectionBody,
} from "../../components/section/Section";
import Form, {
  FormField,
  FormInput,
  FormMessageError,
  FormLabel,
  FormTextarea,
} from "../../components/form/Form";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { notifyError, notifySuccess } from "../../components/toast/Toast";
import Helmet from "../../components/helmet/Helmet";
import mailApi from "../../api/mailApi";
import { accordion } from "../../constant";

import "./contact.scss";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        ),
        name: Yup.string().required("Bắt buộc").matches(/[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{3,}$/, "Từ 3 ký tự trở lên và không chứa ký tự dặc biệt"),
      phone: Yup.string()
        .required("Bắt buộc")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "SĐT không hợp lệ"),
      message: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: (values) => {
      const newContact = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
      };

      const sendContact = async () => {
        setLoading(true);
        try {
          const res = await mailApi.postContact(newContact);
          setLoading(false);
          notifySuccess(res.message);
          formik.resetForm({
            name: '',
            phone: '',
            email: '',
            message: '',
          })
        } catch (error) {
          setLoading(true);
          notifyError(error.response.data.message);
        }
      };
      sendContact();
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <>
    <Helmet title="Liên hệ">
      <Section>
        <SectionTitle>Liên hệ</SectionTitle>
        <SectionBody>
          <div className="contact">
            <div className="row">
              <div className="col l-6 m-12 c-12">
                <div className="contact-info">
                  <h3 className="contact-info__title">Thông tin liên hệ</h3>
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <i className="bx bxs-map"></i>
                    </div>
                    <div className="contact-info__text">
                     Địa chỉ: 51/50 Lê Thị Hồng, Phường 17, Gò Vấp, Thành phố Hồ Chí
                      Minh
                    </div>
                  </div>
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <i className="bx bxs-envelope"></i>
                    </div>
                    <div className="contact-info__text">Email: mnhat233@gmail.com</div>
                  </div>
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <i className="bx bxs-phone"></i>
                    </div>
                    <div className="contact-info__text">Điện thoại: 0123 456 789</div>
                  </div>
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <i className="bx bxs-time"></i>
                    </div>
                    <div className="contact-info__text">Giờ làm việc: 8:00 - 22:00</div>
                  </div>
                </div>
              </div>
              <div className="col l-6 m-12 c-12">
                <div className="contact-form">
                  <h3 className="contact-form__title">Form liên hệ</h3>
                  <Form>
                    <FormField>
                      <FormInput
                        type="text"
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      <FormLabel for="name" label="Họ và tên" />
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
                      <FormTextarea
                        name="message"
                        id="message"
                        label="Lời nhắn"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                      />
                      <FormMessageError message={formik.errors.message} />
                    </FormField>
                    <div
                      className="contact-form__btn"
                      onClick={() => handleSubmit()}
                    >
                      <span className={`spinner ${loading && "active"}`}>
                        <i className="bx bx-loader-alt bx-spin"></i>
                      </span>
                      <span className="txt">Gửi</span>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          
        </SectionBody>
      </Section>
      <Section>
        <div className="row">
          <div className="col l-6">
            <SectionTitle>Câu hỏi thường gặp</SectionTitle>
            <SectionBody>
            <div className="accordion-wrap">
                {
                  accordion.map((item, index) => (
                    <Accordion key={index} title={item.title} content={item.content} />
                  ))
                }
              </div>
            </SectionBody>
          </div>
          <div className="col l-6">
              <SectionBody>
              <div className="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.694294257228!2d106.67575001442854!3d10.834690592282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175285568633e75%3A0x4d06720250993217!2zNTEsIDUwIEzDqiBUaOG7iyBI4buTbmcsIFBoxrDhu51uZyA3LCBHw7IgVuG6pXAsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1647078148462!5m2!1svi!2s"
                  style={{ width: "100%", height: "460px", border: "none" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              </SectionBody>
          </div>
        </div>

      </Section>
      </Helmet>
    </>
  );
};

const Accordion = props => {

  const [active, setActive] = useState(false)

  return (
    <div className={`accordion ${active && 'active'}`}>
      <div className="accordion__title" onClick={() => setActive(!active)}>
        <span>{props.title}</span>
        <div className="accordion__icon">
          <i className="bx bxs-chevron-up"></i>
        </div>
      </div>
      <div className="accordion__content">
        {props.content}
      </div>
    </div>
  )
}

export default Contact;
