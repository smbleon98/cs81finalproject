import React from 'react';

/*
The FlashCard component is used once as the active flashcard shown on the screen.
It uses the useState hook to manage state: whether the question or the answer is shown.
User must click to flip the flashcard; no 'flip' animation was used.
*/

function FlashCard(props) { 
  const { question, answer } = props; 
    const [isFlipped, setFlipped] = React.useState(false);

  const showOtherSide = () => {  // This function changes the state variable. It will show the other side if the user clicks the flashcard (below). 
    setFlipped(!isFlipped);   
  };

  return (
    <button className="FlashCard" onClick={showOtherSide} style={{
      /* Borrowed styling from React component assignments. */
      width: '500px',  
      minHeight: '275px',  
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      fontFamily: 'Courier New',
      textAlign: 'center',
      margin: '20px auto',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
    {/* isFlipped runs conditionally; if true, it will show the answer; if falso, it will continue to show the question. */}
    {isFlipped ? `ANSWER: ${answer}` : `QUESTION: ${question}`} 
    </button>

  );
}

export default FlashCard;
