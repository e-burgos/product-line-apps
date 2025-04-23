import { Product } from '../types/product';

export const notAvailableImage = '/images/not-available.png';

export const products: Product[] = [
  {
    id: '1',
    name: 'Ray-Ban Aviator Classic',
    slug: 'ray-ban-aviator-classic',
    description:
      'Los anteojos de sol Ray-Ban Aviator Classic son el modelo original diseñado para los aviadores estadounidenses. Con un marco de metal dorado y lentes de cristal disponibles en diferentes colores, es un ícono que trasciende el tiempo y la cultura.',
    price: 179.99,
    discountPrice: 159.99,
    images: ['/images/sol.jpg'],
    category: 'sun',
    brand: 'Ray-Ban',
    tags: ['aviator', 'classic', 'metal'],
    features: [
      'Cristal G-15 polarizado',
      'Protección UV 100%',
      'Marco de metal resistente',
      'Varillas con puntas de acetato',
    ],
    specifications: {
      'Material del marco': 'Metal',
      'Material de las lentes': 'Cristal',
      Forma: 'Aviator',
      Dimensiones: '58-14-135mm',
    },
    variants: [
      {
        id: '1-1',
        name: 'Dorado - Verde Clásico G-15',
        color: 'Dorado / Verde',
        colorCode: '#B5A642',
        frameSize: 'Estándar',
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '1-2',
        name: 'Dorado - Marrón Degradado',
        color: 'Dorado / Marrón',
        colorCode: '#8B4513',
        frameSize: 'Estándar',
        stock: 8,
        images: [
          'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Carlos Mendoza',
        rating: 5,
        comment: 'Excelentes lentes, muy cómodos y el estilo es atemporal.',
        date: '2023-04-15',
      },
      {
        id: 'r2',
        userName: 'Laura Sandoval',
        rating: 4,
        comment: 'Me encantan, aunque el precio es un poco elevado.',
        date: '2023-03-22',
      },
    ],
    rating: 4.5,
    stock: 23,
    isBestSeller: true,
    createdAt: '2023-01-01',
    updatedAt: '2023-05-10',
  },
  {
    id: '2',
    name: 'Oakley Holbrook',
    slug: 'oakley-holbrook',
    description:
      'Inspirados en las pantallas de cine clásicas de Hollywood, los lentes Holbrook de Oakley son un atemporal look de estilo retro para aquellos que buscan tanto rendimiento como estilo.',
    price: 153.0,
    images: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'sun',
    brand: 'Oakley',
    tags: ['deportivo', 'casual', 'resistente'],
    features: [
      'Tecnología PRIZM™',
      'Material O Matter™ liviano',
      'Lentes con filtro UV',
      'Varillas con agarre Unobtainium®',
    ],
    specifications: {
      'Material del marco': 'O Matter™',
      'Material de las lentes': 'Plutonite®',
      Forma: 'Rectangular',
      Dimensiones: '55-18-137mm',
    },
    variants: [
      {
        id: '2-1',
        name: 'Negro Mate - PRIZM Black',
        color: 'Negro Mate',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 2,
        images: [
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '2-2',
        name: 'Tortuga - PRIZM Bronze',
        color: 'Tortuga',
        colorCode: '#8B4513',
        frameSize: 'Estándar',
        stock: 0,
        images: [
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r3',
        userName: 'Diego Ramírez',
        rating: 5,
        comment:
          'Los mejores lentes que he tenido, perfectos para actividades al aire libre.',
        date: '2023-02-10',
      },
    ],
    rating: 4.8,
    stock: 2,
    isNew: true,
    createdAt: '2023-01-15',
    updatedAt: '2023-04-20',
  },
  {
    id: '3',
    name: 'Vogue VO5051S',
    slug: 'vogue-vo5051s',
    description:
      'Estos anteojos de sol Vogue combina elegancia con modernidad. Su diseño versátil los hace perfectos para cualquier ocasión, desde una tarde casual hasta eventos formales.',
    price: 110.0,
    discountPrice: 95.0,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'sun',
    brand: 'Vogue',
    tags: ['cat-eye', 'elegante', 'femenino'],
    features: [
      'Diseño Cat-Eye',
      'Protección UV 100%',
      'Marco de acetato',
      'Lentes con acabado degradado',
    ],
    specifications: {
      'Material del marco': 'Acetato',
      'Material de las lentes': 'Policarbonato',
      Forma: 'Cat-Eye',
      Dimensiones: '53-17-135mm',
    },
    variants: [],
    reviews: [
      {
        id: 'r4',
        userName: 'María Jiménez',
        rating: 4,
        comment: 'Muy elegantes y ligeros, perfectos para mi rostro.',
        date: '2023-03-05',
      },
    ],
    rating: 4.2,
    stock: 3,
    createdAt: '2023-02-01',
    updatedAt: '2023-05-05',
  },
  {
    id: '4',
    name: 'Armani Exchange AX3048',
    slug: 'armani-exchange-ax3048',
    description:
      'Estos anteojos de receta Armani Exchange presentan un diseño moderno y sofisticado, ideal para quienes buscan elegancia con un toque urbano. Marco rectangular de acetato con logotipo discreto.',
    price: 149.0,
    images: [
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511105043137-7e66f28270e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'prescription',
    brand: 'Armani Exchange',
    tags: ['formal', 'elegante', 'oficina'],
    features: [
      'Diseño rectangular moderno',
      'Logo en las varillas',
      'Material premium',
      'Varillas reforzadas',
    ],
    specifications: {
      'Material del marco': 'Acetato de alta calidad',
      'Material de las lentes':
        'Compatible con todas las opciones de lentes de receta',
      Forma: 'Rectangular',
      Dimensiones: '54-17-140mm',
    },
    variants: [
      {
        id: '4-1',
        name: 'Negro Brillante',
        color: 'Negro',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 14,
        images: [
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '4-2',
        name: 'Habana',
        color: 'Habana',
        colorCode: '#8B4513',
        frameSize: 'Estándar',
        stock: 9,
        images: [
          'https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r5',
        userName: 'Roberto López',
        rating: 5,
        comment:
          'Excelente calidad y diseño elegante, perfectos para el trabajo.',
        date: '2023-04-10',
      },
      {
        id: 'r6',
        userName: 'Ana Martínez',
        rating: 4,
        comment: 'Cómodos y recibo muchos cumplidos cuando los uso.',
        date: '2023-03-25',
      },
    ],
    rating: 4.7,
    stock: 23,
    isBestSeller: true,
    createdAt: '2023-01-10',
    updatedAt: '2023-05-01',
  },
  {
    id: '5',
    name: 'Ray-Ban Junior RY1528',
    slug: 'ray-ban-junior-ry1528',
    description:
      'Anteojos de receta Ray-Ban para niños. Diseñados para durar y soportar las actividades diarias de los más pequeños. Combinación perfecta de estilo y resistencia.',
    price: 119.0,
    discountPrice: 99.0,
    images: [
      'https://images.unsplash.com/photo-1629310175560-3cbf4fb56b94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1590064661010-d542a9f45927?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'kids',
    brand: 'Ray-Ban',
    tags: ['niños', 'resistente', 'ligero'],
    features: [
      'Diseño resistente para niños',
      'Ligeros y cómodos',
      'Material hipoalergénico',
      'Varillas con sistema flex',
    ],
    specifications: {
      'Material del marco': 'Propionato',
      'Material de las lentes': 'Compatible con lentes de receta',
      Forma: 'Rectangular',
      Dimensiones: '46-16-125mm',
    },
    variants: [
      {
        id: '5-1',
        name: 'Negro/Verde',
        color: 'Negro/Verde',
        colorCode: '#006400',
        frameSize: 'Pequeño',
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1629310175560-3cbf4fb56b94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '5-2',
        name: 'Rojo/Azul',
        color: 'Rojo/Azul',
        colorCode: '#FF0000',
        frameSize: 'Pequeño',
        stock: 8,
        images: [
          'https://images.unsplash.com/photo-1590064661010-d542a9f45927?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r7',
        userName: 'Patricia Gómez',
        rating: 5,
        comment:
          'Excelentes anteojos para mi hijo de 7 años, muy resistentes y él está encantado con el diseño.',
        date: '2023-03-18',
      },
    ],
    rating: 4.6,
    stock: 23,
    isNew: true,
    createdAt: '2023-02-10',
    updatedAt: '2023-04-15',
  },
  {
    id: '6',
    name: 'Persol PO3266S',
    slug: 'persol-po3266s',
    description:
      'Los anteojos de sol Persol PO3266S representan la elegancia italiana por excelencia. Con su diseño atemporal y materiales de primera calidad, son perfectos para quienes buscan estilo y distinción.',
    price: 320.0,
    discountPrice: 289.95,
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1602400236316-f5e3b6d2314b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1588615419946-4c06a6ec4f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'sun',
    brand: 'Persol',
    tags: ['premium', 'italiano', 'clásico'],
    features: [
      'Lentes polarizadas',
      'Fabricados a mano en Italia',
      'Sistema de flexión Meflecto',
      'Detalles Supreme Arrow',
    ],
    specifications: {
      'Material del marco': 'Acetato premium',
      'Material de las lentes': 'Cristal',
      Forma: 'Redondo',
      Dimensiones: '53-20-140mm',
    },
    variants: [
      {
        id: '6-1',
        name: 'Habana - Marrón Polarizado',
        color: 'Habana',
        colorCode: '#8B4513',
        frameSize: 'Estándar',
        stock: 8,
        images: [
          'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '6-2',
        name: 'Negro - Verde Polarizado',
        color: 'Negro',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 12,
        images: [
          'https://images.unsplash.com/photo-1602400236316-f5e3b6d2314b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r8',
        userName: 'Federico Rossi',
        rating: 5,
        comment:
          'Calidad italiana incomparable. Los mejores anteojos que he tenido.',
        date: '2023-05-10',
      },
      {
        id: 'r9',
        userName: 'Elena Torres',
        rating: 5,
        comment: 'Elegantes y resistentes. Valen cada centavo.',
        date: '2023-04-28',
      },
    ],
    rating: 4.9,
    stock: 20,
    isBestSeller: true,
    createdAt: '2023-02-15',
    updatedAt: '2023-05-12',
  },
  {
    id: '7',
    name: 'Gucci GG0281O',
    slug: 'gucci-gg0281o',
    description:
      'Los anteojos de receta Gucci GG0281O combinan lujo y modernidad en un diseño sofisticado. El logo característico en las patillas y los detalles metálicos le dan un toque distintivo de alta moda.',
    price: 380.0,
    images: [
      'https://images.unsplash.com/photo-1546180572-2c602239ba73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'prescription',
    brand: 'Gucci',
    tags: ['lujo', 'diseñador', 'premium'],
    features: [
      'Logo GG en las patillas',
      'Diseño geométrico moderno',
      'Acetato de alta calidad',
      'Fabricados en Italia',
    ],
    specifications: {
      'Material del marco': 'Acetato y metal',
      'Material de las lentes':
        'Compatible con todos los tipos de lentes graduados',
      Forma: 'Geométrico',
      Dimensiones: '53-18-145mm',
    },
    variants: [
      {
        id: '7-1',
        name: 'Negro Brillante',
        color: 'Negro',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 6,
        images: [
          'https://images.unsplash.com/photo-1546180572-2c602239ba73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '7-2',
        name: 'Habana Transparente',
        color: 'Habana Transparente',
        colorCode: '#AA6C39',
        frameSize: 'Estándar',
        stock: 4,
        images: [
          'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r10',
        userName: 'Valentina Gutiérrez',
        rating: 5,
        comment:
          'Elegantes, cómodos y recibo muchos cumplidos. La calidad Gucci se nota.',
        date: '2023-05-05',
      },
    ],
    rating: 4.8,
    stock: 10,
    isNew: true,
    createdAt: '2023-03-20',
    updatedAt: '2023-05-15',
  },
  {
    id: '8',
    name: 'Nike Valiant Kids',
    slug: 'nike-valiant-kids',
    description:
      'Anteojos deportivos Nike para niños activos. Diseñados para resistir impactos y actividades intensas, con material flexible y seguro que protege los ojos de los más pequeños durante el juego y los deportes.',
    price: 105.0,
    discountPrice: 89.95,
    images: [
      'https://images.unsplash.com/photo-1589642774689-a1c2f4883751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1559654797-c8cb7cfb7052?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'kids',
    brand: 'Nike',
    tags: ['deportivo', 'niños', 'resistente'],
    features: [
      'Material flexible y resistente a impactos',
      'Diseño envolvente para mayor protección',
      'Patillas ajustables',
      'Logo Nike en las patillas',
    ],
    specifications: {
      'Material del marco': 'Propionato resistente a impactos',
      'Material de las lentes': 'Policarbonato con protección UV',
      Forma: 'Rectangular Deportivo',
      Dimensiones: '48-16-130mm',
    },
    variants: [
      {
        id: '8-1',
        name: 'Negro/Rojo',
        color: 'Negro/Rojo',
        colorCode: '#FF0000',
        frameSize: 'Pequeño',
        stock: 18,
        images: [
          'https://images.unsplash.com/photo-1589642774689-a1c2f4883751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '8-2',
        name: 'Azul/Naranja',
        color: 'Azul/Naranja',
        colorCode: '#0000FF',
        frameSize: 'Pequeño',
        stock: 12,
        images: [
          'https://images.unsplash.com/photo-1559654797-c8cb7cfb7052?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r11',
        userName: 'Martín Flores',
        rating: 5,
        comment:
          'Excelentes para mi hijo que juega fútbol. Ya no me preocupo por golpes o caídas.',
        date: '2023-04-20',
      },
      {
        id: 'r12',
        userName: 'Carolina Aguirre',
        rating: 4,
        comment: 'Resistentes y mi hija los adora por el diseño y los colores.',
        date: '2023-03-15',
      },
    ],
    rating: 4.7,
    stock: 30,
    isNew: true,
    createdAt: '2023-02-25',
    updatedAt: '2023-05-05',
  },
  {
    id: '9',
    name: 'Prada Sport PS 50GS',
    slug: 'prada-sport-ps-50gs',
    description:
      'Anteojos de sol deportivos Prada Sport que combinan funcionalidad y elegancia. Perfectos para actividades al aire libre con un toque de sofisticación italiana. Lentes polarizadas que reducen el deslumbramiento.',
    price: 345.0,
    images: [
      'https://images.unsplash.com/photo-1517948430535-b7e89f3072a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1625591340248-6d472b3e7989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'sports',
    brand: 'Prada',
    tags: ['deportivo', 'premium', 'polarizado'],
    features: [
      'Lentes polarizadas',
      'Montura envolvente aerodinámica',
      'Almohadillas de silicona antideslizantes',
      'Protección lateral contra rayos UV',
    ],
    specifications: {
      'Material del marco': 'Nylon resistente',
      'Material de las lentes': 'Policarbonato polarizado',
      Forma: 'Envolvente deportiva',
      Dimensiones: '56-17-140mm',
    },
    variants: [
      {
        id: '9-1',
        name: 'Negro Mate - Gris Polarizado',
        color: 'Negro Mate',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 10,
        images: [
          'https://images.unsplash.com/photo-1517948430535-b7e89f3072a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '9-2',
        name: 'Gris Oscuro - Verde Polarizado',
        color: 'Gris Oscuro',
        colorCode: '#333333',
        frameSize: 'Estándar',
        stock: 8,
        images: [
          'https://images.unsplash.com/photo-1625591340248-6d472b3e7989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r13',
        userName: 'Alejandro Vega',
        rating: 5,
        comment:
          'Perfectos para correr y ciclismo. Las lentes polarizadas son increíbles para días soleados.',
        date: '2023-05-18',
      },
      {
        id: 'r14',
        userName: 'Isabel Montero',
        rating: 4,
        comment:
          'Excelente calidad y el diseño es muy elegante incluso para ser anteojos deportivos.',
        date: '2023-04-30',
      },
    ],
    rating: 4.8,
    stock: 18,
    createdAt: '2023-03-15',
    updatedAt: '2023-05-20',
  },
  {
    id: '10',
    name: 'Coach HC6161',
    slug: 'coach-hc6161',
    description:
      'Anteojos de receta Coach HC6161 que combinan sofisticación y estilo contemporáneo. El logotipo discreto en las patillas añade un toque de elegancia a estos marcos versátiles ideales para el día a día.',
    price: 210.0,
    discountPrice: 175.0,
    images: [
      'https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    category: 'prescription',
    brand: 'Coach',
    tags: ['femenino', 'elegante', 'versátil'],
    features: [
      'Logotipo Coach en las patillas',
      'Diseño ovalado moderno',
      'Bisagras con resorte',
      'Terminaciones premium',
    ],
    specifications: {
      'Material del marco': 'Acetato y metal',
      'Material de las lentes':
        'Compatible con todos los tipos de lentes graduados',
      Forma: 'Ovalado',
      Dimensiones: '54-16-140mm',
    },
    variants: [
      {
        id: '10-1',
        name: 'Habana Claro',
        color: 'Habana Claro',
        colorCode: '#D2B48C',
        frameSize: 'Estándar',
        stock: 14,
        images: [
          'https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
      {
        id: '10-2',
        name: 'Negro Brillante',
        color: 'Negro',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 11,
        images: [
          'https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      },
    ],
    reviews: [
      {
        id: 'r15',
        userName: 'Gabriela Ruiz',
        rating: 5,
        comment:
          'Elegantes y cómodos, perfectos para usar en el trabajo y ocasiones formales.',
        date: '2023-05-12',
      },
      {
        id: 'r16',
        userName: 'Patricia Moreno',
        rating: 4,
        comment: 'Me encantan, son ligeros y el diseño es muy favorecedor.',
        date: '2023-04-08',
      },
      {
        id: 'r17',
        userName: 'Mónica Vargas',
        rating: 5,
        comment:
          'La calidad Coach se nota, son resistentes y elegantes a la vez.',
        date: '2023-03-25',
      },
    ],
    rating: 4.7,
    stock: 25,
    isBestSeller: true,
    createdAt: '2023-02-18',
    updatedAt: '2023-05-18',
  },
  {
    id: '11',
    name: 'Arnette AN4277',
    slug: 'arnette-an4277',
    description:
      'Anteojos de sol Arnette AN4277 con estilo urbano y juvenil. Diseñados para quienes buscan un look moderno con protección UV de calidad a un precio accesible. Ideales para el día a día y actividades casuales.',
    price: 95.0,
    discountPrice: 75.0,
    images: [
      'https://images.unsplash.com/photo-1612729875065-207facaa618c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1623722824920-b14b15050356?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'sun',
    brand: 'Arnette',
    tags: ['urbano', 'juvenil', 'accesible'],
    features: [
      'Protección UV 100%',
      'Diseño ligero y resistente',
      'Logo discreto en las patillas',
      'Estilo cuadrado moderno',
    ],
    specifications: {
      'Material del marco': 'Nylon inyectado',
      'Material de las lentes': 'Policarbonato',
      Forma: 'Cuadrado',
      Dimensiones: '55-18-140mm',
    },
    variants: [
      {
        id: '11-1',
        name: 'Negro Mate - Gris',
        color: 'Negro Mate',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 25,
        images: [
          'https://images.unsplash.com/photo-1612729875065-207facaa618c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '11-2',
        name: 'Azul Translúcido - Azul',
        color: 'Azul',
        colorCode: '#0000CD',
        frameSize: 'Estándar',
        stock: 18,
        images: [
          'https://images.unsplash.com/photo-1623722824920-b14b15050356?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r18',
        userName: 'Daniel Morales',
        rating: 4,
        comment: 'Buena relación calidad-precio. Cómodos y resistentes.',
        date: '2023-05-05',
      },
      {
        id: 'r19',
        userName: 'Lucía Fernández',
        rating: 5,
        comment:
          'Me encanta el estilo y lo ligeros que son. Perfectos para uso diario.',
        date: '2023-04-18',
      },
    ],
    rating: 4.3,
    stock: 43,
    isNew: true,
    createdAt: '2023-03-10',
    updatedAt: '2023-05-15',
  },
  {
    id: '12',
    name: 'Oakley Radar EV Path',
    slug: 'oakley-radar-ev-path',
    description:
      'Anteojos deportivos de alto rendimiento Oakley Radar EV Path. Diseñados para atletas exigentes, ofrecen una visión ampliada y claridad óptica excepcional. La tecnología PRIZM mejora el contraste y la visibilidad en diferentes entornos.',
    price: 230.0,
    images: [
      'https://images.unsplash.com/photo-1630746638775-b9622a250438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1589642774689-a1c2f4883751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1612729875065-207facaa618c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
    ],
    category: 'sports',
    brand: 'Oakley',
    tags: ['deportivo', 'alto rendimiento', 'ciclismo'],
    features: [
      'Tecnología de lentes PRIZM™',
      'Diseño aerodinámico patentado',
      'Sistema de ventilación para evitar el empañamiento',
      'Almohadillas de Unobtainium® que mejoran el agarre con el sudor',
    ],
    specifications: {
      'Material del marco': 'O Matter™',
      'Material de las lentes': 'Plutonite® con tecnología PRIZM™',
      Forma: 'Envolvente deportiva',
      Dimensiones: '52-12-140mm',
    },
    variants: [
      {
        id: '12-1',
        name: 'Negro Mate - PRIZM Road',
        color: 'Negro Mate',
        colorCode: '#000000',
        frameSize: 'Estándar',
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1630746638775-b9622a250438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
      {
        id: '12-2',
        name: 'Blanco - PRIZM Trail',
        color: 'Blanco',
        colorCode: '#FFFFFF',
        frameSize: 'Estándar',
        stock: 10,
        images: [
          'https://images.unsplash.com/photo-1589642774689-a1c2f4883751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        ],
      },
    ],
    reviews: [
      {
        id: 'r20',
        userName: 'Javier Rodriguez',
        rating: 5,
        comment:
          'Inigualables para ciclismo. La tecnología PRIZM realmente marca la diferencia en diversos terrenos.',
        date: '2023-05-20',
      },
      {
        id: 'r21',
        userName: 'Fernando Diaz',
        rating: 5,
        comment:
          'Los uso para correr y triatlón. Son cómodos, no se empañan y la visibilidad es excepcional.',
        date: '2023-04-15',
      },
    ],
    rating: 4.9,
    stock: 25,
    isBestSeller: true,
    createdAt: '2023-02-20',
    updatedAt: '2023-05-22',
  },
];

export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter((product) => product.isBestSeller);
};
