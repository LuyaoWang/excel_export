/**
 * Created by luyaowang on 17/4/11.
 */
var fs       = require("fs");
var itemName = [];
var itemNum;
var isCD274;
var CD274    = [];

fs.readFile("./config.txt", "utf-8", function(error, config) {
    if (error) {
        console.log(error);
        console.log("config文件读入出错");
    }

    var configItem = config.toString().split("\n");
    var folderDir  = configItem[2];
    isCD274        = configItem[4];
    itemNum        = configItem[6];
    for (let i = 0; i < itemNum; i++) {
        itemName[i] = configItem[8 + i];
    }

    fs.readdir(folderDir, function(err, files) {
        if (err) {
            console.log(err);
            console.log("输入文件夹有误");
        }
        //console.log(files);
        //parse txt
        var geneId   = [];
        var itemData = [];
        var itemReg  = [];
        var datas    = [];
        for (let k = 0; k < itemNum; k++) {
            itemData[k] = [];
            itemReg[k]  = new RegExp(itemName[k]);
        }

        //      console.log(itemReg);

        for (let i = 0; i < files.length; i++) {
            var fileDir = folderDir + '/' + files[i];
            geneId[i]   = files[i].slice(0, 15);

            var data = fs.readFileSync(fileDir).toString().split("\n");
            for (let j = 0; j < data.length; j++) {
                for (let k = 0; k < itemNum; k++) {
                    if (data[j].match(itemReg[k])) {
                        tmp            = data[j].split("\t");
                        itemData[k][i] = tmp[1];
                        //console.log(itemData2[i]);
                    }
                }

            }
        }

        for (let i = 0; i < geneId.length; i++) {
            datas[i]    = [];
            datas[i][0] = geneId[i];

            for (let j = 0; j < itemData.length; j++) {
                if (isCD274.match(/y/)) {
                    datas[i][j + 2] = itemData[j][i];

                } else {
                    datas[i][j + 1] = itemData[j][i];
                }
            }
        }

        if (isCD274.match(/y/)) {
            fs.readFile("./target_gene.txt", "utf-8", function(error, data) {
                if (error) {
                    console.log(error);
                    console.log("cd274文件读入出错");
                }
                var dataToken = data.toString().split("\r");
                CD274[0]      = [];
                CD274[1]      = [];
                for (let i = 0; i < dataToken.length; i++) {
                    CD274[0][i] = dataToken[i].toString().split("\t")[0];
                    CD274[1][i] = dataToken[i].toString().split("\t")[1];
                }
                for (let i = 0; i < geneId.length; i++) {
                    datas[i][1] = " ";
                }
                var inGeneId = false;
                var addIndex = datas.length;
                for (let j = 0; j < CD274[0].length; j++) {
                    for (let i = 0; i < geneId.length; i++) {
                        if (geneId[i] == CD274[0][j]) {
                            datas[i][1] = CD274[1][j].toString();
                            inGeneId    = true;
                            // console.log(datas);
                        }
                    }
/*                    if (!inGeneId) {
                        datas[addIndex] = [];
                        datas[addIndex][0] = CD274[0][j].toString();
                        datas[addIndex][1] = CD274[1][j].toString();
                        for(let k = 0; k<itemNum;k++){
                            datas[addIndex][k+2] = " ";
                        }
                        addIndex++;
                    }*/
                }
                exports.write(datas);

            });
        }

    });
});

// export the excel
var excelPort = require('excel-export');

exports.write = function(req, res) {
    //   console.log(itemName);

    var conf  = {};
    conf.name = "mysheet";
    conf.cols = [
        {caption: 'gene_id', type: 'string', width: 40}
    ];
    for (let i = 0; i < itemNum; i++) {
        if (isCD274.match(/y/)) {
            conf.cols[i + 2]         = {caption: '', type: 'string', width: 40};
            conf.cols[i + 2].caption = itemName[i];
        } else {
            conf.cols[i + 1]         = {caption: '', type: 'string', width: 40};
            conf.cols[i + 1].caption = itemName[i];
        }
    }
    if (isCD274.match(/y/)) {
        conf.cols[1] = {caption: 'cd274', type: 'string', width: 40};
    }
    conf.rows    = req;
    var result   = excelPort.execute(conf);
    var filePath = "./result.xlsx";
    fs.writeFile(filePath, result, 'binary', function(err) {
        if (err) {
            console.log(err);
        }
        console.log("success!");
    });

};
