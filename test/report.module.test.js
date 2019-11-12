import { Report } from "../src/advertisement/report";
import { ReportDto } from "../src/advertisement/report.dto";
import { expect } from 'chai';
import { utils } from "../src/util/utils";
import { doesNotReject, doesNotThrow } from "assert";

describe('Report module', () => {
    let report, reportDtoJson, calledApi, fetchIsWorking;
    beforeEach(function() {
        report = new Report();
        reportDtoJson = {
            name: "TEST",
            value: 20,
            valueSuffix: "EUR",
            history : [1,2,3],
            data : [{ "name": "Tablet" }]
        };
        fetchIsWorking = true;
        global.fetch = function(api) {
            calledApi = api;
            return new Promise(function(succ,err) {
                if(fetchIsWorking)
                    succ({
                        json : function() {
                            return [reportDtoJson]
                        }
                    });
                else
                    err({message : 'testMessage'})
            });
        }
    });
    it('#loadReports() is connected to correct api', () => {
        let reportsPromise = report.loadReports();
        expect(calledApi).to.equal("/api/advertisementReports");      
    })
    it('#loadReports() returns single element', () => {
        return report.loadReports().then(function(reports) {
            expect(reports.length).to.equal(1);
        })
    })
    it('#loadReports() returns TEST element with all history data', () => {
        return report.loadReports().then(function(reports) {
            expect(reports[0].name).to.equal("TEST");
            expect(reports[0].history).to.eql([1,2,3]);
        })
    })
    it('#loadReports() converts data to ReportItems', () => {
        return report.loadReports().then(function(reports) {
            expect(reports[0].items[0].name).to.equal("Tablet");
        })
    })
    it('#loadReports() returns empty array when fetch is not working', () => {
        fetchIsWorking = false;
        return report.loadReports().then(function(reports) {
            expect(reports).to.eql([]);
        })
    })
    it('#loadReports() log error into console when fetch is not working', () => {
        fetchIsWorking = false;
        let errorMessage;
        utils.error = function(message, err) {
            errorMessage = message;
        }
        return report.loadReports().then(function(reports) {
            expect(errorMessage).to.equal("It was not possible to get advertisement data. ");
        })
    })
})