exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE rel_material_product RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE materials RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE image_product RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE products RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE categories RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE image_home_page RESTART IDENTITY CASCADE")

  const imageHomePage = [
    { urlImage: "rooms.jpeg", display: true },
    { urlImage: "chairs.jpeg", display: true },
    { urlImage: "sofas.jpeg", display: true },
    { urlImage: "table.jpeg", display: true },
    { urlImage: "lighting.png", display: true },
    { urlImage: "storage.jpg", display: true },
    { urlImage: "bedding.png", display: true },
    { urlImage: "garden.jpeg", display: true },
    { urlImage: "accessories.jpg", display: true },
  ]

  await knex("image_home_page").insert(imageHomePage)

  const categories = [
    {
      name: "Rooms",
      slug: "rooms",
      description:
        "Elegant spaces designed for comfort and functionality, tailored to meet individual lifestyles. Meticulously arranged with tasteful furnishings and thoughtful accents. A harmonious blend of style, purpose, and personal sanctuary.",
      urlImage: "rooms.jpeg",
      isDelete: false,
    },
    {
      name: "Chairs",
      slug: "chairs",
      description:
        "Ergonomically designed seating solutions, balancing aesthetics and support. A diverse array of materials and styles to complement any décor. Versatile options for dining, lounging, or working in comfort.",
      urlImage: "chairs.jpeg",
      isDelete: false,
    },
    {
      name: "Sofas",
      slug: "sofas",
      description:
        "Inviting and plush, offering a cozy retreat for relaxation or socializing. A vast selection of sizes, fabrics, and designs to suit every taste. The centerpiece of any living space, providing both comfort and style.",
      urlImage: "sofas.jpeg",
      isDelete: false,
    },
    {
      name: "Table",
      slug: "table",
      description:
        "The gathering point for meals, work, or conversation, available in various shapes and sizes. Crafted from an array of materials to seamlessly blend with existing décor. Designed for functionality and durability, while maintaining an aesthetic appeal.",
      urlImage: "table.jpeg",
      isDelete: false,
    },
    {
      name: "Lighting",
      slug: "lighting",
      description:
        "Illuminating spaces with purposeful and ambient fixtures, setting the mood and tone for each room. A diverse range of styles, from minimalist to opulent, catering to individual preferences. Thoughtfully designed to enhance aesthetics and provide practical solutions.",
      urlImage: "lighting.png",
      isDelete: false,
    },
    {
      name: "Storage",
      slug: "storage",
      description:
        "Streamlined and efficient solutions for organizing belongings, maintaining a clutter-free environment. A wide variety of options, from minimalist shelves to ornate cabinets. Purpose-built to meet specific needs while enhancing the overall aesthetic.",
      urlImage: "storage.jpg",
      isDelete: false,
    },
    {
      id: 7,
      name: "Bedding",
      slug: "bedding",
      description:
        "Luxurious and comfortable linens, providing restful slumber and a serene atmosphere. Available in an extensive array of patterns, materials, and colors to suit individual tastes. The ultimate fusion of style, comfort, and quality.",
      urlImage: "bedding.png",
      isDelete: false,
    },
    {
      id: 8,
      name: "Garden",
      slug: "garden",
      description:
        "A tranquil oasis of lush greenery, blooming flowers, and calming water features. Thoughtfully designed layouts for relaxation, entertainment, or cultivation. An extension of the home, providing a connection to nature and a space for rejuvenation.",
      urlImage: "garden.jpeg",
      isDelete: false,
    },
    {
      id: 9,
      name: "Accessories",
      slug: "accessories",
      description:
        "The finishing touches that elevate a space, showcasing individuality and personal style. An eclectic range of decorative items, from artwork to cushions, to mirrors and vases. Enhancing the overall aesthetic and adding character to any room.",
      urlImage: "accessories.jpg",
      isDelete: false,
    },
  ]

  await knex("categories").insert(categories)

  const products = [
    {
      name: "Emerald Isle Bookcase",
      slug: "emerald-isle-bookcase",
      description:
        "A rustic wooden bookcase with a weathered finish, reminiscent of the rolling Irish countryside. Sturdy construction with adjustable shelves provides ample storage and display space.",
      price: 249.99,
      stock: 15,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Scottish Highlands Armoire",
      slug: "scottish-highlands-armoire",
      description:
        "A traditional, dark-stained wooden armoire featuring intricate carvings inspired by the Scottish Highlands. This stately piece offers generous storage, combining both form and function.",
      price: 799.99,
      stock: 8,
      highlander: true,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Celtic Cottage Side Table",
      slug: "celtic-cottage-side-table",
      description:
        "A charming side table made from natural wood, reflecting the warm and inviting atmosphere of a cozy Celtic cottage. Perfect for placing a lamp, books, or decorative items.",
      price: 89.99,
      stock: 20,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Thistle and Clover Coffee Table",
      slug: "thistle-and-clover-coffee-table",
      description:
        "A rustic coffee table featuring a beautiful blend of Scottish thistle and Irish clover motifs. This unique piece will make a statement in any living space.",
      price: 149.99,
      stock: 12,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Irish Pub Barstool",
      slug: "irish-pub-barstool",
      description:
        "A vintage-inspired barstool that captures the essence of a traditional Irish pub. Upholstered in rich leather and featuring ornate metal accents, it's the perfect addition to a home bar area.",
      price: 129.99,
      stock: 10,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Highland Lounger",
      slug: "highland-lounger",
      description:
        "A comfortable and stylish lounger adorned with a Scottish tartan pattern. The perfect spot to relax, read, or enjoy a warm cup of tea.",
      price: 299.99,
      stock: 5,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Celtic Knotwork Mirror",
      slug: "celtic-knotwork-mirror",
      description:
        "An elegantly crafted mirror framed with intricate Celtic knotwork designs, showcasing the rich cultural heritage of both Ireland and Scotland.",
      price: 79.99,
      stock: 18,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Emerald Isle Dining Set",
      slug: "emerald-isle-dining-set",
      description:
        "A charming dining set featuring a weathered wood table and upholstered chairs with Celtic-inspired patterns. Perfect for family gatherings and festive occasions.",
      price: 599.99,
      stock: 3,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Scottish Moorland Bench",
      slug: "scottish-moorland-bench",
      description:
        "A rugged and functional bench inspired by the Scottish moorlands, made from reclaimed wood and featuring a rustic, distressed finish.",
      price: 149.99,
      stock: 7,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Shamrock and Heather Dresser",
      slug: "shamrock-and-heather-dresser",
      description:
        "A beautifully crafted dresser that incorporates elements of Irish and Scottish design. Featuring hand-carved shamrocks and heather motifs, it brings charm and character to any bedroom.",
      price: 349.99,
      stock: 4,
      highlander: false,
      categoryId: 1,
      isDelete: false,
    },
    {
      name: "Elegant Armchair",
      slug: "elegant-armchair",
      description:
        "Indulge in luxurious comfort with the Elegant Armchair. This exquisitely designed chair combines sleek lines and sumptuous cushioning to create a truly inviting seating experience. The curved armrests provide excellent support, allowing you to relax and unwind in style. Whether placed in a living room or study, the Elegant Armchair is sure to be a standout piece that adds both elegance and coziness to your space.",
      price: 549.99,
      stock: 10,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Vintage Wingback Chair",
      slug: "vintage-wingback-chair",
      description:
        "Transport yourself to a bygone era with the Vintage Wingback Chair. Its timeless design and meticulous craftsmanship make it a perfect addition to any classic or eclectic interior. The high backrest and padded armrests offer exceptional comfort, while the tufted upholstery adds a touch of sophistication. Whether you're curling up with a book or enjoying a conversation, the Vintage Wingback Chair provides a sense of grandeur and charm to your living space.",
      price: 399.99,
      stock: 6,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Modern Swivel Chair",
      slug: "modern-swivel-chair",
      description:
        "Experience the perfect blend of style and functionality with the Modern Swivel Chair. This contemporary chair features a 360-degree swivel base that allows you to effortlessly turn and engage with your surroundings. Its sleek and minimalist design complements various interior aesthetics, making it an ideal choice for both offices and living rooms. Crafted with comfort in mind, the Modern Swivel Chair is sure to become your favorite spot for relaxation and productivity.",
      price: 299.99,
      stock: 8,
      highlander: true,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Rustic Wooden Chair",
      slug: "rustic-wooden-chair",
      description:
        "Bring the charm of nature into your home with the Rustic Wooden Chair. Constructed from sturdy reclaimed wood, each chair showcases its unique grains and textures, adding warmth and character to your space. The ergonomic design and curved backrest provide not only style but also exceptional comfort during extended periods of sitting. Whether placed around a dining table or used as an accent chair, the Rustic Wooden Chair effortlessly combines rustic aesthetics with modern comfort.",
      price: 199.99,
      stock: 12,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Cozy Recliner",
      slug: "cozy-recliner",
      description:
        "Sink into unparalleled comfort with the Cozy Recliner. Designed with your relaxation in mind, this chair features a smooth reclining mechanism that allows you to effortlessly adjust your position. Its plush padding and supportive backrest cradle your body, providing a cozy haven for unwinding after a long day. The Cozy Recliner is the epitome of comfort and style, making it a perfect addition to your living room or entertainment area.",
      price: 449.99,
      stock: 5,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Industrial Metal Chair",
      slug: "industrial-metal-chair",
      description:
        "Add a touch of industrial flair to your space with the Industrial Metal Chair. Its sturdy metal frame and distressed finish exude rugged charm, while the contoured seat ensures comfort during long gatherings. Whether placed in a dining room, kitchen, or patio, this chair effortlessly combines durability and style. With its unique design and weathered aesthetics, the Industrial Metal Chair is sure to be a conversation starter and a focal point in your home.",
      price: 149.99,
      stock: 15,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Contemporary Lounge Chair",
      slug: "contemporary-lounge-chair",
      description:
        "Unwind in ultimate style and comfort with the Contemporary Lounge Chair. Its sleek lines, premium upholstery, and ergonomic design create a perfect balance of sophistication and relaxation. The wide seat and plush cushioning provide exceptional comfort, while the streamlined silhouette adds a modern touch to any space. Whether you use it for lounging or reading, the Contemporary Lounge Chair is sure to become your go-to spot for unwinding in luxurious comfort.",
      price: 379.99,
      stock: 7,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Outdoor Patio Chair",
      slug: "outdoor-patio-chair",
      description:
        "Enjoy the great outdoors in style and comfort with the Outdoor Patio Chair. Crafted with weather-resistant materials and featuring a sturdy construction, this chair is designed to withstand the elements. Whether you're lounging by the pool, relaxing on the patio, or hosting a barbecue, the Outdoor Patio Chair provides a comfortable and stylish seating option. Embrace the beauty of nature while indulging in leisurely moments with this durable and elegant outdoor chair.",
      price: 279.99,
      stock: 9,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Mid-Century Modern Armchair",
      slug: "mid-century-modern-armchair",
      description:
        "Embrace the retro charm of the Mid-Century Modern Armchair, inspired by iconic designs from the mid-20th century. Its streamlined silhouette, tapered legs, and premium upholstery exude sophistication and elegance. Whether placed in a living room, office, or bedroom, this armchair adds a touch of vintage allure to any space. With its comfortable seating and timeless design, the Mid-Century Modern Armchair is a perfect choice for those who appreciate classic aesthetics with a modern twist.",
      price: 429.99,
      stock: 4,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Convertible Chair Bed",
      slug: "convertible-chair-bed",
      description:
        "Maximize your space without compromising on comfort with the Convertible Chair Bed. This versatile furniture piece effortlessly transforms from a comfortable chair to a convenient bed, making it perfect for guest rooms, small apartments, or any space where versatility is key. The sturdy construction and plush padding ensure a restful sleep experience, while the stylish design adds a modern touch to your interior. The Convertible Chair Bed is a practical and stylish solution for accommodating guests or creating a cozy spot for relaxation.",
      price: 599.99,
      stock: 4,
      highlander: false,
      categoryId: 2,
      isDelete: false,
    },
    {
      name: "Glenwood Tartan Sofa",
      slug: "glenwood-tartan-sofa",
      description:
        "Experience the charm of the Scottish Highlands with the Glenwood Tartan Sofa. This sofa features a classic tartan pattern, reminiscent of the traditional Scottish plaids. Its sturdy construction, plush cushioning, and timeless design exude warmth and elegance. Whether placed in a cozy cottage or a modern living room, the Glenwood Tartan Sofa adds a touch of Scottish heritage and comfort to your home.",
      price: 699.99,
      stock: 8,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Lucky Clover Sectional Sofa",
      slug: "lucky-clover-sectional-sofa",
      description:
        "Embrace the luck of the Irish with the Lucky Clover Sectional Sofa. This sofa showcases a contemporary design with a subtle nod to Irish symbolism. Its modular configuration offers flexibility in arranging your living space, while the plush upholstery and generous seating ensure optimal comfort. The Lucky Clover Sectional Sofa brings a touch of Irish charm and versatility to any home.",
      price: 849.99,
      stock: 4,
      highlander: true,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Celtic Knot Reclining Sofa",
      slug: "celtic-knot-reclining-sofa",
      description:
        "Relax in style with the Celtic Knot Reclining Sofa. This sofa draws inspiration from the intricate Celtic knotwork, showcasing its timeless beauty. The reclining feature allows you to customize your comfort, while the plush cushioning and premium upholstery provide a cozy seating experience. Whether enjoying a movie night or a quiet evening, the Celtic Knot Reclining Sofa brings a touch of Scottish or Irish heritage to your living room.",
      price: 799.99,
      stock: 5,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Highland Heritage Chesterfield Sofa",
      slug: "highland-heritage-chesterfield-sofa",
      description:
        "Elevate your living space with the Highland Heritage Chesterfield Sofa. Inspired by the grandeur of Scottish castles and the elegance of Irish estates, this sofa combines classic Chesterfield design with a touch of Scottish or Irish heritage. The deep button tufting, rolled arms, and luxurious upholstery exude sophistication and timeless appeal. The Highland Heritage Chesterfield Sofa is a statement piece that adds a sense of prestige to any interior.",
      price: 999.99,
      stock: 2,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Shamrock Sleeper Sofa",
      slug: "shamrock-sleeper-sofa",
      description:
        "Discover versatility and comfort with the Shamrock Sleeper Sofa. This sofa seamlessly transforms into a cozy sleeper, providing an extra sleeping space for guests. The clean lines, plush cushions, and durable upholstery ensure both style and functionality. The Shamrock Sleeper Sofa adds a touch of Irish inspiration and practicality to your living room or guest room.",
      price: 749.99,
      stock: 6,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Emerald Isle Chaise Lounge",
      slug: "emerald-isle-chaise-lounge",
      description:
        "Unwind in elegance with the Emerald Isle Chaise Lounge. This chaise lounge is upholstered in a rich emerald green fabric, reminiscent of the lush landscapes of Ireland. Its graceful curves, tufted detailing, and sturdy construction provide both comfort and style. Whether used as a statement piece or a cozy reading nook, the Emerald Isle Chaise Lounge adds a touch of Irish allure to your living space.",
      price: 549.99,
      stock: 4,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Lochside Plaid Sofa",
      slug: "lochside-plaid-sofa",
      description:
        "Immerse yourself in the rustic charm of the Lochside Plaid Sofa. This sofa features a traditional plaid upholstery that echoes the patterns found in Scottish tartans. Its cozy cushioning and deep seats provide a comfortable spot for relaxation. Whether placed in a cabin or a contemporary living room, the Lochside Plaid Sofa adds a touch of Scottish heritage and coziness to your home.",
      price: 649.99,
      stock: 7,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Aran Cable Knit Sofa",
      slug: "aran-cable-knit-sofa",
      description:
        "Wrap yourself in warmth and comfort with the Aran Cable Knit Sofa. Inspired by the intricate cable patterns of Irish Aran sweaters, this sofa brings a cozy and textural element to your living space. The chunky cable knit upholstery, plush cushions, and generous seating invite you to snuggle up and unwind. The Aran Cable Knit Sofa blends traditional Irish craftsmanship with contemporary style.",
      price: 899.99,
      stock: 3,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Gaelic Glen Sofa Bed",
      slug: "gaelic-glen-sofa-bed",
      description:
        "Embrace the beauty of the Gaelic Glen Sofa Bed. This versatile piece seamlessly transitions from a stylish sofa to a comfortable bed, providing a space-saving solution for overnight guests. The gentle curves, soft upholstery, and sturdy construction create an inviting seating experience. The Gaelic Glen Sofa Bed combines functionality with a touch of Scottish or Irish charm, making it a practical addition to any home.",
      price: 799.99,
      stock: 4,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Cliffside Highlands Sofa",
      slug: "cliffside-highlands-sofa",
      description:
        "Capture the rugged beauty of the cliffside Highlands with this captivating sofa. The Cliffside Highlands Sofa features a design inspired by the dramatic landscapes of Scotland. Its clean lines, deep seats, and premium upholstery offer both comfort and style. Whether placed in a contemporary loft or a traditional living room, the Cliffside Highlands Sofa creates an atmosphere of adventure and sophistication.",
      price: 749.99,
      stock: 6,
      highlander: false,
      categoryId: 3,
      isDelete: false,
    },
    {
      name: "Rustic Farmhouse Dining Table",
      slug: "rustic-farmhouse-dining-table",
      description:
        "Gather around the Rustic Farmhouse Dining Table and experience the warmth and charm of countryside living. Crafted with a sturdy wooden frame and featuring a distressed finish, this table exudes rustic elegance. Its spacious tabletop provides ample space for family meals and entertaining guests. Whether hosting a dinner party or enjoying a casual meal, the Rustic Farmhouse Dining Table creates a welcoming atmosphere in your dining room.",
      price: 699.99,
      stock: 8,
      highlander: true,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Modern Glass Coffee Table",
      slug: "modern-glass-coffee-table",
      description:
        "Add a touch of contemporary sophistication to your living room with the Modern Glass Coffee Table. Its sleek design features a tempered glass top supported by a minimalist metal frame. The transparency of the glass creates an airy and spacious feel, while the clean lines enhance the modern aesthetic. The Modern Glass Coffee Table serves as a stylish centerpiece, perfect for displaying your favorite books, decor, or hosting coffee gatherings.",
      price: 299.99,
      stock: 12,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Industrial Pipe Console Table",
      slug: "industrial-pipe-console-table",
      description:
        "Make a statement with the Industrial Pipe Console Table. This table combines rustic charm with industrial flair, featuring a sturdy metal frame and wooden tabletop. The distinctive pipe-inspired design adds a touch of edginess, while the ample surface area offers space for displaying decor, books, or a stylish lamp. Whether placed in an entryway, hallway, or living room, the Industrial Pipe Console Table adds character and functionality to your space.",
      price: 349.99,
      stock: 10,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Mid-Century Modern Side Table",
      slug: "mid-century-modern-side-table",
      description:
        "Elevate your living space with the Mid-Century Modern Side Table. This table showcases a sleek and minimalist design, influenced by the iconic styles of the mid-20th century. The solid wood construction and tapered legs exude elegance and timeless appeal. Whether used as a bedside table or a convenient surface next to your sofa, the Mid-Century Modern Side Table brings a touch of retro sophistication to any room.",
      price: 149.99,
      stock: 5,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Marble Top Bistro Table",
      slug: "marble-top-bistro-table",
      description:
        "Create an intimate and elegant dining experience with the Marble Top Bistro Table. The luxurious marble top exudes sophistication and adds a touch of opulence to any space. The sturdy metal base provides stability and modern flair. Perfect for enjoying a leisurely breakfast or sipping a glass of wine, the Marble Top Bistro Table elevates your dining area with its chic and stylish design.",
      price: 249.99,
      stock: 7,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Vintage Writing Desk",
      slug: "vintage-writing-desk",
      description:
        "Channel your creativity and embrace nostalgia with the Vintage Writing Desk. This desk features a charming vintage design, complete with intricate details, curved legs, and a spacious writing surface. The solid wood construction ensures durability, while the multiple drawers provide storage for your writing essentials. Whether used as a workspace or a decorative accent, the Vintage Writing Desk adds a touch of timeless elegance to your home.",
      price: 399.99,
      stock: 6,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Contemporary Glass Dining Table",
      slug: "contemporary-glass-dining-table",
      description:
        "Dine in modern elegance with the Contemporary Glass Dining Table. The sleek glass top is supported by a bold and stylish metal base, creating acaptivating focal point in your dining room. The transparent glass lends a sense of lightness and sophistication, while the sturdy construction ensures durability. The Contemporary Glass Dining Table is perfect for hosting memorable meals and creating a stylish ambiance for your guests.",
      price: 549.99,
      stock: 3,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Convertible Extendable Coffee Table",
      slug: "convertible-extendable-coffee-table",
      description:
        "Maximize functionality and adaptability with the Convertible Extendable Coffee Table. This innovative table seamlessly transforms from a compact coffee table to a spacious dining table, providing versatility for various occasions. The adjustable height and extendable design cater to your specific needs, whether you're working, dining, or entertaining guests. With its modern design and practicality, the Convertible Extendable Coffee Table is a smart addition to any living space.",
      price: 499.99,
      stock: 4,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Scandinavian-Style Round Table",
      slug: "scandinavian-style-round-table",
      description:
        "Embrace the beauty of simplicity with the Scandinavian-Style Round Table. Influenced by the minimalist design principles of Scandinavian interiors, this table features clean lines and a warm wooden finish. The round tabletop promotes easy conversation and creates a welcoming atmosphere. Whether used as a dining table or a gathering spot for family and friends, the Scandinavian-Style Round Table adds a touch of modern charm to your home.",
      price: 199.99,
      stock: 9,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Antique Carved Console Table",
      slug: "antique-carved-console-table",
      description:
        "Make a captivating statement with the Antique Carved Console Table. This table boasts intricate carvings, ornate details, and a rich antique finish. The sturdy wooden construction ensures durability, while the spacious top and storage drawers provide functionality and style. Whether placed in a hallway, foyer, or living room, the Antique Carved Console Table adds a touch of timeless grandeur and elegance to your home.",
      price: 599.99,
      stock: 2,
      highlander: false,
      categoryId: 4,
      isDelete: false,
    },
    {
      name: "Sleek Modern Pendant Light",
      slug: "sleek-modern-pendant-light",
      description:
        "Illuminate your space with the Sleek Modern Pendant Light. This contemporary lighting fixture features a minimalist design with clean lines and a sleek finish. Its adjustable height allows you to customize the lighting to suit your needs. Whether used as a focal point above a dining table or to add ambiance to a living room, the Sleek Modern Pendant Light brings a touch of modern sophistication to any room.",
      price: 199.99,
      stock: 5,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Vintage Industrial Floor Lamp",
      slug: "vintage-industrial-floor-lamp",
      description:
        "Add a nostalgic charm to your space with the Vintage Industrial Floor Lamp. This lamp features a sturdy metal construction with a distressed finish, reminiscent of classic industrial design. Its adjustable height and swivel head provide versatility, allowing you to direct light where needed. Whether placed in a living room, study, or bedroom, the Vintage Industrial Floor Lamp brings a vintage aesthetic and functional lighting to your home.",
      price: 149.99,
      stock: 3,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Art Deco Table Lamp",
      slug: "art-deco-table-lamp",
      description:
        "Elevate your decor with the Art Deco Table Lamp. Inspired by the glamorous era of the 1920s, this lamp showcases geometric patterns and sleek lines. The combination of metal accents and opulent materials exudes sophistication and luxury. Whether used as a bedside lamp or an accent piece on a side table, the Art Deco Table Lamp adds a touch of elegance and creates an ambiance of timeless beauty.",
      price: 249.99,
      stock: 7,
      highlander: true,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Minimalist Wall Sconce",
      slug: "minimalist-wall-sconce",
      description:
        "Enhance your wall space with the Minimalist Wall Sconce. This sleek and understated lighting fixture complements various interior styles. Its clean design and warm illumination create a cozy and inviting atmosphere. Whether used in a hallway, bedroom, or living room, the Minimalist Wall Sconce adds a touch of modern simplicity and functionality to your space.",
      price: 99.99,
      stock: 10,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Crystal Chandelier",
      slug: "crystal-chandelier",
      description:
        "Create a dazzling focal point with the Crystal Chandelier. This exquisite lighting fixture features cascading crystals that reflect light and create a stunning display. Its elegant design and luxurious materials add a touch of glamour and opulence to any room. Whether installed in a grand foyer, dining room, or bedroom, the Crystal Chandelier elevates your space with its sparkling beauty and timeless elegance.",
      price: 399.99,
      stock: 2,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Rustic Mason Jar Pendant Light",
      slug: "rustic-mason-jar-pendant-light",
      description:
        "Infuse your space with rustic charm using the Rustic Mason Jar Pendant Light. This unique lighting fixture combines vintage-inspired mason jars with modern lighting elements. The warm glow and textured glass create a cozy ambiance, perfect for farmhouse or country-style interiors. Whether hung in a kitchen, dining area, or outdoor patio, the Rustic Mason Jar Pendant Light adds a touch of warmth and character to your space.",
      price: 79.99,
      stock: 8,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Contemporary Ceiling Fan",
      slug: "contemporary-ceiling-fan",
      description:
        "Stay cool and stylish with the Contemporary Ceiling Fan. This sleek and modern fan combines functionality with a sophisticated design. Its silent motor provides efficient airflow, while the integrated lighting fixture adds practicality. Whether installed in a living room or bedroom, the Contemporary Ceiling Fan creates a comfortable environment and enhances the aesthetics of your space.",
      price: 299.99,
      stock: 4,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Industrial Pipe Wall Sconce",
      slug: "industrial-pipe-wall-sconce",
      description:
        "Add an industrial touch to your decor with the Industrial Pipe Wall Sconce. This lighting fixture features a pipe-inspired design with metal accents and an edgy finish. Its adjustable arm allows you to direct light wherever desired, creating a unique and customized lighting experience. Whether used in a hallway, bedroom, or study, the Industrial Pipe Wall Sconce brings a bold statement and a touch of rugged charm to your space.",
      price: 89.99,
      stock: 12,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Mid-Century Modern Desk Lamp",
      slug: "mid-century-modern-desk-lamp",
      description:
        "Illuminate your workspace with the Mid-Century Modern Desk Lamp. Inspired by the iconic designs of the mid-20th century, this lamp features clean lines and a minimalist aesthetic. The adjustable arm and swivel head provide flexibility, allowing you to focus light on your tasks. Whether placed on a desk or a bedside table, the Mid-Century Modern Desk Lamp combines functionality and style to enhance your productivity and decor.",
      price: 129.99,
      stock: 6,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Glamorous Wall Mirror with LED Lights",
      slug: "glamorous-wall-mirror-with-led-lights",
      description:
        "Enhance your vanity area with the Glamorous Wall Mirror with LED Lights. This mirror combines a sleek design with built-in LED lights that provide optimal lighting for your grooming routines. The frame's elegant details and reflective surface add a touch of sophistication to your space. Whether installed in a bathroom or dressing room, the Glamorous Wall Mirror with LED Lights elevates both your style and functionality.",
      price: 349.99,
      stock: 3,
      highlander: false,
      categoryId: 5,
      isDelete: false,
    },
    {
      name: "Vintage Wooden Chest",
      slug: "vintage-wooden-chest",
      description:
        "Add a touch of nostalgia to your space with the Vintage Wooden Chest. This storage chest features a charming distressed finish, evoking the allure of bygone eras. Its spacious interior provides ample storage for blankets, pillows, or other items. Whether placed at the foot of the bed or in the living room, the Vintage Wooden Chest combines practicality and vintage aesthetics to elevate your storage solutions.",
      price: 129.99,
      stock: 8,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Modern Wall-Mounted Shelves",
      slug: "modern-wall-mounted-shelves",
      description:
        "Optimize your space with the Modern Wall-Mounted Shelves. These sleek shelves provide a stylish and practical solution for displaying decor, books, or personal items. Their minimalist design and clean lines blend seamlessly with any interior style. Whether in the living room, office, or bedroom, the Modern Wall-Mounted Shelves offer a versatile and organized storage option.",
      price: 149.99,
      stock: 4,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Rustic Storage Bench",
      slug: "rustic-storage-bench",
      description:
        "Combine functionality and rustic charm with the Rustic Storage Bench. This bench features a sturdy wooden construction with a built-in storage compartment beneath the seat. The rustic finish and decorative details add character to your space, while the storage space provides a convenient place to stow away items. Whether used in an entryway or a bedroom, the Rustic Storage Bench offers both seating and organizational solutions.",
      price: 149.99,
      stock: 4,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Contemporary Bookcase",
      slug: "contemporary-bookcase",
      description:
        "Display your books and collectibles in style with the Contemporary Bookcase. This sleek and versatile bookcase features clean lines and adjustable shelves, allowing you to customize the storage to fit your needs. Its modern design complements various interior aesthetics, from minimalist to eclectic. Whether in a living room, home office, or study, the Contemporary Bookcase adds a touch of sophistication and organization to your space.",
      price: 69.99,
      stock: 10,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Mid-Century Modern Credenza",
      slug: "mid-century-modern-credenza",
      description:
        "Embrace the timeless elegance of mid-century design with the Mid-Century Modern Credenza. This storage unit features a clean silhouette, tapered legs, and ample storage space. The combination of open shelves and concealed compartments offers versatility and organization. Whether used in a dining room, living room, or office, the Mid-Century Modern Credenza adds a touch of retro sophistication to your space.",
      price: 299.99,
      stock: 2,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Industrial Metal Storage Cabinet",
      slug: "industrial-metal-storage-cabinet",
      description:
        "Infuse your space with industrial charm using the Industrial Metal Storage Cabinet. This cabinet features a sturdy metal construction with a distressed finish, reminiscent of rugged warehouse aesthetics. The multiple shelves and drawers provide ample storage for various items. Whether in a workshop, garage, or living space, the Industrial Metal Storage Cabinet combines style and functionality to meet your storage needs.",
      price: 59.99,
      stock: 12,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Versatile Storage Ottoman",
      slug: "versatile-storage-ottoman",
      description:
        "Maximize your space with the Versatile Storage Ottoman. This multifunctional piece serves as a comfortable ottoman for resting your feet, extra seating, and hidden storage. The spacious interior offers a convenient place to store blankets, pillows, or other items, keeping your livingspace tidy. Whether in a living room or bedroom, the Versatile Storage Ottoman adds functionality and style to your home.",
      price: 199.99,
      stock: 5,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Classic Wooden Wardrobe",
      slug: "classic-wooden-wardrobe",
      description:
        "Organize your clothing and accessories with the Classic Wooden Wardrobe. This wardrobe features a timeless design with sturdy wooden construction and ample storage space. The multiple drawers, shelves, and hanging rods provide versatile storage options. Whether in a bedroom or entryway, the Classic Wooden Wardrobe offers a practical and elegant storage solution for your personal belongings.",
      price: 79.99,
      stock: 8,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Floating Wall-Mounted Cabinet",
      slug: "floating-wall-mounted-cabinet",
      description:
        "Maximize floor space with the Floating Wall-Mounted Cabinet. This sleek storage unit attaches directly to the wall, providing storage without occupying valuable floor area. Its modern design and clean lines create a minimalist aesthetic, while the shelves and drawers offer practical storage space. Whether in a bathroom, kitchen, or living room, the Floating Wall-Mounted Cabinet adds functionality and style to your space.",
      price: 119.99,
      stock: 6,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Farmhouse Storage Trunk",
      slug: "farmhouse-storage-trunk",
      description:
        "Enhance your farmhouse decor with the Farmhouse Storage Trunk. This trunk features a distressed finish and rustic details, evoking the charm of a countryside cottage. Its spacious interior allows for ample storage of blankets, pillows, or other items. Whether used as a coffee table or placed at the foot of the bed, the Farmhouse Storage Trunk combines style and functionality to meet your storage needs.",
      price: 249.99,
      stock: 3,
      highlander: false,
      categoryId: 6,
      isDelete: false,
    },
    {
      name: "Luxury Egyptian Cotton Sheet Set",
      slug: "luxury-egyptian-cotton-sheet-set",
      description:
        "Indulge in the ultimate comfort with the Luxury Egyptian Cotton Sheet Set. Crafted from high-quality Egyptian cotton, these sheets offer a soft and luxurious feel. The set includes a fitted sheet, a flat sheet, and pillowcases, all designed to provide a peaceful and cozy sleeping experience. Drift away into a restful sleep surrounded by the exceptional comfort and elegance of the Luxury Egyptian Cotton Sheet Set.",
      price: 249.99,
      stock: 3,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Hypoallergenic Bamboo Pillow",
      slug: "hypoallergenic-bamboo-pillow",
      description:
        "Experience the perfect blend of comfort and sustainability with the Hypoallergenic Bamboo Pillow. Made from premium bamboo fibers, this pillow offers exceptional breathability, moisture-wicking properties, and hypoallergenic benefits. The medium-firm support and plush feel ensure a restful night's sleep, while the natural materials contribute to a healthier sleep environment. Rest easy knowing you're sleeping on a pillow that cares for your well-being and the planet.",
      price: 79.99,
      stock: 7,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Ultra-Plush Down Comforter",
      slug: "ultra-plush-down-comforter",
      description:
        "Wrap yourself in luxurious warmth with the Ultra-Plush Down Comforter. Filled with premium down feathers, this comforter provides exceptional softness and insulation. The baffle-box construction prevents shifting of the down, ensuring even distribution and eliminating cold spots. Whether in the colder months or for year-round comfort, the Ultra-Plush Down Comforter offers a cozy and inviting sleeping experience.",
      price: 199.99,
      stock: 5,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Memory Foam Mattress Topper",
      slug: "memory-foam-mattress-topper",
      description:
        "Enhance the comfort and support of your mattress with the Memory Foam Mattress Topper. This topper is made from high-density memory foam that contours to your body, relieving pressure points and providing personalized comfort. The breathable and hypoallergenic materials ensure a cool and healthy sleeping environment. Transform your bed into a haven of relaxation with the Memory Foam Mattress Topper.",
      price: 129.99,
      stock: 10,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Silk Satin Pillowcase Set",
      slug: "silk-satin-pillowcase-set",
      description:
        "Indulge in the luxurious softness and beauty of the Silk Satin Pillowcase Set. These pillowcases are crafted from premium silk satin, known for its smooth texture and gentle treatment of hair and skin. The set includes multiple pillowcases, allowing you to experience the benefits of silk every night. Wake up with refreshed skin and tangle-free hair, thanks to the Silk Satin Pillowcase Set.",
      price: 59.99,
      stock: 8,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Microfiber Sheet Set",
      slug: "microfiber-sheet-set",
      description:
        "Enjoy the cozy comfort and durability of the Microfiber Sheet Set. Made from ultra-soft microfiber fabric, these sheets offer a silky smooth feel and exceptional breathability. The set includes a fitted sheet, a flat sheet, and pillowcases, providing a complete bedding solution. Whether for everyday use or as a spare set, the Microfiber Sheet Set ensures a comfortable and peaceful sleep.",
      price: 49.99,
      stock: 12,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "All-Season Weighted Blanket",
      slug: "all-season-weighted-blanket",
      description:
        "Snuggle up and experience the soothing benefits of the All-Season Weighted Blanket. This blanket is designed to provide gentle pressure, promoting relaxation and reducing anxiety. The blanket's breathable fabric and versatile weight make it suitable for year-round use. Wrap yourself in comfort and experience a sense of calm with the All-Season Weighted Blanket.",
      price: 149.99,
      stock: 4,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Quilted Mattress Protector",
      slug: "quilted-mattress-protector",
      description:
        "Protect your mattress and enhance its longevity with the Quilted Mattress Protector. This mattress protector features a quilted design and a waterproof backing, guarding against spills, stains, and allergens. The elasticized skirt ensures a snug fit on various mattress sizes. Sleep soundly knowing that your mattress is shielded by the Quilted Mattress Protector.",
      price: 39.99,
      stock: 15,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Cotton Blend Blanket",
      slug: "cotton-blend-blanket",
      description:
        "Cozy up with the Cotton Blend Blanket, crafted from a soft and breathable cotton blend fabric. This lightweight blanket is perfect for adding an extra layer of warmth without feeling heavy. Its versatile design and various color options make it a great addition to any bedding ensemble. Snuggle up and enjoy the comfort and style of the Cotton Blend Blanket.",
      price: 69.99,
      stock: 6,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Down Alternative Pillows",
      slug: "down-alternative-pillows",
      description:
        "Experience the plush comfort and support of the Down Alternative Pillows. These pillows are filled with a hypoallergenic down alternative that mimics the feel of real down. The medium-firm support and fluffy feel ensure a comfortable sleep experience for all sleep positions. Enjoy the luxury of down without the allergens, thanks to the Down Alternative Pillows.",
      price: 59.99,
      stock: 9,
      highlander: false,
      categoryId: 7,
      isDelete: false,
    },
    {
      name: "Teak Wood Outdoor Dining Set",
      slug: "teak-wood-outdoor-dining-set",
      description:
        "Create an inviting outdoor dining space with the Teak Wood Outdoor Dining Set. This set includes a sturdy teak wood table and matching chairs, designed to withstand outdoor conditions. The natural finish of the teak wood adds warmth and elegance to your garden or patio. Whether hosting a family barbecue or enjoying a peaceful meal outdoors, the Teak Wood Outdoor Dining Set combines durability and style.",
      price: 699.99,
      stock: 5,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Wicker Patio Conversation Set",
      slug: "wicker-patio-conversation-set",
      description:
        "Transform your outdoor space into a cozy gathering spot with the Wicker Patio Conversation Set. This set features comfortable wicker chairs and a coffee table, perfect for enjoying conversations with family and friends. The weather-resistant wicker and plush cushions provide both style and durability. Whether used on a patio or in a garden, the Wicker Patio Conversation Set offers a comfortable and inviting seating area.",
      price: 499.99,
      stock: 3,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Steel Frame Gazebo",
      slug: "steel-frame-gazebo",
      description:
        "Create a shaded oasis in your garden with the Steel Frame Gazebo. This gazebo features a durable steel frame and a weather-resistant canopy, providing protection from the sun and light rain. Its spacious design allows for comfortable seating and outdoor entertaining. Whether used for relaxing or hosting outdoor gatherings, the Steel Frame Gazebo adds both style and functionality to your garden or backyard.",
      price: 799.99,
      stock: 2,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Foldable Wooden Adirondack Chair",
      slug: "foldable-wooden-adirondack-chair",
      description:
        "Relax in classic style with the Foldable Wooden Adirondack Chair. Crafted from durable wood, this chair features a comfortable slanted backrest and wide armrests. Its foldable design allows for easy storage and portability. Whether placed on a lawn, patio, or garden, the Foldable Wooden Adirondack Chair offers a timeless and comfortable seating option for enjoying the outdoors.",
      price: 149.99,
      stock: 8,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Solar-Powered Outdoor String Lights",
      slug: "solar-powered-outdoor-string-lights",
      description:
        "Create a magical ambiance in your garden with the Solar-Powered Outdoor String Lights. These lights are powered by solar energy, eliminating the need for electrical outlets or batteries. The warm and inviting glow adds a charming touch to outdoor spaces. Whether draped across trees or wrapped around pergolas, the Solar-Powered Outdoor String Lights enhance the beauty and atmosphere of your garden.",
      price: 39.99,
      stock: 12,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Rattan Lounge Chair with Cushions",
      slug: "rattan-lounge-chair-with-cushions",
      description:
        "Unwind in style with the Rattan Lounge Chair with Cushions. This chair features a durable rattan construction and comfortable cushions, providing a cozy seating experience. The modern design and neutral color palette complement various outdoor settings. Whether placed by a poolside or on a patio, the Rattan Lounge Chair with Cushions invites you to relax and enjoy your outdoor oasis.",
      price: 249.99,
      stock: 6,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Ceramic Outdoor Planters",
      slug: "ceramic-outdoor-planters",
      description:
        "Enhance your garden or patio with the Ceramic Outdoor Planters. These planters feature stylish ceramic designs and provide a decorative home for your favorite plants or flowers. The durable construction ensures long-lasting beauty and functionality. Whether used individually or arranged in a group, the Ceramic Outdoor Planters add a touch of elegance and greenery to your outdoor space.",
      price: 59.99,
      stock: 15,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Outdoor Fire Pit Table",
      slug: "outdoor-fire-pit-table",
      description:
        "Stay warm and create a cozy atmosphere in your garden with the Outdoor Fire Pit Table. This table features a built-in fire pit in the center, providing both warmth and a focal point for gatherings. The sturdy construction and stylish design make it a versatile addition to any outdoor space. Whether used for roasting marshmallows or simply enjoying the flames, the Outdoor Fire Pit Table enhances your outdoor living experience.",
      price: 399.99,
      stock: 4,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Wooden Garden Bench",
      slug: "wooden-garden-bench",
      description:
        "Add a charming seating area to your garden with the Wooden Garden Bench. This bench is crafted from durable wood and features a classic design with slatted seating and backrest. Its sturdy construction ensures longevity, and the natural finish blends seamlessly with outdoor surroundings. Whether placed under a tree or along a garden path, the Wooden Garden Bench provides a tranquil spot to relax and enjoy nature.",
      price: 199.99,
      stock: 7,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Hanging Hammock Chair",
      slug: "hanging-hammock-chair",
      description:
        "Sway in the gentle breeze and unwind with the Hanging Hammock Chair. This chair is made from durable materials and features a comfortable seat and backrest. The hanging design allows for a soothing rocking motion. Whether hung from a tree or a sturdy stand, the Hanging Hammock Chair creates a serene retreat in your garden or patio, providing a peaceful place to read, relax, or daydream.",
      price: 129.99,
      stock: 10,
      highlander: false,
      categoryId: 8,
      isDelete: false,
    },
    {
      name: "Decorative Throw Pillows",
      slug: "decorative-throw-pillows",
      description:
        "Add a pop of color and style to your living space with these Decorative Throw Pillows. Made from high-quality fabric and filled with plush materials, these pillows offer both comfort and aesthetic appeal. Their versatile design allows you to easily incorporate them into your existing decor. Whether placed on a sofa, chair, or bed, the Decorative Throw Pillows enhance the visual appeal and coziness of your home.",
      price: 24.99,
      stock: 8,
      highlander: true,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Wall Mirrors with Ornate Frames",
      slug: "wall-mirrors-with-ornate-frames",
      description:
        "Elevate the style and functionality of your walls with these Wall Mirrors with Ornate Frames. The mirrors feature beautifully crafted frames, adding a touch of elegance to any room. Hang them individually or create an eye-catching arrangement for a statement wall. Whether in a hallway, bedroom, or living room, these Wall Mirrors with Ornate Frames reflect light and create a sense of spaciousness and charm.",
      price: 89.99,
      stock: 5,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Tabletop Picture Frames",
      slug: "tabletop-picture-frames",
      description:
        "Display your cherished memories in style with these Tabletop Picture Frames. Crafted with attention to detail, these frames showcase your favorite photographs or artwork. Their versatile design allows for both horizontal and vertical tabletop display. Whether placed on a side table, mantel, or shelf, these Tabletop Picture Frames add a personal touch and create a focal point in your home.",
      price: 12.99,
      stock: 12,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Candle Holders",
      slug: "candle-holders",
      description:
        "Enhance the ambiance of your space with these elegant Candle Holders. Made from various materials such as metal, glass, or ceramic, these holders provide a stylish and safe way to display candles. Whether used for dining occasions, special events, or to create a relaxing atmosphere, these Candle Holders add warmth and sophistication to your home decor.",
      price: 19.99,
      stock: 10,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Decorative Vases",
      slug: "decorative-vases",
      description:
        "Bring nature indoors and enhance your decor with these Decorative Vases. Available in different shapes, sizes, and materials, these vases provide a versatile and stylish way to display flowers and botanicals. Whether used as standalone decor pieces or filled with fresh or artificial flowers, these Decorative Vases add beauty and a touch of nature to your living space.",
      price: 29.99,
      stock: 7,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Artificial Plants",
      slug: "artificial-plants",
      description:
        "Bring a touch of greenery to your home with these Artificial Plants. These realistic and low-maintenance plants provide the beauty of nature without the need for watering or sunlight. Place them on shelves, tables, or window sills to add a fresh and vibrant element to your decor. Whether you have a green thumb or not, these Artificial Plants offer an easy way to incorporate the beauty of nature into your space.",
      price: 19.99,
      stock: 15,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Decorative Wall Clocks",
      slug: "decorative-wall-clocks",
      description:
        "Stay on schedule while adding a stylish accent to your walls with these Decorative Wall Clocks. These clocks feature unique designs, from minimalist to vintage-inspired, and are crafted with precision. Hang them in your living room, kitchen, or bedroom to enhance the functionality and aesthetics of your space. With these Decorative Wall Clocks, you'll never lose track of time in style.",
      price: 39.99,
      stock: 6,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Cozy Knit Blankets",
      slug: "cozy-knit-blankets",
      description:
        "Stay warm and cozy with these soft and luxurious Cozy Knit Blankets. Made from high-quality knit fabric, these blankets provide both warmth and comfort. Their textured patterns and soft hues add a decorative touch to any room. Whether draped over a sofa, armchair, or at the foot of the bed, these Cozy Knit Blankets offer a cozy and inviting element to your living space.",
      price: 49.99,
      stock: 4,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Decorative Wall Shelves",
      slug: "decorative-wall-shelves",
      description:
        "Display your favorite decor pieces with these Decorative Wall Shelves. These shelves feature stylish designs and sturdy construction, allowing you to showcase your collectibles, books, or plants. Whether mounted individually or arranged in a creative configuration, these Decorative Wall Shelves add a functional and decorative element to your walls, transforming them into captivating display areas.",
      price: 34.99,
      stock: 9,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
    {
      name: "Patterned Area Rugs",
      slug: "patterned-area-rugs",
      description:
        "Add warmth and style to your floors with these Patterned Area Rugs. These rugs feature eye-catching patterns and are made from durable and soft materials. Place them in living rooms, bedrooms, or entryways to create a cozy and inviting atmosphere. Whether your decor style is traditional or modern, these Patterned Area Rugs provide a decorative accent and comfort underfoot.",
      price: 79.99,
      stock: 5,
      highlander: false,
      categoryId: 9,
      isDelete: false,
    },
  ]

  await knex("products").insert(products)

  const imageProduct = [
    // Catégorie 1
    { urlImage: "emerald-isle-bookcase.png", productId: 1, isMain: true },
    { urlImage: "emerald-isle-bookcase2.png", productId: 1, isMain: false },
    { urlImage: "emerald-isle-bookcase3.png", productId: 1, isMain: false },
    { urlImage: "scottish-highlands-armoire.png", productId: 2, isMain: true },
    {
      urlImage: "scottish-highlands-armoire2.png",
      productId: 2,
      isMain: false,
    },
    { urlImage: "celtic-cottage-side-table.png", productId: 3, isMain: true },
    { urlImage: "celtic-cottage-side-table2.png", productId: 3, isMain: false },

    { urlImage: "bedding.jpg", productId: 4, isMain: true },
    { urlImage: "bedding.jpg", productId: 5, isMain: true },
    { urlImage: "bedding.jpg", productId: 6, isMain: true },
    { urlImage: "bedding.jpg", productId: 7, isMain: true },
    { urlImage: "bedding.jpg", productId: 8, isMain: true },
    { urlImage: "bedding.jpg", productId: 9, isMain: true },
    { urlImage: "bedding.jpg", productId: 10, isMain: true },

    // Catégorie 2
    { urlImage: "elegant-armchair.png", productId: 11, isMain: true },
    { urlImage: "elegant-armchair2.png", productId: 11, isMain: false },
    { urlImage: "vintage-wingback-chair.png", productId: 12, isMain: true },
    { urlImage: "vintage-wingback-chair2.png", productId: 12, isMain: false },
    { urlImage: "modern-swivel-chair.png", productId: 13, isMain: true },
    { urlImage: "modern-swivel-chair2.png", productId: 13, isMain: false },

    { urlImage: "bedding.jpg", productId: 14, isMain: true },
    { urlImage: "bedding.jpg", productId: 15, isMain: true },
    { urlImage: "bedding.jpg", productId: 16, isMain: true },
    { urlImage: "bedding.jpg", productId: 17, isMain: true },
    { urlImage: "bedding.jpg", productId: 18, isMain: true },
    { urlImage: "bedding.jpg", productId: 19, isMain: true },
    { urlImage: "bedding.jpg", productId: 20, isMain: true },

    // Catégorie 3
    { urlImage: "glenwood-tartan-sofa.png", productId: 21, isMain: true },
    { urlImage: "glenwood-tartan-sofa2.png", productId: 21, isMain: false },
    {
      urlImage: "lucky-clover-sectional-sofa.png",
      productId: 22,
      isMain: true,
    },
    {
      urlImage: "lucky-clover-sectional-sofa2.png",
      productId: 22,
      isMain: false,
    },
    { urlImage: "celtic-knot-reclining-sofa.png", productId: 23, isMain: true },
    {
      urlImage: "celtic-knot-reclining-sofa2.png",
      productId: 23,
      isMain: false,
    },

    { urlImage: "bedding.jpg", productId: 24, isMain: true },
    { urlImage: "bedding.jpg", productId: 25, isMain: true },
    { urlImage: "bedding.jpg", productId: 26, isMain: true },
    { urlImage: "bedding.jpg", productId: 27, isMain: true },
    { urlImage: "bedding.jpg", productId: 28, isMain: true },
    { urlImage: "bedding.jpg", productId: 29, isMain: true },
    { urlImage: "bedding.jpg", productId: 30, isMain: true },

    // Catégorie 4
    {
      urlImage: "rustic-farmhouse-dining-table.png",
      productId: 31,
      isMain: true,
    },
    {
      urlImage: "rustic-farmhouse-dining-table2.png",
      productId: 31,
      isMain: false,
    },
    { urlImage: "modern-glass-coffee-table.png", productId: 32, isMain: true },
    {
      urlImage: "modern-glass-coffee-table2.png",
      productId: 32,
      isMain: false,
    },
    {
      urlImage: "industrial-pipe-console-table.png",
      productId: 33,
      isMain: true,
    },
    {
      urlImage: "industrial-pipe-console-table2.png",
      productId: 33,
      isMain: false,
    },

    { urlImage: "bedding.jpg", productId: 34, isMain: true },
    { urlImage: "bedding.jpg", productId: 35, isMain: true },
    { urlImage: "bedding.jpg", productId: 36, isMain: true },
    { urlImage: "bedding.jpg", productId: 37, isMain: true },
    { urlImage: "bedding.jpg", productId: 38, isMain: true },
    { urlImage: "bedding.jpg", productId: 39, isMain: true },
    { urlImage: "bedding.jpg", productId: 40, isMain: true },

    // Catégorie 5
    { urlImage: "sleek-modern-pendant-light.png", productId: 41, isMain: true },
    {
      urlImage: "sleek-modern-pendant-light2.png",
      productId: 41,
      isMain: false,
    },
    {
      urlImage: "vintage-industrial-floor-lamp.png",
      productId: 42,
      isMain: true,
    },
    {
      urlImage: "vintage-industrial-floor-lamp2.png",
      productId: 42,
      isMain: false,
    },
    { urlImage: "art-deco-table-lamp.png", productId: 43, isMain: true },
    { urlImage: "art-deco-table-lamp2.png", productId: 43, isMain: false },

    { urlImage: "bedding.jpg", productId: 44, isMain: true },
    { urlImage: "bedding.jpg", productId: 45, isMain: true },
    { urlImage: "bedding.jpg", productId: 46, isMain: true },
    { urlImage: "bedding.jpg", productId: 47, isMain: true },
    { urlImage: "bedding.jpg", productId: 48, isMain: true },
    { urlImage: "bedding.jpg", productId: 49, isMain: true },
    { urlImage: "bedding.jpg", productId: 50, isMain: true },

    // Catégorie 6
    { urlImage: "vintage-wooden-chest.png", productId: 51, isMain: true },
    { urlImage: "vintage-wooden-chest2.png", productId: 51, isMain: false },
    {
      urlImage: "modern-wall-mounted-shelves.png",
      productId: 52,
      isMain: true,
    },
    {
      urlImage: "modern-wall-mounted-shelves2.png",
      productId: 52,
      isMain: false,
    },
    { urlImage: "rustic-storage-bench.png", productId: 53, isMain: true },
    { urlImage: "rustic-storage-bench2.png", productId: 53, isMain: false },

    { urlImage: "bedding.jpg", productId: 54, isMain: true },
    { urlImage: "bedding.jpg", productId: 55, isMain: true },
    { urlImage: "bedding.jpg", productId: 56, isMain: true },
    { urlImage: "bedding.jpg", productId: 57, isMain: true },
    { urlImage: "bedding.jpg", productId: 58, isMain: true },
    { urlImage: "bedding.jpg", productId: 59, isMain: true },
    { urlImage: "bedding.jpg", productId: 60, isMain: true },

    // Catégorie 7
    {
      urlImage: "luxury-egyptian-cotton-sheet-set.png",
      productId: 61,
      isMain: true,
    },
    {
      urlImage: "luxury-egyptian-cotton-sheet-set2.png",
      productId: 61,
      isMain: false,
    },
    {
      urlImage: "hypoallergenic-bamboo-pillow.png",
      productId: 62,
      isMain: true,
    },
    {
      urlImage: "hypoallergenic-bamboo-pillow2.png",
      productId: 62,
      isMain: false,
    },
    { urlImage: "ultra-plush-down-comforter.png", productId: 63, isMain: true },
    {
      urlImage: "ultra-plush-down-comforter2.png",
      productId: 63,
      isMain: false,
    },

    { urlImage: "bedding.jpg", productId: 64, isMain: true },
    { urlImage: "bedding.jpg", productId: 65, isMain: true },
    { urlImage: "bedding.jpg", productId: 66, isMain: true },
    { urlImage: "bedding.jpg", productId: 67, isMain: true },
    { urlImage: "bedding.jpg", productId: 68, isMain: true },
    { urlImage: "bedding.jpg", productId: 69, isMain: true },
    { urlImage: "bedding.jpg", productId: 70, isMain: true },

    // Catégorie 8
    {
      urlImage: "teak-wood-outdoor-dining-set.png",
      productId: 71,
      isMain: true,
    },
    {
      urlImage: "teak-wood-outdoor-dining-set2.png",
      productId: 71,
      isMain: false,
    },
    {
      urlImage: "teak-wood-outdoor-dining-set3.png",
      productId: 71,
      isMain: false,
    },
    {
      urlImage: "wicker-patio-conversation-set.png",
      productId: 72,
      isMain: true,
    },
    {
      urlImage: "wicker-patio-conversation-set2.png",
      productId: 72,
      isMain: false,
    },
    { urlImage: "steel-frame-gazebo.jpg", productId: 73, isMain: true },
    { urlImage: "steel-frame-gazebo2.jpg", productId: 73, isMain: false },

    { urlImage: "bedding.jpg", productId: 74, isMain: true },
    { urlImage: "bedding.jpg", productId: 75, isMain: true },
    { urlImage: "bedding.jpg", productId: 76, isMain: true },
    { urlImage: "bedding.jpg", productId: 77, isMain: true },
    { urlImage: "bedding.jpg", productId: 78, isMain: true },
    { urlImage: "bedding.jpg", productId: 79, isMain: true },
    { urlImage: "bedding.jpg", productId: 80, isMain: true },

    // Catégorie 9
    { urlImage: "decorative-throw-pillows.png", productId: 81, isMain: true },
    { urlImage: "decorative-throw-pillows2.png", productId: 81, isMain: false },
    {
      urlImage: "wall-mirrors-with-ornate-frames.png",
      productId: 82,
      isMain: true,
    },
    {
      urlImage: "wall-mirrors-with-ornate-framesZ.png",
      productId: 82,
      isMain: false,
    },
    { urlImage: "tabletop-picture-frames.png", productId: 83, isMain: true },
    { urlImage: "tabletop-picture-frames2.png", productId: 83, isMain: false },

    { urlImage: "bedding.jpg", productId: 84, isMain: true },
    { urlImage: "bedding.jpg", productId: 85, isMain: true },
    { urlImage: "bedding.jpg", productId: 86, isMain: true },
    { urlImage: "bedding.jpg", productId: 87, isMain: true },
    { urlImage: "bedding.jpg", productId: 88, isMain: true },
    { urlImage: "bedding.jpg", productId: 89, isMain: true },
    { urlImage: "bedding.jpg", productId: 90, isMain: true },
  ]

  await knex("image_product").insert(imageProduct)

  const materials = [
    { nameMaterial: "Wood" },
    { nameMaterial: "Leather" },
    { nameMaterial: "Metal" },
    { nameMaterial: "Reclaimed Wood" },
    { nameMaterial: "Fabric" },
    { nameMaterial: "Foam" },
    { nameMaterial: "Feathers" },
    { nameMaterial: "Polyester" },
    { nameMaterial: "Cotton" },
    { nameMaterial: "Glass" },
    { nameMaterial: "Marble" },
    { nameMaterial: "Plastic" },
    { nameMaterial: "Wicker" },
    { nameMaterial: "Bamboo" },
    { nameMaterial: "Rattan" },
    { nameMaterial: "Brass" },
    { nameMaterial: "Concrete" },
    { nameMaterial: "Ceramic" },
    { nameMaterial: "Wool" },
    { nameMaterial: "Stone" },
    { nameMaterial: "Porcelain" },
    { nameMaterial: "Velvet" },
    { nameMaterial: "Silver" },
    { nameMaterial: "Bamboo Fibers" },
    { nameMaterial: "Memory Foam" },
    { nameMaterial: "Silk Satin" },
    { nameMaterial: "Microfiber" },
    { nameMaterial: "Down Feathers" },
    { nameMaterial: "Cotton Blend" },
    { nameMaterial: "Down Alternative" },
  ]

  await knex("materials").insert(materials)

  const materialProduct = [
    // Catégorie 1
    { materialId: 1, productId: 1 },
    { materialId: 1, productId: 2 },
    { materialId: 1, productId: 3 },

    // Catégorie 2
    { materialId: 1, productId: 11 },
    { materialId: 5, productId: 11 },
    { materialId: 1, productId: 12 },
    { materialId: 5, productId: 12 },
    { materialId: 3, productId: 13 },
    { materialId: 5, productId: 13 },

    // Catégorie 3
    { materialId: 4, productId: 21 },
    { materialId: 7, productId: 21 },
    { materialId: 5, productId: 22 },
    { materialId: 6, productId: 22 },
    { materialId: 5, productId: 23 },
    { materialId: 6, productId: 23 },

    // Catégorie 4
    { materialId: 1, productId: 31 },
    { materialId: 3, productId: 32 },
    { materialId: 10, productId: 32 },
    { materialId: 3, productId: 33 },
    { materialId: 1, productId: 33 },

    // Catégorie 5
    { materialId: 1, productId: 41 },
    { materialId: 3, productId: 41 },
    { materialId: 11, productId: 41 },
    { materialId: 1, productId: 42 },
    { materialId: 3, productId: 42 },
    { materialId: 3, productId: 43 },
    { materialId: 11, productId: 43 },

    // Catégorie 6
    { materialId: 1, productId: 51 },
    { materialId: 3, productId: 51 },
    { materialId: 1, productId: 52 },
    { materialId: 3, productId: 52 },
    { materialId: 1, productId: 53 },
    { materialId: 3, productId: 53 },

    // Catégorie 7
    { materialId: 8, productId: 61 },
    { materialId: 13, productId: 62 },
    { materialId: 17, productId: 63 },

    // Catégorie 8
    { materialId: 1, productId: 71 },
    { materialId: 3, productId: 71 },
    { materialId: 16, productId: 71 },
    { materialId: 1, productId: 72 },
    { materialId: 5, productId: 72 },
    { materialId: 1, productId: 73 },
    { materialId: 3, productId: 73 },
    { materialId: 5, productId: 73 },

    // Catégorie 9
    { materialId: 5, productId: 81 },
    { materialId: 1, productId: 81 },
    { materialId: 7, productId: 81 },
    { materialId: 10, productId: 82 },
    { materialId: 1, productId: 82 },
    { materialId: 15, productId: 82 },
    { materialId: 10, productId: 83 },
    { materialId: 1, productId: 83 },
  ]

  await knex("rel_material_product").insert(materialProduct)
}
