const cityApiKey = '1sQxNw8tAKEHgmGXvhHaeBSP3lSWzM38odbqewuFTFBMEvAZPHAIyOs3';

function cityPhoto(query) {
  const cityURL = "https://api.pexels.com/v1/search?query=";
  return fetch(cityURL + query, {
    headers: { Authorization: cityApiKey }
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to retrieve city photo data');
      }
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      const poza = document.querySelector(".imagine");
      if (data.photos && data.photos.length > 0) {
        poza.src = data.photos[0].src.large;
      } else {
        poza.src = ''; 
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function observeResultContainerChanges() {
  const resultContainer = document.getElementById("result-container");

  const mutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        const query = resultContainer.textContent.trim();
        cityPhoto(query);
      }
    }
  };

  const observer = new MutationObserver(mutationCallback);
  const observerConfig = { childList: true, subtree: true };
  observer.observe(resultContainer, observerConfig);
}

observeResultContainerChanges();

const initialQuery = document.getElementById("result-container").textContent.trim();
cityPhoto(initialQuery);

