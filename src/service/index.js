import axios from 'axios';

import { storeDataInCache, getCachedData } from '../util/helpers';
import { defaultDailyVariables } from '../util/constants';

async function fetchDailyWeatherData (options) {
  const {
    city,
    startDate,
    endDate,
    dailyVariables = defaultDailyVariables
  } = options
  const lat = city?.geometry?.coordinates?.[1]
  const lon = city?.geometry?.coordinates?.[0]
  if (!lat || !lon) {
    return {
      data: {},
      error: "City must have valid lat/lon"
    }
  }

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=${dailyVariables.join(",")}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`

  try {
    const { data } = await axios.get(url)
    const responseData = {
      ...data,
      daily: data.daily.time.map((day, index) => {
        const dailyData = { day }
        dailyVariables.forEach(variable => {
          dailyData[variable] = data.daily[variable][index]
        })
        return dailyData
      })
    }
    return {
      data: responseData,
      error: null
    }
  } catch (err) {
    return {
      data: {},
      error: err
    }
  }
}

export async function fetchDailyWeatherDataForYear (options) {
  const { city, year, dailyVariables } = options
  const localData = getCachedData(city, year);
  if (localData) {
    return {
      data: localData,
      error: null
    }
  }

  const { data, error } = await fetchDailyWeatherData({
    city,
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`,
    dailyVariables
  })
  storeDataInCache(city, year, data);

  return { data, error }
}