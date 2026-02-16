Project Summary
- This project is a minimalist interactive flashcard study tool using React to manage questions and answers with the ability to flip cards and shuffle the deck. The default data is a set of Portuguese words with English translations to help the end user practice their Portuguese vocabulary.


Key Features and Functionality
- Main flashcard: The default state of the flashcard is the question, which is a Portuguese word. User can 'flip' the card to see the English translation by simply clicking on the flashcard.
- Previous / next buttons: User clicks Next to move to the next flashcard. These buttons disable when the user is at the first or last cards.
- Correct vs. wrong counters: The program does not currently have a validation feature where it checks the answer the user submitted and increases the appropriate counter based on whether the user was correct or not, so, the user must manually validate their answers. (A validation feature would have involved string processing and manipulation, so, it was an enhancement that I de-prioritized in order to get the core functions working. Additionally, due to time constraints, I did not implement mins and maxs (0 to # of flashcards in the dataset).) 
- Shuffle "toggle": This is a button rather than the traditional toggle bar currently. When user clicks this, the indices of the question-answer objects are re-arranged in a different order (in a new array; the original array remains unchanged). User is shown flashcards in a different order to improve their memorization and fluency. Anytime the user clicks the Shuffle button, it essentially re-sets the user to the first card of the order they're on; if shuffle is on, they start at the top of the shuffled list of cards, and if shuffle is off, then they start at the top of the default dataset / in the original order of the cards. (Note: This was intended as a toggle component, but I could not execute that, so, the behavior of a mode persisting exists behind the scenes, not visible to the user in the traditional way.)
- "Add Flashcard" button: This is a Form that gives the user the ability to add a flashcard to their dataset so that they can customize their study material outside of the actual code. 
- Additional notes: I wanted to add a 'View set' button that opened a table, with each row representing a flashcard, 2 columns containing the question and answer respectively, and a delete button for each row if the user wanted to remove a flashcard from their study set. This is a feature that I de-prioritized due to my time and technical constraints but felt would significantly enhance the experience so that the user had a summary-level view of the data that they're working with.


Technologies Used
- React - Used this framework to create custom components and apply states to the components.
- React hooks (usestate) - This helps give the component a state to 'store' data and a function that updates the component's data. The data is shown to the user after "renderings". 
- Existing formulas / implementations for shuffling / randomizing (Fisher-Yates shuffle)


Instructions for Use
- User is shown a set of flashcards containing words in Portuguese. They test themselves by guessing the answer to themselves; to validate, they click the flashcard to see the answer.
- If they got the word correct, they increase their Correct count. If they got the word incorrect, they increae their Wrong count. 
- If the order becomes too predictable and reduces the effectiveness of the flashcards, user can turn on Shuffle mode to introduce some randomness to the cards. User can go back to regular mode by clicking the Shuffle button again.
- Additionally, user should click Add Flashcard to add a new word to the dataset.

