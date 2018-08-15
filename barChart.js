"use strict";

$(document).ready(function(){

//Button for selecting how many values for bar chart
  var inputVal = selectNumbers(10, $("#valueQty"));

//Amount of values per bar
  var inputVal = selectNumbers(3, $("#valQtyBar"));

  /*Select Items Refreshes page but keeps input there*/
  $("#valueQty").change(function() {
    location.reload();
  });
  var selectedItem = sessionStorage.getItem("SelectedItem");
  $("#valueQty").val(selectedItem);
  $("#valueQty").change(function() {
    var dropVal = $(this).val();
    sessionStorage.setItem("SelectedItem", dropVal);
  });

  //Creates input boxes for bar chart values


    $("#createVal").click(function(){
      var valueQty = $("#valueQty").val();
      var valQtyBar = $("#valQtyBar").val();

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
        //Labels for values
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

      var selectedPosition = $("#selectPosition").val();
      var barSpacing = $("#selectBarSpacing").val();
      var title = $("#title").val();
      var titleSize = $("#titleSize").val();
      var options = {title: title, titleSize: titleSize, height: "200px", width: "200px", position: selectedPosition, barSpacing: barSpacing};
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

      $.each(data, function(index, value) {

        var maxValue =  Math.max.apply(Math, data.map(function(o){
          return o.Value;
        }))


      //Y-AXIS

      var gap = 1;
      if (maxValue <= 10){
        gap = 2;
      } else if(maxValue > 10 && maxValue <= 100){
        gap = 3;
      } else if(maxValue > 100 && maxValue <= 500){
        gap = 4;
      }

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
            if (j % 2 === 0){
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

      //X-Axis

      var row = $("<tr />");

      row.append("<th> <p class=label"+index+">"+this.Label+"</p></th>");

      //Bars
      for(var i = 0; i < this.Value; i++) {

          if(i === 0 && options.position === "3"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        } else if(i === (this.Value - 1) && options.position === "1"){
          var col = $("<td> <p class=number id=cell"+i+">"+this.Value+"</p></td>");
        } else if((i === ((this.Value - 1)/2) || i === (this.Value / 2)) && options.position === "2"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        } else {
          var col = $("<td />");
        }

        if(i === 0){
          (col).addClass("xAxis");
        }

        (col).addClass("bar" + index);
        row.append(col);
      }

      table.append(row);


      //Add Spacing between bars
      if(options.barSpacing === "2"){
        var space = $("<td class=space />");
        table.append(space);
      }


      /*Color customization*/

      //BARS
      var colorWell = document.createElement("input");
      colorWell.setAttribute("type", "color");
      colorWell.setAttribute("id", "colorWell" + index);
      document.addEventListener("click", startup, false);

      function startup(){
        colorWell = document.querySelector("#colorWell" + index);
        colorWell.addEventListener("input", updateAll, false);
        colorWell.select();
      }

      function updateAll(event) {
        document.querySelectorAll(".bar" + index).forEach(function(p) {
          p.style.backgroundColor = event.target.value;
        });
      }

      //Labels
      var colorWellLabels = document.createElement("input");
      colorWellLabels.setAttribute("type", "color");
      colorWellLabels.setAttribute("id", "colorWellLabels" + index);
      document.addEventListener("click", startupLabels, false);

      function startupLabels(){
        colorWellLabels = document.querySelector("#colorWellLabels" + index);
        colorWellLabels.addEventListener("input", updateFirst, false);
        colorWellLabels.select();
      }
      function updateFirst(event) {
        var l = document.querySelector(".label" + index);
        if(l){
          l.style.color = event.target.value;
        }
      }

      //Title Colour
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
          var title = document.querySelector(".chartTitle");
          if(title){
            title.style.color = event.target.value;
          }
        }

      }


      //Labels for Bar Color Picker
      var colorLabel = document.createElement("label");
      labelLabel.setAttribute("for", label);
      var nameLabel = document.createTextNode(this.Label);


      //Labels for Label Color Picker
      var labelColorLabel = document.createElement("label");
      labelColorLabel.setAttribute("for", label);
      var nameLabelLabel = document.createTextNode(this.Label);


      //Dom insertion - Bar Colors
      $("#colors").append("<br>");
      $("#colors").append(nameLabel);
      $("#colors").append("<br>");
      $("#colors").append(colorWell);
      $("#colors").append("<br>");

      //DOM insertion - Label Colors
      $("#colorLabels").append("<br>");
      $("#colorLabels").append(nameLabelLabel);
      $("#colorLabels").append("<br>");
      $("#colorLabels").append(colorWellLabels);
      $("#colorLabels").append("<br>");

      //DOM insertion - Title Colors
      $("#titleDiv").append("<br>");
      $("#titleDiv").append(colorWellTitle);





    });

    element.append(table);

    return element;

    }

    //Start Over Button
    $("#startOver").click(function(){
      if(confirm("Start Over?")){
        location.reload();
      }
    })

  })

});


  function selectNumbers(qty, container){
    var select = "";
    for(var k = 1; k <= qty; k++) {
      select += "<option val=" + k + ">" + k + "<option/>";
    }
    $(container).html(select);
  }
