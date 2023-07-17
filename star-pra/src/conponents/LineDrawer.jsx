import React, { useRef, useEffect } from "react";
import { select, line, curveBasis, axisBottom, scaleLinear } from "d3";

const LineDrawer = () => {
  const svgRef = useRef();
  const svgWidth = 500;
  const svgHeight = 500;

  const points = Array.from({ length: 15 }, () => [Math.random() * svgWidth, Math.random() * svgHeight]);

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear().domain([0, svgWidth]).range([0, svgWidth]);
    const yScale = scaleLinear().domain([0, svgHeight]).range([0, svgHeight]);

    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").style("transform", `translateY(${svgHeight}px)`).call(xAxis);

    const myLine = line()
      .x((value) => xScale(value[0]))
      .y((value) => yScale(value[1]))
      .curve(curveBasis);

    svg
      .selectAll(".line")
      .data([points])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");

    svg
      .selectAll(".line")
      .transition()
      .duration(2000)
      .attrTween("stroke-dasharray", function() {
        const length = this.getTotalLength();
        return function(t) {
          return `${t * length} ${length}`;
        }
      });

  }, [points]);

  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight}>
      <g className="x-axis" />
    </svg>
  );
};

export default LineDrawer;
