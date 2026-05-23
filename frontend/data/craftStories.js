// Emotion-based themes for craft stories
export const CRAFT_EMOTIONS = {
    ROYAL: {
        name: 'Royal Heritage',
        colors: { primary: '#8B008B', secondary: '#9932CC', accent: '#BA55D3' },
        gradient: 'linear-gradient(135deg, #8B008B, #9932CC, #BA55D3)',
        mood: 'majestic',
        images: ['/images/img_1ab.jpg']
    },
    VIBRANT: {
        name: 'Vibrant Culture',
        colors: { primary: '#FF1493', secondary: '#FF69B4', accent: '#FFB6C1' },
        gradient: 'linear-gradient(135deg, #FF1493, #FF69B4, #FFB6C1)',
        mood: 'energetic',
        images: ['/images/img2_ab.avif']
    },
    EARTHY: {
        name: 'Earthy Traditions',
        colors: { primary: '#8B4513', secondary: '#A0522D', accent: '#D2691E' },
        gradient: 'linear-gradient(135deg, #8B4513, #A0522D, #D2691E)',
        mood: 'grounded',
        images: ['/images/img3_ab.jpg']
    },
    SERENE: {
        name: 'Serene Crafts',
        colors: { primary: '#4682B4', secondary: '#87CEEB', accent: '#B0E0E6' },
        gradient: 'linear-gradient(135deg, #4682B4, #87CEEB, #B0E0E6)',
        mood: 'peaceful',
        images: ['/images/img4_ab.jpg']
    }
};

export const INDIAN_CRAFT_STORIES = [
    {
        id: 'jk',
        state: 'Jammu and Kashmir',
        region: 'Northern India',
        crafts: ['Pashmina Shawls', 'Kashmiri Carpets', 'Papier-mâché Art', 'Walnut Wood Carving'],
        description: 'Famous for Pashmina shawls, Kashmiri carpets, papier-mâché art, and walnut wood carving. Artisans handweave fine wool, hand-knot carpets with intricate patterns, and paint papier-mâché designs inspired by nature and culture.',
        colors: CRAFT_EMOTIONS.ROYAL.colors,
        icon: '🏔️',
        gradient: CRAFT_EMOTIONS.ROYAL.gradient,
        emotion: 'ROYAL',
        mood: CRAFT_EMOTIONS.ROYAL.mood,
        image: '/images/states/kashmir.jpg',
        images: ['/images/states/kashmir.jpg', '/images/states/kashmiri_handicrafts_featured.jpg', '/images/img_1ab.jpg']
    },
    {
        id: 'hp',
        state: 'Himachal Pradesh',
        region: 'Northern India',
        crafts: ['Wool Shawls', 'Chamba Rumal', 'Wooden Crafts'],
        description: 'Known for wool shawls, Chamba Rumal embroidery, and wooden crafts. Handmade weaving and embroidery reflect Himalayan traditions and mountain life.',
        colors: CRAFT_EMOTIONS.SERENE.colors,
        icon: '⛰️',
        gradient: CRAFT_EMOTIONS.SERENE.gradient,
        emotion: 'SERENE',
        mood: CRAFT_EMOTIONS.SERENE.mood,
        image: '/images/states/himachal.jpg',
        images: ['/images/states/himachal.jpg', '/images/img4_ab.jpg']
    },
    {
        id: 'pb',
        state: 'Punjab',
        region: 'Northern India',
        crafts: ['Phulkari Embroidery', 'Punjabi Juttis'],
        description: 'Popular for Phulkari embroidery and Punjabi Juttis. Floral embroidery is stitched by hand with vibrant threads, while leather footwear is decorated with traditional designs.',
        colors: CRAFT_EMOTIONS.VIBRANT.colors,
        icon: '🌻',
        gradient: CRAFT_EMOTIONS.VIBRANT.gradient,
        emotion: 'VIBRANT',
        mood: CRAFT_EMOTIONS.VIBRANT.mood,
        image: '/images/states/pumjab.jpg',
        images: ['/images/states/pumjab.jpg', '/images/states/punjab2.jpg', '/images/img2_ab.avif']
    },
    {
        id: 'hr',
        state: 'Haryana',
        region: 'Northern India',
        crafts: ['Handloom Weaving', 'Pottery', 'Woodcraft'],
        description: 'Known for handloom weaving, pottery, and woodcraft. Artisans create traditional textiles and clay items using age-old rural techniques.',
        colors: CRAFT_EMOTIONS.EARTHY.colors,
        icon: '🏺',
        gradient: CRAFT_EMOTIONS.EARTHY.gradient,
        emotion: 'EARTHY',
        mood: CRAFT_EMOTIONS.EARTHY.mood,
        image: '/images/states/haryana.webp',
        images: ['/images/states/haryana.webp', '/images/img3_ab.jpg']
    },
    {
        id: 'rj',
        state: 'Rajasthan',
        region: 'Western India',
        crafts: ['Blue Pottery', 'Bandhani', 'Block Printing', 'Miniature Paintings'],
        description: 'Famous for Blue Pottery, Bandhani, block printing, and miniature paintings. Crafts are made using hand-dyeing, natural colors, and detailed brushwork.',
        colors: CRAFT_EMOTIONS.ROYAL.colors,
        icon: '🏰',
        gradient: CRAFT_EMOTIONS.ROYAL.gradient,
        emotion: 'ROYAL',
        mood: CRAFT_EMOTIONS.ROYAL.mood,
        image: '/images/states/rajasthan.jpg',
        images: ['/images/states/rajasthan.jpg', '/images/img_1ab.jpg']
    },
    {
        id: 'gj',
        state: 'Gujarat',
        region: 'Western India',
        crafts: ['Mirror Work', 'Bandhani', 'Rogan Art', 'Embroidery'],
        description: 'Known for mirror work, Bandhani, Rogan art, and embroidery. Bright fabrics and detailed hand stitching reflect Gujarat\'s colorful culture.',
        colors: CRAFT_EMOTIONS.VIBRANT.colors,
        icon: '🪞',
        gradient: CRAFT_EMOTIONS.VIBRANT.gradient,
        emotion: 'VIBRANT',
        mood: CRAFT_EMOTIONS.VIBRANT.mood,
        image: '/images/states/gujrat.webp',
        images: ['/images/states/gujrat.webp', '/images/img2_ab.avif']
    },
    {
        id: 'up',
        state: 'Uttar Pradesh',
        region: 'Northern India',
        crafts: ['Chikankari Embroidery', 'Brass Work', 'Glass Crafts'],
        description: 'Famous for Chikankari embroidery, brass work, and glass crafts. Delicate hand embroidery and engraved metalwork are specialties of the region.',
        colors: CRAFT_EMOTIONS.EARTHY.colors,
        icon: '🕌',
        gradient: CRAFT_EMOTIONS.EARTHY.gradient,
        emotion: 'EARTHY',
        mood: CRAFT_EMOTIONS.EARTHY.mood,
        image: '/images/states/uttarpradesh.jpg',
        images: ['/images/states/uttarpradesh.jpg', '/images/img3_ab.jpg']
    },
    {
        id: 'uk',
        state: 'Uttarakhand',
        region: 'Northern India',
        crafts: ['Wool Weaving', 'Ringaal Bamboo', 'Wood Carving'],
        description: 'Known for wool weaving, ringaal bamboo crafts, and wood carving. Handmade products are inspired by the traditions of the hills.',
        colors: CRAFT_EMOTIONS.SERENE.colors,
        icon: '🏔️',
        gradient: CRAFT_EMOTIONS.SERENE.gradient,
        emotion: 'SERENE',
        mood: CRAFT_EMOTIONS.SERENE.mood,
        image: '/images/states/uttarakhand.jpg',
        images: ['/images/states/uttarakhand.jpg', '/images/img4_ab.jpg']
    }
];
// Continue with more states...
export const ADDITIONAL_CRAFT_STORIES = [
    {
        id: 'br',
        state: 'Bihar',
        region: 'Eastern India',
        crafts: ['Madhubani Paintings', 'Sujni Embroidery'],
        description: 'Popular for Madhubani paintings and Sujni embroidery. Artists use natural colors and traditional motifs based on mythology and village life.',
        colors: CRAFT_EMOTIONS.VIBRANT.colors,
        icon: '🎨',
        gradient: CRAFT_EMOTIONS.VIBRANT.gradient,
        emotion: 'VIBRANT',
        mood: CRAFT_EMOTIONS.VIBRANT.mood,
        image: '/images/states/bihar.jpg',
        images: ['/images/states/bihar.jpg', '/images/img2_ab.avif']
    },
    {
        id: 'jh',
        state: 'Jharkhand',
        region: 'Eastern India',
        crafts: ['Tribal Handicrafts', 'Bamboo Work', 'Dokra Metal Art'],
        description: 'Known for tribal handicrafts, bamboo work, and Dokra metal art. Tribal communities create handmade decorative and utility items.',
        colors: CRAFT_EMOTIONS.EARTHY.colors,
        icon: '🏺',
        gradient: CRAFT_EMOTIONS.EARTHY.gradient,
        emotion: 'EARTHY',
        mood: CRAFT_EMOTIONS.EARTHY.mood,
        image: '/images/states/jharkhand.jpg',
        images: ['/images/states/jharkhand.jpg', '/images/img3_ab.jpg']
    },
    {
        id: 'wb',
        state: 'West Bengal',
        region: 'Eastern India',
        crafts: ['Kantha Embroidery', 'Terracotta Art', 'Dokra Crafts'],
        description: 'Famous for Kantha embroidery, terracotta art, and Dokra crafts. Artisans stitch fabrics and mold clay into traditional artistic forms.',
        colors: CRAFT_EMOTIONS.SERENE.colors,
        icon: '🧵',
        gradient: CRAFT_EMOTIONS.SERENE.gradient,
        emotion: 'SERENE',
        mood: CRAFT_EMOTIONS.SERENE.mood,
        image: '/images/states/west bengal.jpg',
        images: ['/images/states/west bengal.jpg', '/images/img4_ab.jpg']
    },
    {
        id: 'od',
        state: 'Odisha',
        region: 'Eastern India',
        crafts: ['Pattachitra Paintings', 'Silver Filigree', 'Appliqué Work'],
        description: 'Known for Pattachitra paintings, silver filigree, and appliqué work. Craftsmen create mythological art using natural colors and fine detailing.',
        colors: { primary: '#9932CC', secondary: '#BA55D3', accent: '#DDA0DD' },
        icon: '🖼️',
        gradient: 'linear-gradient(135deg, #9932CC, #BA55D3, #DDA0DD)',
        image: '/images/states/odisa.webp'
    },
    {
        id: 'as',
        state: 'Assam',
        region: 'Northeastern India',
        crafts: ['Bamboo Crafts', 'Cane Furniture', 'Assam Silk'],
        description: 'Famous for bamboo crafts, cane furniture, and Assam silk weaving. Handmade bamboo and silk products represent Assamese culture.',
        colors: { primary: '#228B22', secondary: '#32CD32', accent: '#ADFF2F' },
        icon: '🎋',
        gradient: 'linear-gradient(135deg, #228B22, #32CD32, #ADFF2F)',
        image: '/images/states/assam.jpg'
    },
    {
        id: 'ar',
        state: 'Arunachal Pradesh',
        region: 'Northeastern India',
        crafts: ['Bamboo Weaving', 'Carpets', 'Tribal Masks'],
        description: 'Known for bamboo weaving, carpets, and tribal masks. Artisans use natural materials to create traditional handmade products.',
        colors: { primary: '#FF8C00', secondary: '#FFA500', accent: '#FFD700' },
        icon: '🎭',
        gradient: 'linear-gradient(135deg, #FF8C00, #FFA500, #FFD700)',
        image: '/images/states/arunachal pradesh.jpg'
    },
    {
        id: 'nl',
        state: 'Nagaland',
        region: 'Northeastern India',
        crafts: ['Tribal Jewelry', 'Wood Carving', 'Woven Shawls'],
        description: 'Popular for tribal jewelry, wood carving, and woven shawls. Handcrafted items reflect the rich tribal heritage of the state.',
        colors: { primary: '#B22222', secondary: '#DC143C', accent: '#FF6347' },
        icon: '💎',
        gradient: 'linear-gradient(135deg, #B22222, #DC143C, #FF6347)',
        image: '/images/states/nagaland.jpg'
    },
    {
        id: 'mn',
        state: 'Manipur',
        region: 'Northeastern India',
        crafts: ['Handwoven Textiles', 'Bamboo Crafts', 'Pottery'],
        description: 'Known for handwoven textiles, bamboo crafts, and pottery. Traditional weaving techniques are an important part of Manipuri culture.',
        colors: { primary: '#4B0082', secondary: '#8A2BE2', accent: '#9370DB' },
        icon: '🧶',
        gradient: 'linear-gradient(135deg, #4B0082, #8A2BE2, #9370DB)',
        image: '/images/states/manipur.webp'
    }
];
// Southern and Western States
export const SOUTHERN_WESTERN_STATES = [
    {
        id: 'mh',
        state: 'Maharashtra',
        region: 'Western India',
        crafts: ['Warli Paintings', 'Paithani Sarees'],
        description: 'Popular for Warli paintings and Paithani sarees. Tribal art and handwoven silk sarees are symbols of Maharashtrian heritage.',
        colors: { primary: '#FF8C00', secondary: '#FFA500', accent: '#FFD700' },
        icon: '🎨',
        gradient: 'linear-gradient(135deg, #FF8C00, #FFA500, #FFD700)',
        image: '/images/states/maharstra.png'
    },
    {
        id: 'ga',
        state: 'Goa',
        region: 'Western India',
        crafts: ['Shell Crafts', 'Crochet Work', 'Bamboo Items'],
        description: 'Known for shell crafts, crochet work, and bamboo items. Handmade crafts are inspired by coastal life and Portuguese influence.',
        colors: { primary: '#20B2AA', secondary: '#48D1CC', accent: '#AFEEEE' },
        icon: '🐚',
        gradient: 'linear-gradient(135deg, #20B2AA, #48D1CC, #AFEEEE)',
        image: '/images/states/goa.jpg'
    },
    {
        id: 'ka',
        state: 'Karnataka',
        region: 'Southern India',
        crafts: ['Mysore Silk', 'Sandalwood Carving', 'Bidriware'],
        description: 'Famous for Mysore silk, sandalwood carving, and Bidriware. Detailed carving and fine silk weaving are important traditions.',
        colors: { primary: '#DAA520', secondary: '#FFD700', accent: '#FFFF99' },
        icon: '🏛️',
        gradient: 'linear-gradient(135deg, #DAA520, #FFD700, #FFFF99)',
        image: '/images/states/karnatka.jpg'
    },
    {
        id: 'kl',
        state: 'Kerala',
        region: 'Southern India',
        crafts: ['Coir Products', 'Kathakali Masks', 'Wood Carving'],
        description: 'Known for coir products, Kathakali masks, and wood carving. Coconut fiber and wood are transformed into artistic handmade products.',
        colors: { primary: '#228B22', secondary: '#32CD32', accent: '#90EE90' },
        icon: '🥥',
        gradient: 'linear-gradient(135deg, #228B22, #32CD32, #90EE90)',
        image: '/images/states/kerala.webp',
        images: ['/images/states/kerala.webp']
    },
    {
        id: 'tn',
        state: 'Tamil Nadu',
        region: 'Southern India',
        crafts: ['Tanjore Paintings', 'Bronze Sculptures', 'Kanchipuram Silk'],
        description: 'Famous for Tanjore paintings, bronze sculptures, and Kanchipuram silk sarees. Traditional art forms are made with detailed craftsmanship.',
        colors: { primary: '#B8860B', secondary: '#DAA520', accent: '#FFD700' },
        icon: '🏺',
        gradient: 'linear-gradient(135deg, #B8860B, #DAA520, #FFD700)',
        image: '/images/states/tamilnadu.jpg',
        images: ['/images/states/tamilnadu.jpg']
    },
    {
        id: 'ap',
        state: 'Andhra Pradesh',
        region: 'Southern India',
        crafts: ['Kalamkari Art', 'Kondapalli Toys'],
        description: 'Known for Kalamkari art and Kondapalli toys. Handmade paintings and wooden toys are crafted using natural dyes and carving techniques.',
        colors: { primary: '#DC143C', secondary: '#FF6347', accent: '#FFA07A' },
        icon: '🎭',
        gradient: 'linear-gradient(135deg, #DC143C, #FF6347, #FFA07A)',
        image: '/images/states/andhra pradesh.jpeg'
    },
    {
        id: 'ts',
        state: 'Telangana',
        region: 'Southern India',
        crafts: ['Pochampally Ikat', 'Bidri Crafts'],
        description: 'Popular for Pochampally Ikat weaving and Bidri crafts. Artisans create geometric textile patterns using tie-and-dye techniques.',
        colors: { primary: '#4B0082', secondary: '#8A2BE2', accent: '#9370DB' },
        icon: '🧵',
        gradient: 'linear-gradient(135deg, #4B0082, #8A2BE2, #9370DB)',
        image: '/images/states/telangana.jpg'
    },
    {
        id: 'dl',
        state: 'Delhi',
        region: 'Northern India',
        crafts: ['Zari Work', 'Jewelry Making', 'Leather Crafts'],
        description: 'Known for zari work, jewelry making, and leather crafts. Traditional markets and artisans preserve Mughal-inspired handmade art.',
        colors: { primary: '#8B008B', secondary: '#9932CC', accent: '#BA55D3' },
        icon: '🏛️',
        gradient: 'linear-gradient(135deg, #8B008B, #9932CC, #BA55D3)',
        image: '/images/states/delhi.jpg'
    }
];

// Add the remaining northeastern and central states
export const REMAINING_NORTHEASTERN_CENTRAL_STATES = [
    {
        id: 'mz',
        state: 'Mizoram',
        region: 'Northeastern India',
        crafts: ['Bamboo Crafts', 'Colorful Woven Fabrics'],
        description: 'Famous for bamboo crafts and colorful woven fabrics. Handmade textiles are created using traditional tribal weaving methods.',
        colors: { primary: '#20B2AA', secondary: '#48D1CC', accent: '#AFEEEE' },
        icon: '🎋',
        gradient: 'linear-gradient(135deg, #20B2AA, #48D1CC, #AFEEEE)',
        image: '/images/states/mizoram.jpeg'
    },
    {
        id: 'tr',
        state: 'Tripura',
        region: 'Northeastern India',
        crafts: ['Cane Handicrafts', 'Bamboo Handicrafts'],
        description: 'Known for cane and bamboo handicrafts. Skilled artisans make furniture, baskets, and decorative items by hand.',
        colors: { primary: '#8FBC8F', secondary: '#98FB98', accent: '#90EE90' },
        icon: '🧺',
        gradient: 'linear-gradient(135deg, #8FBC8F, #98FB98, #90EE90)',
        image: '/images/states/tripura.jpg'
    },
    {
        id: 'ml',
        state: 'Meghalaya',
        region: 'Northeastern India',
        crafts: ['Bamboo Crafts', 'Handwoven Textiles', 'Cane Products'],
        description: 'Popular for bamboo crafts, handwoven textiles, and cane products. Handmade items reflect the traditions of Khasi and Garo communities.',
        colors: { primary: '#6B8E23', secondary: '#9ACD32', accent: '#ADFF2F' },
        icon: '🌿',
        gradient: 'linear-gradient(135deg, #6B8E23, #9ACD32, #ADFF2F)',
        image: '/images/states/megahlaya.jpg'
    },
    {
        id: 'sk',
        state: 'Sikkim',
        region: 'Northeastern India',
        crafts: ['Carpet Weaving', 'Thangka Paintings', 'Wood Carving'],
        description: 'Known for carpet weaving, thangka paintings, and wood carving. Buddhist art and Himalayan culture inspire these crafts.',
        colors: { primary: '#FF4500', secondary: '#FF6347', accent: '#FF7F50' },
        icon: '🏔️',
        gradient: 'linear-gradient(135deg, #FF4500, #FF6347, #FF7F50)',
        image: '/images/states/sikkim.jpg'
    },
    {
        id: 'mp',
        state: 'Madhya Pradesh',
        region: 'Central India',
        crafts: ['Gond Paintings', 'Chanderi Fabric', 'Tribal Crafts'],
        description: 'Famous for Gond paintings, Chanderi fabric, and tribal crafts. Artists use natural themes and handmade weaving techniques.',
        colors: { primary: '#8B008B', secondary: '#9932CC', accent: '#BA55D3' },
        icon: '🎨',
        gradient: 'linear-gradient(135deg, #8B008B, #9932CC, #BA55D3)',
        image: '/images/states/mp.webp'
    },
    {
        id: 'cg',
        state: 'Chhattisgarh',
        region: 'Central India',
        crafts: ['Bell Metal Craft', 'Tribal Art'],
        description: 'Known for Bell Metal craft and tribal art. Handmade metal casting and woodcraft are traditional specialties.',
        colors: { primary: '#B8860B', secondary: '#DAA520', accent: '#FFD700' },
        icon: '🔔',
        gradient: 'linear-gradient(135deg, #B8860B, #DAA520, #FFD700)',
        image: '/images/states/chattisgarh.jpg'
    }
];

// Combine all stories for export
export const ALL_INDIAN_CRAFT_STORIES = [
    ...INDIAN_CRAFT_STORIES,
    ...ADDITIONAL_CRAFT_STORIES,
    ...SOUTHERN_WESTERN_STATES,
    ...REMAINING_NORTHEASTERN_CENTRAL_STATES
];