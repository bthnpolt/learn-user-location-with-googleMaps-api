let latitude, longitude = "";


const onSuccess = async(position) =>{
   const maps = document.querySelector('gmp-map');
   const marker = document.querySelector('gmp-advanced-marker');
   latitude =  position.coords.latitude;
   longitude = position.coords.longitude;
  const api_key = '9c59ad4158e74d0eb520249dbd97a05e';
  let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;
  let response = await fetch(url);
  let data = await response.json();
  let detials = data.results[0].components;
  let {country,city,region,postcode} = detials;  
  maps.center = {lat:latitude, lng:longitude};
  marker.position = {lat: latitude, lng:longitude};
  marker.title = `${city}`;                 
}
const onError = (error) =>{
    if (error.code == 1) {
        alert("Kullanıcı erişim iznini reddetti.");
    }else if (error.code == 2) {
        alert('konum bilgisi alınamadı.');
    }else{
        alert('Hay aksi! bir hata oluştu.');
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
    
}else{
    alert('tarayıcınız konum bilgisi alamıyor.');
}





