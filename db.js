// var AlAlmali=require('./Al-Amaal.json');
// var ALKhiṣāl =require('./Al-Khiṣāl .json');
// var Alkafi_v1=require('./ford/Al-Kāfi - Volume 1 .json');
// // var Alkafi_v2=require('./ford/Al-Kāfi - Volume 2 .json');
// // var Alkafi_v3=require('./ford/Al-Kāfi - Volume 3 .json');
// // var Alkafi_v4=require('./ford/Al-Kāfi - Volume 4 .json');
// // var Alkafi_v5=require('./ford/Al-Kāfi - Volume 5 .json');
// // var Alkafi_v6=require('./ford/Al-Kāfi - Volume 6 .json');
// // var Alkafi_v7=require('./ford/Al-Kāfi - Volume 7 .json');
// // var Alkafi_v8=require('./ford/Al-Kāfi - Volume 8 .json');

// var Altawhid=require('./Al-Tawḥīd .json');
// var Fadaail_elshia =require("./ford/Fadaail_elshia.json");
// var Kitāb_al_Ghayba=require('./Kitāb al-Ghayba .json');
// var Kitāb_al_Ghayba2=require('./Kitāb al-Ghayba 2.json');
// var Kāmil_al_Ziyārāt=require('./Kāmil al-Ziyārāt .json');
// var Mujamal_Aḥadth_al_Muʿtabara=require('./Muʿjam al-Aḥādīth al-Muʿtabara .json');
// var Rijāl_ibn_Alghadairi=require("./Rijāl Ibn al-Ghaḍā'irī .json");
// var Thawāb_al_A_mā_wa_ʿiqāb_al_Aʿmāl=require("./Thawāb al-Aʿmāl wa ʿiqāb al-Aʿmāl .json");
// var uyone_akbar1=require("./ʿUyūn akhbār al-Riḍā - Volume 1 .json");
// var uyone_akbar2=require("./ʿUyūn akhbār al-Riḍā - Volume 2 .json");
// var sifatshia=require("./Ṣifāt al-Shīʿa .json");

// module.exports = function() {
//     return {
//         // AlAlmali: AlAlmali,
//         // ALKhiṣāl: ALKhiṣāl,
//         Alkafi_v1: Alkafi_v1,

//         // Altawhid: Altawhid,
//         Fadaail_elshia: Fadaail_elshia,
//         // Kitāb_al_Ghayba: Kitāb_al_Ghayba,
//         // Kitāb_al_Ghayba2: Kitāb_al_Ghayba2,
//         // Kāmil_al_Ziyārāt: Kāmil_al_Ziyārāt,
//         // Mujamal_Aḥadth_al_Muʿtabara: Mujamal_Aḥadth_al_Muʿtabara,
//         // Rijāl_ibn_Alghadairi: Rijāl_ibn_Alghadairi,
//         // Thawāb_al_A_mā_wa_ʿiqāb_al_Aʿmāl: Thawāb_al_A_mā_wa_ʿiqāb_al_Aʿmāl,
//         // uyone_akbar1: uyone_akbar1,
//         // uyone_akbar2: uyone_akbar2,
//         // sifatshia: sifatshia
//     };
// }
// module.exports = function() {
//     return Object.assign({a},
//       require('./Al-Amaal.json'),
//       require('./Fadaail_elshia.json'));
//   };


const path = require('path')
const fs = require('fs')

const mockDirectory = path.resolve('ford');

let createDB = () => {
  const files = fs.readdirSync(mockDirectory);
  let mocks = {};

  files.forEach((file) => {
    if (file.indexOf('.json') > -1) {
      Object.assign(mocks, require(mockDirectory + "/" + file));
    }
  });
  return mocks;
};

module.exports = function() {
//     req.query._limit = 3
// next()
  return createDB();
};