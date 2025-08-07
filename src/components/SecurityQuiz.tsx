import React, { useState, useEffect } from 'react';

// Define the structure for a quiz question
interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

// Array of all 20 security quiz questions
const allQuestions: Question[] = [
  {
    id: 1,
    question: "What makes a password strong?",
    options: [
      "Using your name and birth year",
      "At least 12 characters with mixed case, numbers, and symbols",
      "Using 'password123'",
      "Using the same password everywhere"
    ],
    correct: 1,
    explanation: "Strong passwords should be at least 12 characters long and include uppercase, lowercase, numbers, and symbols."
  },
  {
    id: 2,
    question: "What is phishing?",
    options: [
      "Catching fish with a net",
      "A type of computer virus",
      "Fraudulent attempts to obtain sensitive information",
      "A programming language"
    ],
    correct: 2,
    explanation: "Phishing is a social engineering attack where criminals try to trick you into revealing sensitive information like passwords or credit card numbers."
  },
  {
    id: 3,
    question: "When should you install software updates?",
    options: [
      "Never, they might break things",
      "Only when you have time",
      "As soon as they're available, especially security updates",
      "Once a year"
    ],
    correct: 2,
    explanation: "Security updates should be installed promptly as they fix vulnerabilities that could be exploited by attackers."
  },
  {
    id: 4,
    question: "Is it safe to use public Wi-Fi for online banking?",
    options: [
      "Yes, it's always safe",
      "No, never use public Wi-Fi for sensitive activities",
      "Only on weekends",
      "Only if the network has a password"
    ],
    correct: 1,
    explanation: "Public Wi-Fi networks are not secure. Never access sensitive accounts like banking on public networks unless using a VPN."
  },
  {
    id: 5,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two passwords",
      "An extra security layer requiring a second form of verification",
      "A type of malware",
      "Having two email accounts"
    ],
    correct: 1,
    explanation: "2FA adds an extra layer of security by requiring something you know (password) and something you have (phone, token, etc.)."
  },
  {
    id: 6,
    question: "What is malware?",
    options: [
      "Software that helps you organize files",
      "Malicious software designed to harm or exploit computer systems",
      "A type of computer hardware",
      "A tool for graphic design"
    ],
    correct: 1,
    explanation: "Malware is a general term for malicious software like viruses, worms, Trojans, and ransomware."
  },
  {
    id: 7,
    question: "Why is it important to back up your data?",
    options: [
      "To free up space on your main drive",
      "To share files with friends easily",
      "To protect against data loss from hardware failure, theft, or cyberattack",
      "To make your computer run faster"
    ],
    correct: 2,
    explanation: "Backing up data ensures you can recover your important files if they are lost or corrupted."
  },
  {
    id: 8,
    question: "What is a VPN (Virtual Private Network)?",
    options: [
      "A new type of Wi-Fi router",
      "A service that encrypts your internet connection and hides your IP address",
      "A video streaming platform",
      "A tool for creating virtual machines"
    ],
    correct: 1,
    explanation: "A VPN creates a secure, encrypted connection over a less secure network, like the internet, protecting your online privacy and security."
  },
  {
    id: 9,
    question: "What should you do if you receive a suspicious email?",
    options: [
      "Click on all links immediately",
      "Reply asking for more information",
      "Delete it without opening or report it if possible, and do not click links or attachments",
      "Forward it to all your contacts"
    ],
    correct: 2,
    explanation: "Suspicious emails often contain phishing attempts or malware. It's best to delete them or report them to your IT department."
  },
  {
    id: 10,
    question: "What is ransomware?",
    options: [
      "Software that helps you manage your finances",
      "A type of malware that encrypts your files and demands payment for their release",
      "A tool for optimizing computer performance",
      "A game played online"
    ],
    correct: 1,
    explanation: "Ransomware holds your data hostage by encrypting it until a ransom is paid, usually in cryptocurrency."
  },
  {
    id: 11,
    question: "How can you identify a secure website?",
    options: [
      "It has a lot of pop-up ads",
      "The URL starts with 'http://'",
      "The URL starts with 'https://' and shows a padlock icon",
      "It loads very quickly"
    ],
    correct: 2,
    explanation: "HTTPS indicates that the connection to the website is encrypted, protecting your data in transit."
  },
  {
    id: 12,
    question: "What is social engineering?",
    options: [
      "Designing social media platforms",
      "Manipulating people into performing actions or divulging confidential information",
      "A method for building strong relationships",
      "Studying human behavior in groups"
    ],
    correct: 1,
    explanation: "Social engineering relies on human interaction and deception to trick individuals into breaking security procedures."
  },
  {
    id: 13,
    question: "Why should you avoid clicking on suspicious links?",
    options: [
      "They might lead to boring websites",
      "They can lead to malware downloads or phishing sites",
      "They slow down your internet connection",
      "They are usually just advertisements"
    ],
    correct: 1,
    explanation: "Clicking suspicious links can expose you to malware, phishing scams, or other malicious content."
  },
  {
    id: 14,
    question: "What is a firewall?",
    options: [
      "A wall made of fire",
      "A network security system that monitors and controls incoming and outgoing network traffic",
      "A tool for extinguishing fires",
      "A type of computer game"
    ],
    correct: 1,
    explanation: "A firewall acts as a barrier between your internal network and external networks, filtering traffic to prevent unauthorized access."
  },
  {
    id: 15,
    question: "Is it safe to share your password with a colleague if they promise to keep it secret?",
    options: [
      "Yes, if you trust them",
      "No, never share your passwords with anyone",
      "Only if your manager approves",
      "Only for a short period"
    ],
    correct: 1,
    explanation: "Sharing passwords compromises security. Use secure methods like password managers or shared accounts if necessary."
  },
  {
    id: 16,
    question: "What is data encryption?",
    options: [
      "Making data publicly available",
      "Converting data into a code to prevent unauthorized access",
      "Deleting data permanently",
      "Organizing data into spreadsheets"
    ],
    correct: 1,
    explanation: "Encryption transforms data into an unreadable format, making it secure from unauthorized viewing."
  },
  {
    id: 17,
    question: "What is a strong indicator of a potential scam website?",
    options: [
      "It has a professional design",
      "It asks for your social security number via email",
      "It uses a common domain name like google.com",
      "It offers free software downloads"
    ],
    correct: 1,
    explanation: "Legitimate websites will rarely ask for sensitive personal information like SSN via email or insecure forms."
  },
  {
    id: 18,
    question: "What is the principle of least privilege?",
    options: [
      "Giving everyone full access to all systems",
      "Granting users only the minimum necessary access rights to perform their job functions",
      "Allowing users to choose their own access levels",
      "Restricting access only to administrators"
    ],
    correct: 1,
    explanation: "Least privilege minimizes the potential damage from a compromised account by limiting what that account can do."
  },
  {
    id: 19,
    question: "How often should you change your passwords?",
    options: [
      "Never, if they are strong",
      "Every few years, or immediately if there's a security breach",
      "Every day",
      "Only when you forget them"
    ],
    correct: 1,
    explanation: "While very strong, unique passwords don't need frequent changes, it's crucial to change them immediately if a breach is suspected."
  },
  {
    id: 20,
    question: "What is a 'zero-day' vulnerability?",
    options: [
      "A vulnerability that has been known for zero days",
      "A newly discovered software flaw for which no patch is yet available",
      "A vulnerability that affects zero users",
      "A vulnerability that can be fixed in zero days"
    ],
    correct: 1,
    explanation: "A zero-day vulnerability is a software flaw unknown to the vendor, meaning there's 'zero days' for them to fix it before it might be exploited."
  }
];

// Helper function to shuffle an array
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

interface SecurityQuizProps {
  onClose: () => void;
}

const SecurityQuiz: React.FC<SecurityQuizProps> = ({ onClose }) => { // Changed to default export
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Effect to load or generate daily questions on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastQuizDate = localStorage.getItem('lastQuizDate');
    const storedQuestionIds = localStorage.getItem('dailyQuestionIds');

    let questionsForToday: Question[] = [];

    if (lastQuizDate === today && storedQuestionIds) {
      // If quiz was played today, load the same questions
      const parsedIds: number[] = JSON.parse(storedQuestionIds);
      questionsForToday = allQuestions.filter(q => parsedIds.includes(q.id));
    } else {
      // If not played today, or no stored questions, generate new random questions
      const shuffledAllQuestions = shuffleArray([...allQuestions]);
      questionsForToday = shuffledAllQuestions.slice(0, 5); // Pick 5 random questions
      
      // Store the current date and the IDs of the selected questions
      localStorage.setItem('lastQuizDate', today);
    localStorage.setItem('dailyQuestionIds', JSON.stringify(questionsForToday.map(q => q.id)));
    }
    setDailyQuestions(questionsForToday);
  }, []); // Run only once on mount

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === dailyQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    // Check if there are more questions for today
    if (currentQuestionIndex < dailyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed for the day
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    // To reset, we need to clear the daily questions and re-fetch/re-shuffle
    // This will effectively give new questions if the date has changed,
    // or the same 5 if it's still the same day.
    localStorage.removeItem('lastQuizDate'); // Force re-selection of questions
    localStorage.removeItem('dailyQuestionIds');
    
    // Re-run the effect to get new questions for the "new day"
    const today = new Date().toDateString();
    const shuffledAllQuestions = shuffleArray([...allQuestions]);
    const newDailyQuestions = shuffledAllQuestions.slice(0, 5);
    localStorage.setItem('lastQuizDate', today);
    localStorage.setItem('dailyQuestionIds', JSON.stringify(newDailyQuestions.map(q => q.id)));
    setDailyQuestions(newDailyQuestions);

    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / dailyQuestions.length) * 100;
    if (percentage >= 80) return "Excellent! You're a cybersecurity expert! 🎉";
    if (percentage >= 60) return "Good job! Keep learning to improve your security knowledge. �";
    return "Keep practicing! Cybersecurity knowledge takes time to build. 💪";
  };

  // Show loading state if dailyQuestions are not yet loaded
  if (dailyQuestions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg mx-auto my-8 p-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-center">Loading Quiz...</h2>
        </div>
        <div className="p-4 text-center">
          <p>Preparing your daily security questions.</p>
        </div>
      </div>
    );
  }

  // Display quiz results
  if (showResult) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg mx-auto my-8 p-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-center">Quiz Complete!</h2>
        </div>
        <div className="p-4 text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {score}/{dailyQuestions.length}
          </div>
          <p className="text-lg font-medium">{getScoreMessage()}</p>
          <div className="flex space-x-2 justify-center">
            <button onClick={resetQuiz} className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M21.5 14a8.27 8.27 0 0 1-2.9 6.1c-.5.5-1.2 1-2.1 1.4M2.5 10a8.27 8.27 0 0 0 2.9-6.1C5.9 3.4 6.6 2.9 7.5 2.5"/></svg>
              Try Again (New Questions Tomorrow)
            </button>
            <button className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={onClose}>
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = dailyQuestions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg mx-auto my-8 p-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-between">
          <span>Security Quiz</span>
          <span className="text-sm font-normal text-gray-600">
            Question {currentQuestionIndex + 1} of {dailyQuestions.length}
          </span>
        </h2>
      </div>
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / dailyQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-4">{question.question}</h3>

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-blue-600 bg-blue-100 text-blue-800' // Using specific Tailwind colors
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  selectedAnswer === index
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className={`p-4 rounded-lg ${
            selectedAnswer === question.correct 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {selectedAnswer === question.correct ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              )}
              <span className={`font-medium ${
                selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswer === question.correct ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className={`text-sm ${
              selectedAnswer === question.correct ? 'text-green-700' : 'text-red-700'
            }`}>
              {question.explanation}
            </p>
          </div>
        )}

        <div className="flex space-x-2 pt-4">
          <button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
          >
            {currentQuestionIndex === dailyQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuiz; // Exporting as default