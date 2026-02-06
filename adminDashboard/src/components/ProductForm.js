import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import {
    fetchCategories,
    createProduct,
    updateProduct,
    VARIANT_PRESETS,
} from '../services/productService';

const INITIAL_FORM = {
    title: '',
    description: '',
    category: '',
    pricingType: 'single', // 'single' | 'variant'
    price: '',
    variantPreset: 'SIZE',
    variants: [],
    image: '',
};

const ProductForm = ({ product, onClose, onSaved }) => {
    const isEditing = Boolean(product);

    const [form, setForm] = useState(INITIAL_FORM);
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState('');

    // ─── Load categories ─────────────────────────────────────────────
    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch {
                setError('Failed to load categories');
            } finally {
                setLoadingCategories(false);
            }
        };
        load();
    }, []);

    // ─── Populate form when editing ──────────────────────────────────
    useEffect(() => {
        if (product) {
            const hasVariants = product.variants && product.variants.length > 0;
            // Detect preset: if sizes match portion preset, use PORTION, otherwise SIZE
            let preset = 'SIZE';
            if (hasVariants) {
                const sizes = product.variants.map((v) => v.size);
                const isPortionPreset = sizes.every((s) =>
                    VARIANT_PRESETS.PORTION.sizes.includes(s)
                );
                if (isPortionPreset) preset = 'PORTION';
            }

            setForm({
                title: product.title || '',
                description: product.description || '',
                category: product.category || product.categoryId || '',
                pricingType: hasVariants ? 'variant' : 'single',
                price: product.price ? String(product.price) : '',
                variantPreset: preset,
                variants: hasVariants
                    ? product.variants.map((v) => ({
                        size: v.size,
                        price: String(v.price),
                    }))
                    : [],
                image: product.image || '',
            });
        }
    }, [product]);

    // ─── When switching to variant mode, auto-populate sizes ─────────
    useEffect(() => {
        if (form.pricingType === 'variant' && form.variants.length === 0) {
            const presetSizes = VARIANT_PRESETS[form.variantPreset]?.sizes || [];
            setForm((prev) => ({
                ...prev,
                variants: presetSizes.map((size) => ({ size, price: '' })),
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.pricingType]);

    // ─── When changing preset, reset variant rows ────────────────────
    const handlePresetChange = (preset) => {
        const presetSizes = VARIANT_PRESETS[preset]?.sizes || [];
        setForm((prev) => ({
            ...prev,
            variantPreset: preset,
            variants: presetSizes.map((size) => ({ size, price: '' })),
        }));
    };

    // ─── Variant helpers ─────────────────────────────────────────────
    const setVariantField = (index, field, value) => {
        setForm((prev) => {
            const variants = [...prev.variants];
            variants[index] = { ...variants[index], [field]: value };
            return { ...prev, variants };
        });
    };

    const addVariant = () => {
        setForm((prev) => ({
            ...prev,
            variants: [...prev.variants, { size: '', price: '' }],
        }));
    };

    const removeVariant = (index) => {
        setForm((prev) => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index),
        }));
    };

    // ─── Field change ────────────────────────────────────────────────
    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (error) setError('');
    };

    // ─── Validation ──────────────────────────────────────────────────
    const validate = () => {
        if (!form.title.trim()) return 'Title is required';
        if (!form.category) return 'Category is required';

        if (form.pricingType === 'single') {
            if (!form.price || Number(form.price) <= 0) return 'Price must be greater than 0';
        } else {
            if (form.variants.length === 0) return 'At least one variant is required';
            for (const v of form.variants) {
                if (!v.size.trim()) return 'All variant sizes are required';
                if (!v.price || Number(v.price) <= 0) return 'All variant prices must be greater than 0';
            }
        }

        return null;
    };

    // ─── Submit ──────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        const payload = {
            title: form.title.trim(),
            category: form.category,
            image: form.image || undefined,
        };

        // Only include description if provided
        if (form.description.trim()) {
            payload.description = form.description.trim();
        }

        if (form.pricingType === 'single') {
            payload.price = Number(form.price);
            payload.variants = [];
        } else {
            payload.variants = form.variants.map((v) => ({
                size: v.size.trim().toLowerCase(),
                price: Number(v.price),
            }));
            payload.price = null;
        }

        setSaving(true);
        setError('');

        try {
            if (isEditing) {
                await updateProduct(product._id, payload);
            } else {
                await createProduct(payload);
            }
            onSaved?.();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setSaving(false);
        }
    };

    // ─── Render ──────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
                        <ImageUploader
                            value={form.image}
                            onChange={(url) => handleChange('image', url)}
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="e.g. Margherita Pizza"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                        />
                    </div>

                    {/* Description (optional) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description <span className="text-slate-400 text-xs">(optional)</span>
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Brief description of the product..."
                            rows={2}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm resize-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        {loadingCategories ? (
                            <div className="flex items-center gap-2 text-sm text-slate-500 py-2">
                                <Loader2 className="h-4 w-4 animate-spin" /> Loading categories...
                            </div>
                        ) : (
                            <select
                                value={form.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm bg-white"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Pricing Type Toggle */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Pricing Type</label>
                        <div className="flex gap-2">
                            {['single', 'variant'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleChange('pricingType', type)}
                                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border-2 transition-all ${form.pricingType === type
                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    {type === 'single' ? '💰 Single Price' : '📊 Variant Pricing'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Single Price */}
                    {form.pricingType === 'single' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Price (₹) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={form.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                placeholder="e.g. 280"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                            />
                        </div>
                    )}

                    {/* Variant Pricing */}
                    {form.pricingType === 'variant' && (
                        <div className="space-y-3">
                            {/* Preset selector */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Variant Type
                                </label>
                                <div className="flex gap-2">
                                    {Object.entries(VARIANT_PRESETS).map(([key, preset]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => handlePresetChange(key)}
                                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border-2 transition-all ${form.variantPreset === key
                                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Variant rows */}
                            <div className="space-y-2">
                                {form.variants.map((variant, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={variant.size}
                                            onChange={(e) => setVariantField(i, 'size', e.target.value)}
                                            placeholder="Size"
                                            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm capitalize"
                                        />
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                                            <input
                                                type="number"
                                                min="0"
                                                step="1"
                                                value={variant.price}
                                                onChange={(e) => setVariantField(i, 'price', e.target.value)}
                                                placeholder="Price"
                                                className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(i)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addVariant}
                                className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition"
                            >
                                <Plus className="h-4 w-4" />
                                Add custom variant
                            </button>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-sm"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    {isEditing ? 'Update Product' : 'Create Product'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
