$(document).ready(function(){
/*Button for selecting how many values for bar chart*/
  var select = "";
  for(var k = 0; k < 50; k++) {
    select += "<option val=" + k + ">" + k + "<option/>";
  }
  $("#valueQty").html(select);

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
    var options = {height: "300px", width: "500px", position: selectedPosition};
    var barChart = drawBarChart(data, options, $("#barChart"));
  });

/*Bar chart is designed*/
  function drawBarChart(data, options, element) {
    var table = $("<table />");
    $(table).height(options.height);
    $(table).width(options.width);
    $.each(data, function(index, value) {
      var row = $("<tr />");
      row.append("<th> <p class=label" + index+">"+this.Label+"</p></th>");
      for(var i = 0; i < this.Value; i++){
        if(i === 0 && options.position === "3"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        } else if(i === (this.Value - 1) && options.position === "1"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        } else if((i === ((this.Value - 1)/2) || i === (this.Value / 2)) && options.position === "2"){
          var col = $("<td> <p class=number>"+this.Value+"</p></td>");
        }
        else {
          var col = $("<td />");
        }
        row.append(col);
        (col).addClass("bar" + index);
        table.append(row);
      }

      table.append(row);

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
