type Settings = {
    enableExDodge: boolean;
};

type ChatPalette = {
    characterName: string | null;
    messages: string[];
    isBorder: boolean;
};

type Tab = {
    tabName: string;
    originText: string;
    chatPalettes: ChatPalette[];
};

export type DataModel = {
    settings: Settings;
    data: {
        [roomId: string]: {
        roomName: string;
        tabs: Tab[];
        };
    };
};