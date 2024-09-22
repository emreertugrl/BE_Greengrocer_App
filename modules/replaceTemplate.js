// Card html ve ürün bilgilerini prop olarak alacak
// Card html içersinde değişken olarak tanımlanan değerlerin yerine ürünü
// bilgilerini ekleyecek bir fonksiyon yazalım.

const replaceTemplate = (html, data) => {
  let output = html.replace(/{%PRODUCTNAME%}/g, data.productName);
  // HTML Şşablonundaki değişkenler yerine data verilerini basacağız
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%ID%}/g, data.id);
  output = output.replace(/{%FROM%}/g, data.from);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  //eğer ürün organik değilse {notorganic} değişkeni yerine not-organic class'ı ekle
  if (data.organic === false) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  //   oluşturduğumuz yeni card htmlini döndür
  return output;
};

// replaceTemplate ismindeki fonksiyonu farklı dosyalarda kullanma niyetimiz varsa
// export etmemiz gerekli

module.exports = replaceTemplate;
