import { ReportDto } from "../src/advertisement/report.dto";
import { expect } from 'chai';

describe('ReportDto', () => {
    it('construct from empty data', () => {
        const report = new ReportDto({});
        expect(report).to.not.be.undefined;
        expect(report.getItems()).to.eql([]);
    })
    it('display amount with valueSuffix', () => {
        let reportDto = new ReportDto({
            value : 200,
            valueSuffix : "EUR"
        });
        expect(reportDto.getAmount()).to.equal("200 EUR");
    })
    describe('ReportItem', () => {
        let reportDto;
        beforeEach(function() {
            reportDto = new ReportDto({
                data : [
                    {
                        "name": "Tablet",
                        "percent": 60,
                        "value": 120000,
                        "color": "#a3d35c"
                    },
                    {
                        "name": "Smartphone",
                        "percent": 40,
                        "value": 80000,
                        "color": "#396522"
                    }
                ]
            });
        });
        it('exactly 2 items are converted', () => {
            expect(reportDto.getItems().length).to.equal(2);
        })
        it('sorting of fields are preserved', () => {
            expect(reportDto.getItems()[0].name).to.equal("Tablet");
        })
        it('percentage are generated with % sign', () => {
            expect(reportDto.getItems()[0].getPercent()).to.equal("60%");
        })
    })
    
})