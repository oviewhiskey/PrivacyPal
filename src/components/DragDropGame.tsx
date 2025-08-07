import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Shuffle } from 'lucide-react';

// Define the interface for a drag and drop item
interface DragDropItem {
  id: number;
  term: string;
  definition: string;
  category: string;
}

// Full list of 20 cybersecurity terms and definitions
const allItems: DragDropItem[] = [
  {
    id: 1,
    term: "Phishing",
    definition: "Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities",
    category: "Threats"
  },
  {
    id: 2,
    term: "Malware",
    definition: "Malicious software designed to harm, exploit, or otherwise compromise computer systems",
    category: "Threats"
  },
  {
    id: 3,
    term: "Two-Factor Authentication",
    definition: "Security process requiring two different authentication factors to verify identity",
    category: "Security Measures"
  },
  {
    id: 4,
    term: "VPN",
    definition: "Virtual Private Network that creates secure connections over public networks",
    category: "Security Measures"
  },
  {
    id: 5,
    term: "Social Engineering",
    definition: "Psychological manipulation techniques used to trick people into divulging confidential information",
    category: "Threats"
  },
  {
    id: 6,
    term: "Encryption",
    definition: "Process of converting information into a code to prevent unauthorized access",
    category: "Security Measures"
  },
  {
    id: 7,
    term: "Firewall",
    definition: "Network security system that monitors and controls incoming and outgoing network traffic",
    category: "Security Measures"
  },
  {
    id: 8,
    term: "DDoS Attack",
    definition: "Distributed Denial of Service attack, overwhelming a system with traffic to disrupt service",
    category: "Threats"
  },
  {
    id: 9,
    term: "Ransomware",
    definition: "Malware that encrypts files and demands payment for their decryption",
    category: "Threats"
  },
  {
    id: 10,
    term: "Patch Management",
    definition: "Process of applying updates to software to fix bugs or security vulnerabilities",
    category: "Security Measures"
  },
  {
    id: 11,
    term: "Zero-Day Exploit",
    definition: "A vulnerability that is unknown to the vendor and has no patch available",
    category: "Threats"
  },
  {
    id: 12,
    term: "Penetration Testing",
    definition: "Simulated cyberattack against a computer system to check for exploitable vulnerabilities",
    category: "Security Measures"
  },
  {
    id: 13,
    term: "Spear Phishing",
    definition: "A highly targeted phishing attack tailored to specific individuals or organizations",
    category: "Threats"
  },
  {
    id: 14,
    term: "Intrusion Detection System (IDS)",
    definition: "Monitors network traffic for suspicious activity and alerts security personnel",
    category: "Security Measures"
  },
  {
    id: 15,
    term: "Keylogger",
    definition: "Software that records every keystroke made on a computer",
    category: "Threats"
  },
  {
    id: 16,
    term: "Multi-Factor Authentication (MFA)",
    definition: "An authentication method requiring two or more verification factors",
    category: "Security Measures"
  },
  {
    id: 17,
    term: "SQL Injection",
    definition: "A code injection technique used to attack data-driven applications",
    category: "Threats"
  },
  {
    id: 18,
    term: "Security Audit",
    definition: "A systematic evaluation of the security of a company's information system",
    category: "Security Measures"
  },
  {
    id: 19,
    term: "Brute-Force Attack",
    definition: "A trial-and-error method used to obtain information such as user passwords or encryption keys",
    category: "Threats"
  },
  {
    id: 20,
    term: "Incident Response",
    definition: "An organized approach to addressing and managing the aftermath of a security breach or cyberattack",
    category: "Security Measures"
  }
];

// Define the number of questions to display per session
const DAILY_QUESTION_LIMIT = 5;

// Props interface for the DragDropGame component
interface DragDropGameProps {
  onClose: () => void;
}

export const DragDropGame: React.FC<DragDropGameProps> = ({ onClose }) => {
  // State to hold the terms for the current game session
  const [terms, setTerms] = useState<DragDropItem[]>([]);
  // State to hold the definitions for the current game session
  const [definitions, setDefinitions] = useState<DragDropItem[]>([]);
  // State to store the matches made by the user (termId: definitionId)
  const [matches, setMatches] = useState<{[key: number]: number}>({});
  // State to keep track of the item being dragged
  const [draggedItem, setDraggedItem] = useState<DragDropItem | null>(null);
  // State to indicate if the game is complete (all correct matches)
  const [gameComplete, setGameComplete] = useState(false);
  // State to store the current score
  const [score, setScore] = useState(0);
  // State to control visibility of results after submission
  const [showResults, setShowResults] = useState(false);

  // useEffect hook to initialize the game when the component mounts
  useEffect(() => {
    shuffleAndSelectItems();
  }, []);

  /**
   * Shuffles an array randomly.
   * @template T The type of elements in the array.
   * @param {T[]} array The array to shuffle.
   * @returns {T[]} A new shuffled array.
   */
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /**
   * Selects a random subset of items from the full list and shuffles them for the game.
   */
  const shuffleAndSelectItems = () => {
    // First, shuffle the entire list of items to ensure randomness
    const shuffledAllItems = shuffleArray(allItems);
    // Select the first 'DAILY_QUESTION_LIMIT' items for the current game
    const selectedItems = shuffledAllItems.slice(0, DAILY_QUESTION_LIMIT);

    // Shuffle terms and definitions independently for display
    const shuffledTerms = shuffleArray(selectedItems);
    const shuffledDefinitions = shuffleArray(selectedItems);

    // Update state with the new set of terms and definitions
    setTerms(shuffledTerms);
    setDefinitions(shuffledDefinitions);
    // Reset game state
    setMatches({});
    setGameComplete(false);
    setScore(0);
    setShowResults(false);
  };

  /**
   * Handles the start of a drag operation.
   * @param {React.DragEvent} e The drag event.
   * @param {DragDropItem} item The item being dragged.
   */
  const handleDragStart = (e: React.DragEvent, item: DragDropItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Handles the drag over event, preventing default to allow dropping.
   * @param {React.DragEvent} e The drag event.
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  /**
   * Handles the drop operation, matching the dragged term with the target definition.
   * @param {React.DragEvent} e The drag event.
   * @param {DragDropItem} targetDefinition The definition item where the term is dropped.
   */
  const handleDrop = (e: React.DragEvent, targetDefinition: DragDropItem) => {
    e.preventDefault();
    if (draggedItem) {
      const newMatches = { ...matches };
      // Map the dragged term's ID to the target definition's ID
      newMatches[draggedItem.id] = targetDefinition.id;
      setMatches(newMatches);
      setDraggedItem(null);
    }
  };

  /**
   * Submits the user's answers and calculates the score.
   */
  const handleSubmit = () => {
    let correctMatches = 0;
    // Iterate over the terms currently in the game
    terms.forEach(term => {
      // Check if this term has a match and if it's correct
      if (matches[term.id] && matches[term.id] === term.id) {
        correctMatches++;
      }
    });
    setScore(correctMatches);
    setShowResults(true);
    // Check if all current terms are correctly matched
    if (correctMatches === terms.length) {
      setGameComplete(true);
    }
  };

  /**
   * Resets the game by selecting and shuffling new items.
   */
  const resetGame = () => {
    shuffleAndSelectItems();
  };

  /**
   * Generates a message based on the user's score.
   * @returns {string} The score message.
   */
  const getScoreMessage = () => {
    const percentage = (score / terms.length) * 100; // Use terms.length for current game's total
    if (percentage === 100) return "Perfect! You're a cybersecurity expert! 🎉";
    if (percentage >= 80) return "Excellent work! Great understanding of security concepts! �";
    if (percentage >= 60) return "Good job! Keep learning to master these concepts. 👍";
    return "Keep practicing! Understanding these terms is crucial for cybersecurity. 💪";
  };

  /**
   * Checks if a term and definition form a correct match.
   * @param {number} termId The ID of the term.
   * @param {number} definitionId The ID of the definition.
   * @returns {boolean} True if they match, false otherwise.
   */
  const isCorrectMatch = (termId: number, definitionId: number) => {
    return termId === definitionId;
  };

  /**
   * Retrieves the term that has been matched to a given definition.
   * @param {number} definitionId The ID of the definition.
   * @returns {DragDropItem | null} The matched term item, or null if no match.
   */
  const getMatchedTerm = (definitionId: number) => {
    // Find the term ID that maps to this definition ID in the matches state
    const termId = Object.keys(matches).find(key => matches[parseInt(key)] === definitionId);
    // Return the actual term object if found
    return termId ? allItems.find(item => item.id === parseInt(termId)) : null;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-xl shadow-lg p-6 bg-white">
      <CardHeader className="border-b pb-4 mb-6">
        <CardTitle className="flex items-center justify-between text-2xl font-bold text-gray-800">
          <span>Drag & Drop Security Terms</span>
          <Button
            onClick={shuffleAndSelectItems} // Use the new function to select and shuffle
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-600 border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Shuffle className="h-4 w-4" />
            <span>New Game</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="text-gray-600 text-center text-lg">
          Drag the terms on the left to match them with their correct definitions on the right.
          <br />
          **Current Questions: {terms.length}**
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Terms Column */}
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-xl text-center text-gray-700">Terms</h3>
            {terms.map((term) => (
              <div
                key={term.id}
                draggable
                onDragStart={(e) => handleDragStart(e, term)}
                className={`p-4 bg-blue-100 border border-blue-200 rounded-lg cursor-grab active:cursor-grabbing
                            hover:bg-blue-200 transition-colors duration-200 ease-in-out
                            ${Object.keys(matches).includes(term.id.toString()) ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <span className="font-semibold text-blue-800 text-base">{term.term}</span>
                <div className="text-xs text-blue-600 mt-1">Category: {term.category}</div>
              </div>
            ))}
          </div>

          {/* Definitions Column */}
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-xl text-center text-gray-700">Definitions</h3>
            {definitions.map((definition) => {
              const matchedTerm = getMatchedTerm(definition.id); // Get the term currently matched to this definition
              return (
                <div
                  key={definition.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, definition)}
                  className={`p-4 border-2 border-dashed rounded-lg min-h-[80px] flex flex-col justify-center
                              transition-colors duration-200 ease-in-out
                              ${matchedTerm
                                  ? showResults // If results are shown, color based on correctness
                                    ? isCorrectMatch(matchedTerm.id, definition.id)
                                      ? 'bg-green-100 border-green-400'
                                      : 'bg-red-100 border-red-400'
                                    : 'bg-gray-200 border-gray-300' // Matched but not yet checked
                                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100' // Unmatched
                              }`}
                >
                  {matchedTerm && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm bg-blue-600 text-white px-2 py-1 rounded-md shadow-sm">
                        {matchedTerm.term}
                      </span>
                      {showResults && ( // Show check/x icons only after submission
                        isCorrectMatch(matchedTerm.id, definition.id) ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )
                      )}
                    </div>
                  )}
                  <p className="text-sm text-gray-700">{definition.definition}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button - visible when all terms are matched and results not shown */}
        {Object.keys(matches).length === terms.length && !showResults && (
          <div className="text-center mt-8">
            <Button
              onClick={handleSubmit}
              className="px-8 py-3 text-lg font-semibold rounded-full
                         bg-gradient-to-r from-purple-500 to-indigo-600 text-white
                         shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 ease-in-out"
            >
              Check Answers
            </Button>
          </div>
        )}

        {/* Results Display - visible after submission */}
        {showResults && (
          <div className="text-center space-y-4 mt-8 p-6 bg-blue-50 rounded-lg shadow-inner">
            <div className="text-3xl font-extrabold text-blue-700">
              Score: {score}/{terms.length}
            </div>
            <p className="text-xl font-medium text-gray-800">{getScoreMessage()}</p>
            <div className="flex space-x-4 justify-center mt-6">
              <Button
                onClick={resetGame}
                className="px-6 py-3 text-base font-semibold rounded-full
                           bg-gradient-to-r from-green-500 to-teal-600 text-white
                           shadow-md hover:from-green-600 hover:to-teal-700 transition-all duration-300 ease-in-out"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Play Again
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="px-6 py-3 text-base font-semibold rounded-full
                           border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                Back to Games
              </Button>
            </div>
          </div>
        )}

        {/* Back to Games Button - always visible at the bottom if no results are shown and not all matched */}
        {!showResults && Object.keys(matches).length !== terms.length && (
            <div className="text-center mt-8">
                <Button
                    variant="outline"
                    onClick={onClose}
                    className="px-6 py-3 text-base font-semibold rounded-full
                               border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                >
                    Back to Games
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
};