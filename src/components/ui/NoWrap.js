import { Box } from "@mui/material"

const NoWrap = ({ children }) => {
  return (
    <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
      {children}
    </Box>
  )
}

export default NoWrap
