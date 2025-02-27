import { DropdownDivider } from "flowbite-react";
import { instagram, twitter, linkedin, tiktok } from "../assets/images";
import {  oreo_cheesecake, chocolate_cake, dark_chocolate_chip_cookies, mint_cupcake, apple_pie, oreo_cupcake, misberries_pie, brown_sugar_cookies, almond_croissant, chocolate_chips_croissants } from "../assets/images";
import { classic_americano, milk_bubble_tea, matcha_tea, coffe_milk, oreo_smoothies, caramel_macchiato } from "../assets/images";
import {  bumi_manusia, dilan_1990, laskar_pelangi, negeri_5 } from "../assets/images";

export const navLinks = [
    { href: "Home", label: "HOME" },
    { href: "Menu", label: "MENU" },
    { href: "Book", label: "BOOKS" },
    { href: "myorders", label: "HISTORY" },
    { href: "About", label: "ABOUT US" }
];

export const navLinksAdmin = [
    { href: "AdminHome", label: "DASHBOARD" },
    { href: "AdminManageMenu", label: "PRODUCT" },
    { href: "AdminManageBook", label: "BOOKS" },
    { href: "AdminManageOrders", label: "ORDERS" },
];

export const footerLinks = [
    {
        title: "Pages",
        links: [
            { name: "Home", link: "Home" },
            { name: "Menu", link: "Menu" },
            { name: "Books", link: "Book" },
            { name: "About Us", link: "About" },
        ],
    },
    {
        title: "Further Information",
        links: [
            { name: "Terms & Conditions", link: "/" },
            { name: "Privacy Policy", link: "/" },
        ],
    },
    {
        title: "Contact Us",
        links: [
            { name: "+62 8126-1794-525", link: "tel:+6281261794525" },
            { name: "litbrew@gmail.com", link: "mailto:litbrew@gmail.com" },
        ],
    },
];

export const socialMedia = [
    { src: instagram, alt: "instagram logo" },
    { src: twitter, alt: "twitter logo" },
    { src: linkedin, alt: "linkedin logo" },
    { src: tiktok, alt: "tiktok logo" },
];

export const statistics = [
    { value: '1k+', label: 'Books' },
    { value: '500+', label: 'Shop' },
    { value: '10+', label: 'Menu' },
];

export const statistics2 = [
    { value: '800+', label: 'Book Listing' },
    { value: '1k+', label: 'Registered Member' },
    { value: '50+', label: 'Branch Count' },
]
    
export const desserts = [
    {
        imgUrl: oreo_cheesecake,
        name: "Oreo Cheesecake",
        price: "IDR 50.000",
    },
    {
        imgUrl: chocolate_cake,
        name: "Chocolate Cake",
        price: "IDR 48.000",
    },
    {
        imgUrl: dark_chocolate_chip_cookies,
        name: "Dark Chocolate Chip Cookies",
        price: "IDR 35.000",
    },
    {
        imgUrl: mint_cupcake,
        name: "Mint Cupcake",
        price: "IDR 40.000",
    },
    {
        imgUrl: apple_pie,
        name: "Apple Pie",
        price: "IDR 45.000",
    },
    {
        imgUrl: oreo_cupcake,
        name: "Oreo Cupcake",
        price: "IDR 40.000",
    },
    {
        imgUrl: misberries_pie,
        name: "Misberries Pie",
        price: "IDR 48.000",
    },
    {
        imgUrl: brown_sugar_cookies,
        name: "Brown Sugar Cookies",
        price: "IDR 32.000",
    },
    {
        imgUrl: almond_croissant,
        name: "Almond Croissant",
        price: "IDR 38.000",
    },
    {
        imgUrl: chocolate_chips_croissants,
        name: "Chocolate Chips Croissants",
        price: "IDR 32.000",
    },
];

export const homepage_drinks = [
    {
        imgUrl: classic_americano,
        name: "Classic Americano",
        price: "IDR 20.000",
    },
    {
        imgUrl: milk_bubble_tea,
        name: "Milk Bubble Tea",
        price: "IDR 25.000",
    },
    {
        imgUrl: matcha_tea,
        name: "Matcha Tea",
        price: "IDR 25.000",
    },
    {
        imgUrl: coffe_milk,
        name: "Coffee Milk",
        price: "IDR 28.000",
    },
    {
        imgUrl: oreo_smoothies,
        name: "Oreo Smoothies",
        price: "IDR 30.000",
    },
    {
        imgUrl: caramel_macchiato,
        name: "Caramel Macchiato",
        price: "IDR 35.000",
    },
]

export const homepage_books = [
    {
        imgUrl: bumi_manusia,
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
    },
    {
        imgUrl: dilan_1990,
        title: "Dilan 1990",
        author: "Pidi Baiq",
    },
    {
        imgUrl: laskar_pelangi,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
    },
    {
        imgUrl: negeri_5,
        title: "Negeri 5 Menara",
        author: "Ahmad Fuadi",
    }
]