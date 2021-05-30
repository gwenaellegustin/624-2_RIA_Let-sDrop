class Geolocation {
    static onSuccess(position){
        const getDataFromLatLong = async (lat, lng) => {    
            const response = await fetch('https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json');
            return await response.json();   
        }
        getDataFromLatLong(position.coords.latitude, position.coords.longitude)
            .then(result => {
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
            })
            .catch((error) => {
                console.error(error);
            });
    }
    static onError() {
        document.getElementById('geolocation_region').innerHTML = '<br/>' + 'Escape from your reality';
    }
    static getOptions(){
        return options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0        }
    }
}