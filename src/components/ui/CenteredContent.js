import { Box } from "@mui/material";

const CenteredContent = ({ children, minHeight, width }) => {
  return (
    <Box position="relative" width={width} minHeight={minHeight}>
      <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
        {children}
      </Box>
    </Box>
  );
};

export default CenteredContent;
