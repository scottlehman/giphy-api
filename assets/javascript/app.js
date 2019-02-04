var topics = ["Chimpanzee", "Tiger", "Elephant", "Zebra", "Wolf", "Coyote", "Goose", "Duck", "Gazelle",
"Meerkat", "Lion"];

var createBtn = function() {
    for (i = 0; i < topics.length; i++) {
        $("#buttonLinks").append(`<button class="submit" data-value="${topics[i]}">${topics[i]}</button>`);
    };
};

$("#submitBtn").on("click", function () {

  var searchTerm = $("#searchBar").val();

  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=2JLx9GRRWOxdPPe1JNwDC9x1k2xaz21A&q=${searchTerm}&limit=10&offset=0&rating=PG&lang=en`;
  topics.push($("#searchBar").val());
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      // console.log(response);
      var results = response.data;
      var searched = $("#searchBar").val();
      topics.push(searched);
      $("#buttonLinks").append(`<button class="submit" data-value="${searchTerm}">${searchTerm}</button>`);

      for (var i = 0; i < results.length; i++){
        // console.log(results[i].url);
        
        var gifDiv = $("<div>");
        gifDiv.attr("class", "gifDiv")
        
        var rating = results[i].rating;
        var p = $("<p>").text(`Rating: ${rating}`);
        var image = $("<img>");
        image.attr("class", "gif");
        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-state", "still");
        gifDiv.append(p);
        gifDiv.prepend(image);
        $("#searchedGifs").prepend(gifDiv);
      }

      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");
      
        if (state === 'still') {
          $(this).attr("src", $(this).attr('data-animate'));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr('data-still'));
          $(this).attr("data-state", "still");
        }
      });
      
    });
});

$(document.body).on("click", "button", function (event) {
  console.log(event);

  var searchTerm = $(this).attr("data-value");
  console.log(searchTerm);

  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=2JLx9GRRWOxdPPe1JNwDC9x1k2xaz21A&q=${searchTerm}&limit=10&offset=0&rating=PG&lang=en`;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      // console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++){
        // console.log(results[i].url);
        
        var gifDiv = $("<div>");
        gifDiv.attr("class", "gifDiv")
        
        var rating = results[i].rating;
        var p = $("<p>").text(`Rating: ${rating}`);
        var image = $("<img>");
        image.attr("class", "gif");
        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-state", "still");
        gifDiv.append(p);
        gifDiv.prepend(image);
        $("#searchedGifs").prepend(gifDiv);
      }

      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");
      
        if (state === 'still') {
          $(this).attr("src", $(this).attr('data-animate'));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr('data-still'));
          $(this).attr("data-state", "still");
        }
      });
      
    });
});




createBtn();