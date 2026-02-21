import AppLayout from "../../components/AppLayout";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { updateCraftStory } from "@/utils/apiCalls";

const translations = {
  english: {
    title: "Artisan Voice Onboarding",
    subtitle: "Record your craft story in your native language",
    selectLanguage: "Select Language",
    welcomeNative: "Welcome!",
    welcomeSub: "Let's begin your journey",
    recordTitle: "Record your craft story to create your product listing",
    tapToRecord: "Tap to Record Story",
    recording: "Recording... Tap to stop",
    recordingComplete: "Recording Complete",
    deleteRecording: "Delete",
    back: "← Back",
    next: "Next →",
    processing: "Processing...",
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
    storyReady: "Your Story is Ready!",
    transcriptLabel: "Transcript:",
    generatedStoryLabel: "Generated Product Story:",
    recordAgain: "← Record Again",
    saveContinue: "Save & Continue →",
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
    recordingComplete: "रिकॉर्डिंग पूर्ण",
    deleteRecording: "हटाएं",
    back: "← पीछे",
    next: "आगे →",
    processing: "प्रोसेसिंग...",
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
    storyReady: "आपकी कहानी तैयार है!",
    transcriptLabel: "ट्रांस्क्रिप्ट:",
    generatedStoryLabel: "जेनरेट की गई कहानी:",
    recordAgain: "← फिर से रिकॉर्ड करें",
    saveContinue: "सहेजें और जारी रखें →",
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
    recordingComplete: "रेकॉर्डिंग पूर्ण",
    deleteRecording: "हटवा",
    back: "← मागे",
    next: "पुढे →",
    processing: "प्रोसेसिंग...",
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
    storyReady: "तुमची कथा तयार आहे!",
    transcriptLabel: "ट्रान्सक्रिप्ट:",
    generatedStoryLabel: "तयार केलेली कथा:",
    recordAgain: "← पुन्हा रेकॉर्ड करा",
    saveContinue: "सेव्ह करा आणि सुरू ठेवा →",
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
    recordingComplete: "பதிவு முடிந்தது",
    deleteRecording: "நீக்கு",
    back: "← பின்செல்",
    next: "அடுத்து →",
    processing: "செயலாக்கம்...",
    tipsTitle: "பதிவு குறிப்புகள்",
    tips: [
      "உங்கள் தாய்மொழியில் தெளிவாக பேசுங்கள்",
      "உங்கள் கைவினை செயல்முறையை விவரிக்கவும்",
      "உங்கள் கதையும் பாரம்பரியமும் பகிரவும்",
      "உங்கள் தயாரிப்பின் தனித்துவத்தை சொல்லுங்கள்",
      "உருவாக்க எவ்வளவு நேரம் ஆகும் என்பதை கூறுங்கள்",
      "உங்கள் கலை சிறப்பை விளக்குங்கள்",
    ],
    storyMatters: "உங்கள் கதை முக்கியம்",
    storyDesc: "AI உங்கள் குரலிலிருந்து பல மொழிகளில் விளக்கங்களை உருவாக்கும்",
    storyReady: "உங்கள் கதை தயார்!",
    transcriptLabel: "டிரான்ஸ்கிரிப்ட்:",
    generatedStoryLabel: "உருவாக்கப்பட்ட கதை:",
    recordAgain: "← மீண்டும் பதிவு செய்",
    saveContinue: "சேமித்து தொடரவும் →",
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
    recordingComplete: "রেকর্ডিং সম্পূর্ণ",
    deleteRecording: "মুছুন",
    back: "← পিছনে",
    next: "পরবর্তী →",
    processing: "প্রসেসিং...",
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
    storyReady: "আপনার গল্প প্রস্তুত!",
    transcriptLabel: "ট্রান্সক্রিপ্ট:",
    generatedStoryLabel: "তৈরি করা গল্প:",
    recordAgain: "← আবার রেকর্ড করুন",
    saveContinue: "সেভ করুন এবং চালিয়ে যান →",
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
    recordingComplete: "રેકોર્ડિંગ પૂર્ણ",
    deleteRecording: "કાઢી નાખો",
    back: "← પાછળ",
    next: "આગળ →",
    processing: "પ્રોસેસિંગ...",
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
    storyReady: "તમારી વાર્તા તૈયાર છે!",
    transcriptLabel: "ટ્રાન્સક્રિપ્ટ:",
    generatedStoryLabel: "જનરેટ કરેલી વાર્તા:",
    recordAgain: "← ફરીથી રેકોર્ડ કરો",
    saveContinue: "સેવ કરો અને ચાલુ રાખો →",
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
    recordingComplete: "ದಾಖಲೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
    deleteRecording: "ಅಳಿಸಿ",
    back: "← ಹಿಂದೆ",
    next: "ಮುಂದೆ →",
    processing: "ಪ್ರೊಸೆಸಿಂಗ್...",
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
    storyReady: "ನಿಮ್ಮ ಕಥೆ ಸಿದ್ಧವಾಗಿದೆ!",
    transcriptLabel: "ಟ್ರಾನ್ಸ್‌ಕ್ರಿಪ್ಟ್:",
    generatedStoryLabel: "ರಚಿಸಿದ ಕಥೆ:",
    recordAgain: "← ಮತ್ತೆ ದಾಖಲಿಸಿ",
    saveContinue: "ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ →",
  },
};

export default function ArtisanOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState("hindi");
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");
  const [transcript, setTranscript] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const router = useRouter();

  const t = translations[language];

  // Start/Stop Recording
  const handleRecordToggle = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
        });

        // Use supported MIME type
        let mimeType = 'audio/webm';
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
          mimeType = 'audio/ogg;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        }

        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: mimeType,
          });
          const url = URL.createObjectURL(audioBlob);
          setAudioBlob(audioBlob);
          setAudioUrl(url);

          // Stop all tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start(1000); // Collect data every second
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Could not access microphone. Please grant permission.");
      }
    } else {
      // Stop recording
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  // Delete recording and reset
  const handleDeleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setGeneratedStory("");
    setTranscript("");
  };

  // Process audio: Upload → Transcribe → Generate Story
  const handleNext = async () => {
    if (!audioBlob) {
      alert("Please record your story first!");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("audioBlob:", audioBlob);
      console.log("audioBlob type:", audioBlob.type);
      console.log("audioBlob size:", audioBlob.size);
      console.log("isBlob:", audioBlob instanceof Blob);

      // Create FormData and append audio file
      const formData = new FormData();

      // Determine file extension based on MIME type
      let filename = "audio.webm";
      if (audioBlob.type.includes("ogg")) {
        filename = "audio.ogg";
      } else if (audioBlob.type.includes("mp4")) {
        filename = "audio.mp4";
      }

      // IMPORTANT: audioBlob must be a Blob or File
      formData.append("file", audioBlob, filename);

      console.log("Uploading file:", filename);

      const response = await axios.post(
        "http://127.0.0.1:8001/process_audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const data = response.data;

      // Set results
      setTranscript(data.text || "");
      setGeneratedStory(data.story || "");

      // Move to next step to show results
      setCurrentStep(2);
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Failed to process your recording. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Add this NEW FUNCTION after handleNext
  const handleSaveContinue = async () => {
    try {
      console.log("Saving craft story:", generatedStory);

      // Backend mein save karo
      const response = await updateCraftStory({
        craft_story: generatedStory,
        transcript: transcript
      });

      console.log("Save response:", response);

      // Dashboard pe redirect karo
      router.push("/artisan/dashboard");
    } catch (error) {
      console.error("Failed to save story:", error);

      // Fallback: localStorage mein save kar do
      const onboardingData = {
        transcript,
        story: generatedStory,
        audioUrl,
      };
      localStorage.setItem("artisan_onboarding", JSON.stringify(onboardingData));

      alert("Story saved locally. Redirecting to dashboard...");
      router.push("/artisan/dashboard");
    }
  };


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

              {/* STEP 1: Recording */}
              {currentStep === 1 && (
                <>
                  {/* Recording Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-[#3d3021] mb-4">
                      {t.recordTitle}
                    </h3>

                    <div className="flex flex-col items-center py-12 bg-gradient-to-br from-[#f8f6f3] to-white border-2 border-dashed border-[#c2794d]/40 rounded-2xl">
                      <button
                        onClick={handleRecordToggle}
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
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

                    {/* Audio Preview */}
                    {audioUrl && !isRecording && (
                      <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-green-800">
                            ✅ {t.recordingComplete}
                          </p>
                          <button
                            onClick={handleDeleteRecording}
                            className="text-red-500 hover:text-red-700 font-medium"
                          >
                            🗑️ {t.deleteRecording}
                          </button>
                        </div>
                        <audio controls className="w-full mt-2">
                          <source src={audioUrl} type="audio/wav" />
                        </audio>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-4">
                    <button
                      disabled={true}
                      className="px-6 py-3 text-[#6d5a3d] font-medium border-2 border-[#d4c5b0]/50 rounded-xl hover:bg-[#f8f6f3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t.back}
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!audioBlob || isProcessing}
                      className="flex-1 px-8 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? t.processing : t.next}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2: Generated Story */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <h3 className="text-2xl font-bold text-[#3d3021] mb-2">
                      {t.storyReady}
                    </h3>
                  </div>

                  {/* Transcript */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      📝 {t.transcriptLabel}
                    </h4>
                    <p className="text-sm text-blue-800">{transcript}</p>
                  </div>

                  {/* Generated Story */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
                    <h4 className="font-semibold text-amber-900 mb-3 text-lg">
                      ✨ {t.generatedStoryLabel}
                    </h4>
                    <p className="text-amber-900 leading-relaxed">
                      {generatedStory}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        handleDeleteRecording();
                        // Clear localStorage when recording again
                        localStorage.removeItem("artisan_onboarding");
                      }}
                      className="flex-1 px-6 py-3 text-[#6d5a3d] font-medium border-2 border-[#d4c5b0]/50 rounded-xl hover:bg-[#f8f6f3] transition-colors"
                    >
                      {t.recordAgain}
                    </button>
                    <button
                      onClick={handleSaveContinue}
                      className="flex-1 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      {t.saveContinue}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Tips & Guide */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#3d3021] mb-4 font-display">
                  {t.tipsTitle}
                </h3>
                <ul className="space-y-3">
                  {t.tips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-[#c2794d]">✓</span>
                      <span className="text-[#6d5a3d]">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/10 rounded-2xl border-2 border-[#c2794d]/30 p-8 text-center">
                <div className="text-8xl mb-4">🎨</div>
                <p className="text-lg font-semibold text-[#3d3021] mb-2">
                  {t.storyMatters}
                </p>
                <p className="text-sm text-[#6d5a3d]">{t.storyDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
