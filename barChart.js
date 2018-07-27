function drawBarChart(data, width, height) {
  data.sort(function(a, b){return b - a});
  for (var i = 0; i < data.length; i++) {
    document.write("<tr>");                       //Number Column
    for (var k = 0; k < data[i]; k++){
      if(k === 0 && i === 0){
        document.write("<td id=inter>"+"&nbsp"+"</td>");   //1st column + 1st line intersection
      }
      if(i === 0){
        document.write("<th>"+(k + 1)+"</th>");   //Numbers inside first column
      }
    }

    document.write("<tr id=row"+i+">");                        //Next column
    document.write("<th>"+data[i]+"</th>");       //Labels
    for(var j = 0; j < data[i]; j++){
      document.write("<td>"+"&nbsp"+"</td>");     //Bars
    }
    document.write("</tr>");                      //Next column
  }
  return null;
}
