function createMagnetURI(hash, trackers, title) {
  return "magnet:?xt=urn:btih:" + hash
       + "&dn=" + encodeURIComponent(title)
       + "&tr=" + trackers.map(encodeURIComponent).join("&tr=");
}

// Add magnet link to each result
$(".results dl a").each(function() {
  $("<a class='magnet-uri'>")
    .html("&#9660;")
    .css({"margin-right": ".5em"})
    .attr("href", this.href)
    .attr("title", "Download")
    .data({
      hash: this.pathname.substr(1),
      title: this.innerText
    })
    .insertBefore(this);
});

// Handle magnet links
$(".results").on("click", ".magnet-uri", function(e) {
  var data = $(this).data();
  // Get trackers from details page
  $.ajax({ url: this.href }).success(function(result) {
    var trackers = [];

    $(".trackers dt a", result).each(function() {
      trackers.push(this.innerText);
    });

    // Redirect to magnet URI
    location.href = createMagnetURI(data.hash, trackers, data.title);

  });

  e.preventDefault();

});