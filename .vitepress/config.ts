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
        ],
        sidebar: [
            {
                items: [
                    { text: 'In a Nutshell', link: '/in_a_nutshell/' },
                    {
                        text: 'CLI Documentation',
                        link: '/cli_documentation/',
                        collapsed: true,
                        items: [
                            { text: 'Installation', link: '/cli_documentation/installation' },
                            { text: 'Authentication', link: '/cli_documentation/authentication' },
                            { text: 'Commands Reference', link: '/cli_documentation/commands' },
                            { text: 'Sessions', link: '/cli_documentation/sessions' },
                            { text: 'Tracing Transactions', link: '/cli_documentation/tracing' },
                        ],
                    },
                ],
            },
        ],
        socialLinks: [],
    },
})
