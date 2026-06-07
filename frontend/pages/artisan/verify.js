import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ArtisanVerificationWizard from '../../components/ArtisanVerificationWizard';
import { submitVerification, getVerificationStatus } from '../../utils/apiCalls';

export default function VerifyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [hasExistingVerification, setHasExistingVerification] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null);

    useEffect(() => {
        checkVerificationStatus();
    }, []);

    const checkVerificationStatus = async () => {
        try {
            const response = await getVerificationStatus();
            if (response.has_verification) {
                setHasExistingVerification(true);
                setVerificationStatus(response.status);
            }
        } catch (error) {
            console.error('Error checking verification status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationComplete = async (formData) => {
        try {
            setLoading(true);

            // Create FormData for file uploads
            const submitData = new FormData();

            // Add all form fields
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== undefined) {
                    submitData.append(key, formData[key]);
                }
            });

            await submitVerification(submitData);

            // Redirect to dashboard with success message
            router.push('/artisan/dashboard?verification=submitted');
        } catch (error) {
            console.error('Verification submission failed:', error);
            alert('Failed to submit verification. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#8b4513] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#6d5a3d] font-friendly">Loading verification status...</p>
                </div>
            </div>
        );
    }

    if (hasExistingVerification) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0] flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/50">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#8b4513] to-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-artistic font-bold text-[#2c1b11] mb-4">
                            Product Verification Submitted
                        </h1>

                        <div className="mb-6">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${verificationStatus === 'VERIFIED'
                                ? 'bg-green-100 text-green-800'
                                : verificationStatus === 'REJECTED'
                                    ? 'bg-red-100 text-red-800'
                                    : verificationStatus === 'NEEDS_INFO'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                Status: {verificationStatus === 'PENDING' ? 'Under Review' : verificationStatus}
                            </div>
                        </div>

                        <p className="text-[#6d5a3d] font-friendly mb-8">
                            {verificationStatus === 'PENDING' &&
                                "Your product verification is currently under review by our authenticity team. We'll notify you via email once the review is complete."
                            }
                            {verificationStatus === 'VERIFIED' &&
                                "Congratulations! Your products have been verified as authentic. You can now access all premium marketplace features."
                            }
                            {verificationStatus === 'REJECTED' &&
                                "Your product verification was not approved. Please check your email for details and resubmit with the required corrections."
                            }
                            {verificationStatus === 'NEEDS_INFO' &&
                                "Additional information is required for your product verification. Please check your email for specific requirements."
                            }
                        </p>

                        <button
                            onClick={() => router.push('/artisan/dashboard')}
                            className="px-8 py-4 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 font-modern"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ArtisanVerificationWizard onComplete={handleVerificationComplete} />
    );
}