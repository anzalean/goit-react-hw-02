import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import Description from './components/Description/Description'
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';

function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedback');
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });


  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);
const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
const positive = Math.round(feedback.good / totalFeedback * 100);
const updateFeedback = feedbackType => {
 setFeedback({
   ...feedback,
   [feedbackType]: feedback[feedbackType] + 1
 });
}
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }
  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={totalFeedback}/>
      {totalFeedback > 0 ?
        <Feedback feedback={feedback} totalFeedback={totalFeedback} positive={positive}/> : <Notification message="No feedback yet" />}
    </>
  )
}

export default App
