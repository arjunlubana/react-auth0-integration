import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { AccountCircle, Settings } from "@mui/icons-material";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsHeader({ children }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="profile sections"
          centered
        >
          <Tab
            icon={<AccountCircle />}
            iconPosition="start"
            label="Overview"
            {...a11yProps(0)}
          />
          <Tab
            icon={<Settings />}
            iconPosition="start"
            label="Settings"
            {...a11yProps(1)}
          />
        </Tabs>
        {children(value)}
      </Box>
    </Box>
  );
}
