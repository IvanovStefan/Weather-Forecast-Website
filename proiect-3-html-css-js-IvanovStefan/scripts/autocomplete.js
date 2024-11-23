
function addressAutocomplete(containerElement, callback, options) {
    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", options.placeholder);
    containerElement.appendChild(inputElement);
  
    var clearButton = document.createElement("div");
    clearButton.classList.add("clear-button");
    addIcon(clearButton);
    clearButton.addEventListener("click", (e) => {
      e.stopPropagation();
      inputElement.value = '';
      callback(null);
      clearButton.classList.remove("visible");
      closeDropDownList();
    });
    containerElement.appendChild(clearButton);
  
    var currentItems;
    var currentPromiseReject;
    var focusedItemIndex;
  
    inputElement.addEventListener("input", function(e) {
      var currentValue = this.value;
      closeDropDownList();
      if (currentPromiseReject) {
        currentPromiseReject({
          canceled: true
        });
      }
  
      if (!currentValue) {
        clearButton.classList.remove("visible");
        return false;
      }
  
      clearButton.classList.add("visible");
      var promise = new Promise((resolve, reject) => {
        currentPromiseReject = reject;
  
        var apiKey = "ee4128a64f13486b968f0435fbaeeac7";
        var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&limit=5&apiKey=${apiKey}`;
        
        if (options.type) {
            url += `&type=${options.type}`;
        }
  
        fetch(url)
          .then(response => {
            if (response.ok) {
              response.json().then(data => resolve(data));
            } else {
              response.json().then(data => reject(data));
            }
          });
      });
  
      promise.then((data) => {
        currentItems = data.features;
  
        var autocompleteItemsElement = document.createElement("div");
        autocompleteItemsElement.setAttribute("class", "autocomplete-items");
        containerElement.appendChild(autocompleteItemsElement);
  
        data.features.forEach((feature, index) => {
          var itemElement = document.createElement("DIV");
          itemElement.innerHTML = feature.properties.formatted;
  
          itemElement.addEventListener("click", function(e) {
            inputElement.value = currentItems[index].properties.formatted;
  
            callback(currentItems[index]);
            closeDropDownList();
          });
  
          autocompleteItemsElement.appendChild(itemElement);
        });
      }, (err) => {
        if (!err.canceled) {
          console.log(err);
        }
      });
    });
  
    inputElement.addEventListener("keydown", function(e) {
      var autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
      if (autocompleteItemsElement) {
        var itemElements = autocompleteItemsElement.getElementsByTagName("div");
        if (e.keyCode == 40) {
          e.preventDefault();
          focusedItemIndex = focusedItemIndex !== itemElements.length - 1 ? focusedItemIndex + 1 : 0;
          setActive(itemElements, focusedItemIndex);
        } else if (e.keyCode == 38) {
          e.preventDefault();
  
          focusedItemIndex = focusedItemIndex !== 0 ? focusedItemIndex - 1 : focusedItemIndex = (itemElements.length - 1);
          setActive(itemElements, focusedItemIndex);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (focusedItemIndex > -1) {
            closeDropDownList();
          }
        }
      } else {
        if (e.keyCode == 40) {
          var event = document.createEvent('Event');
          event.initEvent('input', true, true);
          inputElement.dispatchEvent(event);
        }
      }
    });
  
    function setActive(items, index) {
      if (!items || !items.length) return false;
  
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("autocomplete-active");
      }
      items[index].classList.add("autocomplete-active");
      inputElement.value = currentItems[index].properties.formatted;
      callback(currentItems[index]);
    }
  
    function closeDropDownList() {
      var autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
      if (autocompleteItemsElement) {
        containerElement.removeChild(autocompleteItemsElement);
      }
  
      focusedItemIndex = -1;
    }
  
    function addIcon(buttonElement) {
      var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      svgElement.setAttribute('viewBox', "0 0 24 24");
      svgElement.setAttribute('height', "24");
  
      var iconElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      iconElement.setAttribute("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
      iconElement.setAttribute('fill', 'currentColor');
      svgElement.appendChild(iconElement);
      buttonElement.appendChild(svgElement);
    }
    
    document.addEventListener("click", function(e) {
      if (e.target !== inputElement) {
        closeDropDownList();
      } else if (!containerElement.querySelector(".autocomplete-items")) {
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        inputElement.dispatchEvent(event);
      }
    });
  
  }
  
  addressAutocomplete(document.getElementById("autocomplete-container"), (data) => {
    console.log("Selected option: ");
    console.log(data);
  }, {
      placeholder: "Enter an address here"
  });

  var cityContainer = document.getElementById("autocomplete-container");

    cityContainer.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            var cityName = cityContainer.textContent.trim();
            var firstWord = cityName.split(' ')[0];
            if (!/[a-zA-Z]/.test(firstWord.charAt(firstWord.length - 1))) {
              firstWord = firstWord.slice(0, -1);
          }
            var resultContainer = document.getElementById("result-container");
            resultContainer.innerHTML = firstWord;
        }
    });