import { Box } from "@mui/material";

import ViewContainer from "App/ViewContainer";
import StackCard from "./components/StackCard";

const DashboardView = () => {
  return (
    <ViewContainer>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <StackCard />
        <StackCard />
      </Box>
    </ViewContainer>
  );
};

export default DashboardView;
