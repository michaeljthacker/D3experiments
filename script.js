// var data = [] // This is currently created in data.js and holds the raw data for this chart.

var height = 300,
    width = 500,
    barWidth = 28,
    barOffset = 5; // Set some variables

var MyChart,
    yBuffer,
    yScale,
    xBuffer,
    xScale; // Initialize some variables

yBuffer = Math.ceil(Math.abs(d3.max(data) - d3.min(data))*0.1);

yScale = d3.scaleLinear()
  .domain([d3.min(data) - yBuffer, d3.max(data) + yBuffer])
  .range([0, height]);

xScale = d3.scaleBand()
  .domain(data)
  .paddingInner(0.1)
  .paddingOuter(0.1)
  .range([0, width]);

MyChart = d3.select("#container1")
  .append("svg") // put the svg in the containing div
  .attr("height",height)
  .attr("width",width)
  .style("background-color","#419d78")
  .append("g") // Create a "group", don't really understand this yet
  .selectAll("rect").data(data) // select the bars (they don't exist yet)
  .enter() // Identify the 'rect's that need to be added to the DOM
  .append("rect") // append them to the svg
    .attr('fill','#2d3047')
    .attr('width', function(d){ // bar sizing
      return xScale.bandwidth();
    })
    .attr('height', 0) // adjusted in transition() now
    .attr('x', function(d){ // bar position (horizontal)
      return xScale(d);
    })
    .attr('y', height); // bar position (vertical -- adjusted in transition() now)

MyChart.transition()
  .attr('height', function(d){
    return yScale(d);
  })
  .attr('y', function(d){ // bar position (vertical)
    return height - yScale(d);
  })
  .ease(d3.easeBounceOut)
  .duration(500);

MyChart.transition()
  .attr('fill', '#419d78')
  .delay(500)
  .duration(1000);

d3.select('svg').transition().style('background-color', '#454851').delay(500).duration(1000);
//d3.select('h1').transition().style('color', '#95d7ae').delay(500).duration(1000);
// */