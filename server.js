var jsonServer = require("json-server");
var server = jsonServer.create();
var router = jsonServer.router(require("./db.js")());

var middlewares = jsonServer.defaults({ readOnly: true });
server.use(middlewares);
arr = {
Fadaail_elshia: "./ford/Fadaail_elshia.json",
  Al_Amaal: "./ford/Al-Amaal.json",
  Alkafi_v1: "./ford/Al-Kāfi - Volume 1 .json",
  Alkafi_v2: "./ford/Al-Kāfi - Volume 2 .json",
  Alkafi_v3: "./ford/Al-Kāfi - Volume 3 .json",
  Alkafi_v4: "./ford/Al-Kāfi - Volume 4 .json",
  Alkafi_v5: "./ford/Al-Kāfi - Volume 5 .json",
  Alkafi_v6: "./ford/Al-Kāfi - Volume 6 .json",
  Alkafi_v7: "./ford/Al-Kāfi - Volume 7 .json",
  Alkafi_v8: "./ford/Al-Kāfi - Volume 8 .json",
  ALkhisal: "./ford/Al-Khisāl.json",
  AlTawhid: "./ford/Al-Tawhid.json",
  Fadaail_elshia: "./ford/Fadaail_elshia.json",
  KamilAlZiyarat: "./ford/KamilAlZiyarat.json",
  kitabAlGhayba: "./ford/kitabAlGhayba.json",
  kitabAlGhayba2: "./ford/kitabAlGhayba2.json",
  MujamaaAlAhadithAlMutabara:'./ford/Muʿjam al-Aḥādīth al-Muʿtabara .json',
  RijalIbnALGhadairy:'./ford/Rijāl ibn al-Ghādairy.json',
  ShifatAlShia:'./ford/Shifāt al-Shīā.json',
  ThawabAlAmalWaIqabAlaamal:'./ford/Thawāb al-Amāl wa-Īqāb al-Ālamal.json',
  UyonAkhbarAlRidaV1:'./ford/Uyón-Akhbar al-Rīda - Volume 1.json',
  UyonAkhbarAlRidaV2:'./ford/Uyón-Akhbar al-Rīda - Volume 2.json',

};
server.use((req, res, next) => {
try {
   

    if(
      req.path.search("/book/")==-1&&req.path.search("/book")==-1){
        console.log(req.path)
      res.send([{'error':'invaild url2'},
      {"example1": "/book /{bookname}?range=1-150  //max range 250"},
      {'example2':"/book/Fadaail_elshia/5"},
      {'excmple3':'/book/Returns the list of available Books. '}
      ]);
      return
    }
    book=req.path.match(/\w+\/?/g)[1].replace("/", "");
    
    matches = Boolean(/^\/book\/?$/g.exec(req.path));
    console.log(req.path)
    if(matches)
    {allbooks=Object.keys(arr);
    res.send(allbooks);
    return
    }
    s=req.query['range']
    if(!s){
      
    id=parseInt(req.path.match(/\/\d+/g)[req.path.match(/\/\d+/g)?.length-1].replace('/',''))
    }
    
    if(!arr[book]){
      
      res.send({'error':'the book is not found'});
      return
    }
   
  
    db=require(arr[book]);
    if(!s){
    if(id>db[book].length||id<0){
      console.log(id)
      res.send('{"error":"invaild id"}');
      return
    }
    if(id||id==0){
      out={
        code:200,
        availeble:db[book].length,
        data:db[book].filter(x=>x.id==id)[0]
      }
      res.send(out)
      return
    }
  }


    a=parseInt( req.query['range'].split("-")[0])
    b=parseInt(req.query['range'].split("-")[1])

    if(b>db[book].length-1||a>db[book].length-1){
      res.send({'error':'id is not available '});

    }

    if(a>b||a<0|b>db[book].length-1||a>db[book].length-1||b<0){
      res.send({'error':'wrong range'});
      return
      
    }

    if(b-a>250){
      res.send({'error':'range too big max 250'});
      return
    }


    out={
      code:200,
      availeble:db[book].length,
      data:db[book].filter((item) => item.id >= a && item.id <= b)
    }
        res.send(out);
        return
  
}catch(e){
 console.log(e)
  res.send([{'error':'invaild url'},
{"example1": "/book /{bookname}?range=1-150  //max range 250"},
{'example2':"/book/Fadaail_elshia/5"},
{'excmple3':'/book/Returns the list of available Books. '}
]);
}
      });
  
// server.get("*/:a", (req, res) => {
//   a = req.path.match(/\w+\//g)[0].replace("/", "");
//   console.log(a)


// });
// server.get("*/:a-:b", (req, res) => {
//   a = req.path.match(/\w+\//g)[0].replace("/", "");
//   console.log(arr[a])
//   var db = require(arr[a]);

//   res.json(
//     db[a].filter((item) => item.id >= req.params.a && item.id <= req.params.b)
//   );
// });

server.all("*", function (req, res, next) {
  if (req.method === "GET") {
    next(); // Continue
  } else {
    res.sendStatus(403); // Forbidden
  }
});

server.use(
  jsonServer.rewriter({
 
  })
);
server.use(router);
server.listen(3000, function () {
  console.log("JSON Server is running");
});
