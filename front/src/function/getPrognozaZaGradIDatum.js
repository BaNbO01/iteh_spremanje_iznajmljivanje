import axios from "axios";

export async function getPrognozaZaGradIDatum(grad, datum) {
  try {
    if (!grad || !datum) return null;

    // 1. Ekstrakcija isključivo YYYY-MM-DD dela ako datum sadrži i vreme
    const formattedDatum = String(datum).split("T")[0];

    // 2. Validacija opsega datuma (Open-Meteo forecast podržava od danas do +16 dana)
    const targetDate = new Date(formattedDatum);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxForecastDate = new Date();
    maxForecastDate.setDate(today.getDate() + 16);

    // Ako je datum u prošlosti ili dalje od 16 dana, nemoj slati zahtev
    if (targetDate < today || targetDate > maxForecastDate) {
      return null;
    }

    // 3. Geocoding poziv
    const geoRes = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        grad,
      )}&count=1&format=json`,
    );

    if (!geoRes.data.results?.length) {
      throw new Error("Grad nije pronađen");
    }

    const { latitude, longitude } = geoRes.data.results[0];

    // 4. Forecast poziv sa očišćenim datumom
    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${formattedDatum}&end_date=${formattedDatum}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto`,
    );

    const daily = weatherRes.data?.daily;
    if (!daily || !daily.temperature_2m_max?.length) {
      return null;
    }

    return {
      grad,
      datum: formattedDatum,
      maxTemp: daily.temperature_2m_max[0],
      minTemp: daily.temperature_2m_min[0],
      kisaMm: daily.precipitation_sum[0],
      weatherCode: daily.weathercode[0],
    };
  } catch (error) {
    console.error("Greška pri preuzimanju prognoze:", error);
    return null;
  }
}
