import AppLayout from '../../components/AppLayout'
import { useState } from 'react'

export default function ArtisanOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [language, setLanguage] = useState('hindi')

  return (
    <AppLayout currentPage="onboarding">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#3d3021] mb-2 font-display">Artisan Voice Onboarding</h2>
            <p className="text-[#6d5a3d]">Record your craft story in your native language</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Onboarding Form */}
            <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8 shadow-sm">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                      step <= currentStep
                        ? 'bg-[#c2794d] border-[#c2794d] text-white'
                        : 'bg-white border-[#d4c5b0] text-[#8b6f47]'
                    }`}>
                      {step}
                    </div>
                    {step < 5 && (
                      <div className={`w-8 md:w-12 h-0.5 ${step < currentStep ? 'bg-[#c2794d]' : 'bg-[#d4c5b0]'}`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Language Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#3d3021] mb-2">Select Language</label>
                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8f6f3] border-2 border-[#d4c5b0]/50 rounded-xl focus:outline-none focus:border-[#c2794d] appearance-none cursor-pointer"
                  >
                    <option value="hindi">हिन्दी (Hindi)</option>
                    <option value="english">English</option>
                    <option value="marathi">मराठी (Marathi)</option>
                    <option value="tamil">தமிழ் (Tamil)</option>
                    <option value="bengali">বাংলা (Bengali)</option>
                    <option value="gujarati">ગુજરાતી (Gujarati)</option>
                    <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8b6f47]">▼</span>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="mb-6 p-4 bg-[#f8f6f3] border-2 border-[#d4c5b0]/50 rounded-xl">
                <p className="text-sm text-[#6d5a3d] text-center font-medium font-hindi">भूमिनाम; आगम्नामः!</p>
                <p className="text-xs text-[#8b6f47] text-center mt-1">Welcome! Let's begin your journey</p>
              </div>

              {/* Recording Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#3d3021] mb-4">Record your craft story to create your product listing</h3>
                
                <div className="flex flex-col items-center py-12 bg-gradient-to-br from-[#f8f6f3] to-white border-2 border-dashed border-[#c2794d]/40 rounded-2xl">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording
                        ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse'
                        : 'bg-gradient-to-br from-[#c2794d] to-[#8b6f47] hover:shadow-xl'
                    }`}
                  >
                    <span className="text-6xl">{isRecording ? '⏸️' : '🎤'}</span>
                  </button>
                  <p className="mt-6 text-lg font-semibold text-[#3d3021]">
                    {isRecording ? 'Recording... Tap to pause' : 'Tap to Record Story'}
                  </p>
                  {isRecording && (
                    <div className="mt-4 flex space-x-2">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((delay, i) => (
                        <div 
                          key={i}
                          className="w-2 bg-[#c2794d] rounded-full animate-pulse" 
                          style={{ 
                            height: `${24 + Math.random() * 24}px`,
                            animationDelay: `${delay}s` 
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-4">
                <button 
                  disabled={currentStep === 1}
                  className="px-6 py-3 text-[#6d5a3d] font-medium border-2 border-[#d4c5b0]/50 rounded-xl hover:bg-[#f8f6f3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>
                <button 
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  className="flex-1 px-8 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Right: Tips & Guide */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#3d3021] mb-4 font-display">Recording Tips</h3>
                <ul className="space-y-3">
                  {[
                    'Speak clearly in your native language',
                    'Describe your craft materials and process',
                    'Share your story and heritage',
                    'Mention unique features of your product',
                    'Talk about the time it takes to make',
                    'Explain what makes your craft special'
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="text-[#c2794d] text-xl flex-shrink-0">✓</span>
                      <span className="text-[#6d5a3d]">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/10 rounded-2xl border-2 border-[#c2794d]/30 p-8 text-center">
                <div className="text-8xl mb-4">🎨</div>
                <p className="text-lg font-semibold text-[#3d3021] mb-2">Your Story Matters</p>
                <p className="text-sm text-[#6d5a3d]">
                  AI will generate multilingual descriptions from your voice, 
                  reaching customers in 7+ languages automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}