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

import DropFileInput from "../../components/drop-file-input/DropFileInput";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Helmet from "../../components/helmet/Helmet";
import adminApi from "../../api/adminApi";
import shopApi from "../../api/shopApi";
import "./admin-product.scss";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [submitted, setSubmitted] = useState(false)

  const onFileChange = async (files) => {
    setGallery(files);
  };

  const redirectPage = () => {
    navigate("/admin/products");
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      quantity: '',
      old_price: '',
      new_price: '',
      category: '',
      short_description: '',
      long_description: '',
      slug: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Bắt buộc"),
      quantity: Yup.number().required("Bắt buộc"),
      old_price: Yup.string().matches(/^[0-9]/, "Giá không hợp lệ"),
      new_price: Yup.string()
        .required("Bắt buộc")
        .matches(/^[0-9]/, "Giá không hợp lệ"),
      category: Yup.string(),
      short_description: Yup.string(),
      long_description: Yup.string(),
      slug: Yup.string()
    }),
    onSubmit: (values) => {
      const newProduct = {
        name: values.name,
        quantity: values.quantity,
        old_price: values.old_price,
        new_price: values.new_price,
        category: values.category,
        short_description: values.short_description,
        long_description: values.long_description,
        gallery: gallery,
        slug: values.slug
      };
      const postNewProduct = async () => {
        try {
          const res = await adminApi.postProduct(newProduct);
          setSubmitted(!submitted)
          notifySuccess(res.message);
          setGallery([]);
          formik.resetForm({
            name: "",
            quantity: "",
            old_price: "",
            new_price: "",
            category: "",
            short_description: "",
            long_description: "",
            slug: ''
          });
        } catch (error) {
          notifySuccess(error.response.data.message)
          console.log(error);
        }
      };
      postNewProduct();
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await shopApi.getCategories();
        setCategories(res.categories);
      } catch (error) {
        notifyError(error.response.data.message)
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Helmet title="Thêm sản phẩm">
    <div className="grid">
      <div className="add-product">
        <div className="card">
          <div className="add-product__header">
            <div className="card__header">
              <h3>Thêm sản phẩm</h3>
            </div>
            <div className="add-product__btn">
              <div
                onClick={() => redirectPage()}
                className="add-product__btn-item btn--cancel"
              >
                Hủy
              </div>
              <div
                onClick={() => handleSubmit()}
                className="add-product__btn-item btn--confirm"
              >
                Thêm
              </div>
            </div>
          </div>
          <Form>
            
              <FormField>
                <FormInput
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <FormLabel for="name" label="Tên sản phẩm" />
                <FormMessageError message={formik.errors.name} />
              </FormField>
              <FormField>
                <FormInput
                  type="text"
                  name="slug"
                  id="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                />
                <FormLabel for="slug" label="Đường dẫn" />
                <FormMessageError message={formik.errors.slug} />
              </FormField>
              <FormField>
                <FormInput
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                />
                <FormLabel for="quantity" label="Số lượng" />
                <FormMessageError message={formik.errors.quantity} />
              </FormField>
            
              <FormField>
                <FormInput
                  type="text"
                  name="old_price"
                  id="old_price"
                  value={formik.values.old_price}
                  onChange={formik.handleChange}
                />
                <FormLabel for="old_price" label="Giá cũ (VNĐ)" />
                <FormMessageError message={formik.errors.old_price} />
              </FormField>
              <FormField>
                <FormInput
                  type="text"
                  name="new_price"
                  id="new_price"
                  value={formik.values.new_price}
                  onChange={formik.handleChange}
                />
                <FormLabel for="new_price" label="Giá mới (VNĐ)" />
                <FormMessageError message={formik.errors.new_price} />
              </FormField>
              <FormField>
                <FormSelect
                  options={categories}
                  name="category"
                  label="Danh mục"
                  value={formik.values.category}
                  defaultValue={'62109fcb158736512e2792f0'}
                  onChange={formik.handleChange}
                />
              </FormField>
            
              <FormField>
                <FormTextarea
                  id="short_description"
                  name="short_description"
                  label="Mô tả ngắn"
                  value={formik.values.short_description}
                  onChange={formik.handleChange}
                />
              </FormField>
              <FormField>
                <FormTextarea
                  id="long_description"
                  name="long_description"
                  label="Mô tả dài"
                  value={formik.values.long_description}
                  onChange={formik.handleChange}
                />
              </FormField>
           
          </Form>
          <div className="add-product__gallery">
            <h4>Hình ảnh</h4>
            <DropFileInput onFileChange={(files) => onFileChange(files)} submitted={submitted} />
          </div>
        </div>
      </div>
    </div>
    </Helmet>
  );
};

export default AddProduct;
