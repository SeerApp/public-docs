import { defineConfig } from 'vitepress'

export default defineConfig({
    srcDir: './content',
    title: 'Seer Docs',
    description: 'Documentation for Seer — Solana program debugger',
    head: [['link', { rel: 'icon', href: '/icon.png' }]],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'In a Nutshell', link: '/in_a_nutshell/' },
            { text: 'Getting started', link: '/get_started/'},
        ],
        sidebar: [
            {
                items: [
                    { text: 'In a Nutshell', link: '/in_a_nutshell/' },
                    { text: 'Getting started', link: '/get_started/'},
                ],
            },
        ],
        socialLinks: [],
    },
})
