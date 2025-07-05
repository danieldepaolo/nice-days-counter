import { useMemo } from "react";
import { createFilter } from "react-select";
import { Typography } from "@mui/material";

import DropdownField from "../formFields/DropdownField";
import VirtualizedSelect from "./form/VirtualizedSelect";
import CustomOption from "./form/CustomSelectOption";

import orderBy from "lodash/orderBy";
import citiesData from "../data/geonames-all-cities-with-a-population-10000.json";

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

const yearOptions = [
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
];

const QueryForm = ({ fieldState, handleChange }) => {
  const cityOptions = useMemo(() => {
    const significantCities = citiesData.filter(
      (record) => record.population > 5000
    );

    return orderBy(
      significantCities,
      (record) => record.population,
      "desc"
    ).map((record) => ({
      value: record,
      label: `${record.name}, ${record.admin1_code}`,
    }));
  }, []);

  return (
    <>
      <Typography variant="h5">City and Year</Typography>
      <div className="query-form">
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
            handleChange("city", value);
          }}
          value={fieldState.city}
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
            handleChange("compareCity", value);
          }}
          value={fieldState.compareCity}
        />
        <DropdownField
          name="year"
          label="Year"
          options={yearOptions}
          onChange={(val) => {
            handleChange("year", val);
          }}
          value={fieldState.year}
        />
      </div>
    </>
  );
};

export default QueryForm;
