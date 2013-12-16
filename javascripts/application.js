var setOutputContent = function(text) {
  $("#output").text(text).trigger("input").focus().select();
};

$(function(){
  $("#input").val($.trim($("#toml_sample").html())).focus().select();

  $("#to_json").on("click", function(event) {
    var data = toml($("#input").val()),
        json = JSON.stringify(data, undefined, 2);
    setOutputContent(json);
  });

  var year = (new Date()).getFullYear();
  if (year > 2013) {
    $(".years").text("2013 — " + year);
  } else {
    $(".years").text("2013");
  };

  $("#to_toml").on("click", function(event) {
    $.ajax({
      url: "https://json-to-toml.herokuapp.com/convert",
      dataType: "text",
      contentType: "application/json",
      type: "POST",
      processData: false,
      data: $("#input").val(),
      success: function(data, status, xhr) {
        setOutputContent(data);
      },
      error: function(xhr, status, error) {
        var message = "Something went horribly wrong";
        setOutputContent(message);
      }
    })
  });
});
