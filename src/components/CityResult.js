import { Box, Typography } from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import isEmpty from "lodash/isEmpty"
import { wikiUrl } from '../util/constants';
import { getCityNameFromRecord } from '../util/helpers';

const CityResult = ({ city, color }) => {
  if (isEmpty(city)) return null

  const { city: cityData, niceDayCount, year } = city
  const cityLabel = getCityNameFromRecord(cityData)

  const getWikiUrl = label => label ? `${wikiUrl}${label.replace(' ', '_')}` : null

  return (
    <Box>
      <div>
        <Typography variant="h6">
          <Box component="span" color={color}>{cityLabel}</Box>{' '}
          <a
            href={getWikiUrl(cityLabel)}
            className="better-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InfoOutlinedIcon fontSize='small' />
          </a>
        </Typography>
        <Typography
          color="textSecondary"
          variant="subtitle2"
        >
          {`Population ${
            Number(cityData.fields.population).toLocaleString()}`}
        </Typography>
      </div>
      <Box mt={2}>
        <Typography variant="body1">
          {niceDayCount} nice days in {year}
        </Typography>
      </Box>
    </Box>
  )
}

export default CityResult
