export function generateResponse(params: any) {
  console.log('params11111', params);
  return {
    code: 0,
    msg: "调用成功",
    data: {
      __type: {
        carbonEmissions: "碳排放量情况", // done
        productionOutputAndProductCarbonEmissions: "生产产量与产品碳排放情况", // done
        greenCertificateConsumptionStrategy: "绿证消费策略", // done
        comparisonOfActualCarbonEmissionsAndPredictedValues: "实际碳排放量与预测值对比", // done
        processCarbonEmissionProportion: "工艺碳排占比",// done
        energyStructureFocus: "能源结构占比",// done
        overview: "总览", // done
      },
      overview: {
        carbonEmissions: 3256122.63, // 总碳排放量
        carbonEmissionsYoy: -10,
        power: 9.56, // 用电量
        powerYoy: 5,
        powCurrentGreenCertificatePriceer: 212689.56, //当前绿证价格
        halfYearLow: 22689.56, //近半年最低价
        powerCarbonCouplingDegree: 68.0, // 电碳耦合度
        powerCarbonCouplingDegreeYoy: null, // 电碳耦合度同比
        detailedList: {
          // 电镀锌
          electroplating: {
            carbonEmission: 1317345, // 碳排
            energyConsumption: 2830, // 能耗
            power: 0, // 用电量
          },
          // 热轧
          hotRolling: {
            carbonEmission: 210, // 碳排
            energyConsumption: 210, // 能耗
            power: 210, // 用电量
          },
          // 高炉
          blastFurnace: {
            carbonEmission: 210, // 碳排
            energyConsumption: 210, // 能耗
            power: 210, // 用电量
          },
          // 炼钢
          steelSmelting: {
            carbonEmission: 210, // 碳排
            energyConsumption: 210, // 能耗
            power: 210, // 用电量
          },
        },
      },
      carbonEmissions: {
        xList: [
          "01月",
          "02月",
          "03月",
          "04月",
          "05月",
          "06月",
          "07月",
          "08月",
          "09月",
          "10月",
          "11月",
          "12月",
        ],
        yList: [
          {
            dataTag: "carbonEmissions",
            dataList: [34, 35, 38, 33, 36, 32, 31, 32, null, null, null, null],
            dataType: "Bar",
            dataName: "碳排放量",
            dataUnit: "吨",
          },
          {
            dataTag: "yoy",
            dataList: [.2, 0.5, 0.1, 0.6, 0.7, 0.3, .1, .4, null, null, null, null],
            dataType: "Line",
            dataName: "同比",
            dataUnit: "%",
          },
        ],
      },
      productionOutputAndProductCarbonEmissions: {
        xList: [
          "01月",
          "02月",
          "03月",
          "04月",
          "05月",
          "06月",
          "07月",
          "08月",
          "09月",
          "10月",
          "11月",
          "12月",
        ],
        yList: [
          {
            dataTag: "carbonEmissions",
            dataList: [365, 352, 373, 369, 357, 375, 351, 364, null, null, null, null],
            dataType: "Bar",
            dataName: "生产产量",
            dataUnit: "吨",
          },
          {
            dataTag: "yoy",
            dataList: [ 0.1, 0.13, 0.12, 0.15, 0.14, 0.13, 0.1, 0.12, null, null, null, null],
            dataType: "Line",
            dataName: "单位产品碳排放量",
            dataUnit: "%",
          },
        ],
      },
      processCarbonEmissionProportion: [
        {
          equipmentName: "高炉",
          carbonEmissionsPercentage: "46.59%",
        },
        {
          equipmentName: "炼钢",
          carbonEmissionsPercentage: "27.95%",
        },
        {
          equipmentName: "热轧",
          carbonEmissionsPercentage: "18.64%",
        },
        {
          equipmentName: "电镀锌",
          carbonEmissionsPercentage: "6.81%",
        },
      ],
      energyStructureFocus: [
        {
          equipmentName: "电力",
          carbonEmissionsPercentage: "43%",
        },
        {
          equipmentName: "热力",
          carbonEmissionsPercentage: "24%",
        },
        {
          equipmentName: "高炉煤气",
          carbonEmissionsPercentage: "11%",
        },
        {
          equipmentName: "焦炉煤气",
          carbonEmissionsPercentage: "22%",
        },
        {
          equipmentName: "二级除盐水",
          carbonEmissionsPercentage: "1%",
        },
        {
          equipmentName: "其他",
          carbonEmissionsPercentage: "1%",
        },
      ],
      greenCertificateConsumptionStrategy: {
        xList: [
          "01月",
          "02月",
          "03月",
          "04月",
          "05月",
          "06月",
          "07月",
          "08月",
          "09月",
          "10月",
          "11月",
          "12月",
        ],
        yList: [
          {
            dataTag: "practical",
            dataList: [22, 25, 23, 28, 30, 27, 26, 25, null, null, null, null],
            dataType: "Line",
            dataName: "绿证价格",
            dataUnit: "元",
          },
          {
            dataTag: "prediction",
            dataList: [
              4132,
              4211,
              4313,
              4143,
              4222,
              4231,
              4151,
              4326,
              null,
              null,
              null,
              null,
            ],
            dataType: "Line",
            dataName: "电量",
            dataUnit: "万千瓦时",
          },
          {
            dataTag: "predictionUpper",
            dataList: [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              4226,
              4116,
              4215,
              4333,
              4145,
            ],
            dataType: "Line",
            dataName: "电量预测",
            dataUnit: "万千瓦时",
          },
        ],
      },
      comparisonOfActualCarbonEmissionsAndPredictedValues: {
        xList: [
          "01月",
          "02月",
          "03月",
          "04月",
          "05月",
          "06月",
          "07月",
          "08月",
          "09月",
          "10月",
          "11月",
          "12月",
        ],
        yList: [
          {
            dataTag: "practical",
            dataList: [34, 35, 38, 33, 36, 32, 31, 32, null, null, null, null],
            dataType: "Line",
            dataName: "实际碳排",
            dataUnit: "吨",
          },
          {
            dataTag: "prediction",
            dataList: [32, 31, 33, 33, 32, 36, 35, 36, null, null, null, null],
            dataType: "Line",
            dataName: "测算碳排",
            dataUnit: "吨",
          },
          {
            dataTag: "predictionUpper",
            dataList: [null, null, null, null, null, null, null, 36, 33, 35, 33, 35],
            dataType: "Line",
            dataName: "预测碳排",
            dataUnit: "吨",
          },
        ],
      },
    },
  };
}
