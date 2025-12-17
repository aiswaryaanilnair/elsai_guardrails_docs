# Frequently Asked Questions (FAQ)

Common questions about Elsai Guardrails.

## General

### What is Elsai Guardrails?

Elsai Guardrails is a Python library that adds programmable safety checks to LLM applications, including toxicity detection, sensitive data detection, and content classification.

### What LLM providers are supported?

We support:
- OpenAI
- Azure OpenAI
- Anthropic Claude
- Google Gemini
- AWS Bedrock

### Is it free to use?

The library is open source. You'll need API keys for the LLM providers you use.

## Configuration

### How do I configure guardrails?

You can configure guardrails using YAML files or YAML strings. See the [Configuration Guide](../configuration/overview.md).

### Can I use environment variables for API keys?

Yes, you can use environment variables for API keys. See the [Configuration Guide](../configuration/yaml-config.md).

### How do I adjust toxicity threshold?

Set the `toxicity_threshold` in your configuration:

```yaml
guardrails:
  toxicity_threshold: 0.7  # Adjust as needed
```

## Usage

### How do I check input only?

Use `GuardrailSystem` directly:

```python
guardrail = GuardrailSystem(config=config)
result = guardrail.check_input("user input")
```

### How do I get detailed results?

Use `return_details=True`:

```python
result = rails.generate(
    messages=messages,
    return_details=True
)
```

### Can I use it asynchronously?

Yes, use `generate_async()`:

```python
result = await rails.generate_async(messages=messages)
```

## Troubleshooting

### Why is my input being blocked?

Check the detailed results to see which check failed:
- Toxicity detection
- Sensitive data detection
- Content classification

### How do I disable a specific check?

Set the check to `false` in configuration:

```yaml
guardrails:
  check_toxicity: false
```

### Why do I need an embedding encoder for content classification?

Content classification uses embeddings for semantic routing. The encoder type is configurable via the `ENCODER_TYPE` environment variable. Supported encoders include Azure OpenAI (default), OpenAI, Cohere, HuggingFace, FastEmbed, Ollama, Local, and more.

## Integration

### Can I use it with Flask/FastAPI?

Yes, see [Integration Examples](../examples/integration-examples.md).

### Can I use it with LangChain?

Yes, you can wrap LangChain chains with guardrails. See [Integration Examples](../examples/integration-examples.md).

