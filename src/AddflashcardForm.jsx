import React, { useState } from 'react';

/*
This component is a form with two textboxes, representing a question and an answer,
that opens when the user clicks "AddCard", hence, the argument "onAddCard".
It is initialized to empty strings so that the data types of future responses are string.
*/

function NewFlashCardForm({onAddCard}) {
  const [flashcardData, setFlashcardData] = useState({ question: '', answer: '' });
  /* Established an error state to indicate errors when user hasn't filled out required question / answer fields. */
  const [errors, setErrors] = useState({});   

  /* This fills out the new flashcard and reflects that back to the user as the user is typing in input. */
  const handleChange = (event) => {   
    const { name, value } = event.target;
    setFlashcardData(prev => ({ ...prev, [name]: value }));
  };

  /* This is a validation function that returns error messages on each question and answer textbox fields
  if the field is not filled out. */
  const validate = () => {
    const newErrors = {}; // An empty object that stores the detected errors in it
    if (!flashcardData.question.trim()) newErrors.question = 'Question is required.'; // If question is empty, issue this msg
    if (!flashcardData.answer.trim()) newErrors.answer = 'Answer is required.'; // If question is empty, issue this msg
    return newErrors;
  };


  /* The handleSubmit function runs when the new flashcard is added / submitted by the user. */
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the page from re-loading by default when form is submitted
    const validationErrors = validate();  // Runs validation function from above
    if (Object.keys(validationErrors).length === 0) { // If there are no errors
      onAddCard({ // Add the new (stripped of spaces) flashcard to the dataset (via a new array)
      question: flashcardData.question.trim(),
      answer: flashcardData.answer.trim(),
      });
      setFlashcardData({ question: '', answer: '' }); // Re-sets the ADD FLASHCARD form to blank textboxes
      setErrors({});  // Re-sets errors to none
    } else {
      setErrors(validationErrors);  // If there continues to be errors when user submits the form, persist the error state (defined above)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>  {/* When user clicks the Submit, button, display these error messages*/}
        <label>Question<br />
          <input type="text" name="question" value={flashcardData.question} onChange={handleChange} />
          {errors.question && <p style={{color:'red'}}>{errors.question}</p>}
        </label><br /><br />

        <label>Answer<br />
          <input type="text" name="answer" value={flashcardData.answer} onChange={handleChange} />
          {errors.answer && <p style={{color:'red'}}>{errors.answer}</p>}   
        </label><br /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewFlashCardForm;
    