import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";

import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.jpg";
import main_banner_bg_sm from "./main_banner_bg_sm.jpg";
import bottom_banner_image from "./bottom_banner_image.jpg";
import bottom_banner_image_sm from "./bottom_banner_image_sm.jpg";
import add_address_iamge from "./add_address_image.svg";

import chargers_image from "./charger.png";
import smartphones_image from "./smartphone.png";
import laptops_image from "./laptop.png";
import powerbanks_image from "./powerbank.png";
import headphones_image from "./headphone.png";
import earbuds_image from "./earbud.png";
import smartwatches_image from "./smartwatch.png";

import laptop_icon from "./laptop_icon.png";
import price_tag_icon from "./best-price.png";
import shield_icon from "./sheild.png";
import support_icon from "./heart-handshake.png";

export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_iamge,
};

export const categories = [
  {
    text: "Chargers",
    path: "Chargers",
    image: chargers_image,
    bgColor: "#EFEFEF",
  },
  {
    text: "Smart Phones",
    path: "SmartPhones",
    image: smartphones_image,
    bgColor: "#DDEEFF",
  },
  {
    text: "Laptops",
    path: "Laptops",
    image: laptops_image,
    bgColor: "#E1F5EC",
  },
  {
    text: "Power Banks",
    path: "PowerBanks",
    image: powerbanks_image,
    bgColor: "#FFDDDD",
  },
  {
    text: "Headphones",
    path: "Headphones",
    image: headphones_image,
    bgColor: "#DDFFCC",
  },
  {
    text: "Earbuds",
    path: "Earbuds",
    image: earbuds_image,
    bgColor: "#CCDDFF",
  },
  {
    text: "Smart Watches",
    path: "SmartWatches",
    image: smartwatches_image,
    bgColor: "#FFF4E1",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  { icon: laptop_icon, 
    title: "Latest Tech", 
    description: "Top laptops, smartphones, etc." 
  },
  { icon: price_tag_icon, 
    title: "Best Deals", 
    description: "Premium gadgets at great prices." 
  },
  { icon: shield_icon, 
    title: "Trusted Quality", 
    description: "Reliable brands & performance." 
  },
  { icon: support_icon, 
    title: "Expert Assistance", 
    description: "Support for all your tech needs." 
  },
];
