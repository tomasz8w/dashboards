import { Box, Paper, Typography } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

type Props = {
  title: string;
};

const Card = ({ title }: Props) => (
  <Paper
    component="div"
    onMouseOver={() => console.log("hover")}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      ":hover": {
        backgroundColor: "action.hover",
        svg: {
          display: "inline",
        },
      },
      svg: {
        display: "none",
      },
      width: "100%",
      p: 1,
      backgroundColor: "action.disabledBackground",
    }}
  >
    <Typography>{title}</Typography>
    <EditIcon sx={{ fontSize: "1.2rem" }} />
  </Paper>
);

export default Card;
