
// Quiz page

import Link from 'next/link';
import questions from './quiz.json'


const QuizPage = () => {
  return (
    <div className="flex ">
      <nav className="w-full p-4 border-b">
        <h2 className="text-lg font-bold mb-2">Questions</h2>
        <ul className="space-y-2">
          {questions.map((item) => (
            <li key={item.slug}>
              <Link href={`/quiz/${item.slug}`} className="block p-2 rounded hover:bg-gray-200">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default QuizPage;
