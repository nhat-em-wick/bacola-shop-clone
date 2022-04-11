import formatMoneyVND from "../utils/formatMoney";

export const menuBacola = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Cửa hàng",
    path: "shop",
  },
  {
    display: "Liên hệ",
    path: "contact"
  }
];

export const menuMobileBacola = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Cửa hàng",
    path: "shop",
  },

  {
    display: "Liên hệ",
    path: "contact",
  },
];

export const payment_method = [
  {id: 1, name: "Thanh toán khi nhận hàng"},
  {id: 2, name: "Thanh toán online"}
]

export const ship_method = [
  {id:1, name:"Giao hàng miễn phí"},
  {id:2, name: `Giao hàng nhanh: ${formatMoneyVND(35000)}`},
  {id:3, name: "Nhận tại cửa hàng"}
]

export const accordion = [
  {
    title: 'Trang web sử dụng công nghệ gì?',
    content: `Front-End: SCSS, ReactJS, React Hook, Redux Toolkit, Cloudinary. Back-End: Nodejs, ExpressJS, MongoDB, Gmail`
  },
  {
    title: 'Những chức năng trong trang web',
    content: "Phía người dùng: đăng kí, đăng nhập, quên mật khẩu, xem sản phẩm, quản lý giỏ hàng, đơn hàng, tài khoản. Phía admin: quản lý sản phẩm, người dùng, đơn hàng."
  }
]


export const menuAdmin = [
  {
    display: "Dashboard",
    path: "dashboard",
    icon: "bx bx-home",
  },
  {
    display: "Sản phẩm",
    path: "products",
    icon: "bx bx-package",
  },
  {
    display: "Người dùng",
    path: "users",
    icon: "bx bx-group",
  },
  {
    display: "Đơn hàng",
    path: "orders",
    icon: "bx bx-notepad",
  },
];

export const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 34, 23, 56, 70, 90],
    },
    {
      name: "orders",
      data: [20, 56, 23, 56, 45, 12, 67],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

export const orderHeadDashboard = ["Khách hàng", "Tổng tiền", "Giao hàng", "Thanh toán", "Trạng thái"]


export const userHeadDashboard = ["Tên", "email", "điện thoại", "địa chỉ"]

export const ProductHead = [
  
  "Ảnh",
  "Tên sản phẩm",
  "Giá cũ",
  "Giá mới",
  "Số lượng",
  "Đã bán",
  "Danh mục",
  "Hành động",
];

export const UserHead = [
 "tên", "email", "sđt", "địa chỉ",  "quyền", "hành dộng"
]

export const OrderHead = [
  'khách hàng', "email", "tổng tiền", 'thanh toán', 'ngày mua', 'trạng thái', 'hành động'
]

export const OrderStatus = [
  {
    value: 0,
    name: "Đã hủy"
  },
  {
    value: 1,
    name: "Đặt hàng thành công"
  },
  {
    value: 2,
    name: "Đã xác nhận",
  },
  {
    value: 3,
    name: "Đang giao hàng"
  },
  {
    value: 4,
    name: "Giao hàng thành công"
  }
]