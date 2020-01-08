export const isNiceDay = (dailyData, userFields) => {
  return (
    dailyData.apparentTemperatureHigh >= userFields.tempRange[0] &&
    dailyData.apparentTemperatureHigh <= userFields.tempRange[1] &&
    dailyData.cloudCover <= (userFields.maxCloudCover / 8) &&
    (!dailyData.precipIntensity ||
      dailyData.precipIntensity * 24 <= userFields.maxPrecip)
  );
};

export const getCityNameFromRecord = record =>
  `${record.fields.city}, ${record.fields.state}`

export const getMonthLabelWithChartWidth = (label, width) => {
  if (width > 930) {
    return label;
  } else if (width > 480) {
    return label.substr(0, 3);
  } else {
    return label[0];
  }
};

export const storeDataInCache = (city, year, data = {}) => {
  const cacheData = {
    city: city.fields.city,
    year,
    data
  };
  localStorage.setItem('last_city_data', JSON.stringify(cacheData));
}

export const getCachedData = (city, year) => {
  const data = localStorage.getItem('last_city_data');
  const parsedData = data ? JSON.parse(data) : null;
  return parsedData &&
         parsedData.city === city.fields.city &&
         parsedData.year === year
    ? parsedData.data
    : null;
}
