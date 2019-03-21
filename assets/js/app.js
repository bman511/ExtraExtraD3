// @TODO: YOUR CODE HERE!
// id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare,healthcareLow,healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh,-0.385218228
// 1,Alabama,AL,19.3,0.5,38.6,0.2,42830,598,13.9,12.7,15.1,33.5,32.1,35,21.1,19.8,22.5,

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
csvText = d3.text("assets/data/data.csv")
            //.then(textCSV => d3.csvParse(textCSV,function(healthData){
              .then(textCSV => d3.csvParse(textCSV))
              .then(function(healthData){


    healthData.forEach(function(data) {
    data.smokes = +data.smokes;
    data.obesity = +data.obesity;
    //console.log(data);
  });

  
  var yScale = d3.scaleLinear()
  .domain(d3.extent(healthData, data => data.obesity))
  .range([chartHeight,0]);

  var xScale = d3.scaleLinear()
  .domain(d3.extent(healthData,data => data.smokes))
  .range([0, chartWidth]);

  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);
    

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
    

    /* <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50"/>
</svg> */

 
  // Create code to build the scatter chart using healthData
  chartGroup.selectAll(".dpoint")
    .data(healthData)
    .enter()
    .append("circle")
    .classed("dpoint", true)
    .attr("cx", d => xScale(d.smokes))
    .attr("cy", d => yScale(d.obesity))
    .attr("r", '15px')
    .style("fill","blue");
    

  chartGroup.selectAll(".dtext")
    .data(healthData)
    .enter()
    .append("text")
    .classed("dtext", true)
    .attr("x", d => xScale(d.smokes))
    .attr("y", d => yScale(d.obesity))
    .attr("dy", "0.2em")
    //.style("fill","blue");
    .text(d => d.abbr);




    });
            //.then(d => console.log(d));   
