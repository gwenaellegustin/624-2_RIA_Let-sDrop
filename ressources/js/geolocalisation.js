navigator.geolocation.getCurrentPosition(onSuccess);

let lat, lng, url;

function onSuccess(position){
    lat = position.coords.latitude;
    lng = position.coords.longitude;

	url = 'https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng;

	console.log(lat+","+lng);

	userAction();
}

const userAction = async () => {
	const response = await fetch('https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json');
	const myJson = await response.json();
}