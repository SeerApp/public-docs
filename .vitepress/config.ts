import { defineConfig } from 'vitepress'

export default defineConfig({
    srcDir: './content',
    title: 'Seer Docs',
    description: 'Documentation for Seer — Solana program debugger',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'In a Nutshell', link: '/in_a_nutshell/' },
        ],
        sidebar: [
            {
                items: [
                    { text: 'In a Nutshell', link: '/in_a_nutshell/' },
                ],
            },
        ],
        socialLinks: [],
    },
})
