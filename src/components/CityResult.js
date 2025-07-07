import { Box, Paper, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import isEmpty from "lodash/isEmpty";
import { wikiUrl } from "../util/constants";

const CityResult = ({ city, color }) => {
  if (isEmpty(city)) return null;

  const { city: cityData, niceDayCount, year } = city;
  const { name, population } = cityData;

  const getWikiUrl = (label) =>
    label ? `${wikiUrl}${label.replace(" ", "_")}` : null;

  return (
    <Paper
      elevation={1}
      sx={{
        py: 2,
        px: 3,
        borderRadius: 2,
        backgroundColor: '#c1d8eb4a'
      }}
    >
      <Typography variant="h6">
        <Box component="span" color={color}>
          {name}
        </Box>{" "}
        <a
          href={getWikiUrl(name)}
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InfoOutlinedIcon fontSize="small" />
        </a>
      </Typography>
      <Typography color="textSecondary" variant="subtitle2">
        {`Population ${population.toLocaleString()}`}
      </Typography>
      <Box mt={2}>
        <Typography variant="body1">
          {niceDayCount} nice days in {year}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CityResult;
