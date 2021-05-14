class Geolocation {
	constructor(context, thisGame){
		this.context = context;
		this.town;
		this.state;
		this.country;

		this.getCountry();
	}

	draw(){
		this.context.fillStyle = "black";
        this.context.fillText("Escape from ", 100, 400);
	}

	getCountry(){
		navigator.geolocation.getCurrentPosition(onSuccess);

		let lat, lng;
		
		function onSuccess(position){
			lat = position.coords.latitude;
			lng = position.coords.longitude;
		
			console.log(lat+","+lng);
		
			getDataFromLatLong();
		}
		
		const getDataFromLatLong = async () => {
			const response = await fetch('https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json');
			const result = await response.json();
			//const json = JSON.parse(result);

			console.log(result);
		}
	}
}