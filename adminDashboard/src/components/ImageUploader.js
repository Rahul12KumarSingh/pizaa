import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImageToCloudinary } from '../services/productService';

const ImageUploader = ({ value, onChange, className = '' }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState('');

    const handleFile = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be smaller than 5MB');
            return;
        }

        setError('');
        setUploading(true);

        try {
            const url = await uploadImageToCloudinary(file);
            onChange(url);
        } catch (err) {
            setError(err.message || 'Upload failed. Please try again.');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleInputChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleRemove = () => {
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const triggerFileInput = () => {
        if (!uploading && fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    return (
        <div className={className}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleInputChange}
                className="hidden"
            />

            {value ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                        src={value}
                        alt="Product"
                        className="w-full h-48 object-cover"
                    />
                    {/* Always-visible action buttons on mobile, hover on desktop */}
                    <div className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-3 p-3 bg-gradient-to-t from-black/60 to-transparent">
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg text-slate-700 hover:bg-slate-100 transition text-xs font-medium shadow-sm"
                        >
                            <Upload className="h-3.5 w-3.5" />
                            Change
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition text-xs font-medium shadow-sm"
                        >
                            <X className="h-3.5 w-3.5" />
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={triggerFileInput}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={() => setDragOver(false)}
                    disabled={uploading}
                    className={`flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all
                        ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-slate-100 active:bg-slate-200'}
                        ${uploading ? 'pointer-events-none opacity-60' : ''}
                    `}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                            <p className="mt-2 text-sm text-slate-500">Uploading...</p>
                        </>
                    ) : (
                        <>
                            <ImageIcon className="h-8 w-8 text-slate-400" />
                            <p className="mt-2 text-sm font-medium text-slate-600">
                                Click or drag image to upload
                            </p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                        </>
                    )}
                </button>
            )}

            {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default ImageUploader;
