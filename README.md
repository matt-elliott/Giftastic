# Giftastic
## A curated GIF page

#### TODOS
- [x] Write algorithm
- [x] Write JavaScript
- [x] Style page
- [x] Make responsive
- [ ] Submit Beta release
- [ ] Add favorites functionality to algorithm
- [ ] Create favorites functionality
- [ ] Add pagination functionality to algorithm
- [ ] Create pagination functionality
- [ ] Submit Alpha release


#### Algorithm
1. Create variable equal to an array of topics in string format
  ```javascript
  var topics = […];
  var query = ''; //create query variable as string to be assigned later either by button click or user input 
  var queryString = url${query}[paramaters]
  
  //use on.('click', document, classname) to add listener to button clicks to buttons before theyre generated
  //use on.('click', document, classname) to add listener to gif clicks to animate gif
  //add listener to input submit
  //button click handler = getGifs()
  //gif click handler = playGif()
  //input submit handler = addTopic()
  ```
2. loop over topics and make them into buttons on DOM
  ```javascript
  topics.forEach(function(topic)) {
    //create button with topic name
  }
  ```
3. when user clicks button app should grab ten gifs and display them still
```javascript
function getGifs() {
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response)) {
    //for each response item received generate figure, image, and figcaption with meta data
    response.data.forEach(function(item)) {
      //make utility function to create figure elements with jQuery and call here
      //create figure element and populate with gif and meta data
      //use data-state to hold if gif is animating or still
      //use data-still and data-animated to hold paths to still and animated forms of gif
      ////use mp4 for animation and puse video instead? [submit as side assignment]
  });
}
```
4. on click gif animates
```javascript
  function playGif() {
    if gif is not playing
      play gif
    else
      stop gif
  }
  ```
6. add an input that adds user input to buttons
```javascript
  function addTopic() {
    //prevent default event
    //get value from input
    //use jQuery to create new button on DOM
  }
```
