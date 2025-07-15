import { Box } from "@mui/material";

const NiceContainer = ({ children }) => {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
        borderRadius: { xs: 0, sm: 3 },
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        bgcolor: "#fff",
      }}
    >
      {children}
    </Box>
  );
};

export default NiceContainer;
