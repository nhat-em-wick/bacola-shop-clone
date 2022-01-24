import product1 from '../../assets/images/product-1.jpg'
import product2 from '../../assets/images/product-2.jpg'
import product3 from '../../assets/images/product-3.jpg'

const products = [
  {
    id: 0,
    img1: product1,
    img2: product2,
    name: "All Natural Italian-Style Chicken Meatballs All Natural Italian-Style Chicke",
    rating: "4.5",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 1,
    img1: product2,
    img2: product1,
    name: "Hard Candies",
    rating: "3",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 2,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "2",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 3,
    img1: product1,
    img2: product2,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "1",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 4,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "5",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },{
    id: 5,
    img1: product2,
    img2: product3,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "5",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 6,
    img1: product1,
    img2: product3,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "2",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 7,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "1",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 8,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "4",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 9,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "4",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 10,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "4",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 11,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "4",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 12,
    img1: product2,
    img2: product1,
    name: "Chicken Meatballs",
    rating: "4",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  },
  {
    id: 13,
    img1: product2,
    img2: product1,
    name: "All Natural Italian-Style Chicken Meatballs",
    rating: "4",
    statusStock: "in stock",
    oldPrice: 9.35,
    newPrice: 7.25,
    slug: "all-natural-italian-style-chicken-meatballs"
  }
]

const getAllProduct = () => products
const getCountProducts = (count) => products.slice(0, count)
const dataProduct = {
  getAllProduct,
  getCountProducts
}

export default dataProduct