class Geolocation {
	static draw(){
		navigator.geolocation.getCurrentPosition(onSuccess, onError);

		function onSuccess(position){		
			getDataFromLatLong(position.coords.latitude, position.coords.longitude);
		}

		function onError() {
			document.getElementById('geolocation_region').innerHTML = 'Escape from your reality';
		}

		const getDataFromLatLong = async (lat, lng) => {
			const response = await fetch('https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json');
			const result = await response.json();
	
			let town = result['address']['village'];
			let state = result['address']['state'];
			let country = result['address']['country'];

			if(!state){
				document.getElementById('geolocation_region').innerHTML = 'Escape from ' + country;
			}
			else if(!town){
				document.getElementById('geolocation_region').innerHTML = 'Escape from ' + state + ', ' + country;
			}
			else{
				document.getElementById('geolocation_region').innerHTML = 'Escape from ' + town + ' (' + state + ', ' + country + ')';
			}
		}
	}	
}