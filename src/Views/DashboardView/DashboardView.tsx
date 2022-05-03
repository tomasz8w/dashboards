import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import ViewContainer from "App/ViewContainer";
import StackCard from "./components/StackCard";
import { useDashboardStore } from "stores/dashboardStore";

const DashboardView = () => {
  const { lists, createList, addCard } = useDashboardStore();

  const handleCreateList = () => {
    createList("New List");
  };

  return (
    <ViewContainer>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "baseline",
        }}
      >
        {lists?.map((list) => (
          <StackCard key={list.id} listId={list.id} />
        ))}

        <Button onClick={handleCreateList} startIcon={<AddIcon />}>
          New list
        </Button>
      </Box>
    </ViewContainer>
  );
};

export default DashboardView;
