"use strict";

$(document).ready(function(){

//Button for selecting how many values for bar chart
  var select = "";
  for(var k = 0; k < 11; k++) {
    select += "<option val=" + k + ">" + k + "<option/>";
  }
  $("#valueQty").html(select);

  var title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("id", "title");
  var titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  var labelTitleName = document. createTextNode("Bar Chart Title: ");

  var titleSize = document.createElement("select");
  titleSize.setAttribute("id", "titleSize");
  var titleSizeLabel = document.createElement("label");
  titleSizeLabel.setAttribute("for", "titleSize");
  var nameTitleSizeLabel = document.createTextNode("Title Size: ");

  var xxSmall = document.createElement("option");
  var xSmall = document.createElement("option");
  var small = document.createElement("option");
  var medium = document.createElement("option");
  var large = document.createElement("option");
  var xLarge = document.createElement("option");
  var xxLarge = document.createElement("option");

  xxSmall.value = "1";
  xxSmall.text = "8pt";
  xSmall.value = "2";
  xSmall.text = "10pt";
  small.value = "3";
  small.text = "12pt";
  medium.value = "4";
  medium.text = "16pt";
  large.value = "5";
  large.text = "18pt";
  xLarge.value = "6";
  xLarge.text = "20pt";
  xxLarge.value = "7";
  xxLarge.text = "22pt";

  titleSize.add(xxSmall);
  titleSize.add(xSmall);
  titleSize.add(small);
  titleSize.add(medium);
  titleSize.add(large);
  titleSize.add(xLarge);
  titleSize.add(xxLarge);

  $(titleLabel).append(labelTitleName);
  $("#inputVal").append(titleLabel);
  $("#inputVal").append(title);
  $("#inputVal").append("<br><br>");
  $("#inputVal").append(nameTitleSizeLabel);
  $("#inputVal").append(titleSizeLabel);
  $("#inputVal").append(titleSize);
  $("#inputVal").append("<br><br><br>");

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
    var valueQty = $("#valueQty").val();
    for(var j = 0; j < valueQty; j++){
      //Values input boxes
      var inputValue = document.createElement("input");
      inputValue.setAttribute("type", "text");
      inputValue.setAttribute("id", "value" + j);
      var label = document.createElement("label");
      label.setAttribute("for", "value" + j);
      var name = document.createTextNode("Value: ");
      $("#inputVal").append(name);
      $("#inputVal").append(inputValue);
      $("#inputVal").append("<br>");

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

    //Select Position of values
    var selectPosition = document.createElement("select");
    selectPosition.setAttribute("id", "selectPosition");
    var positionLabel = document.createElement("label");
    positionLabel.setAttribute("for", "selectPosition");
    var namePositionLabel = document.createTextNode("Position: ");
    $("#inputVal").append(namePositionLabel);
    $("#inputVal").append(positionLabel);
    var top = document.createElement("option");
    var centre = document.createElement("option");
    var bottom = document.createElement("option");
    top.value = "1";
    top.text = "Top";
    centre.value = "2";
    centre.text = "Centre";
    bottom.value = "3";
    bottom.text = "Bottom";
    selectPosition.add(top);
    selectPosition.add(centre);
    selectPosition.add(bottom);
    $("#inputVal").append(selectPosition);
    $("#inputVal").append("<br>");
    $("#inputVal").append("<br>");

    //Bar Spacing
    var selectBarSpacing = document.createElement("select");
    selectBarSpacing.setAttribute("id", "selectBarSpacing");
    var spacingLabel = document.createElement("label");
    spacingLabel.setAttribute("for", "selectBarSpacing");
    var nameSpacingLabel = document.createTextNode("Bar Spacing: ");
    $("#inputVal").append(nameSpacingLabel);
    $("#inputVal").append(spacingLabel);
    var none = document.createElement("option");
    var single = document.createElement("option");
    var double = document.createElement("option");
    none.value = "1";
    none.text = "None";
    single.value = "2";
    single.text = "Space";

    selectBarSpacing.add(none);
    selectBarSpacing.add(single);
    $("#inputVal").append(selectBarSpacing);

/*Creates array for bar chart data*/
  $("#submit").click(function(){
    $(this).attr('disabled', 'disabled');         //Disable submit after 1st submission
    var data = [];
    for(var k = 0; k < 50; k++){
      if($("#value" + k).val() !== undefined){
        data.push({Value: $("#value" + k).val(), Label: $("#valLabel" + k).val()});
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
        table.append(row);
    }




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

});
