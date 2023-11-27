export const isNiceDay = (dailyData, userFields) => {
  const isNice = (
    dailyData.apparent_temperature_max >= userFields.tempRange[0] &&
    dailyData.apparent_temperature_max <= userFields.tempRange[1] &&
    dailyData.rain_sum <= userFields.maxPrecip &&
    dailyData.sunshine_duration >= userFields.minSunshineDuration * 60 * 60 // sunshine_duration is seconds, minSunshineDuration is hours
  );
  return isNice
};

export const getCityNameFromRecord = record =>
  record ? `${record.fields?.city}, ${record.fields?.state}` : "N/A"

export const getMonthLabelWithChartWidth = (label, width) => {
  if (width > 930) {
    return label;
  } else if (width > 480) {
    return label.substr(0, 3);
  } else {
    return label[0];
  }
};

export const convertCityToKey = (cityName, year) => `${cityName.replace(/\s/g, "_").toLowerCase()}_${year}`

export const storeDataInCache = (city, year, data = {}) => {
  localStorage.setItem(convertCityToKey(city.fields.city, year), JSON.stringify(data));
}

export const getCachedData = (city, year) => {
  const data = localStorage.getItem(convertCityToKey(city.fields.city, year));
  const parsedData = data ? JSON.parse(data) : null;
  return parsedData
}
