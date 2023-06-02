import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextareaContent from "./TextareaContent"
import { TextContext } from "../../../providers/App/TextProvider"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    focusIndex: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, focusIndex, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={focusIndex !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
            maxWidth: "600px",
        }}
        {...other}
        >
        {focusIndex === index && (
            <Box>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

export default function TabsContent({focusIndex}: {focusIndex: number}) {
    const [texts, setTexts] = useContext(TextContext) || [];

    return (
        <div>
            {texts?.map((text, index) => (
                <TabPanel focusIndex={focusIndex} index={index}>
                    <TextareaContent index={index}/>
                </TabPanel>
            ))}
        </div>
    );
}