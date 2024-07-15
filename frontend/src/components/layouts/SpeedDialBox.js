import React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { SpeedDialAction } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";

export default function SpeedDialBox() {
  const navigate = useNavigate();
  const actions = [
    { icon: <FeedbackIcon />, name: "Feedback" },
    { icon: <ArrowUpwardIcon />, name: "Back to top" },
  ];

  // Hand Click of Speed Dial
  const handClick = async (action) => {
    if (action.name === "Feedback") {
      navigate("/feedback");
    }
    if (action.name === "Back to top") {
      window.scrollTo(0, 0);
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          zIndex: 100,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            "& .MuiFab-primary": {
              bgcolor: "rgb(0, 201, 170)",
              "&:hover": {
                bgcolor: "rgb(0, 201, 170)",
              },
            },
          }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                handClick(action);
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
