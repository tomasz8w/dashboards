import React from "react";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const ViewContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        p: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default ViewContainer;
