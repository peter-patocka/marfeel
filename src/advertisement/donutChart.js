import * as d3 from 'd3';

export class DonutChart {

    constructor(data) {
        this.data = data;
        this.width = 200;
        this.height = 200;
        this.radius = 100;
        this.backgroundColor = "#ffffff";
        this.chartSize = 10;
        this.borderSize = 7;
    }

    render() {

        let pie = d3.pie()
            .value(function(d) {
                return d.percent;
            });

        let holder = d3.select(document.createElementNS(d3.namespaces.svg, 'svg'));
        let svg = holder
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  
        let g = svg.selectAll(".arc")
            .data(pie(this.data))
            .enter()
            .append("g");
  
        let arc = d3.arc()
            .outerRadius(this.radius - this.chartSize)
            .innerRadius(this.radius);
        g.append("path")
            .attr("d", arc)
            .style("fill", function(d,i) {
                return d.data.color;
            });
        
        let arc2 = d3.arc()
            .outerRadius(this.radius - this.chartSize - this.borderSize)
            .innerRadius(this.radius - this.chartSize);
        g.append("path")
            .attr("d", arc2)
            .style("fill", (d,i) => this.backgroundColor);

        return holder.node().outerHTML;
    }
}