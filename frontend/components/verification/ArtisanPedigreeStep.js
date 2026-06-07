import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Users, Award, AlertCircle } from 'lucide-react';

export default function ArtisanPedigreeStep({ data, onUpdate, onNext }) {
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);

    const generationalOptions = [
        { value: 'first', label: '1st Generation', description: 'First in family to learn this craft' },
        { value: 'second', label: '2nd Generation', description: 'Learned from parent/guardian' },
        { value: 'third_plus', label: '3rd Generation+', description: 'Multi-generational family tradition' },
        { value: 'community', label: 'Community/SHG Trained', description: 'Learned through community programs' }
    ];

    const handleFileUpload = (file) => {
        if (file && file.type.startsWith('image/')) {
            onUpdate({ pechanCardFile: file });
            setErrors(prev => ({ ...prev, pechanCardFile: null }));
        } else {
            setErrors(prev => ({ ...prev, pechanCardFile: 'Please upload a valid image file' }));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const validateStep = () => {
        const newErrors = {};

        if (!data.pechanCardFile) {
            newErrors.pechanCardFile = 'Pechan Card or Handicraft Certificate is required';
        }

        if (!data.pechanCardNumber?.trim()) {
            newErrors.pechanCardNumber = 'Card/Certificate number is required';
        }

        if (!data.generationalLineage) {
            newErrors.generationalLineage = 'Please select your craft lineage';
        }

        if (!data.artisanBio?.trim() || data.artisanBio.length < 50) {
            newErrors.artisanBio = 'Please provide at least 50 characters describing your craft heritage';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            onNext();
        }
    };

    return (
        <div className="space-y-8">
            {/* Step Header */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8b4513] to-[#a0522d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-artistic font-bold text-[#2c1b11] mb-2">
                    Artisan Identity & Credentials
                </h2>
                <p className="text-[#6d5a3d] font-friendly">
                    Verify your craft credentials and traditional background for product authenticity
                </p>
            </div>

            {/* Pechan Card Upload */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Artisan Card / Government Registration *
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    Upload your Pechan Card (DC Handicrafts ID) or State Handicraft Board Certificate
                </p>

                <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${dragActive
                        ? 'border-[#8b4513] bg-[#8b4513]/5'
                        : errors.pechanCardFile
                            ? 'border-red-300 bg-red-50'
                            : 'border-[#d4c5b0] hover:border-[#8b4513] hover:bg-[#8b4513]/5'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {data.pechanCardFile ? (
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <FileText className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-[#2c1b11] font-medium">{data.pechanCardFile.name}</p>
                            <p className="text-sm text-green-600">✓ File uploaded successfully</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-[#8b4513]/10 rounded-full flex items-center justify-center mx-auto">
                                <Upload className="w-6 h-6 text-[#8b4513]" />
                            </div>
                            <p className="text-[#2c1b11] font-medium">
                                Drop your Pechan Card here or click to browse
                            </p>
                            <p className="text-sm text-[#6d5a3d]">
                                Supports: JPG, PNG, PDF (Max 5MB)
                            </p>
                        </div>
                    )}
                </div>

                {errors.pechanCardFile && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.pechanCardFile}
                    </div>
                )}
            </div>

            {/* Card Number */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Card/Certificate Number *
                </label>
                <input
                    type="text"
                    value={data.pechanCardNumber || ''}
                    onChange={(e) => onUpdate({ pechanCardNumber: e.target.value })}
                    placeholder="Enter your Pechan Card or Certificate number"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-modern ${errors.pechanCardNumber
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-[#d4c5b0] focus:border-[#8b4513]'
                        }`}
                />
                {errors.pechanCardNumber && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.pechanCardNumber}
                    </div>
                )}
            </div>

            {/* Generational Lineage */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Generational Lineage *
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    How did you learn this traditional craft?
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    {generationalOptions.map((option) => (
                        <motion.div
                            key={option.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${data.generationalLineage === option.value
                                ? 'border-[#8b4513] bg-[#8b4513]/10'
                                : 'border-[#d4c5b0] hover:border-[#8b4513]/50'
                                }`}
                            onClick={() => onUpdate({ generationalLineage: option.value })}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${data.generationalLineage === option.value
                                    ? 'border-[#8b4513] bg-[#8b4513]'
                                    : 'border-[#d4c5b0]'
                                    }`}>
                                    {data.generationalLineage === option.value && (
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#2c1b11] font-modern">{option.label}</h4>
                                    <p className="text-sm text-[#6d5a3d] font-friendly">{option.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {errors.generationalLineage && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.generationalLineage}
                    </div>
                )}
            </div>

            {/* Artisan Bio */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Craft Heritage & Learning Journey *
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    Describe your craft learning journey, traditional techniques mastered, and what makes your products authentic
                </p>
                <textarea
                    value={data.artisanBio || ''}
                    onChange={(e) => onUpdate({ artisanBio: e.target.value })}
                    placeholder="Share your craft learning journey and what makes your products authentic... (minimum 50 characters)"
                    rows={6}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-handwritten text-base resize-none ${errors.artisanBio
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-[#d4c5b0] focus:border-[#8b4513]'
                        }`}
                />
                <div className="flex justify-between items-center">
                    <div className="text-sm text-[#6d5a3d]">
                        {data.artisanBio?.length || 0} / 50 minimum characters
                    </div>
                    {errors.artisanBio && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.artisanBio}
                        </div>
                    )}
                </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-6">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="px-8 py-4 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-modern"
                >
                    Continue to Product Authenticity
                    <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        →
                    </motion.div>
                </motion.button>
            </div>
        </div>
    );
}