import { Typography } from "@mui/material";

const SectionHeading = ({ children, ...typographyProps }) => {
  return (
    <Typography
      variant="h5"
      sx={{ letterSpacing: 1, textTransform: "uppercase" }}
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};

export default SectionHeading;
