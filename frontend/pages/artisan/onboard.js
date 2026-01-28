import AppLayout from "../../components/AppLayout";
import { useState } from "react";

const translations = {
  english: {
    title: "Artisan Voice Onboarding",
    subtitle: "Record your craft story in your native language",
    selectLanguage: "Select Language",

    welcomeNative: "Welcome!",
    welcomeSub: "Let's begin your journey",

    recordTitle: "Record your craft story to create your product listing",
    tapToRecord: "Tap to Record Story",
    recording: "Recording... Tap to pause",

    back: "← Back",
    next: "Next →",

    tipsTitle: "Recording Tips",
    tips: [
      "Speak clearly in your native language",
      "Describe your craft materials and process",
      "Share your story and heritage",
      "Mention unique features of your product",
      "Talk about the time it takes to make",
      "Explain what makes your craft special",
    ],

    storyMatters: "Your Story Matters",
    storyDesc:
      "AI will generate multilingual descriptions from your voice, reaching customers in 7+ languages automatically",
  },

  hindi: {
    title: "कारीगर वॉयस ऑनबोर्डिंग",
    subtitle: "अपनी कहानी अपनी मातृभाषा में रिकॉर्ड करें",
    selectLanguage: "भाषा चुनें",

    welcomeNative: "स्वागत है!",
    welcomeSub: "आइए आपकी यात्रा शुरू करें",

    recordTitle: "अपनी कला की कहानी रिकॉर्ड करें",
    tapToRecord: "रिकॉर्ड करने के लिए टैप करें",
    recording: "रिकॉर्डिंग... रोकने के लिए टैप करें",

    back: "← पीछे",
    next: "आगे →",

    tipsTitle: "रिकॉर्डिंग सुझाव",
    tips: [
      "अपनी मातृभाषा में स्पष्ट बोलें",
      "अपनी कला की सामग्री और प्रक्रिया बताएं",
      "अपनी कहानी और विरासत साझा करें",
      "अपने उत्पाद की विशेषताएं बताएं",
      "इसे बनाने में लगने वाला समय बताएं",
      "अपनी कला को खास क्या बनाता है बताएं",
    ],

    storyMatters: "आपकी कहानी महत्वपूर्ण है",
    storyDesc:
      "AI आपकी आवाज़ से कई भाषाओं में विवरण तैयार करेगा और ग्राहकों तक पहुँचेगा",
  },

  marathi: {
    title: "कारागीर व्हॉईस ऑनबोर्डिंग",
    subtitle: "तुमची कथा तुमच्या मातृभाषेत रेकॉर्ड करा",
    selectLanguage: "भाषा निवडा",

    welcomeNative: "स्वागत आहे!",
    welcomeSub: "चला तुमची प्रवास सुरू करूया",

    recordTitle: "तुमची कला कथा रेकॉर्ड करा",
    tapToRecord: "रेकॉर्ड करण्यासाठी टॅप करा",
    recording: "रेकॉर्डिंग... थांबवण्यासाठी टॅप करा",

    back: "← मागे",
    next: "पुढे →",

    tipsTitle: "रेकॉर्डिंग टिप्स",
    tips: [
      "तुमच्या मातृभाषेत स्पष्ट बोला",
      "तुमच्या कलेची सामग्री आणि प्रक्रिया सांगा",
      "तुमची कथा आणि वारसा शेअर करा",
      "तुमच्या उत्पादनाची वैशिष्ट्ये सांगा",
      "ते बनवायला किती वेळ लागतो ते सांगा",
      "तुमची कला खास कशामुळे आहे ते सांगा",
    ],

    storyMatters: "तुमची कथा महत्त्वाची आहे",
    storyDesc: "AI तुमच्या आवाजातून अनेक भाषांमध्ये वर्णन तयार करेल",
  },

  tamil: {
    title: "கலைஞர் குரல் தொடக்கம்",
    subtitle: "உங்கள் கதையை உங்கள் தாய்மொழியில் பதிவு செய்யுங்கள்",
    selectLanguage: "மொழியை தேர்ந்தெடுக்கவும்",

    welcomeNative: "வரவேற்கிறோம்!",
    welcomeSub: "உங்கள் பயணத்தை தொடங்கலாம்",

    recordTitle: "உங்கள் கைவினை கதையை பதிவு செய்யுங்கள்",
    tapToRecord: "பதிவு செய்ய தட்டவும்",
    recording: "பதிவு நடக்கிறது... நிறுத்த தட்டவும்",

    back: "← பின்செல்",
    next: "அடுத்து →",

    tipsTitle: "பதிவு குறிப்புகள்",
    tips: [
      "உங்கள் தாய்மொழியில் தெளிவாக பேசுங்கள்",
      "உங்கள் கைவினை செயல்முறையை விவரிக்கவும்",
      "உங்கள் கதையும் பாரம்பரியமும் பகிரவும்",
      "உங்கள் தயாரிப்பின் தனித்துவத்தை சொல்லுங்கள்",
      "உருவாக்க எவ்வளவு நேரம் লাগে என்பதை கூறுங்கள்",
      "உங்கள் கலை சிறப்பை விளக்குங்கள்",
    ],

    storyMatters: "உங்கள் கதை முக்கியம்",
    storyDesc: "AI உங்கள் குரலிலிருந்து பல மொழிகளில் விளக்கங்களை உருவாக்கும்",
  },

  bengali: {
    title: "কারিগর ভয়েস অনবোর্ডিং",
    subtitle: "আপনার গল্প আপনার মাতৃভাষায় রেকর্ড করুন",
    selectLanguage: "ভাষা নির্বাচন করুন",

    welcomeNative: "স্বাগতম!",
    welcomeSub: "চলুন আপনার যাত্রা শুরু করি",

    recordTitle: "আপনার শিল্পের গল্প রেকর্ড করুন",
    tapToRecord: "রেকর্ড করতে ট্যাপ করুন",
    recording: "রেকর্ডিং চলছে... থামাতে ট্যাপ করুন",

    back: "← পিছনে",
    next: "পরবর্তী →",

    tipsTitle: "রেকর্ডিং টিপস",
    tips: [
      "আপনার মাতৃভাষায় স্পষ্টভাবে বলুন",
      "আপনার শিল্পের উপকরণ ও প্রক্রিয়া বলুন",
      "আপনার গল্প ও ঐতিহ্য শেয়ার করুন",
      "আপনার পণ্যের বিশেষ বৈশিষ্ট্য বলুন",
      "তৈরি করতে কত সময় লাগে বলুন",
      "আপনার শিল্পকে বিশেষ কী করে তা বলুন",
    ],

    storyMatters: "আপনার গল্প গুরুত্বপূর্ণ",
    storyDesc: "AI আপনার কণ্ঠ থেকে বহু ভাষায় বর্ণনা তৈরি করবে",
  },

  gujarati: {
    title: "કારીગર વોઇસ ઓનબોર્ડિંગ",
    subtitle: "તમારી વાર્તા તમારી માતૃભાષામાં રેકોર્ડ કરો",
    selectLanguage: "ભાષા પસંદ કરો",

    welcomeNative: "સ્વાગત છે!",
    welcomeSub: "ચાલો તમારી યાત્રા શરૂ કરીએ",

    recordTitle: "તમારી કલા વાર્તા રેકોર્ડ કરો",
    tapToRecord: "રેકોર્ડ કરવા માટે ટેપ કરો",
    recording: "રેકોર્ડિંગ... રોકવા માટે ટેપ કરો",

    back: "← પાછળ",
    next: "આગળ →",

    tipsTitle: "રેકોર્ડિંગ ટીપ્સ",
    tips: [
      "તમારી માતૃભાષામાં સ્પષ્ટ બોલો",
      "તમારી કલા પ્રક્રિયા સમજાવો",
      "તમારી વાર્તા અને વારસો શેર કરો",
      "તમારા ઉત્પાદનની વિશેષતા કહો",
      "બનાવામાં કેટલો સમય લાગે તે કહો",
      "તમારી કલા ખાસ કેમ છે તે કહો",
    ],

    storyMatters: "તમારી વાર્તા મહત્વપૂર્ણ છે",
    storyDesc: "AI તમારા અવાજમાંથી અનેક ભાષાઓમાં વર્ણન બનાવશે",
  },

  kannada: {
    title: "ಕಾರಿಗರ ಧ್ವನಿ ಆನ್‌ಬೋರ್ಡಿಂಗ್",
    subtitle: "ನಿಮ್ಮ ಕಥೆಯನ್ನು ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ದಾಖಲಿಸಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",

    welcomeNative: "ಸ್ವಾಗತ!",
    welcomeSub: "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಆರಂಭಿಸೋಣ",

    recordTitle: "ನಿಮ್ಮ ಕೈತೋಟ ಕಥೆಯನ್ನು ದಾಖಲಿಸಿ",
    tapToRecord: "ದಾಖಲಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    recording: "ದಾಖಲಿಸುತ್ತಿದೆ... ನಿಲ್ಲಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",

    back: "← ಹಿಂದೆ",
    next: "ಮುಂದೆ →",

    tipsTitle: "ದಾಖಲೆ ಸಲಹೆಗಳು",
    tips: [
      "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ",
      "ನಿಮ್ಮ ಕೈತೋಟದ ಪ್ರಕ್ರಿಯೆಯನ್ನು ವಿವರಿಸಿ",
      "ನಿಮ್ಮ ಕಥೆ ಮತ್ತು ಪರಂಪರೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
      "ನಿಮ್ಮ ಉತ್ಪನ್ನದ ವಿಶೇಷತೆ ಹೇಳಿ",
      "ತಯಾರಿಸಲು ಬೇಕಾದ ಸಮಯ ತಿಳಿಸಿ",
      "ನಿಮ್ಮ ಕಲೆ ಏಕೆ ವಿಶೇಷವೆಂದು ವಿವರಿಸಿ",
    ],

    storyMatters: "ನಿಮ್ಮ ಕಥೆ ಮಹತ್ವದ್ದಾಗಿದೆ",
    storyDesc: "AI ನಿಮ್ಮ ಧ್ವನಿಯಿಂದ ಹಲವಾರು ಭಾಷೆಗಳಲ್ಲಿ ವಿವರಣೆ ರಚಿಸುತ್ತದೆ",
  },
};

export default function ArtisanOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState("hindi");

  const t = translations[language];

  return (
    <AppLayout currentPage="onboarding">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#3d3021] mb-2 font-display">
              {t.title}
            </h2>
            <p className="text-[#6d5a3d]">{t.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Onboarding Form */}
            <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8 shadow-sm">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                        step <= currentStep
                          ? "bg-[#c2794d] border-[#c2794d] text-white"
                          : "bg-white border-[#d4c5b0] text-[#8b6f47]"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 5 && (
                      <div
                        className={`w-8 md:w-12 h-0.5 ${step < currentStep ? "bg-[#c2794d]" : "bg-[#d4c5b0]"}`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Language Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#3d3021] mb-2">
                  {t.selectLanguage}
                </label>
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
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8b6f47]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Welcome Message */}
              <div>
                <p>{t.welcomeNative}</p>
                <p>{t.welcomeSub}</p>
              </div>

              {/* Recording Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#3d3021] mb-4">
                  {t.recordTitle}
                </h3>

                <div className="flex flex-col items-center py-12 bg-gradient-to-br from-[#f8f6f3] to-white border-2 border-dashed border-[#c2794d]/40 rounded-2xl">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording
                        ? "bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"
                        : "bg-gradient-to-br from-[#c2794d] to-[#8b6f47] hover:shadow-xl"
                    }`}
                  >
                    <span className="text-6xl">
                      {isRecording ? "⏸️" : "🎤"}
                    </span>
                  </button>
                  <p className="mt-6 text-lg font-semibold text-[#3d3021]">
                    {isRecording ? t.recording : t.tapToRecord}
                  </p>
                  {isRecording && (
                    <div className="mt-4 flex space-x-2">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((delay, i) => (
                        <div
                          key={i}
                          className="w-2 bg-[#c2794d] rounded-full animate-pulse"
                          style={{
                            height: `${24 + Math.random() * 24}px`,
                            animationDelay: `${delay}s`,
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
                  {t.back}
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  className="flex-1 px-8 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {t.next}
                </button>
              </div>
            </div>

            {/* Right: Tips & Guide */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#3d3021] mb-4 font-display">
                  {t.tipsTitle}
                </h3>
                <ul className="space-y-3">
                  {t.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/10 rounded-2xl border-2 border-[#c2794d]/30 p-8 text-center">
                <div className="text-8xl mb-4">🎨</div>
                <p className="text-lg font-semibold text-[#3d3021] mb-2">
                  {t.storyMatters}
                </p>
                <p className="text-sm text-[#6d5a3d]">
                  {t.storyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
