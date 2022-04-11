import React, { useEffect, useState } from "react";

import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/section/Section";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Helmet from "../../components/helmet/Helmet";

import "./my-account.scss";

const menu = [
  { display: "Tài khoản của tôi", path: "profile", icon: "bx bx-user" },
  { display: "Đơn hàng", path: "order", icon: "bx bx-notepad" },
];

const MyAccount = () => {
  const location = useLocation()
  const [activeLink, setActiveLink] = useState(0)

  useEffect(() => {
    const currPath = window.location.pathname.split("/")[2];
    
    const activeItem = menu.findIndex((e) => e.path === currPath);
    setActiveLink(activeItem === 0 ? 0 : activeItem);
  }, [location]);

  return (
    
    <div className="my-account">
      <Section>
        <SectionTitle>Tài khoản</SectionTitle>
        <SectionBody>
          <div className="row">
            <div className="col l-2 m-12 c-12">
              <div className="my-account__menu">
                {menu.map((item, index) => (
                  <MenuItem
                    key={index}
                    display={item.display}
                    icon={item.icon}
                    path={item.path}
                    active={activeLink === index ? "active" : ""}
                  />
                ))}
              </div>
            </div>
            <div className="col l-10 m-12 c-12">
              <div className="my-account__content">
                <Outlet />
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>
    </div>
   
  );
};

const MenuItem = (props) => (
  <Link to={props.path} className={`my-account__menu__item ${props.active}`}>
    <i className={props.icon}></i>
    <span>{props.display}</span>
  </Link>
);

export default MyAccount;
