import { ReactNode } from 'react';
import '../styles/questions.scss';
import { useTheme } from '../hooks/useTheme';


type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode; 
  isHighLighted?: boolean;
  isAnswer?: boolean;
}

export function Question({
  content,
  author,
  children,
  isAnswer = false,
  isHighLighted = false
}: QuestionProps) {
  const { theme, toggleTheme} = useTheme();

  return (
    <div className={`question ${isAnswer? 'answered' : ''} ${isHighLighted && !isAnswer ? 'highLighted' : ''} ${theme}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author?.avatar} alt={author?.name} />
          <span>{author?.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}