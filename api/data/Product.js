const getRandomRating = () => (Math.random() * 5).toFixed(1); // Menghasilkan rating acak antara 0 dan 5 dengan satu desimal
const getRandomNumReview = () => Math.floor(Math.random() * 50) + 1; // Menghasilkan jumlah ulasan acak antara 1 dan 50

const product = [
    {
        name: "Peach Tea",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870610/glgfid2qpwcerevrpedw.png",
        description:
          "A refreshing and sweet iced tea infused with the juicy flavor of ripe peaches. Perfect for a light and fruity pick-me-up.",
        price: 10000,
        countInStock: 14,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Matcha Tea",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870609/fd3ce1hyujdxfeay4hw9.png",
        description:
          "A traditional Japanese green tea made with premium matcha powder and steamed milk. Smooth, earthy, and calming.",
        price: 11000,
        countInStock: 5,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Oreo Smoothies",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870609/dhvei8zbwrkr0fkhj1lf.png",
        description:
          "A refreshing and fruity drink made with fresh blueberries and blended with creamy yogurt. Perfectly sweet and tangy with every sip.",
        price: 14000,
        countInStock: 15,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Blueberry Smoothies",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870609/dlynndouejhjkyoakkeo.png",
        description:
          "A refreshing and fruity drink made with fresh blueberries and blended with creamy yogurt. Perfectly sweet and tangy with every sip.",
        price: 14000,
        countInStock: 5,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Coffee Milk",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870608/by0wr1ypnnjbfnwrmubi.png",
        description:
          "A creamy and smooth combination of brewed coffee and fresh milk. A balanced drink for those who enjoy a mild coffee flavor.",
        price: 12500,
        countInStock: 5,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Coffee Latte",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870608/wg7axxjniitrsauklume.png",
        description:
          "A rich and creamy espresso-based drink with steamed milk and a light foam layer. Perfectly balanced for a smooth and mellow coffee experience.",
        price: 13000,
        countInStock: 25,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Classic Americano",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870608/fjqux9sgu3tsaotsmozv.png",
        description:
          "A bold and robust black coffee made from high-quality espresso and hot water. Simple yet packed with rich flavor for coffee purists.",
        price: 1500,
        countInStock: 15,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Caramel Macchiato",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870608/woaaiifarrivcs9nlsou.png",
        description:
          "A delightful blend of espresso, steamed milk, and a sweet drizzle of caramel sauce. A smooth and indulgent coffee experience.",
        price: 14500,
        countInStock: 15,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },     
    {
        name: "Milk Bubble Tea",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870608/s7h34s6ipgtnxhxxt2ez.png",
        description:
          "Sweet and creamy milk tea with soft and chewy tapioca pearls. A fun and refreshing treat for any time of the day.",
        price: 13500,
        countInStock: 15,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
        name: "Signature Chocolate",
        image:
          "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870608/hdyldtr9pufhiuokk91x.png",
        description:
          "A warm and velvety drink made with rich chocolate and steamed milk. Perfect for indulging in a comforting and luxurious treat.",
        price: 13500,
        countInStock: 15,
        rating: getRandomRating(),
        numReview: getRandomNumReview(),
        category:"Drink"
    },
    {
      name: "Perahu Kertas",
      author:"Dewi Lestari",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231776/books/ub7csdzcaitepgvfeucx.jpg",
      description:
        "Mengisahkan perjalanan hidup dan cinta Kugy dan Keenan, dua anak muda yang saling melengkapi meski terpisah oleh mimpi dan keadaan. Kugy, si penulis dongeng, dan Keenan, pelukis berbakat, berusaha menemukan jati diri dan cinta sejati di tengah lika-liku kehidupan.",
      price: 10000,
      countInStock: 14,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Laskar Pelangi",
      author:"Andrea Hirata",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231776/books/csrmlqekerrhc30jguvg.jpg",
      description:
        "Bercerita tentang perjuangan sepuluh anak dari Desa Gantong, Belitung, yang gigih mengejar pendidikan meski berbagai keterbatasan menghadang. Kisah ini penuh inspirasi, harapan, dan persahabatan sejati.",
      price: 12000,
      countInStock: 11,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Bumi Manusia",
      author:"Pramoedya Ananta Toer",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231777/books/ajsanr6twqtbmazvmx5n.jpg",
      description:
        "Mengangkat kisah cinta Minke, seorang pemuda pribumi cerdas, dengan Annelies, gadis Indo-Belanda yang rapuh. Novel ini juga menggambarkan kritik sosial terhadap kolonialisme di Hindia Belanda.",
      price: 15000,
      countInStock: 10,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Ayat-Ayat Cinta ",
      author:"Habiburrahman El Shirazy",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231778/books/dqjll9dtupse9ntllgef.jpg",
      description:
        "Kisah cinta seorang mahasiswa Indonesia, Fahri, di Mesir, yang dipenuhi konflik budaya, agama, dan moral. Novel ini menawarkan pandangan tentang Islam yang penuh cinta dan toleransi.",
      price: 10000,
      countInStock: 1,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Supernova: Ksatria, Puteri, dan Bintang Jatuh",
      author:"Dewi Lestari",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231777/books/v6jwbas4yieaqxjs6stu.jpg",
      description:
        "Novel yang menggabungkan romansa, filsafat, dan sains ini bercerita tentang perjalanan dua karakter utama, Reuben dan Dimas, dalam menciptakan sebuah karya yang mengubah hidup banyak orang.",
      price: 12000,
      countInStock: 8,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Negeri 5 Menara",
      author:"Ahmad Fuadi",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231777/books/z8zharmytycuaoxxdwql.jpg",
      description:
        "Mengisahkan perjuangan Alif dan teman-temannya di sebuah pesantren. Mereka menemukan arti mimpi dan persahabatan melalui filosofi “man jadda wajada” (siapa yang bersungguh-sungguh akan berhasil).",
      price: 10000,
      countInStock: 9,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Ronggeng Dukuh Paruk",
      author:"Ahmad Tohari",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231777/books/ixigkew5cbgfbzr3c7to.jpg",
      description:
        "Cerita tragis Srintil, seorang penari ronggeng, yang menjadi simbol kehidupan masyarakat desa dan perjuangannya melawan takdir. Novel ini menyentuh isu sosial dan politik Indonesia di masa lampau.",
      price: 12000,
      countInStock: 3,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Sang Pemimpi",
      author:"Andrea Hirata",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231777/books/zuicq3nibvryklyeg3sa.jpg",
      description:
        "Kelanjutan dari Laskar Pelangi, novel ini menceritakan mimpi-mimpi Arai, Jimbron, dan Ikal, serta usaha mereka mengejar pendidikan hingga ke Eropa. Kisah penuh semangat dan inspirasi.",
      price: 10000,
      countInStock: 13,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  }, 
  {
      name: "Dilan: Dia adalah Dilanku Tahun 1990",
      author:"Pidi Baiq",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231777/books/ko9m0eohlus920p90mtt.jpg",
      description:
        "Kisah cinta Dilan dan Milea yang manis dan unik, berlatar belakang Bandung tahun 1990. Novel ini menawarkan nostalgia masa SMA dengan gaya bahasa yang ringan dan menghibur.",
      price: 10000,
      countInStock: 43,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
      name: "Rectoverso",
      author:"Dewi Lestari",
      image:
        "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1736231777/books/vzwl3nl2amshfwrjjros.jpg",
      description:
        "Kumpulan cerita pendek yang berpadu dengan lagu, mengangkat tema cinta, kehilangan, dan makna hidup. Setiap cerita memiliki kedalaman yang memikat dan menyentuh hati.",
      price: 12000,
      countInStock: 13,
      rating: getRandomRating(),
      numReview: getRandomNumReview(),
      category:"Book"
  },
  {
    name: "Cheese Cake Oreo",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868643/blcrmxktasogqbq2ehnq.png",
    description:
      "A luscious cheesecake with a rich Oreo crust, creamy filling, and a topping of crushed Oreo cookies. Perfect for fans of this classic cookie treat.",
    price: 20000,
    countInStock: 4,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Cookies Brown Sugar",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868643/libpfkizpxnjbgalxx0b.png",
    description:
      "Soft and chewy cookies with the warm, caramel-like flavor of brown sugar and a hint of vanilla. A classic treat for every occasion.",
    price: 15000,
    countInStock: 5,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Cake Chocolate",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868642/kb8vpbkpbpjbujnsg6fq.png",
    description:
      "A decadent chocolate cake with layers of moist, rich chocolate sponge and a smooth chocolate ganache. A delightful indulgence for chocolate lovers.",
    price: 18000,
    countInStock: 15,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Cupcake Oreo",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868642/obhomihnuygwkz6ftgy0.png",
    description:
      "A moist and fluffy cupcake baked with Oreo crumbles, topped with a creamy frosting and a mini Oreo. A playful twist on a beloved classic.",
    price: 17000,
    countInStock: 5,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Apple Pie",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868642/so611qmmiab6gvdazwvj.png",
    description:
      "A timeless dessert with a buttery, flaky crust and a filling of cinnamon-spiced apples. Perfectly sweet and comforting with every bite.",
    price: 12000,
    countInStock: 5,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Cupcake Mint",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868642/o0xrze2mj83rqk0fr8xo.png",
    description:
      "A soft and fluffy cupcake infused with refreshing mint and topped with a light, creamy mint frosting. A delightful treat for mint enthusiasts.",
    price: 14000,
    countInStock: 25,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Croissant Choco Chips",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868641/w5iymcv1qe8h30pbruc7.png",
    description:
      "A golden, flaky croissant filled with gooey melted chocolate chips. A delightful mix of buttery pastry and rich chocolate goodness.",
    price: 15500,
    countInStock: 15,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Croissant Almond",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868641/ai0qh3odtlxj7ffg1obo.png",
    description:
      "A buttery and flaky croissant filled with creamy almond paste and topped with toasted almond slices. A perfect balance of texture and nutty sweetness.",
    price: 14500,
    countInStock: 15,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},     
{
    name: "Pie MixBerry",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868641/kcf7bbq0e4be6rkevka8.png",
    description:
      "A delightful pie filled with a medley of sweet and tangy berries and encased in a golden, flaky crust. Perfect for fruit dessert lovers.",
    price: 13500,
    countInStock: 15,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
{
    name: "Cookies Dark Chocolate",
    image:
      "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734868640/dnr7zgtowjlgwrkzarne.png",
    description:
      "Crispy on the edges and chewy in the center, these cookies are packed with rich dark chocolate chips. A perfect balance of sweetness and cocoa richness.",
    price: 13500,
    countInStock: 15,
    rating: getRandomRating(),
    numReview: getRandomNumReview(),
    category:"Food"
},
]
module.exports = product;