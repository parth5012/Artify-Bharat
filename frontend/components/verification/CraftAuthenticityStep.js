import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, MapPin, Wrench, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CraftAuthenticityStep({ data, onUpdate, onNext, onPrev }) {
    const [errors, setErrors] = useState({});

    const toolingMethods = [
        {
            value: 'handcrafted',
            label: '100% Handcrafted',
            description: 'Entirely made by hand using traditional tools',
            icon: '✋'
        },
        {
            value: 'handloom',
            label: 'Handloom Operated',
            description: 'Using traditional handloom or manual looms',
            icon: '🧵'
        },
        {
            value: 'hand_tooled',
            label: 'Hand-tooled with Assistive Machinery',
            description: 'Hand-operated with minimal mechanical assistance',
            icon: '⚙️'
        }
    ];

    const validateStep = () => {
        const newErrors = {};

        if (!data.rawMaterialSource?.trim()) {
            newErrors.rawMaterialSource = 'Please describe your raw material sources';
        }

        if (!data.toolingMethod) {
            newErrors.toolingMethod = 'Please select your crafting method';
        }

        if (data.hasGITag && !data.giTagNumber?.trim()) {
            newErrors.giTagNumber = 'Please provide the GI Tag registration number';
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
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#c2794d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-artistic font-bold text-[#2c1b11] mb-2">
                    Product Authenticity & Materials
                </h2>
                <p className="text-[#6d5a3d] font-friendly">
                    Document authentic materials and traditional methods used in your products
                </p>
            </div>

            {/* GI Tag Status */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Geographical Indication (GI) Tag Status
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    Does your craft/product hold a registered GI Tag? (e.g., Channapatna Toys, Pochampally Ikat, Banarasi Silk)
                </p>

                <div className="bg-gradient-to-r from-[#d4af37]/10 to-[#c2794d]/10 rounded-2xl p-6 border border-[#d4af37]/20">
                    <div className="flex items-center gap-4 mb-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onUpdate({ hasGITag: !data.hasGITag, giTagNumber: data.hasGITag ? '' : data.giTagNumber })}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${data.hasGITag
                                ? 'bg-[#d4af37] border-[#d4af37] text-white'
                                : 'bg-white border-[#d4c5b0] text-[#6d5a3d] hover:border-[#d4af37]'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${data.hasGITag ? 'border-white bg-white/20' : 'border-current'
                                }`}>
                                {data.hasGITag && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </div>
                            <span className="font-medium">Yes, my products have GI Tag recognition</span>
                        </motion.button>
                    </div>

                    {data.hasGITag && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                        >
                            <label className="block text-sm font-semibold text-[#2c1b11]">
                                GI Tag Registration Number *
                            </label>
                            <input
                                type="text"
                                value={data.giTagNumber || ''}
                                onChange={(e) => onUpdate({ giTagNumber: e.target.value })}
                                placeholder="Enter GI registration number (e.g., GI-123456)"
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-modern ${errors.giTagNumber
                                    ? 'border-red-300 focus:border-red-500'
                                    : 'border-[#d4c5b0] focus:border-[#d4af37]'
                                    }`}
                            />
                            {errors.giTagNumber && (
                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.giTagNumber}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Raw Material Source */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Raw Material Sources *
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    Describe where you source your traditional materials (e.g., organic clay from local riverbanks, vegetable dyes from specific plants, teak wood from sustainable forests)
                </p>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#8b4513]" />
                    <textarea
                        value={data.rawMaterialSource || ''}
                        onChange={(e) => onUpdate({ rawMaterialSource: e.target.value })}
                        placeholder="Example: I source natural indigo from local farmers in my village, organic cotton from certified suppliers, and traditional wooden blocks carved by local artisans..."
                        rows={4}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-handwritten text-base resize-none ${errors.rawMaterialSource
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-[#d4c5b0] focus:border-[#8b4513]'
                            }`}
                    />
                </div>
                {errors.rawMaterialSource && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.rawMaterialSource}
                    </div>
                )}
            </div>

            {/* Tooling Method */}
            <div className="space-y-4">
                <label className="block text-lg font-artistic font-semibold text-[#2c1b11]">
                    Product Creation Method *
                </label>
                <p className="text-sm text-[#6d5a3d] font-friendly">
                    Select the method that best describes how you create your products
                </p>

                <div className="space-y-3">
                    {toolingMethods.map((method) => (
                        <motion.div
                            key={method.value}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${data.toolingMethod === method.value
                                ? 'border-[#8b4513] bg-[#8b4513]/10'
                                : 'border-[#d4c5b0] hover:border-[#8b4513]/50'
                                }`}
                            onClick={() => onUpdate({ toolingMethod: method.value })}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.toolingMethod === method.value
                                    ? 'border-[#8b4513] bg-[#8b4513]'
                                    : 'border-[#d4c5b0]'
                                    }`}>
                                    {data.toolingMethod === method.value && (
                                        <div className="w-3 h-3 bg-white rounded-full" />
                                    )}
                                </div>

                                <div className="text-2xl">{method.icon}</div>

                                <div className="flex-1">
                                    <h4 className="font-semibold text-[#2c1b11] font-modern">{method.label}</h4>
                                    <p className="text-sm text-[#6d5a3d] font-friendly">{method.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {errors.toolingMethod && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.toolingMethod}
                    </div>
                )}
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
                    Back to Identity
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="px-8 py-4 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-modern"
                >
                    Continue to Craft Validation
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}