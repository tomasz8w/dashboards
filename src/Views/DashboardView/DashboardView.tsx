import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import ViewContainer from "App/ViewContainer";
import StackCard from "./components/StackCard";

const lists = [
  {
    title: "List first",
    cards: [{ title: "Karta 1 listy 1" }, { title: "Karta 2" }],
  },
  {
    title: "List second",
    cards: [
      { title: "Karta 1 listy 2" },
      { title: "Karta 2" },
      { title: "Karta 3" },
      { title: "Karta x" },
    ],
  },
];

const DashboardView = () => {
  return (
    <ViewContainer>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "baseline",
        }}
      >
        {lists.map((list) => (
          <StackCard key={list.title} title={list.title} cards={list.cards} />
        ))}

        <Button startIcon={<AddIcon />}>New list</Button>
      </Box>
    </ViewContainer>
  );
};

export default DashboardView;
