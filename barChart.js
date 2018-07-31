$("button").click(function(){
  var data = [document.getElementById('value1').value, document.getElementById('value2').value, document.getElementById('value3').value];
  var barChart = drawBarChart($(document.body), data);
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
