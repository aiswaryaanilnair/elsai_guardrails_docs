# Basic Usage

Common patterns and use cases for the Elsai Guardrails Python API.

## Simple Generation

The most common use case: generate LLM responses with automatic guardrails.

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

# Configuration
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

# Create rails
config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

# Generate
response = rails.generate(
    messages=[{"role": "user", "content": "What is AI?"}]
)
print(response)
```

## Using Configuration Files

Store configuration in a YAML file:

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
    messages=[{"role": "user", "content": "Hello"}]
)
```

## Conversation with Multiple Messages

```python
messages = [
    {"role": "user", "content": "What is machine learning?"},
    {"role": "assistant", "content": "Machine learning is..."},
    {"role": "user", "content": "Can you give examples?"}
]

response = rails.generate(messages=messages)
print(response)
```

## Getting Detailed Results

Get comprehensive information about guardrail checks:

```python
result = rails.generate(
    messages=[{"role": "user", "content": "test input"}],
    return_details=True
)

# Check if blocked
if result['blocked']:
    print(f"Blocked: {result['block_reason']}")
    print(f"Message: {result['final_response']}")
    
    # Input check details
    if result.get('input_check'):
        input_check = result['input_check']
        print(f"Input passed: {input_check.passed}")
        print(f"Toxicity: {input_check.toxicity}")
        print(f"Sensitive: {input_check.sensitive_data}")
        print(f"Semantic: {input_check.semantic_class}")
else:
    print(f"Response: {result['final_response']}")
```

## Input Validation Only

Validate user input without LLM generation:

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

if not result.passed:
    print(f"Input blocked: {result.message}")
    print(f"Reason: {result.sensitive_data.get('predicted_labels', [])}")
```

## Output Validation Only

Validate LLM output separately:

```python
guardrail = GuardrailSystem(config=config)

# Simulate LLM output
llm_output = "Here is the response..."

result = guardrail.check_output(llm_output)

if not result.passed:
    print(f"Output blocked: {result.message}")
```

## Custom Configuration

Create configuration programmatically:

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig, GuardrailConfig

guardrail_config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True,
    toxicity_threshold=0.7,
    block_toxic=True,
    block_sensitive_data=True
)

llm_config = {
    "engine": "openai",
    "model": "gpt-4o-mini",
    "api_key": "sk-...",
    "temperature": 0.7
}

config = RailsConfig(
    guardrail_config=guardrail_config,
    llm_config=llm_config,
    input_checks=True,
    output_checks=True
)

rails = LLMRails(config=config)
```

## Error Handling

Handle errors gracefully:

```python
try:
    result = rails.generate(
        messages=[{"role": "user", "content": "Hello"}],
        return_details=True
    )
    
    if result['blocked']:
        if result['block_reason'] == 'llm_error':
            print("LLM error occurred")
        elif result['block_reason'] == 'input':
            print("Input validation failed")
        elif result['block_reason'] == 'output':
            print("Output validation failed")
    else:
        print(f"Response: {result['final_response']}")
        
except Exception as e:
    print(f"Error: {e}")
```

## Next Steps

- [Advanced Usage](advanced-usage.md) - Advanced patterns
- [Async Support](async-support.md) - Asynchronous operations
- [Examples](../examples/basic-examples.md) - More examples

