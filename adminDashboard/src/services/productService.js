import api from './api';

// ─── Cloudinary Config ───────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'YOUR_UPLOAD_PRESET';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// ─── Image Upload ────────────────────────────────────────────────────
/**
 * Upload an image file to Cloudinary (unsigned preset)
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
*/
export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'santorini-products');

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Cloudinary upload error:', errorData);
        throw new Error(errorData?.error?.message || 'Image upload failed');
    }

    const data = await response.json();
    return data.secure_url;
};

// ─── Categories ──────────────────────────────────────────────────────
/**
 * Fetch all active categories
 */
export const fetchCategories = async () => {
    const response = await api.get('/categories');
    return response.data?.data || [];
};

// ─── Products ────────────────────────────────────────────────────────
/**
 * Fetch menu (products grouped by category)
 */
export const fetchMenu = async () => {
    const response = await api.get('/products/menu');
    return response.data?.data || [];
};

/**
 * Create a new product
 * @param {Object} productData - { title, description?, category, price?, variants?, image? }
 */
export const createProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data?.data;
};

/**
 * Update an existing product
 * @param {string} productId
 * @param {Object} productData
 */
export const updateProduct = async (productId, productData) => {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data?.data;
};

// ─── Constants ───────────────────────────────────────────────────────
export const VARIANT_PRESETS = {
    SIZE: {
        label: 'Size (small / medium / large)',
        sizes: ['small', 'medium', 'large'],
    },
    PORTION: {
        label: 'Portion (regular / jumbo size)',
        sizes: ['regular', 'jumbo size'],
    },
};
