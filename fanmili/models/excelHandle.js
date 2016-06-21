var XLSX = require('xlsx');
var path = require('path');

var excel = path.join(__dirname, 'test.xlsx');

var workbook = XLSX.readFile(excel);

var sheetNames = workbook.SheetNames;

var worksheet = workbook.Sheets[sheetNames[0]];

var excelJSON = {};

for (var cells in worksheet) {
    // 不是以 ! 开头
    if (cells.indexOf('!') != 0) {
        var col = cells.substring(0, 1);
        var row = parseInt(cells.substring(1));
        var value = worksheet[cells].v;

        if (!excelJSON[row]) {
            excelJSON[row] = {};
        }

        var cellsJSON = excelJSON[row];

        switch (col) {
            //第一行 为name
            case 'A':
                cellsJSON['name'] = value;
                break;
            case 'B':
                cellsJSON.tel = value;
                break;
            case 'C':
                cellsJSON.type = value;
                break;
        }
    }
}
//删除头部信息;
excelJSON['1'] = null;

module.exports = excelJSON;