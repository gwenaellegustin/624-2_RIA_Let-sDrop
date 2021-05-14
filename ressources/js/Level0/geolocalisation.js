class Geolocation{
	create(thisGame){
		navigator.geolocation.getCurrentPosition(onSuccess);

		let lat, lng, url;
		
		function onSuccess(position){
			lat = position.coords.latitude;
			lng = position.coords.longitude;
		
			console.log(lat+","+lng);
		
			userAction();
		}
		
		const userAction = async () => {
			const response = await fetch('https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json');
			const result = await response.json();
			console.log(result);
		}
	}
}