function buildMetadata(sample) {
    d3.csv("../../Resources/Hall_of_Fame_List.csv").then((data) => {
      var metadata = data.metadata;

      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];

      // Use d3 to select the panel with id of `#sample-metadata`
      var namePanel = d3.select("#sample-metadata-name");
      var statPanel = d3.select("#sample-metadata-stat");
  
      // Use `.html("") to clear any existing metadata
      namePanel.html("");
      statPanel.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
}

function init() {
    // Grab a reference to the dropdown select element
    var dropdown = d3.select(".dropdown-menu");
  
    // Use the list of sample names to populate the select options
    d3.csv("../Resources/Hall_of_Fame_List.csv").then((data) => {
      var playerNames = data.map(item => item.Name)
      console.log(playerNames)
  
      playerNames.forEach((sample) => {
        dropdown.append("li")
                .text(sample)
                .classed("dropdown-item");
      });
    });
  };
  
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
  };
  
  // Initialize the dashboard
  init();
  