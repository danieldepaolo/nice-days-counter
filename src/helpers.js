export const isNiceDay = (dailyData, userFields) => {
  return (
    dailyData.apparentTemperatureHigh >= userFields.tempRange[0] &&
    dailyData.apparentTemperatureHigh <= userFields.tempRange[1] &&
    dailyData.cloudCover <= (userFields.maxCloudCover / 8) &&
    (!dailyData.precipIntensity ||
      dailyData.precipIntensity <= userFields.maxPrecipIntensity)
  );
};
