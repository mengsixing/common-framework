report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/mytest_tencent_map_0_document_0_phone.png",
        "test": "../../../backstop_data/bitmaps_test/20171122-205825/mytest_tencent_map_0_document_0_phone.png",
        "selector": "document",
        "fileName": "mytest_tencent_map_0_document_0_phone.png",
        "label": "tencent_map",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "3.71",
          "analysisTime": 48
        },
        "diffImage": "../../../backstop_data/bitmaps_test/20171122-205825/failed_diff_mytest_tencent_map_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/mytest_tencent_map_0_document_1_tablet.png",
        "test": "../../../backstop_data/bitmaps_test/20171122-205825/mytest_tencent_map_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "mytest_tencent_map_0_document_1_tablet.png",
        "label": "tencent_map",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "error": "Reference file not found /Users/yhlmmm/myframework/backstop_data/bitmaps_reference/mytest_tencent_map_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ]
});