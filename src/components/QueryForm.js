import DropdownField from '../formFields/DropdownField';
import Select, { createFilter } from 'react-select';
import orderBy from 'lodash/orderBy';
import topCities from '../data/1000-largest-us-cities-by-population-with-geographic-coordinates';

import { getCityNameFromRecord } from '../util/helpers';
import { Typography } from '@mui/material';

const yearOptions = [
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" }
];

const QueryForm = ({ fieldState, handleChange }) => {
  const cityOptions =
    orderBy(
      topCities.slice(0, 1000),
      record => Number(record.fields.population),
      'desc'
    ).map(record => ({
      value: record,
      label: getCityNameFromRecord(record)
    }))

  return (
    <>
      <Typography variant="h5">City and Year</Typography>
      <div className="query-form">
        <Select
          name="city"
          label="City"
          placeholder="Select a city..."
          filterOption={createFilter({ ignoreAccents: false })}
          styles={{
            container: provided => ({
              ...provided,
              width: 265,
              height: 56
            }),
            control: provided => ({
              ...provided,
              height: '100%'
            })
          }}
          options={cityOptions}
          onChange={value => {
            handleChange("city", value)
          }}
          value={fieldState.city}
        />
        <Select
          name="compareCity"
          label="Compare city"
          placeholder="Select a compare city..."
          filterOption={createFilter({ ignoreAccents: false })}
          styles={{
            container: provided => ({
              ...provided,
              width: 265,
              height: 56
            }),
            control: provided => ({
              ...provided,
              height: '100%'
            })
          }}
          options={cityOptions}
          onChange={value => {
            handleChange("compareCity", value)
          }}
          value={fieldState.compareCity}
        />
        <DropdownField
          name="year"
          label="Year"
          options={yearOptions}
          onChange={val => {
            handleChange("year", val)
          }}
          value={fieldState.year}
        />
      </div>
    </>
  )
}

export default QueryForm
