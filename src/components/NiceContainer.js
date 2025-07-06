import { Box } from "@mui/material";

const NiceContainer = ({ children }) => {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 5 },
        py: { xs: 3, md: 4 },
        borderRadius: { xs: 0, sm: 3 },
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        bgcolor: "rgba(235, 237, 243, 0.7)",
      }}
    >
      {children}
    </Box>
  );
};

export default NiceContainer;
