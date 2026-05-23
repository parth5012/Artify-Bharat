// Mock Data for Artify Bharat Platform
// Realistic Indian craft products with authentic details

export const mockProducts = [
    {
        id: 1,
        title: "Traditional Kathakali Mask",
        artisanName: "Suresh Nair",
        artisanId: 1,
        state: "Kerala",
        region: "Kochi",
        price: 3200,
        originalPrice: 4000,
        discount: 20,
        description: "Handcrafted traditional Kathakali mask representing the heroic character Pachcha. Made using authentic techniques passed down through generations, featuring natural pigments and intricate facial expressions that capture the essence of Kerala's classical dance form.",
        imageUrl: "/images/states/kerala.webp",
        images: [
            "/images/states/kerala.webp",
            "/images/states/kerala.webp",
            "/images/states/kerala.webp",
            "/images/states/kerala.webp"
        ],
        category: "Traditional Art",
        subcategory: "Masks",
        materials: ["Papier-mâché", "Natural pigments", "Gold leaf", "Cotton fabric"],
        dimensions: {
            length: "12 inches",
            width: "10 inches",
            height: "6 inches",
            weight: "300 grams"
        },
        craftTechnique: "Traditional Kathakali mask making",
        timeTaken: "15 days",
        rating: 4.8,
        reviewCount: 89,
        inStock: true,
        stockCount: 5,
        featured: true,
        verified: true,
        tags: ["Kathakali", "Kerala", "Traditional", "Dance", "Mask", "Handmade"],
        story: "This mask represents Pachcha, the noble hero character in Kathakali. The green face symbolizes virtue and divinity, while the elaborate crown and facial decorations follow centuries-old iconography.",
        careInstructions: "Keep in a dry place away from direct sunlight. Clean gently with a soft, dry cloth.",
        shippingWeight: "500 grams",
        origin: "Kochi, Kerala"
    },

    {
        id: 2,
        title: "Madhubani Fish Motif Painting",
        artisanName: "Sita Devi",
        artisanId: 2,
        state: "Bihar",
        region: "Mithila",
        price: 2500,
        originalPrice: 3200,
        discount: 22,
        description: "Authentic Madhubani painting featuring the sacred fish motif, symbolizing fertility and prosperity in Mithila culture. Created using traditional natural pigments on handmade paper, this artwork showcases the intricate line work and vibrant colors characteristic of this UNESCO-recognized art form.",
        imageUrl: "/images/states/bihar.jpg",
        images: [
            "/images/states/bihar.jpg",
            "/images/states/bihar.jpg",
            "/images/states/bihar.jpg"
        ],
        category: "Paintings",
        subcategory: "Madhubani",
        materials: ["Handmade paper", "Natural pigments", "Bamboo brushes", "Organic binders"],
        dimensions: {
            length: "16 inches",
            width: "12 inches",
            height: "0.1 inches",
            weight: "150 grams"
        },
        craftTechnique: "Traditional Madhubani painting",
        timeTaken: "8 days",
        rating: 4.9,
        reviewCount: 156,
        inStock: true,
        stockCount: 3,
        featured: true,
        verified: true,
        tags: ["Madhubani", "Bihar", "Fish", "Traditional", "Painting", "Natural pigments"],
        story: "In Mithila tradition, fish represent fertility and good fortune. This painting follows the ancient Bharni style, characterized by bright colors and intricate patterns that have been passed down through generations of women artists.",
        careInstructions: "Frame under glass to protect from moisture and dust. Avoid direct sunlight to preserve colors.",
        shippingWeight: "300 grams",
        origin: "Mithila, Bihar"
    },

    {
        id: 3,
        title: "Rajasthani Blue Pottery Vase",
        artisanName: "Ramesh Kumhar",
        artisanId: 3,
        state: "Rajasthan",
        region: "Jaipur",
        price: 1800,
        originalPrice: 2400,
        discount: 25,
        description: "Exquisite blue pottery vase crafted in the traditional Jaipur style. This unique ceramic art form, originally from Persia, has been perfected by Rajasthani artisans over centuries. The distinctive blue and white patterns are hand-painted using traditional techniques and natural glazes.",
        imageUrl: "/images/states/rajasthan.jpg",
        images: [
            "/images/states/rajasthan.jpg",
            "/images/states/rajasthan.jpg",
            "/images/states/rajasthan.jpg",
            "/images/states/rajasthan.jpg"
        ],
        category: "Pottery",
        subcategory: "Blue Pottery",
        materials: ["Quartz", "Raw glaze", "Multani mitti", "Glass powder", "Natural dyes"],
        dimensions: {
            length: "8 inches",
            width: "8 inches",
            height: "12 inches",
            weight: "800 grams"
        },
        craftTechnique: "Traditional blue pottery",
        timeTaken: "12 days",
        rating: 4.7,
        reviewCount: 203,
        inStock: true,
        stockCount: 8,
        featured: false,
        verified: true,
        tags: ["Blue pottery", "Rajasthan", "Jaipur", "Ceramic", "Vase", "Traditional"],
        story: "Blue pottery is unique as it doesn't use clay. Instead, it's made from quartz, raw glaze, and multani mitti. The distinctive blue dye comes from cobalt oxide, creating the signature turquoise blue that Jaipur pottery is famous for.",
        careInstructions: "Handle with care. Clean with mild soap and water. Not suitable for microwave or dishwasher.",
        shippingWeight: "1200 grams",
        origin: "Jaipur, Rajasthan"
    },

    {
        id: 4,
        title: "Kashmiri Pashmina Shawl",
        artisanName: "Mohammad Ali Shah",
        artisanId: 4,
        state: "Jammu & Kashmir",
        region: "Srinagar",
        price: 8500,
        originalPrice: 12000,
        discount: 29,
        description: "Luxurious hand-woven Pashmina shawl made from the finest Changthangi goat wool. This exquisite piece features traditional Kashmiri embroidery and represents the pinnacle of Himalayan textile craftsmanship. Each shawl takes months to complete and is a testament to the skill of Kashmiri artisans.",
        imageUrl: "/images/states/kashmir.jpg",
        images: [
            "/images/states/kashmir.jpg",
            "/images/states/kashmir.jpg",
            "/images/states/kashmir.jpg"
        ],
        category: "Textiles",
        subcategory: "Pashmina",
        materials: ["Changthangi goat wool", "Silk thread", "Natural dyes", "Gold thread (optional)"],
        dimensions: {
            length: "80 inches",
            width: "28 inches",
            height: "0.2 inches",
            weight: "120 grams"
        },
        craftTechnique: "Hand-spinning and hand-weaving",
        timeTaken: "45 days",
        rating: 4.9,
        reviewCount: 78,
        inStock: true,
        stockCount: 2,
        featured: true,
        verified: true,
        tags: ["Pashmina", "Kashmir", "Shawl", "Luxury", "Handwoven", "Wool"],
        story: "Pashmina comes from the Changthangi goats that live at altitudes above 14,000 feet in Ladakh. The extreme cold makes their undercoat incredibly fine and warm. This shawl represents centuries of Kashmiri weaving tradition.",
        careInstructions: "Dry clean only. Store in a breathable fabric bag. Avoid direct sunlight and moisture.",
        shippingWeight: "200 grams",
        origin: "Srinagar, Jammu & Kashmir"
    }
];

// Mock Artisan Data
export const mockArtisans = [
    {
        id: 1,
        name: "Suresh Nair",
        craft: "Kathakali Mask Making",
        location: "Kochi, Kerala",
        state: "Kerala",
        experience: 28,
        rating: 4.8,
        totalReviews: 234,
        totalProducts: 67,
        totalSales: 890,
        joinedDate: "2018-05-12",
        avatar: "/images/states/kerala.webp",
        coverImage: "/images/states/kerala.webp",
        bio: "Master craftsman Suresh Nair has dedicated his life to preserving the ancient art of Kathakali mask making. Learning from his grandfather, he has perfected the traditional techniques of papier-mâché construction and natural pigment application.",
        specializations: ["Traditional Kathakali Masks", "Theyyam Masks", "Custom Character Masks"],
        verified: true,
        languages: ["Malayalam", "English", "Tamil"]
    },

    {
        id: 2,
        name: "Sita Devi",
        craft: "Madhubani Painting",
        location: "Mithila, Bihar",
        state: "Bihar",
        experience: 25,
        rating: 4.9,
        totalReviews: 456,
        totalProducts: 89,
        totalSales: 1250,
        joinedDate: "2019-03-15",
        avatar: "/images/states/bihar.jpg",
        coverImage: "/images/states/bihar.jpg",
        bio: "Sita Devi is a renowned Madhubani artist who learned this sacred art form from her grandmother. Her work has been exhibited internationally and she is committed to training the next generation of artists.",
        specializations: ["Traditional Madhubani", "Contemporary Fusion", "Natural Pigment Art"],
        verified: true,
        languages: ["Hindi", "Maithili", "English"]
    },

    {
        id: 3,
        name: "Ramesh Kumhar",
        craft: "Blue Pottery",
        location: "Jaipur, Rajasthan",
        state: "Rajasthan",
        experience: 32,
        rating: 4.7,
        totalReviews: 345,
        totalProducts: 156,
        totalSales: 2100,
        joinedDate: "2017-08-20",
        avatar: "/images/states/rajasthan.jpg",
        coverImage: "/images/states/rajasthan.jpg",
        bio: "Third-generation potter Ramesh Kumhar has mastered the unique art of blue pottery. His family workshop in Jaipur has been creating these distinctive ceramics for over 80 years.",
        specializations: ["Traditional Blue Pottery", "Contemporary Designs", "Custom Ceramics"],
        verified: true,
        languages: ["Hindi", "Rajasthani", "English"]
    },

    {
        id: 4,
        name: "Mohammad Ali Shah",
        craft: "Pashmina Weaving",
        location: "Srinagar, Jammu & Kashmir",
        state: "Jammu & Kashmir",
        experience: 35,
        rating: 4.9,
        totalReviews: 123,
        totalProducts: 45,
        totalSales: 567,
        joinedDate: "2020-01-10",
        avatar: "/images/states/kashmir.jpg",
        coverImage: "/images/states/kashmir.jpg",
        bio: "Master weaver Mohammad Ali Shah comes from a family of Pashmina artisans. His expertise in hand-spinning and weaving the finest Changthangi goat wool is unmatched in the Kashmir valley.",
        specializations: ["Pure Pashmina", "Silk-Pashmina Blend", "Embroidered Shawls"],
        verified: true,
        languages: ["Urdu", "Kashmiri", "Hindi", "English"]
    }
];

// Mock Categories
export const mockCategories = [
    {
        id: 1,
        name: "Traditional Art",
        description: "Classical art forms passed down through generations",
        productCount: 245,
        image: "/images/states/kerala.webp"
    },
    {
        id: 2,
        name: "Paintings",
        description: "Hand-painted artworks using traditional techniques",
        productCount: 189,
        image: "/images/states/bihar.jpg"
    },
    {
        id: 3,
        name: "Pottery",
        description: "Ceramic and clay crafts from various regions",
        productCount: 156,
        image: "/images/states/rajasthan.jpg"
    },
    {
        id: 4,
        name: "Textiles",
        description: "Handwoven fabrics and traditional clothing",
        productCount: 234,
        image: "/images/states/kashmir.jpg"
    },
    {
        id: 5,
        name: "Jewelry",
        description: "Traditional ornaments and accessories",
        productCount: 178,
        image: "/images/states/rajasthan.jpg"
    },
    {
        id: 6,
        name: "Wood Crafts",
        description: "Carved wooden artifacts and furniture",
        productCount: 123,
        image: "/images/states/kerala.webp"
    }
];

// Mock Reviews
export const mockReviews = [
    {
        id: 1,
        productId: 1,
        customerName: "Priya Sharma",
        rating: 5,
        comment: "Absolutely stunning Kathakali mask! The craftsmanship is incredible and it arrived perfectly packaged. Suresh ji's work is truly exceptional.",
        date: "2024-11-15",
        verified: true,
        helpful: 12
    },
    {
        id: 2,
        productId: 2,
        customerName: "Rajesh Kumar",
        rating: 5,
        comment: "Beautiful Madhubani painting with vibrant colors. Sita Devi's attention to detail is remarkable. This will be a treasured addition to our home.",
        date: "2024-11-10",
        verified: true,
        helpful: 8
    },
    {
        id: 3,
        productId: 3,
        customerName: "Anita Gupta",
        rating: 4,
        comment: "Lovely blue pottery vase. The quality is excellent and it matches perfectly with my decor. Shipping was careful and secure.",
        date: "2024-11-08",
        verified: true,
        helpful: 5
    }
];

// Helper functions for data manipulation
export const getProductById = (id) => {
    return mockProducts.find(product => product.id === parseInt(id));
};

export const getArtisanById = (id) => {
    return mockArtisans.find(artisan => artisan.id === parseInt(id));
};

export const getProductsByArtisan = (artisanId) => {
    return mockProducts.filter(product => product.artisanId === parseInt(artisanId));
};

export const getProductsByCategory = (category) => {
    return mockProducts.filter(product =>
        product.category.toLowerCase().includes(category.toLowerCase())
    );
};

export const getProductsByState = (state) => {
    return mockProducts.filter(product =>
        product.state.toLowerCase() === state.toLowerCase()
    );
};

export const getFeaturedProducts = () => {
    return mockProducts.filter(product => product.featured);
};

export const getVerifiedProducts = () => {
    return mockProducts.filter(product => product.verified);
};

// Search function
export const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return mockProducts.filter(product =>
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.artisanName.toLowerCase().includes(lowercaseQuery) ||
        product.state.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
};

// Price filter function
export const filterProductsByPrice = (minPrice, maxPrice) => {
    return mockProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
    );
};

// Sort functions
export const sortProducts = (products, sortBy) => {
    const sortedProducts = [...products];

    switch (sortBy) {
        case 'price-low':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'rating':
            return sortedProducts.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sortedProducts.sort((a, b) => b.id - a.id);
        case 'name':
            return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sortedProducts;
    }
};

export default {
    mockProducts,
    mockArtisans,
    mockCategories,
    mockReviews,
    getProductById,
    getArtisanById,
    getProductsByArtisan,
    getProductsByCategory,
    getProductsByState,
    getFeaturedProducts,
    getVerifiedProducts,
    searchProducts,
    filterProductsByPrice,
    sortProducts
};