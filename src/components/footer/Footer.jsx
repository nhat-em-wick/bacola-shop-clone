import React from "react";
import { Link } from "react-router-dom";
import PolicyCard from "../policy-card/PolicyCard";
import Button, { ButtonCircle } from "../button/Button";
import Section, { SectionBody } from "../section/Section";
import policy from "../../assets/fake-data/policy";

import chPlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.png";

import { menuBacola } from "../../constant";

import "./footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <Section>
        <SectionBody>
          <div className="policy">
            <div className="row">
              {policy.map((item, index) => (
                <div key={index} className="col gap l-3 m-6 c-12">
                  <PolicyCard key={index} item={item} />
                </div>
              ))}
            </div>
          </div>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <div className="footer__content">
            <div className="row">
              <div className="col gap l-3 m-6 c-12">
                <div className="footer__content__item">
                  <FooterItemTitle>Giới thiệu</FooterItemTitle>
                  <FooterItemBody>
                    Đây là trang web được clone lại từ Bacola Shop, chỉ dùng cho việc học tập, không dùng cho thương mại.
                  </FooterItemBody>
                </div>
              </div>
              <div className="col gap l-3 m-6 c-12">
                <div className="footer__content__item">
                  <FooterItemTitle>trang web</FooterItemTitle>
                  <FooterItemBody>
                    {menuBacola.map((item, index) => (
                      <Link
                        className="footer__content__item__link"
                        to={item.path}
                        key={index}
                      >
                        {item.display}
                      </Link>
                    ))}
                  </FooterItemBody>
                </div>
              </div>
              <div className="col gap l-3 m-6 c-12">
                <div className="footer__content__item">
                  <FooterItemTitle>liên hệ</FooterItemTitle>
                  <FooterItemBody>
                    <div className="footer__content__item__link">
                      Địa chỉ: 51/50 Lê Thị Hồng, Phường 17, Gò Vấp, Thành phố Hồ Chí Minh
                    </div>
                    <div className="footer__content__item__link">
                      Điện thoại: 012 345 6789
                    </div>
                  </FooterItemBody>
                </div>
              </div>
              <div className="col gap l-3 m-6 c-12">
                <div className="footer__content__item">
                  <FooterItemTitle>tải ứng dụng</FooterItemTitle>
                  <FooterItemBody>
                    <div className="footer__content__item__app">
                      <Link to="#" className="footer__content__item__app__img">
                        <img src={chPlay} alt="" />
                      </Link>
                      <Link to="#" className="footer__content__item__app__img">
                        <img src={appStore} alt="" />
                      </Link>
                    </div>
                  </FooterItemBody>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <div className="footer__bottom">
            <div className="footer__bottom-wrapper">
              <div className="footer__bottom__hotline">
                <a
                  href="tel: 01234567890"
                  className="footer__bottom__hotline__icon"
                >
                  <ButtonCircle size="lg" boxShadow={true}>
                    <i className="bx bx-phone-call"></i>
                  </ButtonCircle>
                </a>
                <div className="footer__bottom__hotline__text">
                  <div className="footer__bottom__hotline__text__phone">
                    012 345 6789
                  </div>
                  <div className="footer__bottom__hotline__text__work">
                    Mở của từ 8:00 - 22:00
                  </div>
                </div>
              </div>
              <div className="footer__bottom__social">
                <div className="footer__bottom__social__btn facebook">
                  <div className="footer__bottom__social__tooltip">
                    Facebook
                  </div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/wick.nhat20/"
                  >
                    <ButtonCircle boxShadow={true}>
                      <i className="bx bxl-facebook"></i>
                    </ButtonCircle>
                  </a>
                </div>
                <div className="footer__bottom__social__btn github">
                  <div className="footer__bottom__social__tooltip">GitHub</div>
                  <a
                    href="https://github.com/nhat-em-wick"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ButtonCircle
                      className="footer__bottom__social__github"
                      boxShadow={true}
                    >
                      <i className="bx bxl-github"></i>
                    </ButtonCircle>
                  </a>
                </div>
                <div className="footer__bottom__social__btn instagram">
                  <div className="footer__bottom__social__tooltip">
                    Instagram
                  </div>
                  <ButtonCircle
                    className="footer__bottom__social__instagram"
                    boxShadow={true}
                  >
                    <i className="bx bxl-instagram"></i>
                  </ButtonCircle>
                </div>
                <div className="footer__bottom__social__btn tiktok">
                  <div className="footer__bottom__social__tooltip">Tiktok</div>
                  <ButtonCircle boxShadow={true}>
                    <i className="bx bxl-tiktok"></i>
                  </ButtonCircle>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>
    </footer>
  );
};

const FooterItemTitle = (props) => (
  <div className="footer__content__item__title">{props.children}</div>
);

const FooterItemBody = (props) => (
  <div className="footer__content__item__body">{props.children}</div>
);

export default Footer;
