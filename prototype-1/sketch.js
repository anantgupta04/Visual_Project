const main_df1 = "data/new_main_df.csv";
const respiratory = "data/respiratory.csv";

let table;
let generate = [];
let latdata;
let canvas;
let  currentColor;

const mappa = new Mappa('Leaflet');
const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function preload(){
  table = loadTable(main_df1, "csv", "header");
  latdata = loadJSON("data/countrycode-latlong-array.json");
}

function setup() {
  // put setup code here

  canvas = createCanvas(800, 600);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // attempt for slider for YEARS
  // slider = createSlider(1990, 2017, 1990);
  // slider.position(50, 200);
  // slider.style('width', '80px');

  dataSource = select('#dataSource'); // get the DOM element from the HTML
  dataSource.changed(processData); // assign callback
  currentColor = color(64, 250, 200, 100);


}

function processData() {
  generate = [];
  let latest = table.findRows("2017", "Year");

  let cause = dataSource.value();
  // console.log("The cause of death is = ", cause);

  switch (cause) {
    case "cardiovascular":
      currentColor = color(204, 102, 0);
      break;
    case "alzheimer":
      currentColor = color(64, 250, 200);
      break;
    case "drugs":
      currentColor = color(204, 153, 0);
      break;
    case "nutritional":
      currentColor = color(91, 37, 134);
      break;
    case "fights":
      currentColor = color(250, 0, 0, 100);
      break;
  }


  let maxV = 0;
  let minV = Infinity;
  for (let r of latest){
    let country_id = r.get('int_code').toLowerCase();
    let latlong = latdata[country_id];

    if (latlong){
      let lat = +(latlong[0]);
      let lon = +(latlong[1]);
      let value = Number(r.get(cause));
      generate.push({lat, lon, value});

      if (value > maxV){
        maxV = value;
      }
      if (value < minV){
        minV = value;
      }
    }
  }

  let smallest = sqrt(minV);
  let largest = sqrt(maxV);

  for(let i of generate){
    i.diameter = map(sqrt(i.value), smallest, largest, 1 ,20);
  }
}

function draw() {
  // put drawing code here
  clear();

	for(let row of generate){
    const pix = myMap.latLngToPixel(row.lat, row.lon);
    const zoom = myMap.zoom();
    const scl = pow(1.5, zoom);
    fill(currentColor);
    ellipse(pix.x, pix.y, row.diameter*scl);

  }

}


///////////////////////////////Second Sketch//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Build the pie chart
const chart = Highcharts.chart('container', {
	chart: {
  	type: 'pie'
  },
  title: {
    text: 'Causes of death by year'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
  },
  accessibility: {
       point: {
           valueSuffix: '%'
       }
   },
   plotOptions: {
       pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           dataLabels: {
               enabled: true,
               format: '<b>{point.name}</b>: {point.percentage:.2f} %'
           }
       }
   },
  series: [{
    data: [{
      name: 'Cardiovascular',
      y: 11885524,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 5720987
    },{
      name: 'Respiratory',
      y: 3292282
    },{
      name: 'Tuberculosis',
      y: 1601200
    },{
      name: 'Alzheimer',
      y: 1017884
    },{
      name: 'Diabetes',
      y: 604209
    },{
      name: 'Nutritional Deficiencies',
      y: 562278
    },{
      name: 'Other',
      y: 18354048
    }]
  }]
});


var menu = document.getElementById('years');
menu.addEventListener('change', generateData);

function generateData(event) {
  if (menu.value == '1990'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 11885524,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 5720987
    },{
      name: 'Respiratory',
      y: 3292282
    },{
      name: 'Tuberculosis',
      y: 1601200
    },{
      name: 'Alzheimer',
      y: 1017884
    },{
      name: 'Diabetes',
      y: 604209
    },{
      name: 'Nutritional Deficiencies',
      y: 562278
    },{
      name: 'Other',
      y: 18354048
      }
    ]})
  } else if (menu.value == '1991'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 12061400,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 5849582
    },{
      name: 'Respiratory',
      y: 3353546
    },{
      name: 'Tuberculosis',
      y: 1604738
    },{
      name: 'Alzheimer',
      y: 1055382
    },{
      name: 'Diabetes',
      y: 623596
    },{
      name: 'Nutritional Deficiencies',
      y: 555138
    },{
      name: 'Other',
      y: 18604873
      }
    ]})
  } else if (menu.value == '1992'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 12280165,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 5978036
    },{
      name: 'Respiratory',
      y: 3412959
    },{
      name: 'Tuberculosis',
      y: 1618047
    },{
      name: 'Alzheimer',
      y: 1090009
    },{
      name: 'Diabetes',
      y: 645768
    },{
      name: 'Nutritional Deficiencies',
      y: 545896
    },{
      name: 'Other',
      y: 18624136
      }
    ]})
  } else if (menu.value == '1993'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 12641175,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6139449
    },{
      name: 'Respiratory',
      y: 3459885
    },{
      name: 'Tuberculosis',
      y: 1614586
    },{
      name: 'Alzheimer',
      y: 1129635
    },{
      name: 'Diabetes',
      y: 670923
    },{
      name: 'Nutritional Deficiencies',
      y: 535542
    },{
      name: 'Other',
      y: 18803735
      }
    ]})
  } else if (menu.value == '1994'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 12870469,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6256854
    },{
      name: 'Respiratory',
      y: 3496169
    },{
      name: 'Tuberculosis',
      y: 1612079
    },{
      name: 'Alzheimer',
      y: 1163909
    },{
      name: 'Diabetes',
      y: 693752
    },{
      name: 'Nutritional Deficiencies',
      y: 528572
    },{
      name: 'Other',
      y: 19408884
      }
    ]})
  } else if (menu.value == '1995'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 12981390,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6365647
    },{
      name: 'Respiratory',
      y: 3517112
    },{
      name: 'Tuberculosis',
      y: 1603887
    },{
      name: 'Alzheimer',
      y: 1199056
    },{
      name: 'Diabetes',
      y: 717696
    },{
      name: 'Nutritional Deficiencies',
      y: 595296
    },{
      name: 'Other',
      y: 19037989
      }
    ]})
  } else if (menu.value == '1996'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 13024291,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6440514
    },{
      name: 'Respiratory',
      y: 3542648
    },{
      name: 'Tuberculosis',
      y: 1594467
    },{
      name: 'Alzheimer',
      y: 1230733
    },{
      name: 'Diabetes',
      y: 742785
    },{
      name: 'Nutritional Deficiencies',
      y: 576962
    },{
      name: 'Other',
      y: 19037989
      }
    ]})
  } else if (menu.value == '1997'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 13116299,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6520237
    },{
      name: 'Respiratory',
      y: 3592969
    },{
      name: 'Tuberculosis',
      y: 1612063
    },{
      name: 'Alzheimer',
      y: 1263373
    },{
      name: 'Diabetes',
      y: 770904
    },{
      name: 'Nutritional Deficiencies',
      y: 564000
    },{
      name: 'Other',
      y: 19102808
      }
    ]})
  } else if (menu.value == '1998'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 13218864,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6627064
    },{
      name: 'Respiratory',
      y: 3620325
    },{
      name: 'Tuberculosis',
      y: 1616348
    },{
      name: 'Alzheimer',
      y: 1299643
    },{
      name: 'Diabetes',
      y: 796599
    },{
      name: 'Nutritional Deficiencies',
      y: 550464
    },{
      name: 'Other',
      y: 19165349
      }
    ]})
  } else if (menu.value == '1999'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 13435331,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6757118
    },{
      name: 'Respiratory',
      y: 3583683
    },{
      name: 'Tuberculosis',
      y: 1610356
    },{
      name: 'Alzheimer',
      y: 1339154
    },{
      name: 'Diabetes',
      y: 821568
    },{
      name: 'Nutritional Deficiencies',
      y: 527953
    },{
      name: 'Other',
      y: 19298570
      }
    ]})
  } else if (menu.value == '2000'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 13633247,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6867333
    },{
      name: 'Respiratory',
      y: 3563971
    },{
      name: 'Tuberculosis',
      y: 1607581
    },{
      name: 'Alzheimer',
      y: 1376767
    },{
      name: 'Diabetes',
      y: 847056
    },{
      name: 'Nutritional Deficiencies',
      y: 528967
    },{
      name: 'Other',
      y: 19267528
      }
    ]})
  } else if (menu.value == '2001'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 13803677,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 6964604
    },{
      name: 'Respiratory',
      y: 3538265
    },{
      name: 'Tuberculosis',
      y: 1583143
    },{
      name: 'Alzheimer',
      y: 1418421
    },{
      name: 'Diabetes',
      y: 872600
    },{
      name: 'Nutritional Deficiencies',
      y: 511355
    },{
      name: 'Other',
      y: 19187387
      }
    ]})
  } else if (menu.value == '2002'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 14081705,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7092727
    },{
      name: 'Respiratory',
      y: 3526014
    },{
      name: 'Tuberculosis',
      y: 1555856
    },{
      name: 'Alzheimer',
      y: 1465927
    },{
      name: 'Diabetes',
      y: 904034
    },{
      name: 'Nutritional Deficiencies',
      y: 493843
    },{
      name: 'Other',
      y: 19154123
      }
    ]})
  } else if (menu.value == '2003'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 14325460,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7225070
    },{
      name: 'Respiratory',
      y: 3508196
    },{
      name: 'Tuberculosis',
      y: 1518486
    },{
      name: 'Alzheimer',
      y: 1514053
    },{
      name: 'Diabetes',
      y: 934062
    },{
      name: 'Nutritional Deficiencies',
      y: 400070
    },{
      name: 'Other',
      y: 19081063
      }
    ]})
  } else if (menu.value == '2004'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 14332020,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7294237
    },{
      name: 'Respiratory',
      y: 3433385
    },{
      name: 'Tuberculosis',
      y: 1470307
    },{
      name: 'Alzheimer',
      y: 1550852
    },{
      name: 'Diabetes',
      y: 950515
    },{
      name: 'Nutritional Deficiencies',
      y: 385196
    },{
      name: 'Other',
      y: 19213004
      }
    ]})
  } else if (menu.value == '2005'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 14534574,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7398572
    },{
      name: 'Respiratory',
      y: 3392750
    },{
      name: 'Tuberculosis',
      y: 1446781
    },{
      name: 'Alzheimer',
      y: 1604806
    },{
      name: 'Diabetes',
      y: 978225
    },{
      name: 'Nutritional Deficiencies',
      y: 371991
    },{
      name: 'Other',
      y: 190442813
      }
    ]})
  } else if (menu.value == '2006'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 14478522,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7449993
    },{
      name: 'Respiratory',
      y: 3353325
    },{
      name: 'Tuberculosis',
      y: 1412185
    },{
      name: 'Alzheimer',
      y: 1653202
    },{
      name: 'Diabetes',
      y: 993059
    },{
      name: 'Nutritional Deficiencies',
      y: 360975
    },{
      name: 'Other',
      y: 18844513
      }
    ]})
  } else if (menu.value == '2007'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 14614433,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7574873
    },{
      name: 'Respiratory',
      y: 3359557
    },{
      name: 'Tuberculosis',
      y: 1382873
    },{
      name: 'Alzheimer',
      y: 1712326
    },{
      name: 'Diabetes',
      y: 1011823
    },{
      name: 'Nutritional Deficiencies',
      y: 350546
    },{
      name: 'Other',
      y: 18704763
      }
    ]})
  } else if (menu.value == '2008'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 14932783,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7746671
    },{
      name: 'Respiratory',
      y: 3398179
    },{
      name: 'Tuberculosis',
      y: 1361836
    },{
      name: 'Alzheimer',
      y: 1782763
    },{
      name: 'Diabetes',
      y: 1040449
    },{
      name: 'Nutritional Deficiencies',
      y: 341763
    },{
      name: 'Other',
      y: 18820712
      }
    ]})
  } else if (menu.value == '2009'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 15195843,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 7912680
    },{
      name: 'Respiratory',
      y: 3448425
    },{
      name: 'Tuberculosis',
      y: 1336497
    },{
      name: 'Alzheimer',
      y: 1855452
    },{
      name: 'Diabetes',
      y: 1065180
    },{
      name: 'Nutritional Deficiencies',
      y: 334927
    },{
      name: 'Other',
      y: 18461475
      }
    ]})
  } else if (menu.value == '2010'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 15538328,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 8085027
    },{
      name: 'Respiratory',
      y: 3500804
    },{
      name: 'Tuberculosis',
      y: 1310008
    },{
      name: 'Alzheimer',
      y: 1935636
    },{
      name: 'Diabetes',
      y: 1091314
    },{
      name: 'Nutritional Deficiencies',
      y: 338265
    },{
      name: 'Other',
      y: 18580375
      }
    ]})
  } else if (menu.value == '2011'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 15776264,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 8246760
    },{
      name: 'Respiratory',
      y: 3529858
    },{
      name: 'Tuberculosis',
      y: 1285566
    },{
      name: 'Alzheimer',
      y: 2016403
    },{
      name: 'Diabetes',
      y: 1124762
    },{
      name: 'Nutritional Deficiencies',
      y: 326288
    },{
      name: 'Other',
      y: 18121168
      }
    ]})
  } else if (menu.value == '2012'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 16030181,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 8411808
    },{
      name: 'Respiratory',
      y: 3534383
    },{
      name: 'Tuberculosis',
      y: 1258011
    },{
      name: 'Alzheimer',
      y: 2089892
    },{
      name: 'Diabetes',
      y: 1163237
    },{
      name: 'Nutritional Deficiencies',
      y: 306106
    },{
      name: 'Other',
      y: 17850881
      }
    ]})
  } else if (menu.value == '2013'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 16198021,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 8568105
    },{
      name: 'Respiratory',
      y: 3550670
    },{
      name: 'Tuberculosis',
      y: 1235653
    },{
      name: 'Alzheimer',
      y: 2159690
    },{
      name: 'Diabetes',
      y: 1197296
    },{
      name: 'Nutritional Deficiencies',
      y: 294747
    },{
      name: 'Other',
      y: 17610346
      }
    ]})
  } else if (menu.value == '2014'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 16539387,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 8810000
    },{
      name: 'Respiratory',
      y: 3617912
    },{
      name: 'Tuberculosis',
      y: 1218025
    },{
      name: 'Alzheimer',
      y: 2244232
    },{
      name: 'Diabetes',
      y: 1243477
    },{
      name: 'Nutritional Deficiencies',
      y: 285607
    },{
      name: 'Other',
      y: 17526209
      }
    ]})
  } else if (menu.value == '2015'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 17047649,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 9110435
    },{
      name: 'Respiratory',
      y: 3718292
    },{
      name: 'Tuberculosis',
      y: 1203700
    },{
      name: 'Alzheimer',
      y: 2343548
    },{
      name: 'Diabetes',
      y: 1293677
    },{
      name: 'Nutritional Deficiencies',
      y: 278919
    },{
      name: 'Other',
      y: 17373941
      }
    ]})
  } else if (menu.value == '2016'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 17429664,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 9347436
    },{
      name: 'Respiratory',
      y: 3805417
    },{
      name: 'Tuberculosis',
      y: 1192956
    },{
      name: 'Alzheimer',
      y: 2429497
    },{
      name: 'Diabetes',
      y: 1340362
    },{
      name: 'Nutritional Deficiencies',
      y: 271435
    },{
      name: 'Other',
      y: 17261632
      }
    ]})
  } else if (menu.value == '2017'){
    chart.series[0].update({data: [{
      name: 'Cardiovascular',
      y: 17695333,
      sliced: true,
      selected: true
    },{
      name: 'Cancer',
      y: 9499997
    },{
      name: 'Respiratory',
      y: 3892479
    },{
      name: 'Tuberculosis',
      y: 1176156
    },{
      name: 'Alzheimer',
      y: 2503684
    },{
      name: 'Diabetes',
      y: 1363720
    },{
      name: 'Nutritional Deficiencies',
      y: 266654
    },{
      name: 'Other',
      y: 16988761
      }
    ]})
  }
}
