import React, { useState, useEffect } from 'react';

interface TrueFalseQuestion {
  id: number;
  statement: string;
  correct: boolean;
  explanation: string;
}

const allQuestions: TrueFalseQuestion[] = [
  {
    id: 1,
    statement: "Using the same password for multiple accounts is a safe practice.",
    correct: false,
    explanation: "Using the same password for multiple accounts is dangerous because if one account is compromised, all your accounts become vulnerable."
  },
  {
    id: 2,
    statement: "Two-factor authentication significantly increases account security.",
    correct: true,
    explanation: "Two-factor authentication adds an extra layer of security by requiring a second form of verification beyond just your password."
  },
  {
    id: 3,
    statement: "It's safe to connect to any public Wi-Fi network for online banking.",
    correct: false,
    explanation: "Public Wi-Fi networks are not secure and should never be used for sensitive activities like online banking without a VPN."
  },
  {
    id: 4,
    statement: "Phishing emails always contain obvious spelling and grammar mistakes.",
    correct: false,
    explanation: "Modern phishing emails can be very sophisticated and well-written, making them harder to detect based on language alone."
  },
  {
    id: 5,
    statement: "Software updates should be installed as soon as they become available.",
    correct: true,
    explanation: "Software updates often contain important security patches that fix vulnerabilities, so they should be installed promptly."
  },
  {
    id: 6,
    statement: "Private browsing mode makes you completely anonymous online.",
    correct: false,
    explanation: "Private browsing only prevents local storage of browsing data. Your ISP, websites, and network administrators can still track your activity."
  },
  {
    id: 7,
    statement: "A strong password must be at least 12 characters long.",
    correct: true,
    explanation: "Security experts recommend passwords of at least 12 characters to provide adequate protection against brute force attacks."
  },
  {
    id: 8,
    statement: "Antivirus software alone is sufficient to protect against all cyber threats.",
    correct: false,
    explanation: "While antivirus is important, comprehensive security requires multiple layers including firewalls, safe browsing habits, and regular updates."
  },
  {
    id: 9,
    statement: "It is safe to click on links from unknown senders if the email looks legitimate.",
    correct: false,
    explanation: "Even if an email looks legitimate, clicking links from unknown senders can lead to phishing sites or malware downloads."
  },
  {
    id: 10,
    statement: "Using a VPN encrypts your internet connection.",
    correct: true,
    explanation: "A VPN (Virtual Private Network) encrypts your internet traffic, making it more secure and private."
  },
  {
    id: 11,
    statement: "Ransomware encrypts your files and demands a payment.",
    correct: true,
    explanation: "Ransomware is malicious software that locks your files and demands a ransom, usually in cryptocurrency, for their release."
  },
  {
    id: 12,
    statement: "You should regularly back up your important data.",
    correct: true,
    explanation: "Regular backups protect your data from loss due to hardware failure, theft, or cyberattacks."
  },
  {
    id: 13,
    statement: "All pop-up windows are malicious and should be closed immediately.",
    correct: false,
    explanation: "While many pop-ups are malicious, some legitimate websites use them for notifications or login prompts. Exercise caution and verify the source."
  },
  {
    id: 14,
    statement: "A firewall helps protect your computer from unauthorized access.",
    correct: true,
    explanation: "A firewall acts as a barrier, controlling incoming and outgoing network traffic to prevent unauthorized access to your system."
  },
  {
    id: 15,
    statement: "Sharing your Netflix password with friends is harmless.",
    correct: false,
    explanation: "Sharing passwords, even for streaming services, can violate terms of service and potentially expose your account to misuse."
  },
  {
    id: 16,
    statement: "HTTPS in a website URL means the connection is secure.",
    correct: true,
    explanation: "HTTPS indicates that the communication between your browser and the website is encrypted, making it more secure."
  },
  {
    id: 17,
    statement: "It's okay to reuse old passwords if they were strong initially.",
    correct: false,
    explanation: "Reusing old passwords is risky because if they were ever compromised, they remain vulnerable to credential stuffing attacks."
  },
  {
    id: 18,
    statement: "Social engineering relies on technical hacking skills to gain access.",
    correct: false,
    explanation: "Social engineering relies on manipulating people through psychological tactics, not technical hacking skills, to gain information or access."
  },
  {
    id: 19,
    statement: "Keeping your operating system updated is crucial for security.",
    correct: true,
    explanation: "Operating system updates often include critical security patches that protect against newly discovered vulnerabilities."
  },
  {
    id: 20,
    statement: "You should always use public charging stations for your mobile devices.",
    correct: false,
    explanation: "Public charging stations can be risky ('juice jacking') as they might be compromised to install malware or steal data from your device."
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

interface TrueFalseGameProps {
  onClose: () => void;
}

const TrueFalseGame: React.FC<TrueFalseGameProps> = ({ onClose }) => {
  const [dailyQuestions, setDailyQuestions] = useState<TrueFalseQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Effect to load or generate daily questions on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastGameDate = localStorage.getItem('lastTrueFalseGameDate');
    const storedQuestionIds = localStorage.getItem('dailyTrueFalseQuestionIds');

    let questionsForToday: TrueFalseQuestion[] = [];

    if (lastGameDate === today && storedQuestionIds) {
      // If game was played today, load the same questions
      const parsedIds: number[] = JSON.parse(storedQuestionIds);
      questionsForToday = allQuestions.filter(q => parsedIds.includes(q.id));
    } else {
      // If not played today, or no stored questions, generate new random questions
      const shuffledAllQuestions = shuffleArray([...allQuestions]);
      questionsForToday = shuffledAllQuestions.slice(0, 5); // Pick 5 random questions
      
      // Store the current date and the IDs of the selected questions
      localStorage.setItem('lastTrueFalseGameDate', today);
      localStorage.setItem('dailyTrueFalseQuestionIds', JSON.stringify(questionsForToday.map(q => q.id)));
    }
    setDailyQuestions(questionsForToday);
  }, []); // Run only once on mount

  const handleAnswerSelect = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === dailyQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < dailyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    // Force re-selection of questions for a "new day"
    localStorage.removeItem('lastTrueFalseGameDate');
    localStorage.removeItem('dailyTrueFalseQuestionIds');
    
    // Re-run the effect logic to get new questions
    const today = new Date().toDateString();
    const shuffledAllQuestions = shuffleArray([...allQuestions]);
    const newDailyQuestions = shuffledAllQuestions.slice(0, 5);
    localStorage.setItem('lastTrueFalseGameDate', today);
    localStorage.setItem('dailyTrueFalseQuestionIds', JSON.stringify(newDailyQuestions.map(q => q.id)));
    setDailyQuestions(newDailyQuestions);

    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / dailyQuestions.length) * 100;
    if (percentage >= 80) return "Excellent! You have great cybersecurity knowledge! 🎉";
    if (percentage >= 60) return "Good job! Keep learning to strengthen your security awareness. 👍";
    return "Keep practicing! Every bit of security knowledge helps protect you. 💪";
  };

  // Show loading state if dailyQuestions are not yet loaded
  if (dailyQuestions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg mx-auto my-8 p-6 font-sans">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-center">Loading Game...</h2>
        </div>
        <div className="p-4 text-center">
          <p>Preparing your daily true or false questions.</p>
        </div>
      </div>
    );
  }

  const question = dailyQuestions[currentQuestionIndex];

  if (gameComplete) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg mx-auto my-8 p-6 font-sans">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-center">Game Complete!</h2>
        </div>
        <div className="p-4 text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {score}/{dailyQuestions.length}
          </div>
          <p className="text-lg font-medium">{getScoreMessage()}</p>
          <div className="flex space-x-2 justify-center">
            <button onClick={resetGame} className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M21.5 14a8.27 8.27 0 0 1-2.9 6.1c-.5.5-1.2 1-2.1 1.4M2.5 10a8.27 8.27 0 0 0 2.9-6.1C5.9 3.4 6.6 2.9 7.5 2.5"/></svg>
              Play Again (New Questions Tomorrow)
            </button>
            <button className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={onClose}>
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg mx-auto my-8 p-6 font-sans">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-between">
          <span>True or False</span>
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

        <div className="text-center py-8">
          <h3 className="text-xl font-medium mb-8">{question.statement}</h3>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => handleAnswerSelect(true)}
              disabled={selectedAnswer !== null}
              className={`px-8 py-4 text-lg rounded-lg font-semibold transition-colors duration-200 text-white flex items-center justify-center ${
                selectedAnswer === true
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              True
            </button>
            <button
              onClick={() => handleAnswerSelect(false)}
              disabled={selectedAnswer !== null}
              className={`px-8 py-4 text-lg rounded-lg font-semibold transition-colors duration-200 text-white flex items-center justify-center ${
                selectedAnswer === false
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              False
            </button>
          </div>
        </div>

        {showResult && (
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
            {currentQuestionIndex === dailyQuestions.length - 1 ? 'Finish Game' : 'Next Question'}
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseGame;
