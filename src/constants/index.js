import { instagram, twitter, linkedin, tiktok } from "../assets/images";
import {  oreo_cheesecake, chocolate_cake, dark_chocolate_chip_cookies, mint_cupcake, apple_pie, oreo_cupcake, misberries_pie, brown_sugar_cookies, almond_croissant, chocolate_chips_croissants } from "../assets/images";

export const navLinks = [
    { href: "Home", label: "HOME" },
    { href: "Menu", label: "MENU" },
    { href: "Book", label: "BOOKS" },
    { href: "Order", label: "MY ORDER" },
    { href: "About", label: "ABOUT US" }
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