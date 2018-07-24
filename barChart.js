function drawBarChart(data) {
  var graph = [];
  for (var i = data.length; i > 0; i--) {
    document.write("<tr>");
    document.write("<td>"+data[i - 1]+"</td>");
    if(data[i-1] === data[0]){
      document.write("<td>"+"|"+"</td>");
      document.write("<td>"+"|"+"</td>");
      document.write("<td>"+"|"+"</td>");
    }
    if(data[i-1] === data[1]) {
      document.write("<td>"+"..."+"</td>");
      document.write("<td>"+"|"+"</td>");
      document.write("<td>"+"|"+"</td>");
    }
    if(data[i-1] === data[2]) {
      document.write("<td>"+"..."+"</td>");
      document.write("<td>"+"..."+"</td>");
      document.write("<td>"+"|"+"</td>");
    }
    document.write("</tr>");
  }
  return graph;
}
