import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

type Props = {
  title: string;
};

const StackCardHeader = ({ title }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isOpen = !!anchorEl;

  return (
    <Box
      sx={{
        display: "flex",
        flex: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
      <IconButton onClick={handleOpenMenu}>
        <MoreIcon />
      </IconButton>
      <Menu
        open={isOpen}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        onClick={handleCloseMenu}
      >
        <MenuItem>
          <EditIcon sx={{ mr: 1 }} />
          Rename
        </MenuItem>
        <MenuItem>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default StackCardHeader;
