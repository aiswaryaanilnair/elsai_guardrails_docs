import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Elsai Guardrails',
  description: 'Programmable guardrails for LLM-based applications',
  
  themeConfig: {
    logo: '/elsai.png',
    siteTitle: false,
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/installation' },
      { text: 'Configuration', link: '/configuration/overview' },
      { text: 'API Reference', link: '/guardrails-library/overview' },
      { text: 'Examples', link: '/examples/basic-examples' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/getting-started/configuration' }
          ]
        },
        {
          text: 'Configuration Guide',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/configuration/overview' },
            { text: 'LLM Configuration', link: '/configuration/llm-config' },
            { text: 'Guardrails Configuration', link: '/configuration/guardrails-config' },
            { text: 'YAML Configuration', link: '/configuration/yaml-config' }
          ]
        },
        {
          text: 'Guardrails Library',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/guardrails-library/overview' },
            { text: 'GuardrailSystem', link: '/guardrails-library/guardrail-system' },
            { text: 'LLMRails', link: '/guardrails-library/llm-rails' },
            { text: 'GuardrailResult', link: '/guardrails-library/guardrail-result' }
          ]
        },
        {
          text: 'Guardrails Process',
          collapsed: false,
          items: [
            { text: 'Input Rails', link: '/guardrails-process/input-rails' },
            { text: 'Output Rails', link: '/guardrails-process/output-rails' },
            { text: 'Toxicity Detection', link: '/guardrails-process/toxicity-detection' },
            { text: 'Sensitive Data Detection', link: '/guardrails-process/sensitive-data' },
            { text: 'Content Classification', link: '/guardrails-process/semantic-classification' }
          ]
        },
        {
          text: 'Python API',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/python-api/overview' },
            { text: 'Basic Usage', link: '/python-api/basic-usage' },
            { text: 'Separate Checks', link: '/python-api/separate-checks' },
            { text: 'Advanced Usage', link: '/python-api/advanced-usage' },
            { text: 'Async Support', link: '/python-api/async-support' }
          ]
        },
        {
          text: 'Examples',
          collapsed: false,
          items: [
            { text: 'Basic Examples', link: '/examples/basic-examples' },
            { text: 'Advanced Examples', link: '/examples/advanced-examples' },
            { text: 'Integration Examples', link: '/examples/integration-examples' }
          ]
        },
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'Architecture', link: '/reference/architecture' },
            { text: 'FAQ', link: '/reference/faq' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Elsai Foundry'
    }
  }
})
