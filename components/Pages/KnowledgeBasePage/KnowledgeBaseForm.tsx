import { useState } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

import Document from "./Document"
import Website from "./Website"
import Text from "./Text"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface KnowledgeBaseFormProps {
    knowledgeBase: string | string[];
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className="w-full h-full"
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems:'center', width:'100%', height:'100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const KnowledgeBaseForm:React.FC<KnowledgeBaseFormProps>= ({knowledgeBase }) => {

    const [value, setValue] = useState(0);
    console.log(knowledgeBase)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height:'100%', flexGrow:'1', display:'flex', flexDirection:'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary">
                    <Tab label="Document" {...a11yProps(0)} />
                    <Tab label="Website" {...a11yProps(1)} />
                    <Tab label="Text" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Document />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Website />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Text />
            </CustomTabPanel>
        </Box>
    )
}

export default KnowledgeBaseForm