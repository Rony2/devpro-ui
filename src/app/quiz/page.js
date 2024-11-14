"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import questions from './quiz.json';

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Sorting function to handle different sorting criteria
const sortQuestions = (questions, sortBy) => {
  const sortedQuestions = [...questions];
  switch (sortBy) {
    case 'importance-low-to-high':
      return sortedQuestions.sort((a, b) =>
        a.importance.localeCompare(b.importance)
      );
    case 'importance-high-to-low':
      return sortedQuestions.sort((a, b) =>
        b.importance.localeCompare(a.importance)
      );
    case 'a-to-z':
      return sortedQuestions.sort((a, b) => a.title.localeCompare(b.title));
    case 'z-to-a':
      return sortedQuestions.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sortedQuestions.sort((a, b) =>
        b.importance.localeCompare(a.importance)
      );
  }
};

// Define specific colors for known topics
const topicColorMap = {
  javascript: 'bg-yellow-100 text-yellow-700',
  html: 'bg-red-100 text-red-700',
  css: 'bg-blue-100 text-blue-700',
  react: 'bg-indigo-100 text-indigo-700',
  nodejs: 'bg-green-100 text-green-700',
  typescript: 'bg-purple-100 text-purple-700',
  performance: 'bg-orange-100 text-orange-700',
  accessibility: 'bg-pink-100 text-pink-700',
  testing: 'bg-teal-100 text-teal-700',
  security: 'bg-gray-100 text-gray-700',
};

// Default color if the topic is not listed in `topicColorMap`
const getTopicColor = (topic) => topicColorMap[topic.toLowerCase()] || 'bg-gray-100 text-gray-700';

// Extract unique topics from the questions for the filter options
const uniqueTopics = Array.from(
  new Set(questions.flatMap((item) => item.topics))
).sort();

const QuizPage = () => {
  const [sortBy, setSortBy] = useState('importance-high-to-low');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState(uniqueTopics); // Default all topics selected
  const [isFilterOpen, setIsFilterOpen] = useState(false); // To toggle the filter options
  const [isSortOpen, setIsSortOpen] = useState(false); // To toggle the sort options
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  // Close the filter and sort menus if the user clicks outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event.target, filterRef.current)
      if (
        (filterRef.current && !filterRef.current.contains(event.target)) ||
        (sortRef.current && !sortRef.current.contains(event.target))
      ) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle filter by topics
  const handleTopicFilterChange = (topic) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topic)
        ? prevSelectedTopics.filter((t) => t !== topic)
        : [...prevSelectedTopics, topic]
    );
  };

  // Handle Select None action
  const handleSelectNone = () => {
    setSelectedTopics([]);
  };

  // Handle Select All action
  const handleSelectAll = () => {
    setSelectedTopics(uniqueTopics);
  };

  // Filter and sort the questions based on the current state
  const filteredQuestions = questions
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedTopics.length === 0
        ? true
        : item.topics.some((topic) => selectedTopics.includes(topic))
    );

  const sortedQuestions = sortQuestions(filteredQuestions, sortBy);

  return (
    <div className="flex flex-col items-center">
      <nav className="w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Questions</h2>

        {/* Search, Filter, and Sort Options in Horizontal Row */}
        <div className="flex items-center gap-4 mb-6 w-full max-w-4xl">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-3xl p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          {/* Filter Icon */}
          <div className="relative">
            <button
              onClick={() => { setIsFilterOpen((prev) => !prev); setIsSortOpen(false) }}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011 1h16a1 1 0 011 1m-1 4a1 1 0 011 1h-6m-3 0H5m3 4h7m4 4H4m12 4h-6"
                />
              </svg>
            </button>

            {/* Topic Filter List */}
            {isFilterOpen && (
              <div
                ref={filterRef}
                className="absolute top-8 right-0 w-64 p-4 bg-white shadow-lg rounded-lg z-10"
              >
                <h3 className="font-semibold mb-4">Filter by Topics:</h3>
                <div className="space-y-2">
                  <label className="block">
                    <input
                      type="checkbox"
                      checked={selectedTopics.length === uniqueTopics.length}
                      onChange={handleSelectAll}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    Select All
                  </label>
                  <label className="block">
                    <input
                      type="checkbox"
                      checked={selectedTopics.length === 0}
                      onChange={handleSelectNone}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    Select None
                  </label>
                  {uniqueTopics.map((topic) => (
                    <label key={topic} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicFilterChange(topic)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${getTopicColor(
                          topic
                        )}`}
                      >
                        {capitalizeFirstLetter(topic)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Icon */}
          <div className="relative">
            <button
              onClick={() => { setIsSortOpen((prev) => !prev); setIsFilterOpen(false) }}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {/* Sort Options */}
            {isSortOpen && (
              <div
                ref={sortRef}
                className="absolute top-8 right-0 w-48 p-4 bg-white shadow-lg rounded-lg z-10"
              >
                <h3 className="font-semibold mb-4">Sort By:</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortBy('importance-high-to-low')}
                    className="w-full text-left py-2 px-4 rounded hover:bg-indigo-200"
                  >
                    Importance: High to Low
                  </button>
                  <button
                    onClick={() => setSortBy('importance-low-to-high')}
                    className="w-full text-left py-2 px-4 rounded hover:bg-indigo-200"
                  >
                    Importance: Low to High
                  </button>
                  <button
                    onClick={() => setSortBy('a-to-z')}
                    className="w-full text-left py-2 px-4 rounded hover:bg-indigo-200"
                  >
                    A to Z
                  </button>
                  <button
                    onClick={() => setSortBy('z-to-a')}
                    className="w-full text-left py-2 px-4 rounded hover:bg-indigo-200"
                  >
                    Z to A
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {sortedQuestions.map((item) => (
            <Link href={`/quiz/${item.slug}#${item.index}`} key={item.slug} className="block">
              <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:bg-indigo-300 transition">
                {/* Question Title and Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                  {/* Tags Section */}
                  <div className="flex justify-between items-center text-sm">
                    {/* Right Side Tags (Topics) */}
                    {item.topics && item.topics.length > 0 && (
                      <div className="flex gap-2">
                        {item.topics.map((topic) => (
                          <span
                            key={topic}
                            className={`px-2 py-1 rounded-full text-sm ${getTopicColor(topic)}`}
                          >
                            {capitalizeFirstLetter(topic)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500 transition-transform transform hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default QuizPage;
