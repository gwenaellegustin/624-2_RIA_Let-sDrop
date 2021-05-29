class Geolocation {
	static onSuccess(position){		
		getDataFromLatLong(position.coords.latitude, position.coords.longitude);
	}

	static onError() {
		document.getElementById('geolocation_region').innerHTML = '<br/>' + 'Escape from your reality';
	}

	static getOptions(){
		return options = {
			enableHighAccuracy: false,
			timeout: 5000,
			maximumAge: 0
		}
	}

	static async getDataFromLatLong(lat, lng){
		const response = await fetch('https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json');
		const result = await response.json();

		let town = result['address']['village'];
		let state = result['address']['state'];
		let country = result['address']['country'];

		if(!state){
			document.getElementById('geolocation_region').innerHTML = 'Escape from: ' + country;
		}
		else if(!town){
			document.getElementById('geolocation_region').innerHTML = 'Escape from: ' + '<br/>' + state + ', ' + country;
		}
		else{
			document.getElementById('geolocation_region').innerHTML = 'Escape from: ' + '<br/>' + town + ' (' + state + ', ' + country + ')';
		}
	}
}