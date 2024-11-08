import Link from 'next/link';
import questions from './quiz.json';

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const QuizPage = () => {
  return (
    <div className="flex justify-center">
      <nav className="w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center"> Questions</h2>
        <div className="space-y-4">
          {questions.map((item) => (
            <Link href={`/quiz/${item.slug}`} key={item.slug} className="block">
              <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:bg-indigo-300 transition">
                {/* Question Title and Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                  {/* Tags Section */}
                  <div className="flex justify-between items-center text-sm">
                    {/* Left Side Tags (Level and Duration) */}
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {capitalizeFirstLetter(item.level)}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        {item.duration} min
                      </span>
                    </div>

                    {/* Right Side Tags (Topics) */}
                    {item.topics && item.topics.length > 0 && (
                      <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {item.topics
                          .map((topic) => capitalizeFirstLetter(topic))
                          .join(', ')}
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
