function drawBarChart(data, width, height) {
  data.sort(function(a, b){return b - a});
  for (var i = 0; i < data.length; i++) {
    document.write("<tr>");
    for (var k = 0; k < data[i]; k++){
      if(k === 0 && i === 0){
        document.write("<td>"+"&nbsp"+"</td>");
      }
      if(i === 0){
        document.write("<th>"+(k + 1)+"</th>");
      }
    }

    document.write("<tr>");
    document.write("<th>"+data[i]+"</th>");
    for(var j = 0; j < data[i]; j++){
      document.write("<td>"+"&nbsp"+"</td>");
    }
    document.write("</tr>");
  }
  return null;
}
