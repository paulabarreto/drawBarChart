function drawBarChart(data, width, height) {
  data.sort(function(a, b){return b - a});
  for (var i = 0; i < data.length; i++) {
    document.write("<tr>");
    document.write("<th>"+data[i]+"</th>");
    for(var j = 0; j < data[i]; j++){
      document.write("<td>"+"|"+"</td>");
    }
    document.write("</tr>");
  }
  return null;
}
