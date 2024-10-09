import Http "mo:base/Http";

actor WeatherApp {
    public query func getWeather(location: Text): async Text {
        let apiKey = "YOUR_API_KEY";
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" # location # "&appid=" # apiKey # "&units=metric";
        
        let response = await Http.get(url);
        switch (response) {
            case (result) {
                // Parse response JSON dan ambil data yang diperlukan
                return "Cuaca di " # location # ": " # ...; // Ambil data cuaca dari JSON
            };
            case (err) {
                return "Gagal mengambil data cuaca.";
            };
        }
    };

    public query func getNews(): async [Text] {
        let apiKey = "YOUR_API_KEY";
        let url = "https://newsapi.org/v2/everything?q=weather&apiKey=" # apiKey;
        
        let response = await Http.get(url);
        switch (response) {
            case (result) {
                // Parse response JSON dan ambil data berita
                return [...]; // Kembalikan daftar berita
            };
            case (err) {
                return ["Gagal mengambil berita."];
            };
        }
    };
};
