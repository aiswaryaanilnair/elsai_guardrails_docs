# Basic Examples

Simple examples to get started with Elsai Guardrails.

## Example 1: Basic Generation

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."
  temperature: 0.7

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

response = rails.generate(
    messages=[{"role": "user", "content": "What is artificial intelligence?"}]
)
print(response)
```

## Example 2: Using Configuration File

**config.yml:**
```yaml
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  input_checks: true
  output_checks: true
```

**Python:**
```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

response = rails.generate(
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Example 3: Detailed Results

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

result = rails.generate(
    messages=[{"role": "user", "content": "test input"}],
    return_details=True
)

print(f"Blocked: {result['blocked']}")
print(f"Block Reason: {result.get('block_reason', 'N/A')}")
print(f"Final Response: {result['final_response']}")

if result.get('input_check'):
    print(f"\nInput Check:")
    print(f"  Passed: {result['input_check'].passed}")
    print(f"  Message: {result['input_check'].message}")
    print(f"  Toxicity: {result['input_check'].toxicity}")
    print(f"  Sensitive Data: {result['input_check'].sensitive_data}")
    print(f"  Semantic Class: {result['input_check'].semantic_class}")
```

## Example 4: Input Validation Only

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True
)
guardrail = GuardrailSystem(config=config)

user_input = "My email is user@example.com"
result = guardrail.check_input(user_input)

print(f"Input: {user_input}")
print(f"Passed: {result.passed}")
print(f"Message: {result.message}")
print(f"Sensitive Data: {result.sensitive_data.get('predicted_labels', [])}")
```

## Example 5: Output Validation Only

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)

llm_output = "Here is some information about your query."
result = guardrail.check_output(llm_output)

print(f"Output: {llm_output}")
print(f"Passed: {result.passed}")
print(f"Message: {result.message}")
```

## Example 6: Conversation with Multiple Messages

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  input_checks: true
  output_checks: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

messages = [
    {"role": "user", "content": "What is AI?"},
    {"role": "assistant", "content": "AI stands for Artificial Intelligence..."},
    {"role": "user", "content": "Can you give me more details?"}
]

response = rails.generate(messages=messages)
print(response)
```

## Example 7: Async Generation

```python
import asyncio
from elsai_guardrails.guardrails import LLMRails, RailsConfig

async def main():
    yaml_content = """
    llm:
      engine: "openai"
      model: "gpt-4o-mini"
      api_key: "sk-..."
    
    guardrails:
      input_checks: true
      output_checks: true
    """
    
    config = RailsConfig.from_content(yaml_content=yaml_content)
    rails = LLMRails(config=config)
    
    result = await rails.generate_async(
        messages=[{"role": "user", "content": "Hello!"}]
    )
    
    print(result)

asyncio.run(main())
```

## Example 8: Different LLM Providers

### OpenAI
```python
yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."
"""
```

### Azure OpenAI
```python
yaml_content = """
llm:
  engine: "azure_openai"
  endpoint: "https://your-endpoint.openai.azure.com"
  api_version: "2024-02-15-preview"
  api_key: "your-key"
  model: "gpt-4"
"""
```

### Anthropic
```python
yaml_content = """
llm:
  engine: "anthropic"
  model: "claude-3-sonnet-20240229"
  api_key: "sk-ant-..."
"""
```

### Gemini
```python
yaml_content = """
llm:
  engine: "gemini"
  model: "gemini-pro"
  api_key: "AIza..."
"""
```

### AWS Bedrock
```python
yaml_content = """
llm:
  engine: "bedrock"
  aws_access_key: "AKIA..."
  aws_secret_key: "wJalr..."
  aws_region: "us-east-1"
  model_id: "anthropic.claude-v2"
"""
```

## Next Steps

- [Advanced Examples](advanced-examples.md) - More complex use cases
- [Integration Examples](integration-examples.md) - Framework integrations

