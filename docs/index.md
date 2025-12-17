---
layout: home

hero:
  name: "Elsai Guardrails"
  text: "Programmable Guardrails"
  tagline: for LLM-based Applications
  image:
    src: /elsaiguardrails_1.png
    alt: Elsai Guardrails Architecture
  actions:
    - theme: brand
      text: View Documentation
      link: /getting-started/quick-start

features:
  - title: Comprehensive Protection
    details: Detect and block toxic content, sensitive data, jailbreak attempts, and malicious requests
  - title: Flexible Configuration
    details: YAML-based or programmatic configuration with customizable thresholds and rules
  - title: Easy Integration
    details: Simple Python API with async support, detailed results, and input/output validation
  - title: Multi-LLM Support
    details: Works with OpenAI, Azure OpenAI, Anthropic, Gemini, AWS Bedrock, and more
  - title: Detailed Results
    details: Get comprehensive information about guardrail checks and blocking reasons
  - title: Separate Checks
    details: Full control with separate input and output validation for custom LLM integrations
---

## Why Elsai Guardrails?

Elsai Guardrails provides a comprehensive solution for securing your LLM-based applications. With built-in protection against common threats and flexible configuration options, you can ensure your AI applications are safe and compliant.

### Key Features

- **Toxicity Detection**: Automatically detect and block offensive or harmful content
- **Sensitive Data Protection**: Identify and protect personal information like emails, phone numbers, and credit cards
- **Content Classification**: Detect jailbreak attempts, prompt injection, and malicious code using semantic routing
- **Multi-LLM Integration**: Seamless integration with major LLM providers
- **Flexible Deployment**: Use as a wrapper or perform separate input/output checks

### Quick Example

```python
from elsai_guardrails.guardrails import LLMRails

# Initialize with configuration
rails = LLMRails.from_config("config.yml")

# Safe LLM calls with automatic guardrails
response = rails.generate(
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### Get Started

Ready to secure your LLM application? Check out our [Installation Guide](/getting-started/installation) to get started in minutes!
