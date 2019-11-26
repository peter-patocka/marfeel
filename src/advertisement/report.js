import { translation } from "../nls/translations";
import { reportTemplate } from "./report.template";
import { ReportDto } from "./report.dto";
import { createElement, error, log } from "../util/utils";

export class Report {
    render() {        
        let wrapper = this.createWrapper();
        this.showReports(wrapper);
        return wrapper;
    }
    createWrapper() {
        let wrapper = createElement("div", {className : "reports"});
        return wrapper;
    }
    async showReports(wrapper) {
        let reports = await this.loadReports();
        if(reports.length == 0) {
            wrapper.appendChild(this.createEmptyComponent())
            log("There are no data")
            return;
        }
        let reportsHtml = "";
        reports.forEach((reportData) => {
            reportsHtml += reportTemplate(reportData);
        });
        wrapper.insertAdjacentHTML('beforeend', reportsHtml)
    }
    loadReports() {
        return fetch("/api/advertisementReports")
            .then(response => response.json())
            .then(data => data.map(item => new ReportDto(item)))
            .catch(err => {
                error("It was not possible to get advertisement data. ", err)
                return [];
            });
    }
    createEmptyComponent() {
        document.createElement("div").insertAdjacentHTML
        let element = createElement("div", {className : "error"});
        element.innerHTML = translation.EMPTY_ADVERTISEMENTS
        return element;
    }
}