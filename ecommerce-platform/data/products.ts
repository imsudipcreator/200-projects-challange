export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Egate i9 Pro Max FHD 1080p (E03i31)",
    price: 5999,
    description:
      "The Egate i9 Pro Max Full HD projector is a perfect choice for your home theatre, thanks to its large display of 533 cm (210). The lamp and contrast ratio provides optimal brightness and colour accuracy to its visuals. Its 16:9 ratio and high resolution display with 1920*1080 pixels and 4K offer an immersive viewing experience.",
    category: "Electronics",
    image: "/assets/products/projector.webp",
  },
  {
    id: 2,
    title: "Acer 60.45 cm (24 inch) Full HD LED Backlit IPS Panel",
    price: 6649,
    description: "Elevate your visual experience with the Acer KA2 Monitor—where vibrant images, smooth performance, and ergonomic comfort come together to create a truly exceptional display. Whether you’re a gamer, a professional, or a movie lover, the Acer KA2 will bring your content to life in ways you've never seen before. Make your viewing experience as dynamic and seamless as your digital world.",
    category: "Electronics",
    image: "/assets/products/monitor.webp",
  },
  {
    id: 3,
    title: "Fastrack Optimus Pro with 1.43 AMOLED Display & AOD",
    price: 2995,
    description: "Fastrack Optimus Pro with 1.43\" AMOLED Display with AOD and 466 x 466 Bright Pixel Resolution Premium Smartwatch|Functional Crown|SingleSync BT Calling|Extensive 24x7 Health Suite with Auto Stress Monitor|24x7 HRM|Sleep Monitor with REM|SpO2 and Breathe Exercise|100+ Sports Modes|Calculator|AI Voice Assistant|In-Built Games|IP68",
    category: "Electronics",
    image: "/assets/products/smartwatch.webp",
  }
];
