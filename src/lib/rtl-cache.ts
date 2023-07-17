// for enabling custom emotion cache for rtl support in the app (server side rendering)
import rtlPlugin from 'stylis-plugin-rtl';
import { createEmotionCache } from '@mantine/core';

export const rtlCache = createEmotionCache({
    key: 'mantine-rtl',
    stylisPlugins: [rtlPlugin],
});