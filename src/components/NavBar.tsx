import { useState } from "react";
import { Transition, Box, Button, useMantineTheme } from '@mantine/core';
import { IconBook, IconChevronsLeft, IconMessageChatbot, IconHome, IconMenu2, IconColumns, IconBrandCodesandbox } from "@tabler/icons-react";
import { useClickOutside } from '@mantine/hooks';
import { useRouter, usePathname } from "next/navigation";

const data = [
    { link: '/playground', label: 'Playground', Icon: IconBrandCodesandbox },
    { link: '/market', label: 'Market', Icon: IconColumns },
];

export default function Navbar() {

    const [open, isOpen] = useState(false)
    const ref = useClickOutside(() => isOpen(false));
    const router = useRouter();
    const path = usePathname()
    const theme = useMantineTheme()

    const Tabs = data.map(({ link, label, Icon }) => (
        <div
            key={label}
            onClick={() => router.push(link)}
            style={{ backgroundColor: link === path ? theme.colors.gray[7] : "" }}
            className="flex flex-row gap-8 items-center hover:bg-slate-500 w-full p-3 rounded-sm"
        >
            <Icon />
            <div className="text-white">{label}</div>
        </div>
    ))

    return (
        <div>
            <div ref={ref}>
                <Transition mounted={open} transition="slide-right" duration={400} timingFunction="ease">
                    {(styles) => <Box style={{ ...styles, backgroundColor: theme.colors.gray[8] }} className="h-screen w-80 z-50">
                        <div className="flex flex-col pt-16 h-full">
                            {Tabs}
                        </div>
                    </Box>}
                </Transition>
            </div>
            <div className="fixed bottom-4 left-4 z-50">
                {
                    open ? (
                        <Button key="close" onClick={(e) => { isOpen(false) }}>
                            <IconChevronsLeft />
                        </Button>
                    ) : (
                        <Button key="open" onClick={(e) => { isOpen(true) }}>
                            <IconMenu2 />
                        </Button>
                    )
                }
            </div>
        </div>
    )
}