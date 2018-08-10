"use strict";

$(document).ready(function(){

//Button for selecting how many values for bar chart
  var select = "";
  for(var k = 0; k < 50; k++) {
    select += "<option val=" + k + ">" + k + "<option/>";
  }
  $("#valueQty").html(select);

  var title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("id", "title");
  var titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  var labelTitleName = document. createTextNode("Bar Chart Title: ");
  $(titleLabel).append(labelTitleName);
  $("#inputVal").append(titleLabel);
  $("#inputVal").append(title);
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
    var options = {title: title, height: "200px", width: "200px", position: selectedPosition, barSpacing: barSpacing};
    var barChart = drawBarChart(data, options, $("#barChart"));
  });

//Bar chart is designed
  function drawBarChart(data, options, element) {

    var table = $("<table id=table />");
    $(table).height(options.height);
    $(table).width(options.width);


    $.each(data, function(index, value) {

      var maxValue =  Math.max.apply(Math, data.map(function(o){
        return o.Value;
      }))

      //Y-Axis
      if(index === 0){
        var yAxis = $("<tr class=yAxis/>");

        for(j = 0; j <= maxValue; j++){
          if(maxValue > 0 && maxValue <= 10){
            yAxis.append("<td class=yAxis> <p>"+j+"____</p></td>");
          } else if (maxValue > 10 && maxValue <= 20){
            if(j === 0 || j % 5 === 0){
              yAxis.append("<td class=yAxis> <p>"+j+"___</p></td>");
            } else{
            yAxis.append("<td class=yAxis> <p>&nbsp</p></td>");
            }
          } else if(maxValue > 20 && maxValue <= 50){
            if(j === 0 || j % 10 === 0){
              yAxis.append("<td class=yAxis> <p>"+j+"___</p></td>");
            } else{
              yAxis.append("<td class=yAxis> <p>&nbsp</p></td>");
            }
          } else if(maxValue > 50 && maxValue <= 100){
            if(j === 0 || j % 20 === 0){
              yAxis.append("<td class=yAxis> <p>"+j+"___</p></td>");
            } else{
              yAxis.append("<td class=yAxis> <p>&nbsp</p></td>");
            }
          }

          table.append(yAxis);
        }
      }

      //X-Axis
      var row = $("<tr />");
      row.append("<th> <p class=label" + index+">"+this.Label+"</p></th>");
      //Bars
      for(var i = 0; i < (this.Value - 1); i++) {
        if(i === 0 && options.position === "3"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        } else if(i === (this.Value - 2) && options.position === "1"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        } else if((i === ((this.Value - 1)/2) || i === (this.Value / 2)) && options.position === "2"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        } else {
          var col = $("<td />");
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

      //Labels for Bar Color Picker
      var colorLabel = document.createElement("label");
      labelLabel.setAttribute("for", label);
      var nameLabel = document.createTextNode(this.Label);

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

    });

    return element.append(table);

    }

//Start Over Button
    $("#startOver").click(function(){
      if(confirm("Start Over?")){
        location.reload();
      }
    })

});
