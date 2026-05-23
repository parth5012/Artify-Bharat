import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Camera,
    Video,
    Upload,
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Play,
    Image as ImageIcon
} from 'lucide-react';

export default function ProcessValidationStep({ data, onUpdate, onSubmit, onPrev }) {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [videoDragActive, setVideoDragActive] = useState(false);
    const [photoDragActive, setPhotoDragActive] = useState(false);

    const handleVideoUpload = (file) => {
        if (file && file.type.startsWith('video/')) {
            if (file.size <= 100 * 1024 * 1024) { // 100MB limit
                onUpdate({ processVideoFile: file });
                setErrors(prev => ({ ...prev, processVideoFile: null }));
            } else {
                setErrors(prev => ({ ...prev, processVideoFile: 'Video file must be under 100MB' }));
            }
        } else {
            setErrors(prev => ({ ...prev, processVideoFile: 'Please upload a valid video file' }));
        }
    };

    const handlePhotoUpload = (file) => {
        if (file && file.type.startsWith('image/')) {
            if (file.size <= 10 * 1024 * 1024) { // 10MB limit
                onUpdate({ workshopPhotoFile: file });
                setErrors(prev => ({ ...prev, workshopPhotoFile: null }));
            } else {
                setErrors(prev => ({ ...prev, workshopPhotoFile: 'Image file must be under 10MB' }));
            }
        } else {
            setErrors(prev => ({ ...prev, workshopPhotoFile: 'Please upload a valid image file' }));
        }
    };

    const handleVideoDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setVideoDragActive(true);
        } else if (e.type === 'dragleave') {
            setVideoDragActive(false);
        }
    };

    const handlePhotoDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setPhotoDragActive(true);
        } else if (e.type === 'dragleave') {
            setPhotoDragActive(false);
        }
    };

    const handleVideoDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setVideoDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleVideoUpload(e.dataTransfer.files[0]);
        }
    };

    const handlePhotoDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPhotoDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handlePhotoUpload(e.dataTransfer.files[0]);
        }
    };

    const validateStep = () => {
        const newErrors = {};

        if (!data.processVideoFile) {
            newErrors.processVideoFile = 'Crafting process video is required';
        }

        if (!data.workshopPhotoFile) {
            newErrors.workshopPhotoFile = 'Workshop/studio photo is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateStep()) {
            setIsSubmitting(true);
            try {
                await onSubmit();
            } catch (error) {
                console.error('Submission failed:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-8">
            {/* Step Header */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-artistic font-bold text-[#2c1b11] mb-2">
                    Craft Validation & Evidence
                </h2>
                <p className="text-[#6d5a3d] font-friendly">
                    Provide visual evidence of your authentic craftsmanship and product creation
                </p>
            </div>

            {/* Video Upload Section */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Product Creation Process Video *
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    Upload a 30-60 second video showing you creating your authentic products (carving, painting, weaving, etc.)
                </p>

                <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${videoDragActive
                        ? 'border-[#8b4513] bg-[#8b4513]/5'
                        : errors.processVideoFile
                            ? 'border-red-300 bg-red-50'
                            : 'border-[#d4c5b0] hover:border-[#8b4513] hover:bg-[#8b4513]/5'
                        }`}
                    onDragEnter={handleVideoDrag}
                    onDragLeave={handleVideoDrag}
                    onDragOver={handleVideoDrag}
                    onDrop={handleVideoDrop}
                >
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleVideoUpload(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {data.processVideoFile ? (
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <Play className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <p className="text-[#2c1b11] font-medium text-lg">{data.processVideoFile.name}</p>
                                <p className="text-sm text-[#6d5a3d]">
                                    Size: {formatFileSize(data.processVideoFile.size)}
                                </p>
                                <p className="text-sm text-green-600 flex items-center justify-center gap-2 mt-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Video uploaded successfully
                                </p>
                            </div>

                            {/* Video Preview */}
                            <div className="max-w-md mx-auto">
                                <video
                                    src={URL.createObjectURL(data.processVideoFile)}
                                    controls
                                    className="w-full rounded-xl shadow-lg"
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#8b4513]/10 rounded-full flex items-center justify-center mx-auto">
                                <Video className="w-8 h-8 text-[#8b4513]" />
                            </div>
                            <div>
                                <p className="text-[#2c1b11] font-medium text-lg">
                                    Drop your product creation video here or click to browse
                                </p>
                                <p className="text-sm text-[#6d5a3d] mt-2">
                                    Supports: MP4, MOV, AVI (Max 100MB) • Duration: 30-60 seconds
                                </p>
                            </div>

                            {/* Video Guidelines */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                                <h4 className="font-semibold text-blue-800 mb-2">Video Guidelines:</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Show clear view of your hands creating the product</li>
                                    <li>• Include your face briefly to verify identity</li>
                                    <li>• Good lighting and stable camera position</li>
                                    <li>• Demonstrate key techniques or processes used</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {errors.processVideoFile && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.processVideoFile}
                    </div>
                )}
            </div>

            {/* Workshop Photo Upload */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Workshop/Studio Photo *
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    Upload a high-resolution photo of your physical workshop, studio space, or crafting area
                </p>

                <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${photoDragActive
                        ? 'border-[#8b4513] bg-[#8b4513]/5'
                        : errors.workshopPhotoFile
                            ? 'border-red-300 bg-red-50'
                            : 'border-[#d4c5b0] hover:border-[#8b4513] hover:bg-[#8b4513]/5'
                        }`}
                    onDragEnter={handlePhotoDrag}
                    onDragLeave={handlePhotoDrag}
                    onDragOver={handlePhotoDrag}
                    onDrop={handlePhotoDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {data.workshopPhotoFile ? (
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <ImageIcon className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <p className="text-[#2c1b11] font-medium text-lg">{data.workshopPhotoFile.name}</p>
                                <p className="text-sm text-[#6d5a3d]">
                                    Size: {formatFileSize(data.workshopPhotoFile.size)}
                                </p>
                                <p className="text-sm text-green-600 flex items-center justify-center gap-2 mt-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Photo uploaded successfully
                                </p>
                            </div>

                            {/* Photo Preview */}
                            <div className="max-w-md mx-auto">
                                <img
                                    src={URL.createObjectURL(data.workshopPhotoFile)}
                                    alt="Workshop preview"
                                    className="w-full rounded-xl shadow-lg"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-[#8b4513]/10 rounded-full flex items-center justify-center mx-auto">
                                <Upload className="w-8 h-8 text-[#8b4513]" />
                            </div>
                            <div>
                                <p className="text-[#2c1b11] font-medium text-lg">
                                    Drop your workshop photo here or click to browse
                                </p>
                                <p className="text-sm text-[#6d5a3d] mt-2">
                                    Supports: JPG, PNG, HEIC (Max 10MB) • High resolution preferred
                                </p>
                            </div>

                            {/* Photo Guidelines */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
                                <h4 className="font-semibold text-amber-800 mb-2">Photo Guidelines:</h4>
                                <ul className="text-sm text-amber-700 space-y-1">
                                    <li>• Show your complete workspace/studio setup</li>
                                    <li>• Include tools, materials, and work-in-progress items</li>
                                    <li>• Good lighting to show details clearly</li>
                                    <li>• Wide angle to capture the full environment</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {errors.workshopPhotoFile && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.workshopPhotoFile}
                    </div>
                )}
            </div>

            {/* Submission Notice */}
            <div className="bg-gradient-to-r from-[#8b4513]/10 to-[#d4af37]/10 rounded-2xl p-6 border border-[#8b4513]/20">
                <h4 className="font-semibold text-[#2c1b11] mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8b4513]" />
                    Verification Review Process
                </h4>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    After submission, our heritage verification team will review your documentation within 3-5 business days.
                    You'll receive email updates on your verification status and any additional requirements.
                </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onPrev}
                    className="px-8 py-4 border-2 border-[#8b4513] text-[#8b4513] rounded-xl font-semibold hover:bg-[#8b4513] hover:text-white transition-all duration-300 flex items-center gap-2 font-modern"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Product Authenticity
                </motion.button>

                <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 font-modern ${isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#d4af37] to-[#c2794d] text-white hover:shadow-lg'
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            Submit for Product Verification
                            <CheckCircle className="w-5 h-5" />
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}