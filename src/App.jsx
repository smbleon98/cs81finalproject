// Import all custom components created and state mgmt hooks
import FlashCard from './FlashCard';
import Counter from './CounterButton';
import NewFlashCardForm from './AddflashcardForm';
import { useState } from 'react';

// This is the "Fisher-Yates" shuffle implementation, which re-arranges the indices of the flashcard words.
// It has only one argument, which is the current flashcard data set (type: array)
function shuffleArray(flashcardsData) {
  // In React, the original dataset cannot be modified, so a new array (copy) must be created for re-rendering
  const copy = [...flashcardsData]; 
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function App() {
  // Creating states and state-update functions for correct vs. wrong counters (the counts themselves) 
  // and the form display for adding a new flashcard
  const [correct, setCorrect] = useState(0);
  const [incorrect, setWrong] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Initial flashcard dataset
  const [cards, setCards] = useState([{id: 0, question: "boa noite", answer: "Good night!"},
                                      {id: 1, question: "boa tarde", answer: "Good afternoon!"},     
                                      {id: 2, question: "nome", answer: "name"},           
                                      {id: 3, question: "frango", answer: "chicken"},    
                                      {id: 4, question: "melancia", answer: "watermelon"},    
                                      {id: 5, question: "leite", answer: "milk"},    
                                      {id: 6, question: "eu quero", answer: "I want"},    
                                      {id: 7, question: "falar", answer: "to talk"},    
                                      {id: 8, question: "eu preciso de", answer: "I need"},    
                                      {id: 9, question: "obrigada", answer: "thank you"},])

  // Establishing a state so that we can track the 'active' flashcard,
  // which is the active object's (flashcard) props (question-answer values) being shown from the array-type dataset
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isShuffled, setIsShuffled] = useState(false);  // State to track whether the 'shuffle' "toggle" is on/off
  // Stores the shuffled version of the flashcards
  // This is important so that we can retain the original order of the flashcards
  const [shuffledCards, setShuffledCards] = useState([]);  
  const displayCards = isShuffled ? shuffledCards : cards;

  const atStart = currentIndex === 0;
  const atEnd = currentIndex === displayCards.length - 1;

  // The form calls this when user submits a new flashcard
  function addCard(flashcardData) {
    console.log("ADD CARD CALLED", flashcardData); // Printing statements to console because I don't have confirmation msgs to user

    // Creating a flashcard object
    const newCard = {
      id: Date.now(), // ID is set to the current date-time (so that it's unique and no chance of any repetition)
      question: flashcardData.question,
      answer: flashcardData.answer,    
    };

    // setCards((prev) => [...prev, newCard]);   // Creating a new array with the added flashcard included
    setCards(prevCards => {                      // Using the function version of working with the latest state of the array
      const updatedCards = [...prevCards, newCard]; // New array, where new card gets added to the latest state of the array
      if (isShuffled) { // If shuffle mode is ON, reshuffle and store the updated cards
        setShuffledCards(shuffleArray(updatedCards));
      }
      return updatedCards;
    });
  }

  function toPrev() {
    setCurrentIndex((i) => i - 1);
  }

  function toNext() {
    setCurrentIndex((i) => i + 1);
  }

// This function runs when user clicks the Shuffle button.
// If off, turns it on. If on, turns it off.
function toggleShuffle() {
  setIsShuffled((prev) => {
    const next = !prev; // Using the functional form to get the latest state of isShuffled (boolean)
                        // If isShuffled is OFF, becomes ON. If isShuffled is ON, becomes OFF.
    if (next) {         // If shuffle mode is turned ON
      setShuffledCards(shuffleArray(cards)); // Shuffle the cards
      setCurrentIndex(0);  // Have it start at the first of the shuffled list
    } else {  // If shuffle mode is turned OFF 
      setCurrentIndex(0);  // Re-set to start of the original ordered list
    }

    return next;
  });
}


  return (
    <div>
      <div style={{ width: "min(520px, 100%)", margin: "0 auto", marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 4,
        }}
      >
      <button onClick={toggleShuffle}> 
        {isShuffled ? "Shuffle: ON" : "Shuffle: OFF"}
      </button>
      <button onClick={() => setShowForm(true)}>Add Flashcard</button>
      </div>
      </div>
 

        {/* Pop-up window ("modal") for adding a flashcard */}
        {showForm && (
          <div
            onClick={() => setShowForm(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 12,
              padding: 16,
              width: "min(520px, 100%)",
            }}
            >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0 }}>Add Flashcard</h2>
              <button onClick={() => setShowForm(false)}>X</button>
            </div>
            
            <NewFlashCardForm onAddCard={addCard} />

          </div>
          </div>
      )}
      

      <div>
        <div style={{ display: "flex", justifyContent: "center",  alignItems: "center", gap: 40, marginTop: 40 }}>
          <div style={{ width: "min(520px, 100%)", textAlign: "center" }}>
            <FlashCard
              key={displayCards[currentIndex].id}
              question={displayCards[currentIndex].question}
              answer={displayCards[currentIndex].answer}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 160, alignItems: "center" }}>
              <Counter label="Correct" count={correct} setCount={setCorrect}/>
              <Counter label="Wrong" count={incorrect} setCount={setWrong}/>
          </div>
        </div>


        {/* Navigation arrows 
        Disable them when they're at the first or last cards */}
        <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center"}}>
          <button onClick={toPrev} disabled={atStart}>  
            Previous
          </button>

          <div style={{ alignSelf: "center" }}>
            Card {currentIndex + 1} / {displayCards.length}
          </div>

          <button onClick={toNext} disabled={atEnd}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
