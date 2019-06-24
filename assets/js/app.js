(function init() {
  var buttonArea = $("#site-nav");
  var topics = ["cats", "dogs", "satan"];
  var limit = 10;
  var page = 0;
  var query;
  var queryURL;

  $("#site-nav").on("click", ".gif-btn", {emptyGifArea: true}, getGifs);
  $("#gif-list").on("click", ".play-btn", playGif);
  $("#topic-input-form").on("click", ".submit-btn", addTopic);
  $("#gif-list").on("click", ".expander-button", expandGif);
  $(".next").on("click", nextPage);
  $(".prev").on("click", previousPage);
  $("#topic-input-form .topic-input").on("keypress", function(event) {
    if (event.key === "Enter") {
      addTopic();
    }
  });

  function makeButtons() {
    buttonArea.empty();

    topics.forEach(function(topic) {
      var button = $(`<button>`);
      button.attr({
        class: `btn btn-primary col gif-btn`,
        value: `${topic}`
      });

      button.text(topic);
      buttonArea.append(button);
    });
  }
  
  function getGifs(event, storedQuery, emptyGifArea) {
    query = $(this).attr(`value`);
    if (query === undefined) query = storedQuery;
    if (event !== null) emptyGifArea = event.data.emptyGifArea;

    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=X66g4vlvwGN7GEKPAEh0hLBGrD5hn85N&q=${query}&limit=${limit}&offset=${page}&rating=R&lang=en`;
    
    $("body").removeClass("top-padding");

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      if (response.data.length === 0) {
        $('.no-results').remove();
        $('#gif-list').empty();
        var html =
          `<div class="no-results">
            <h2>Sorry, our droids found nothing for "${query}".</h2>
            <h6>Maybe try a better search query?</h6>
          </div>`;
        $(`#gif-list`).append(html);
      } else {
        var gifArea = $(`#gif-list`);
        var gifElement;
        var gifImageElement;
        var gifCaptionElement;

        if (emptyGifArea === true) gifArea.empty();
        $('.no-results').remove();

        response.data.forEach(function(item) {
          gifElement = $("<figure>");
          gifImageElement = $(`<img>`);
          gifCaptionElement = $(`<figcaption>`);
          gifRatingElement = $("<p>");
          gifTitleElement = $("<p>");
          gifSourceElement = $("<p>");
          expandButton = $("<button>");

          gifElement.attr({
            "data-expanded": "",
            "class": "col-xs-12 col-sm-6 col-md-5 col-lg-3"
          });

          expandButton
            .attr({
              class: "expander-button",
              type: "button"
            })
            .html("&#x21D7;");

          gifRatingElement.attr("class", "rating");
          gifTitleElement.attr("class", "title");
          gifSourceElement.attr("class", "source");

          gifImageElement.attr({
            src: item.images.fixed_height_still.url,
            "data-still": item.images.fixed_height_still.url,
            "data-animated": item.images.fixed_height.url,
            "data-state": "still",
            class: "play-btn"
          });

          gifTitleElement.text(item.title);
          gifRatingElement.text(item.rating);

          gifSourceElement.html(`<a
            href="${item.source}"
            target="_blank">
              ${item.source_tld}
          </a>`);

          gifCaptionElement.append([
            gifTitleElement,
            gifRatingElement,
            gifSourceElement
          ]);

          gifElement.append([
            gifImageElement,
            gifCaptionElement,
            expandButton
          ]);

          gifArea.append(gifElement);
        });
      }
    });
  }

  function expandGif() {
    var figure = $(this).parent("figure");
    var image = figure.find(".play-btn");

    if (figure.attr("data-expanded") === "") {
      figure.attr("data-expanded", "expanded");
      figure.css("width", "100%");
      image.delay(500).css({
        width: "100%",
        height: "auto"
      });
    } else {
      figure.attr("data-expanded", "");
      figure.css("width", "");
      image.css({
        width: "",
        height: ""
      });
    }
  }

  function playGif() {
    var thisGif = this;
    var state = $(thisGif).attr("data-state");
    var stillSrc = $(thisGif).attr("data-still");
    var animatedSrc = $(thisGif).attr("data-animated");

    if (state === "still") {
      $(thisGif).attr({
        src: animatedSrc,
        "data-state": "animated"
      });
    } else {
      $(thisGif).attr({
        src: stillSrc,
        "data-state": "still"
      });
    }
  }

  function nextPage() {
    page = page + 10;
    getGifs(null, query, false);
  }

  function previousPage() {
    page = page - 10;
    getGifs(null, query, false);
  }

  function addTopic() {
    event.preventDefault();
    var searchQuery = $("input.topic-input").val();
    $("input.topic-input").val("");

    if (searchQuery != "") {
      topics.push(searchQuery);
      makeButtons();
      getGifs(null, searchQuery, true);
    }
  }

  makeButtons();
})();
