
document.getElementById('heartIcon').addEventListener('click', function() {
    
  const resultText = document.getElementById('result-container').innerText;
  const storedWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];

  if (!storedWords.includes(resultText)) {
    storedWords.push(resultText);
    localStorage.setItem('favoriteWords', JSON.stringify(storedWords));
    
    updateStoredWordsList();
  }
  console.log('Stored Words:', storedWords);
});


const storedWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
console.log('Stored Words on Page Load:', storedWords);
//localStorage.clear();
updateStoredWordsList();
function updateStoredWordsList() {
    const storedWordsList = document.getElementById('storedWordsList');
    storedWordsList.innerHTML = '';
    const storedWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];
    storedWords.forEach(word => {
        const listItem = document.createElement('li');
        const wordContainer = document.createElement('div');
        wordContainer.classList.add('word-container');
        wordContainer.textContent = word;
        wordContainer.addEventListener('click', function() {
            document.getElementById('result-container').innerText = word;
          });
        listItem.appendChild(wordContainer);
        storedWordsList.appendChild(listItem);
    });
  }
