export const isNiceDay = (dailyData, userFields) => {
  return (
    dailyData.apparentTemperatureHigh >= userFields.tempRange[0] &&
    dailyData.apparentTemperatureHigh <= userFields.tempRange[1] &&
    dailyData.cloudCover <= (userFields.maxCloudCover / 8) &&
    (!dailyData.precipIntensity ||
      dailyData.precipIntensity <= userFields.maxPrecipIntensity)
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
