# Architecture

Overview of Elsai Guardrails architecture and design.

## System Architecture

Elsai Guardrails follows a layered architecture:

```
User Input
    ↓
Input Rails (Validation)
    ↓
LLM Processing
    ↓
Output Rails (Validation)
    ↓
User Response
```

## Components

### GuardrailSystem

Core component that performs safety checks:
- Toxicity detection
- Sensitive data detection
- Content classification

### LLMRails

High-level component that integrates:
- LLM configuration and invocation
- Input validation
- Output validation
- Result aggregation

### Configuration System

YAML-based configuration for:
- LLM settings
- Guardrail behavior
- Thresholds and rules

## Data Flow

### Input Processing

1. User sends input
2. Input rails validate content
3. If validation fails → Block and return error
4. If validation passes → Proceed to LLM

### LLM Processing

1. Format messages for LLM
2. Invoke LLM API
3. Receive response

### Output Processing

1. LLM generates response
2. Output rails validate content
3. If validation fails → Block and return error
4. If validation passes → Return to user

## Guardrail Checks

### Toxicity Detection

- Uses remote API service
- Classifies content as toxic/offensive/non-toxic
- Configurable threshold

### Sensitive Data Detection

- Uses BERT-based model
- Detects various PII types
- Configurable blocking

### Content Classification

- Uses semantic routing
- Detects jailbreak, malicious, injection attempts
- Requires an embedding encoder (configurable via ENCODER_TYPE)

## LLM Integration

Supports multiple providers through unified interface:
- OpenAI
- Azure OpenAI
- Anthropic
- Gemini
- AWS Bedrock

## Configuration

Flexible configuration through:
- YAML files
- YAML strings
- Programmatic configuration

## Next Steps

- [Glossary](glossary.md) - Terminology
- [FAQ](faq.md) - Common questions

