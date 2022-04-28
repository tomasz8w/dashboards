import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Titlebar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Dashboards</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Titlebar;
