import React, { useState, useEffect, useCallback } from 'react';
import {
    ArrowLeft,
    Plus,
    Search,
    Package,
    Loader2,
    RefreshCw,
    Pencil,
    Trash2,
    ImageOff,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { fetchMenu, fetchCategories, deleteProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';

const SettingsPage = ({ onBack }) => {
    const [menuData, setMenuData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [expandedCategories, setExpandedCategories] = useState({});

    // Form modal state
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Delete state
    const [deleteConfirm, setDeleteConfirm] = useState(null); // product to confirm delete
    const [deleting, setDeleting] = useState(false);

    // ─── Load data ───────────────────────────────────────────────────
    const loadData = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [menuResult, catResult] = await Promise.all([
                fetchMenu(),
                fetchCategories(),
            ]);
            setMenuData(menuResult);
            setCategories(catResult);

            // Expand all categories by default
            const expanded = {};
            menuResult.forEach((group) => {
                expanded[group.categoryId] = true;
            });
            setExpandedCategories(expanded);
        } catch {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // ─── Handlers ────────────────────────────────────────────────────
    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEditProduct = (product, categoryId) => {
        setEditingProduct({ ...product, category: categoryId });
        setShowForm(true);
    };

    const handleFormSaved = () => {
        setShowForm(false);
        setEditingProduct(null);
        loadData();
    };

    const handleDeleteProduct = (product) => {
        setDeleteConfirm(product);
    };

    const confirmDelete = async () => {
        if (!deleteConfirm?._id) return;
        setDeleting(true);
        try {
            await deleteProduct(deleteConfirm._id);
            setDeleteConfirm(null);
            loadData();
        } catch {
            setError('Failed to delete product');
        } finally {
            setDeleting(false);
        }
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    // ─── Filtered data ───────────────────────────────────────────────
    const filteredMenu = menuData
        .filter((group) => filterCategory === 'all' || group.categoryId === filterCategory)
        .map((group) => ({
            ...group,
            products: group.products.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter((group) => group.products.length > 0);

    const totalProducts = menuData.reduce((sum, g) => sum + g.products.length, 0);

    // ─── Render ──────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-100">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onBack}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">Product Management</h1>
                                <p className="text-sm text-slate-500">
                                    {totalProducts} products across {menuData.length} categories
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={loadData}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                            >
                                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition shadow-sm"
                            >
                                <Plus className="h-4 w-4" />
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm min-w-[180px]"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                        <p className="mt-3 text-sm text-slate-500">Loading products...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 text-sm">{error}</p>
                        <button
                            onClick={loadData}
                            className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Try again
                        </button>
                    </div>
                ) : filteredMenu.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="h-12 w-12 text-slate-300 mx-auto" />
                        <p className="mt-3 text-slate-500 text-sm">
                            {search ? 'No products match your search' : 'No products found'}
                        </p>
                        <button
                            onClick={handleAddProduct}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 transition"
                        >
                            <Plus className="h-4 w-4" />
                            Add your first product
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredMenu.map((group) => (
                            <div
                                key={group.categoryId}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                            >
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(group.categoryId)}
                                    className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-bold text-sm">
                                            {group.categoryName?.[0] || '?'}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-slate-800 text-sm">
                                                {group.categoryName}
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                {group.products.length} product{group.products.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    {expandedCategories[group.categoryId] ? (
                                        <ChevronUp className="h-4 w-4 text-slate-400" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-slate-400" />
                                    )}
                                </button>

                                {/* Product List */}
                                {expandedCategories[group.categoryId] && (
                                    <div className="divide-y divide-slate-100">
                                        {group.products.map((product) => (
                                            <div
                                                key={product._id}
                                                className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition group"
                                            >
                                                {/* Image */}
                                                <div className="h-14 w-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center">
                                                            <ImageOff className="h-5 w-5 text-slate-300" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-800 truncate">
                                                        {product.title}
                                                    </p>
                                                    {product.description && (
                                                        <p className="text-xs text-slate-400 truncate mt-0.5">
                                                            {product.description}
                                                        </p>
                                                    )}
                                                    {/* Price display */}
                                                    <div className="flex items-center gap-2 mt-1">
                                                        {product.variants && product.variants.length > 0 ? (
                                                            product.variants.map((v, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="inline-flex items-center text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize"
                                                                >
                                                                    {v.size}: ₹{v.price}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                                                ₹{product.price}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-1 flex-shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition">
                                                    <button
                                                        onClick={() => handleEditProduct(product, group.categoryId)}
                                                        className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                    }}
                    onSaved={handleFormSaved}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-fade-in">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                            <Trash2 className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 text-center">Delete Product</h3>
                        <p className="text-sm text-slate-500 text-center mt-2">
                            Are you sure you want to delete <span className="font-semibold text-slate-700">{deleteConfirm.title}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                disabled={deleting}
                                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleting}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 transition"
                            >
                                {deleting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
