import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ children }) {
  const [value, setValue] = React.useState(0);

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
            icon={<AccountCircleIcon />}
            iconPosition="start"
            label="Overview"
            {...a11yProps(0)}
          />
          <Tab
            icon={<SettingsIcon />}
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
