import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextareaContent from "./TextareaContent"
import { TextContext } from "./../../providers/App/TextProvider"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
            maxWidth: "600px",
        }}
        {...other}
        >
        {value === index && (
            <Box>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

export default function TabsContent({value}: {value: number}) {
    const [texts, setTexts] = useContext(TextContext) || [];

    return (
        <div>
            {texts?.map((text, index) => (
                <TabPanel value={value} index={index}>
                    <TextareaContent index={index}/>
                </TabPanel>
            ))}
        </div>
    );
}