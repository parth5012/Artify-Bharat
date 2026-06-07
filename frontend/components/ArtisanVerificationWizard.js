import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle,
    Circle,
    ArrowRight,
    ArrowLeft,
    Upload,
    FileText,
    Award,
    Camera,
    Users,
    MapPin
} from 'lucide-react';
import ArtisanPedigreeStep from './verification/ArtisanPedigreeStep';
import CraftAuthenticityStep from './verification/CraftAuthenticityStep';
import ProcessValidationStep from './verification/ProcessValidationStep';

export default function ArtisanVerificationWizard({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Artisan Pedigree & Identity
        pechanCardFile: null,
        pechanCardNumber: '',
        generationalLineage: '',
        artisanBio: '',

        // Step 2: Craft Authenticity & Material Proof
        hasGITag: false,
        giTagNumber: '',
        rawMaterialSource: '',
        toolingMethod: '',

        // Step 3: Visual/Video Proof
        processVideoFile: null,
        workshopPhotoFile: null
    });

    const steps = [
        {
            id: 1,
            title: 'Artisan Identity',
            subtitle: 'Craft Credentials',
            icon: <Users className="w-5 h-5" />,
            description: 'Verify your craft credentials and traditional background'
        },
        {
            id: 2,
            title: 'Product Authenticity',
            subtitle: 'Materials & Methods',
            icon: <Award className="w-5 h-5" />,
            description: 'Document authentic materials and traditional techniques'
        },
        {
            id: 3,
            title: 'Craft Validation',
            subtitle: 'Visual Evidence',
            icon: <Camera className="w-5 h-5" />,
            description: 'Provide visual proof of your authentic craftsmanship'
        }
    ];

    const updateFormData = (stepData) => {
        setFormData(prev => ({ ...prev, ...stepData }));
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            // Submit verification data
            await onComplete(formData);
        } catch (error) {
            console.error('Verification submission failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0] py-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-artistic font-bold text-[#2c1b11] mb-4">
                        Craft Authenticity Verification
                    </h1>
                    <p className="text-lg text-[#6d5a3d] font-friendly">
                        Validate your traditional craft mastery and product authenticity for marketplace trust
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-6 left-0 right-0 h-1 bg-[#d4c5b0]/30 rounded-full">
                            <div
                                className="h-full bg-gradient-to-r from-[#8b4513] to-[#d4af37] rounded-full transition-all duration-500"
                                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                            />
                        </div>

                        {steps.map((step, index) => (
                            <div key={step.id} className="relative flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${currentStep > step.id
                                    ? 'bg-[#8b4513] border-[#8b4513] text-white'
                                    : currentStep === step.id
                                        ? 'bg-white border-[#8b4513] text-[#8b4513]'
                                        : 'bg-white border-[#d4c5b0] text-[#6d5a3d]'
                                    }`}>
                                    {currentStep > step.id ? (
                                        <CheckCircle className="w-6 h-6" />
                                    ) : (
                                        step.icon
                                    )}
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className={`font-bold text-sm ${currentStep >= step.id ? 'text-[#8b4513]' : 'text-[#6d5a3d]'
                                        }`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-xs text-[#6d5a3d] mt-1">{step.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep === 1 && (
                                <ArtisanPedigreeStep
                                    data={formData}
                                    onUpdate={updateFormData}
                                    onNext={nextStep}
                                />
                            )}
                            {currentStep === 2 && (
                                <CraftAuthenticityStep
                                    data={formData}
                                    onUpdate={updateFormData}
                                    onNext={nextStep}
                                    onPrev={prevStep}
                                />
                            )}
                            {currentStep === 3 && (
                                <ProcessValidationStep
                                    data={formData}
                                    onUpdate={updateFormData}
                                    onSubmit={handleSubmit}
                                    onPrev={prevStep}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}