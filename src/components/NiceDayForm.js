import { useMemo, useState } from "react";
import SliderField from "./form/SliderField";
import { Box, Button, Typography } from "@mui/material";
import orderBy from "lodash/orderBy";
import { createFilter } from "react-select";

import DropdownField from "./form/DropdownField";
import VirtualizedSelect from "./form/VirtualizedSelect";
import CustomOption from "./form/CustomSelectOption";

import { theme } from "../Theme";

import citiesData from "../data/geonames-all-cities-with-a-population-10000.json";

const tempMarks = [
  { value: 30, label: "30F" },
  { value: 50, label: "50F" },
  { value: 70, label: "70F" },
  { value: 85, label: "85F" },
  { value: 100, label: "100F" },
];

const totalPrecipMarks = [
  { value: 0.01, label: "Dry" },
  { value: 0.2, label: "Light" },
  { value: 0.4, label: "Moderate" },
  { value: 0.8, label: "Heavy" },
];

const sunshineDurationMarks = [
  { value: 0, label: "Grey" },
  { value: 2, label: "A taste" },
  { value: 4, label: "Moderate" },
  { value: 8, label: "Sunny" },
];

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
];

export const defaultFormValues = {
  tempRange: [55, 85],
  maxPrecip: 0.01,
  minSunshineDuration: 2,
  city: undefined,
  compareCity: undefined,
  year: "2022",
};

const NiceDayForm = ({ handleSubmit, isLoading }) => {
  const [tempRange, setTempRange] = useState([...defaultFormValues.tempRange]);
  const [maxPrecip, setMaxPrecip] = useState(defaultFormValues.maxPrecip);
  const [minSunshineDuration, setMinSunshineDuration] = useState(
    defaultFormValues.minSunshineDuration
  );
  const [city, setCity] = useState(defaultFormValues.city);
  const [compareCity, setCompareCity] = useState(defaultFormValues.compareCity);
  const [year, setYear] = useState(defaultFormValues.year);

  const cityOptions = useMemo(() => {
    return orderBy(citiesData, (record) => record.population, "desc").map(
      (record) => ({
        value: record,
        label: `${record.name}, ${record.admin1_code}`,
      })
    );
  }, []);

  const onPressSubmit = (e) => {
    e.preventDefault();

    handleSubmit({
      tempRange,
      maxPrecip,
      minSunshineDuration,
      city: city.value,
      compareCity: compareCity?.value,
      year,
    });
  };

  return (
    <form onSubmit={onPressSubmit}>
      <Typography variant="h4" mb={2}>City and Year</Typography>
      <Box
        mb={4}
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
        <VirtualizedSelect
          name="city"
          label="City"
          placeholder="Select a city..."
          filterOption={createFilter({ ignoreAccents: false })}
          styles={{
            container: (provided) => ({
              ...provided,
              width: 265,
              height: 56,
            }),
            control: (provided) => ({
              ...provided,
              height: "100%",
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 2,
            }),
          }}
          components={{ Option: CustomOption }}
          options={cityOptions}
          onChange={(value) => {
            setCity(value);
          }}
          value={city}
        />
        <VirtualizedSelect
          name="compareCity"
          label="Compare city"
          placeholder="Select a compare city..."
          filterOption={createFilter({ ignoreAccents: false })}
          styles={{
            container: (provided) => ({
              ...provided,
              width: 265,
              height: 56,
            }),
            control: (provided) => ({
              ...provided,
              height: "100%",
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 2,
            }),
          }}
          components={{ Option: CustomOption }}
          options={cityOptions}
          onChange={(value) => {
            setCompareCity(value);
          }}
          value={compareCity}
        />
        <DropdownField
          name="year"
          label="Year"
          options={yearOptions}
          onChange={(val) => {
            setYear(val);
          }}
          value={year}
        />
      </Box>
      <Typography variant="h4">Define "Nice Day"</Typography>
      <Box display="flex" flexDirection="column">
        <SliderField
          name="tempRange"
          label='High "Feels-like" Temperature Range'
          marks={tempMarks}
          min={30}
          onChange={(value) => {
            setTempRange(value);
          }}
          value={tempRange}
        />
        <SliderField
          name="maxPrecip"
          label="Highest Allowed Rain Total (inches)"
          marks={totalPrecipMarks}
          min={0.01}
          max={1}
          step={0.1}
          onChange={(value) => {
            setMaxPrecip(value);
          }}
          value={maxPrecip}
        />
        <SliderField
          name="minSunshineDuration"
          label="Minimum Sunshine Duration (hours)"
          marks={sunshineDurationMarks}
          min={0}
          max={8}
          onChange={(value) => {
            setMinSunshineDuration(value);
          }}
          value={minSunshineDuration}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          display: "block",
          marginTop: 4,
          padding: theme.spacing(1, 5),
        }}
        disabled={!city || isLoading}
      >
        See Results
      </Button>
    </form>
  );
};

export default NiceDayForm;
