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

      //Labels for values
      var inputValueLabel = document.createElement("input");
      inputValueLabel.setAttribute("type", "text");
      inputValueLabel.setAttribute("id", "valLabel" + j);
      var labelLabel = document.createElement("label");
      labelLabel.setAttribute("for", "valLabel" + j);
      var nameLabel = document.createTextNode("  Label: ");
      $("#inputVal").append(nameLabel);
      $("#inputVal").append(inputValueLabel);

      $("#inputVal").append("<br>");

    }

/*Creates array for bar chart data*/
  $("#submit").click(function(){
    $(this).attr('disabled', 'disabled');         //Disable submit after 1st submission
    var data = [];
    for(var k = 0; k < 50; k++){
      if($("#value" + k).val() !== undefined){
        data.push({Value: $("#value" + k).val(), Label: $("#valLabel" + k).val()});
      }
    }

    var barChart = drawBarChart($("#barChart"), data);
  });

/*Bar chart is designed*/
  function drawBarChart(container, data) {
    var table = $("<table />");
    $.each(data, function(index, value) {
      var row = $("<tr />");
      row.append("<th>"+this.Label+"</th>");
      for(var i = 0; i < this.Value; i++){
        var col = $("<td />");
        row.append(col);
        (col).addClass("bar" + index);
        table.append(row);
      }
      row.append("<th class=value>"+this.Value+"</th>");
      table.append(row);

      /*Color customization*/
      var colorWell = document.createElement("input");
      colorWell.setAttribute("type", "color");
      colorWell.setAttribute("id", "colorWell" + index);
      var label = document.createElement("label");
      var text = document.createTextNode(text);
      label.appendChild(text);
      colorWell.appendChild(label);
      $("#colors").append(colorWell);
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

    });
    return container.append(table);
    }

//Start Over Button
    $("#startOver").click(function(){
      if(confirm("Start Over?")){
        location.reload();
      }
    })

});
