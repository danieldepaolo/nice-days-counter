import axios from "axios";
import { DateTime } from "luxon";

import { storeDataInCache, getCachedData, isNiceDay} from "../util/helpers";
import { defaultDailyVariables, defaultMonthNiceDays } from "../util/constants";

/* City record structure
{
  "geoname_id": "4347553",
  "name": "Aspen Hill",
  "country_code": "US",
  "admin1_code": "MD",
  "population": 48759,
  "elevation": "100",
  "timezone": "America/New_York",
  "modification_date": "2018-09-24",
  "coordinates": { "lon": -77.07303, "lat": 39.07955 }
}
*/

class WeatherDataService {
  formValues;

  constructor(formValues) {
    this.formValues = formValues;
  }

  async fetchDailyWeatherData(options) {
    const {
      city,
      startDate,
      endDate,
      dailyVariables = defaultDailyVariables,
    } = options;
    const { lat, lon } = city?.coordinates || {};

    if (!lat || !lon) {
      return {
        data: {},
        error: "City must have valid lat/lon",
      };
    }

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=${dailyVariables.join(
      ","
    )}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`;

    try {
      const { data } = await axios.get(url);
      const responseData = {
        ...data,
        daily: data.daily.time.map((day, index) => {
          const dailyData = { day };
          dailyVariables.forEach((variable) => {
            dailyData[variable] = data.daily[variable][index];
          });
          return dailyData;
        }),
      };

      return {
        data: responseData,
        error: null,
      };
    } catch (err) {
      return {
        data: {},
        error: err,
      };
    }
  }

  async fetchDailyWeatherDataForYear(options) {
    const { city, year, dailyVariables } = options;
    const localData = getCachedData(city, year);
    if (localData) {
      return {
        data: localData,
        error: null,
      };
    }

    const { data, error } = await this.fetchDailyWeatherData({
      city,
      startDate: `${year}-01-01`,
      endDate: `${year}-12-31`,
      dailyVariables,
    });

    storeDataInCache(city, year, data);

    return { data, error };
  }

  compileResultsForCity(city, dayArray) {
    const monthNiceDays = structuredClone(defaultMonthNiceDays);
    let niceDayCount = 0;

    dayArray.forEach((day) => {
      if (isNiceDay(day, this.formValues)) {
        niceDayCount++;
        const month = DateTime.fromISO(day.day).toFormat("MMMM");
        monthNiceDays[month].push(day);
      }
    });

    return {
      city,
      year: this.formValues.year,
      monthNiceDays,
      niceDayCount,
    };
  }

  async getNiceDaysDataForCity(city) {
    if (!city) {
      return {};
    }

    const { year } = this.formValues;
    const { data, error } = await this.fetchDailyWeatherDataForYear({ city, year });
    return { data: this.compileResultsForCity(city, data.daily), error };
  }
}

export default WeatherDataService;
