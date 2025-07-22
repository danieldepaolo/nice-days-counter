import { Box, Link, Typography } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

import isEmpty from "lodash/isEmpty";
import { wikiUrl } from "../util/constants";

const CityResult = ({ city, color, containerStyles }) => {
  if (isEmpty(city)) return null;

  const { city: cityData, niceDayCount, year } = city;
  const { name, population } = cityData;

  const getWikiUrl = (label) =>
    label ? `${wikiUrl}${label.replace(" ", "_")}` : null;

  return (
    <Box sx={containerStyles}>
      <Typography variant="h6">
        <Box component="span" color={color}>
          {name}
        </Box>{" "}
        <Link
          href={getWikiUrl(name)}
          sx={{ position: "relative", top: 4 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <OpenInNew fontSize="small" />
        </Link>
      </Typography>
      <Typography color="textSecondary" variant="subtitle2">
        {`Population ${population.toLocaleString()}`}
      </Typography>
      <Box mt={1}>
        <Typography variant="body1">
          {niceDayCount} nice days in {year}
        </Typography>
      </Box>
    </Box>
  );
};

export default CityResult;
