import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { MoreVert as MoreIcon, Add as AddIcon } from "@mui/icons-material";
import Card from "../Card";
import StackCardHeader from "./StackCardHeader";
import { useDashboardStore } from "stores/dashboardStore";

type Props = {
  listId: number;
};

const StackCard = ({ listId }: Props) => {
  const { getList, addCard } = useDashboardStore();

  const list = getList(listId);

  const handleAddCard = () => {
    addCard(listId, "New card");
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        flex: "auto",
        minWidth: "200px",
        maxWidth: "300px",
        justifyContent: "center",
      }}
    >
      {list && (
        <>
          <StackCardHeader title={list.title} listId={listId} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              p: 1,
              alignItems: "center",
            }}
          >
            {list.cards.map((card) => (
              <Card key={card.id} listId={listId} cardId={card.id} />
            ))}

            <Button startIcon={<AddIcon />} onClick={handleAddCard}>
              New card
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default StackCard;
