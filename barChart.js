"use strict";

//Elements on the Page for assembling data
$(document).ready(function(){
//Button for selecting how many values for bar chart
  var inputVal = selectNumbers(10, $("#valueQty"));
//Amount of values per bar
  var inputVal = selectNumbers(3, $("#valQtyBar"));
  //Select Items Refreshes page but keeps input there
  $("#valueQty").change(function() {
    location.reload();
  });
  var selectedItem = sessionStorage.getItem("SelectedItem");
  $("#valueQty").val(selectedItem);
  $("#valueQty").change(function() {
    var dropVal = $(this).val();
    sessionStorage.setItem("SelectedItem", dropVal);
  });
  //Start Over Button
  $("#startOver").click(function(){
    if(confirm("Start Over?")){
      location.reload();
    }
  })
});

//Select numbers button
function selectNumbers(qty, container){
  var select = "";
  for(var k = 1; k <= qty; k++) {
    select += "<option val=" + k + ">" + k + "<option/>";
  }
  $(container).html(select);
}

//Creates input boxes for bar chart values
$("#createVal").click(function(){
  var valueQty = $("#valueQty").val();
  var valQtyBar = $("#valQtyBar").val();

  //Input Boxes for multiple values label
  for(var p = 1; p <= valQtyBar; p++){
    var multipleValueLabel = document.createElement("input");
    multipleValueLabel.setAttribute("type", "text");
    multipleValueLabel.setAttribute("id", "multipleValueLabel" + p);
    var mvLabel = document.createElement("label");
    mvLabel.setAttribute("for", 'multipleValueLabel' + p);
    var mvName = document.createTextNode("Multiple Value Label "+p+": ");

    $("#inputVal").append(mvName);
    $("#inputVal").append(multipleValueLabel);
    $("#inputVal").append("<br>");
    $("#inputVal").append("<br>");
  }

  //Input boxes for Values
  for(var j = 0; j < valueQty; j++){
    for (var l = 0; l < valQtyBar; l++){
      var inputValue = document.createElement("input");
      inputValue.setAttribute("type", "text");
      inputValue.setAttribute("id", "value" + j + l);
      var label = document.createElement("label");
      label.setAttribute("for", "value" + j + l);
      var name = document.createTextNode("Value: ");

      $("#inputVal").append(name);
      $("#inputVal").append(inputValue);
      $("#inputVal").append("<br>");
    }
    //Input boxes for labels
    var inputValueLabel = document.createElement("input");
    inputValueLabel.setAttribute("type", "text");
    inputValueLabel.setAttribute("id", "valLabel" + j);
    var labelLabel = document.createElement("label");
    labelLabel.setAttribute("for", "valLabel" + j);
    var nameLabel = document.createTextNode("  Label: ");

    $("#inputVal").append(nameLabel);
    $("#inputVal").append(inputValueLabel);
    $("#inputVal").append("<br>"+"<br>");
  }
  $("#inputVal").append("<br>");
  $("#inputVal").append("<br>");

  //Creates array for bar chart data
  $("#submit").click(function(){
    $(this).attr('disabled', 'disabled');         //Disable submit after 1st submission
    var data = [];
    for(var k = 0; k < 10; k++){
      if($("#value" + k + 0).val() !== undefined){
        data.push({Value: $("#value" + k + 0).val(), Value2: $("#value" + k + 1).val(), Value3: $("#value" + k + 2).val(), Label: $("#valLabel" + k).val()});
      }
    }
    //Extracts data from input
    var selectedPosition = $("#selectPosition").val();
    var barSpacing = $("#selectBarSpacing").val();
    var title = $("#title").val();
    var titleSize = $("#titleSize").val();
    var label1 = $("#multipleValueLabel1").val();
    var label2 = $("#multipleValueLabel2").val();
    var label3 = $("#multipleValueLabel3").val();

    //Creates options parameter from extratcted data
    var options = {title: title, titleSize: titleSize, height: "400px", width: "200px", position: selectedPosition, barSpacing: barSpacing, label1: label1, label2: label2, label3: label3};
    var barChart = drawBarChart(data, options, $("#barChart"));
  });

  //Bar chart is designed
  function drawBarChart(data, options, element) {
    var table = $("<table id=table />");
    $(table).height(options.height);
    $(table).width(options.width);
    var title = options.title;
    var newTitle = title.fontsize(options.titleSize);
    var addTitle = $("<h2>&emsp;&emsp;&emsp;"+newTitle+"</h2>");
    addTitle.addClass("chartTitle");
    element.append(addTitle);

    //Finding maximum value to build Y-Axis
    var array = [];
    $.each(data, function(index, value) {
      $.each(data, function(index, value){

        if(this.Value2 === undefined){
          this.Value2 = 0;
        }
        if(this.Value3 === undefined){
          this.Value3 = 0;
        }
        //Finds sum of values to build y-axis
        var values = [parseInt(this.Value), parseInt(this.Value2), parseInt(this.Value3)];
        var reducer = (a, b) => a + b;
        var sum = values.reduce(reducer);
        array.push(sum);
      });
      var maxValue =  Math.max.apply(Math, array.map(function(o){
        return o;
      }))

      //Y-Axis
      var yAxis = yAxis(maxValue, table);
      //X-Axis
      var row = $("<tr />");
      row.append("<th> <p class=label>"+this.Label+"</p></th>");
      //Bars
      var firstBar = createBars(this.Value, 1);
      if(this.Value2 !== 0){
        var secondBar = createBars(this.Value2, 2);
      }
      if(this.Value3 !== 0){
        var thirdBar = createBars(this.Value3, 3);
      }
      //Add Spacing between bars
      if(options.barSpacing === "2"){
        var space = $("<td class=space />");
        table.append(space);
      }
      //Label Colour customization
      var labelColours = createLabelColourWell(this.Label);
      //Title Colour
      var title = document.querySelector(".chartTitle");
      var titleColours = createTitleColorWell(title);

      function yAxis(maxValue, table){
        //Gap of values
        var gap = 1;
        if (maxValue > 10 && maxValue <= 20){
          gap = 2;
        } else if(maxValue > 20 && maxValue <= 100){
          gap = 3;
        } else if(maxValue > 100 && maxValue <= 500){
          gap = 4;
        }
        //Y axis row
        var row = $("<tr />");
        if(index === 0){
          var yAxis = $("<tr />");
          for(var j = 0; j <= maxValue; j++){
            switch(gap){
              case 1:
              var yAxisTd = $("<td class=yAxis> <p class=yAxis>"+j+"</p></td>");
              yAxis.append(yAxisTd);
              break;
              case 2:
              if (j % 5 === 0){
                var yAxisTd = $("<td class=yAxis> <p class=yAxis>"+j+"</p></td>");
                yAxis.append(yAxisTd);
              }
              else {
                var yAxisTd = $("<td class=yAxisN/>");
                yAxis.append(yAxisTd);
              }
              break;
              case 3:
              if (j % 10 === 0){
                var yAxisTd = $("<td class=yAxis> <p class=yAxis>"+j+"</p></td>");
                yAxis.append(yAxisTd);
              }
              else {
                var yAxisTd = $("<td class=yAxisN/>");
                yAxis.append(yAxisTd);
              }
              break;
              case 4:
              if (j % 100 === 0){
                var yAxisTd = $("<td class=yAxis> <p class=yAxis>"+j+"</p></td>");
                yAxis.append(yAxisTd);
              }
              else{
                var yAxisTd = $("<td class=yAxisN/>");
                yAxis.append(yAxisTd);
              }
            }
          }
          table.append(yAxis);
        }
      }

      function createBars(value, number){
        for(var i = 0; i < value; i++) {
          if(i === 0 && options.position === "3"){
            var col = $("<td> <p class=number>"+value+"</p></td>");
          } else if(i === (value - 1) && options.position === "1"){
            var col = $("<td> <p class=number id=cell"+i+">"+value+"</p></td>");
          } else if((i === ((value - 1)/2) || i === (value / 2)) && options.position === "2"){
            var col = $("<td> <p class=number>"+value+"</p></td>");
          } else {
            var col = $("<td />");
          }

          if(i === 0){
            (col).addClass("xAxis");
          }
          (col).addClass("bar" + number);
          row.append(col);
        }
        table.append(row);
        //Bar colour customization
        var colorbar = createBarColorWell(number);
      }

      function createBarColorWell(number){
        var colorWell = document.createElement("input");
        colorWell.setAttribute("type", "color");
        colorWell.setAttribute("id", "colorWell" + number);
        document.addEventListener("click", startup, false);
        function startup(){
          colorWell = document.querySelector("#colorWell" + number);
          colorWell.addEventListener("input", updateAll, false);
          colorWell.select();
        }
        function updateAll(event) {
          document.querySelectorAll(".bar" + number).forEach(function(p) {
            p.style.backgroundColor = event.target.value;
          });
        }
        if(number == 1){
          var newLabel = options.label1;
        } else if (number == 2){
          var newLabel = options.label2;
        }else if(number == 3){
          var newLabel = options.label3
        }
      //Dom insertion - Bar Colors
        if(index === 0){
          $("#colors").append("<br>");
          $("#colors").append(newLabel);
          $("#colors").append("<br>");
          $("#colors").append(colorWell);
          $("#colors").append("<br>");
        }
      }

      function createTitleColorWell(title){
        if(index === 0){
          var colorWellTitle = document.createElement("input");
          colorWellTitle.setAttribute("type", "color");
          colorWellTitle.setAttribute("id", "colorWellTitle");

          document.addEventListener("click", startupTitle, false);
          function startupTitle(){
            colorWellTitle = document.querySelector("#colorWellTitle");
            colorWellTitle.addEventListener("input", updateTitle, false);
            colorWellTitle.select();
          }

          function updateTitle(event) {
            title.style.color = event.target.value;
          }
          //DOM insertion - Title Colors
          $("#titleDiv").append("Title Colour: ");
          $("#titleDiv").append("<br>");
          $("#titleDiv").append("<br>");
          $("#titleDiv").append(colorWellTitle);
        }
      }

      function createLabelColourWell(){
        if(index === 0){
          var colorWellLabels = document.createElement("input");
          colorWellLabels.setAttribute("type", "color");
          colorWellLabels.setAttribute("id", "colorWellLabels");
          document.addEventListener("click", startupLabels, false);

          function startupLabels(){
            colorWellLabels = document.querySelector("#colorWellLabels");
            colorWellLabels.addEventListener("input", updateAll, false);
            colorWellLabels.select();
          }
          function updateAll(event) {
            document.querySelectorAll(".label").forEach(function(p) {
              p.style.color = event.target.value;
            });
          }
          //Title for Label Color Picker
          var nameLabelLabel = document.createTextNode("Label Colour: ");

          //DOM insertion - Label Colors
          $("#colorLabels").append(nameLabelLabel);
          $("#colorLabels").append("<br>");
          $("#colorLabels").append("<br>");
          $("#colorLabels").append(colorWellLabels);
        }
      }

    });

    element.append(table);
    return element;
  }
});
