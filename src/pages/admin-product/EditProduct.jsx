import React, { useEffect, useState, useRef } from "react";
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

import DropFileInput from "../../components/drop-file-input/DropFileInput";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import io from 'socket.io-client'
import adminApi from "../../api/adminApi";
import shopApi from "../../api/shopApi";
import "./admin-product.scss";

const EditProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
  const [gallery, setGallery] = useState([]);
  const [changeGallery, setChangeGallery] = useState([]);
  const [submitted, setSubmitted] = useState(false)

  const [product, setProduct] = useState({
    name: "",
    stock: "",
    old_price: "",
    new_price: "",
    category: { _id: "", name: "" },
    short_description: "",
    long_description: "",
    slug: ''
  });

  const onFileChange = async (files) => {
    setChangeGallery(files);
  };

  const redirectPage = () => {
    navigate("/admin/products");
  };

  const params = useParams();

  const formik = useFormik({
    initialValues: {
      name: product.name,
      stock: product.stock,
      old_price: product.old_price ? product.old_price : "",
      new_price: product.new_price,
      category: product.category._id,
      short_description: product.short_description
        ? product.short_description
        : "",
      long_description: product.long_description
        ? product.long_description
        : "",
      slug: product.slug
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Bắt buộc"),
      stock: Yup.string()
        .matches(/^[0-9]*$/, "Số lượng không hợp lệ")
        .required("Bắt buộc"),
      old_price: Yup.string().matches(/^[0-9]*$/, "Giá không hợp lệ"),
      new_price: Yup.string()
        .required("Bắt buộc")
        .matches(/^[0-9]*$/, "Giá không hợp lệ"),
      category: Yup.string(),
      short_description: Yup.string(),
      long_description: Yup.string(),
    }),
    onSubmit: (values) => {
      const editProduct = {
        id: product._id,
        name: values.name,
        stock: values.stock,
        old_price: values.old_price,
        new_price: values.new_price,
        category: values.category,
        short_description: values.short_description,
        long_description: values.long_description,
        gallery: changeGallery.length > 0 ? changeGallery : gallery,
        slug: values.slug
      };
      const putProduct = async () => {
        try {
          const res = await adminApi.putProduct(editProduct);
          notifySuccess(res.message);
          setSubmitted(!submitted)
          setChangeGallery([]);
          navigate(`/admin/products/edit/${res.product.slug}`)
        } catch (error) {
          notifyError(error.response.data.message)
          console.log(error);
        }
      };
      putProduct();
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = params.slug;
        const response = await shopApi.getProduct(productId);
        setProduct(response.product);
        setGallery(response.product.gallery);
      } catch (error) {
        notifyError(error.response.data.message)
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

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
    <div className="grid">
      <div className="edit-product">
        <div className="card">
          <div className="edit-product__header">
            <div className="card__header">
              <h3>Sửa sản phẩm</h3>
            </div>
            <div className="edit-product__btn">
              <div
                onClick={() => redirectPage()}
                className="edit-product__btn-item btn--cancel"
              >
                Hủy
              </div>
              <div
                onClick={() => handleSubmit()}
                className="edit-product__btn-item btn--confirm"
              >
                Sửa
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
                name="stock"
                id="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
              />
              <FormLabel for="stock" label="Số lượng" />
              <FormMessageError message={formik.errors.stock} />
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
                defaultValue={formik.values.category}
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
          <div className="edit-product__gallery">
            <h4>Hình ảnh</h4>
            {gallery.length > 0 && (
              <div className="edit-product__gallery__list">
                <div className="row">
                  {gallery.map((item, index) => (
                    <div key={index} className="col l-3 m-4 c-12">
                      <div  className="edit-product__gallery__item">
                        <img src={item} alt="" />
                      </div>
                    </div>
                  
                ))}
                </div>
                
              </div>
            )}
          </div>
          <div className="edit-product__change-gallery">
            <h4>Thay hình ảnh <span>(nếu thay ảnh thì nhấn upload ảnh trước khi sửa sản phẩm)</span></h4> 
            <DropFileInput submitted={submitted} onFileChange={(files) => onFileChange(files)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
