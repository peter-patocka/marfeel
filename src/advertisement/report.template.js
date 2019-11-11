import { DonutChart } from './donutChart';
import { HistoryChart } from './historyChart';

export const reportTemplate = (report) => `
    <div class="report">
        <div class="overview">
            <div class="reportName">${report.name}</div>
            <div class="reportValue">${report.getAmount()}</div>
            <div class="donutChart">${new DonutChart(report.getItems()).render()}</div>
            <div class="historyChart" data-history="${report.history}">${new HistoryChart(report.history).render()}</div>
        </div>
        <div class="items">
            ${report.getItems().reduce((html, item) => html + reportItemTemplate(report, item), '')}
        </div>
    </div>
    `;

const reportItemTemplate = (report, item) => `
        <div class="item">
            <div class="name" style="color: ${item.color};">${item.name}</div>
            <span class="percent">${item.getPercent()}</span>
            <span class="value">${item.getAmount()}</span>
        </div>
`;