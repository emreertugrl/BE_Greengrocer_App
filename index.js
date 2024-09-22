// API: Gelen istekleri izler ve isteklere cevap gönderir.

// gerekli modülleri çağırdık
const http = require("http");
const fs = require("fs");
const url = require("url");

// kendi oluşturduğumuz fonksiyonu import et
const replaceTemplate = require("./modules/replaceTemplate");

/*
 * createServer(), veridğimiz dinleyici fonksiyonu api'a her istek geldiğinde tetikler.
 * Bu fonksiyon 2 parametre alır
 * 1) request > istek ile alakalı verileri içeren nesne
 * 2) response > cevap göndermemizi sağlayacak nesne
  
 * Bu fonksiyon içerisinde gelen isteğe göre cevap gönderilir.
 */

/*
 * Routing
 * API'a gelen isteğin hangi endpoint (uç nokta / yol)'e geldiğini tespit edip ona göre farklı cevaplar gönderme işlemine routing denir
 * Routing için client'ın hangi yola ve hangi http methodu ile istek attığını bilmemiz gerekiyor.
 */

// html şablon verilerine erişme
let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

// json dosyasındaki verilere eriş
let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");
// json verileri js objesine dönüştürme
let data = JSON.parse(jsonData);

const server = http.createServer((request, response) => {
  console.log("Apı'a istek geldi");
  // istek urlsini parçalara ayırdık
  const { query, pathname } = url.parse(request.url, true);

  //geen isteğin urlsine göre farklı cevap gönderme
  switch (pathname) {
    case "/overview":
      // meyveler dizisindeki elaman sayısı kadar kart oluşturulur
      const cards = data.map((item, i) => replaceTemplate(tempCard, item));
      // anasayfa htmlindeki kartlar alanına kart html kodlarını ekle
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);
      return response.end(tempOverview);

    case "/product":
      // 1) Dizideki doğru elemanı bul
      const item = data.find((item) => item.id == query.id);

      // 2) detay sayfasının html'ini bulunan elemanın verilerine göre güncelle
      const output = replaceTemplate(tempProduct, item);

      // 3) güncel html'i client'e gönder
      return response.end(output);

    default:
      return response.end("<h1>Bilinmeyen URL</h1>");
  }
});

// server'ın 3000 portuna bağlanmasını sağlayan koddur

server.listen(3535, "127.0.0.1", () => {
  console.log("Server 3535 portundan başlatıldı");
});
// http://127.0.0.1:3535/overview
