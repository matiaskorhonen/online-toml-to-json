$(function(){
  $("#input").val($.trim($("#toml_sample").html())).focus().select();

  $("#to_json").on("click", function(event) {
    var data = toml($("#input").val()),
        json = JSON.stringify(data, undefined, 2);
    $("#output").text(json).trigger("input").focus().select();
  });

  var year = (new Date()).getFullYear();
  if (year > 2013) {
    $(".years").text("2013 — " + year);
  } else {
    $(".years").text("2013");
  }
});
