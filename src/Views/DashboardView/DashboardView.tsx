import React from "react";
import { Box, Paper, Typography } from "@mui/material";

import ViewContainer from "../../App/ViewContainer";

const DashboardView = () => {
  return (
    <ViewContainer>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Paper elevation={2} sx={{ display: "flex", p: 1 }}>
          <Typography>stack card</Typography>
        </Paper>
        <Paper elevation={2} sx={{ display: "flex", p: 1 }}>
          <Typography>stack card</Typography>
        </Paper>
      </Box>
    </ViewContainer>
  );
};

export default DashboardView;
