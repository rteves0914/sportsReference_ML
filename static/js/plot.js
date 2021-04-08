// Write a function that populates the dropdown menu and initializes first player data
function init() {

  // Use class "dropdown-menu" from index.html and d3 to grab the tag
  var dropdown = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.csv("Resources/player_data_update.csv").then((data) => {

    // Create array of objects for each list item
    var array = Object.values(data);

    // Obtain the player names from the CSV
    var playerNames = data.map(item => item.name);

    // Use forEach to populate the dropdown menu and append li tags to index.html
    playerNames.forEach((sample) => {
      dropdown.append("option")
              .text(sample)
              .property("value", sample);       
    });

    // Create first instance for web page to display
    var firstSample = array[0].name;

    buildMetadata(firstSample);
  });
};

function buildMetadata(player) {

    d3.csv("Resources/player_data_update.csv").then((data) => {

      // Filter the data for the object with the desired sample number
      var resultArray = data.filter(item => item.name == player);
      var result = resultArray[0];


      // Create variable names to hold all the data to be displayed
      var name = result.name;
      var playerID = result.player_id;
      var atBats = result.at_bats;
      var hits = result.hits;
      var runs = result.runs;
      var walks = result.bases_on_balls;
      var battingAverage = result.batting_average;
      var doubles = result.doubles;
      var hallOfFame = result.hall_of_fame;
      var homeRuns = result.home_runs;
      var RBI = result.runs_batted_in;
      var SB = result.stolen_bases;
      var triples = result.triples;

      // Use d3 to select the panel with id of `#sample-metadata`
      var namePanel = d3.select("#sample-metadata-name");
      var statPanel = d3.select("#sample-metadata-stat");
      var famePanel = d3.select("#sample-metadata-fame");

      // Clear out the previous data 
      namePanel.html("");
      statPanel.html("");
      famePanel.html("");

      // And append the new data that is clicked on
      namePanel.text(`Name: ${name}, Player ID: ${playerID}`);
      statPanel.append("li")
              .text(`At Bat: ${atBats}`)
              .append("li")
              .text(`Hits: ${hits}`)
              .append("li")
              .text(`Runs: ${runs}`)
              .append("li")
              .text(`Batting Average: ${battingAverage}`)
              .append("li")
              .text(`Walks: ${walks}`)
              .append("li")
              .text(`Runs Batted In: ${RBI}`)
              .append("li")
              .text(`Doubles: ${doubles}`)
              .append("li")
              .text(`Triples: ${triples}`)
              .append("li")
              .text(`Home Runs: ${homeRuns}`)
              .append("li")
              .text(`Stolen Bases: ${SB}`);
      famePanel.text(hallOfFame);
    });
} 

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
}

// Initialize the dashboard
init();