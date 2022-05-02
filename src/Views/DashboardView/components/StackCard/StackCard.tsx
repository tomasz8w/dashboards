import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { MoreVert as MoreIcon, Add as AddIcon } from "@mui/icons-material";
import Card from "../Card";
import StackCardHeader from "./StackCardHeader";

import { CardProps } from "../Card/CardProps";

type Props = {
  title: string;
  cards: CardProps[];
};

const StackCard = ({ title, cards }: Props) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        flex: "auto",
        maxWidth: "300px",
        justifyContent: "center",
      }}
    >
      <StackCardHeader title={title} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          p: 1,
          alignItems: "center",
        }}
      >
        {cards.map((card) => (
          <Card key={card.title} title={card.title} />
        ))}

        <Button startIcon={<AddIcon />}>New card</Button>
      </Box>
    </Paper>
  );
};

export default StackCard;
