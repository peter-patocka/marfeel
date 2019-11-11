import * as d3 from 'd3';

export class HistoryChart {
    constructor(history) {
        this.data = history.data.map((item, index) => new HistoryChartItem(index, item));
        this.width = 200;
        this.height = 200;
        this.margin = ({top: 120, right: 20, bottom: 10, left: 30});
        this.radius = 100;
        this.backgroundColor = history.backgroundColor;
        this.lineColor = history.lineColor;
    }

    static createItem(index, item) {
        return {
            index: index,
            item: item
        }
    }

    render() {
        let curve = d3.curveLinear;

        let x = d3.scaleUtc()
            .domain(d3.extent(this.data, d => d.index))
            .range([this.margin.left, this.width - this.margin.right])

        let y = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.value)]).nice()
            .range([this.height - this.margin.bottom, this.margin.top])

        let area = d3.area()
            .curve(curve)
            .x(d => x(d.index))
            .y0(y(0))
            .y1(d => y(d.value));

        const svg = d3.create("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("style", "border-radius: "+this.radius+"px");
            
        svg.append("path")
            .datum(this.data)
            .attr("fill", this.backgroundColor)
            .attr("d", area);

        let line = d3.line()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.index))
            .y(d => y(d.value))

        svg.append("path")
            .datum(this.data)
            .attr("fill", "none")
            .attr("stroke", this.lineColor)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

        return svg.node().outerHTML;
    }
}

class HistoryChartItem {
    constructor(index, value) {
        this.index = index;
        this.value = value;
    }
}