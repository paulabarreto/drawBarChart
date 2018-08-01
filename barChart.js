$(document).ready(function(){
  var select = "";
  for(var k = 0; k < 50; k++) {
    select += "<option val=" + k + ">" + k + "<option/>";
  }
  $("#valueQty").html(select);

$(document).on("input", "#valueQty", function() {
  var valueEntered = false;
  if ($(this).val() !== "") {
        valueEntered = true;
        var valueQty = $(this).val();
        for(var j = 0; j < valueQty; j++){
          var inputValue = document.createElement("input");
          inputValue.setAttribute("type", "text");
          inputValue.setAttribute("id", "value" + j);
          $("#inputVal").append(inputValue);
        }
  }
});

$("button").click(function(){
  var data = [];
  for(var k = 0; k < 50; k++){
    if($("#value" + k).val() !== undefined){
      data.push($("#value" + k).val());
    }
  }
  var barChart = drawBarChart($("#barChart"), data);
});
function drawBarChart(container, data) {
  var table = $("<table />");
  $.each(data, function(index, value) {
    var row = $("<tr />");
    row.append("<th>"+value+"</th>");
    for(var i = 0; i < value; i++){
      var col = $("<td />");
      row.append(col);
      table.append(row);
    }
    row.append("<th>"+value+"</th>");
    table.append(row);
  });
  return container.append(table);
}

});
