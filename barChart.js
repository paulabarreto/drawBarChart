function drawBarChart(data) {
  var graph = [];
  for (var i = data.length; i >= 0; i--) {
    graph.push(data[i]);
    graph.push("<br>");
  }
  graph.push("+");
  for(j = 0; j < data.length; j++) {
    graph.push(j + 1);
  }
  graph = graph.join("");
  return graph;
}
