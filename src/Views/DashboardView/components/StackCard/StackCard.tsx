import { Box, IconButton, Paper, Typography } from "@mui/material";
import { MoreVert as MoreIcon } from "@mui/icons-material";

const StackCard = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        p: 1,
        flex: "auto",
        maxWidth: "300px",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography>Stack card</Typography>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default StackCard;
