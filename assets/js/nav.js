const postButton = $("#post-button");
const textBoxOverlay = $("#text-box-overlay");
const submitButton = $("#submit-button");
const cancelButton = $("#cancel-button");
const pageContent = $(".page-content");

postButton.on("click", function() {
  textBoxOverlay.css("display", "block");
  pageContent.addClass("blur");
});

submitButton.on("click", function() {
  textBoxOverlay.css("display", "none");
  pageContent.removeClass("blur");
  // you can do your post functionality here
});

cancelButton.on("click", function() {
  textBoxOverlay.css("display", "none");
  pageContent.removeClass("blur");
});
