import { translation } from "../nls/translations";

export class ReportDto {
    constructor(obj) {
        Object.assign(this, obj);
        this.items = obj.data && obj.data instanceof Array
            ? obj.data.map(item => new ReportItem(this, item))
            : [];
    }
    getItems() {
        return this.items;
    }
    getAmount() {
        return formatValue(this.value, this.valueSuffix)
    }
}

class ReportItem {
    constructor(report, item) {
        Object.assign(this, item);
        this.report = report;
    }
    getAmount() {
        return formatValue(this.value, this.report.valueSuffix)
    }
    getPercent() {
        return formatPercent(this.percent)
    }
}

function formatValue(value, valueSuffix) {
    let returnedValue = (+value).toLocaleString(translation.LOCALE);
    if(valueSuffix) {
        returnedValue += translation.SPACE + valueSuffix;
    }
    return returnedValue;
}

function formatPercent(percent) {
    let returnedValue = +percent.toFixed(0);
    if(returnedValue) {
        returnedValue += translation.PERCENT;
    }
    return returnedValue;
}