# LLMRails

The `LLMRails` class provides a high-level interface that combines LLM generation with guardrail checks.

## Overview

`LLMRails` integrates:
- LLM configuration and invocation
- Input validation
- LLM response generation
- Output validation
- Detailed result reporting

## Initialization

### From RailsConfig

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
```

### From Config File

```python
config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)
```

## Methods

### generate()

Generate response with guardrails (synchronous).

```python
result = rails.generate(messages=[{"role": "user", "content": "Hello"}])
```

**Parameters:**
- `messages` (List[Dict[str, str]]): List of message dicts with 'role' and 'content' keys
- `return_details` (bool, optional): If True, return detailed results. Default: False

**Returns:**
- `str`: LLM response string (if `return_details=False`)
- `Dict[str, Any]`: Detailed results dict (if `return_details=True`)

**Example - Simple Usage:**
```python
messages = [{"role": "user", "content": "What is AI?"}]
response = rails.generate(messages=messages)
print(response)
```

**Example - Detailed Results:**
```python
result = rails.generate(
    messages=[{"role": "user", "content": "test"}],
    return_details=True
)

print(f"Blocked: {result['blocked']}")
print(f"Block Reason: {result.get('block_reason', 'N/A')}")
print(f"Final Response: {result['final_response']}")

if result.get('input_check'):
    print(f"Input Check: {result['input_check'].passed}")
    
if result.get('output_check'):
    print(f"Output Check: {result['output_check'].passed}")
```

### generate_async()

Generate response with guardrails (asynchronous).

```python
result = await rails.generate_async(messages=[{"role": "user", "content": "Hello"}])
```

**Parameters:**
- `messages` (List[Dict[str, str]]): List of message dicts
- `return_details` (bool, optional): If True, return detailed results. Default: False

**Returns:**
- `str` or `Dict[str, Any]`: Same as `generate()`

**Example:**
```python
import asyncio

async def main():
    config = RailsConfig.from_content(yaml_content=yaml_content)
    rails = LLMRails(config=config)
    
    result = await rails.generate_async(
        messages=[{"role": "user", "content": "Hello"}]
    )
    print(result)

asyncio.run(main())
```

## Result Structure

When `return_details=True`, the result is a dictionary with:

```python
{
    'user_input': str,           # Extracted user input
    'messages': List[Dict],      # Original messages
    'input_check': GuardrailResult | None,  # Input validation result
    'llm_response': str | None,  # LLM generated response
    'output_check': GuardrailResult | None,  # Output validation result
    'final_response': str,       # Final response to return
    'blocked': bool,            # Whether content was blocked
    'block_reason': str | None  # Reason for blocking ('input', 'output', 'llm_error', etc.)
}
```

## Example Usage

### Basic Generation

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

response = rails.generate(
    messages=[{"role": "user", "content": "What is machine learning?"}]
)
print(response)
```

### Conversation with Multiple Messages

```python
messages = [
    {"role": "user", "content": "What is AI?"},
    {"role": "assistant", "content": "AI stands for Artificial Intelligence..."},
    {"role": "user", "content": "Can you give me more details?"}
]

response = rails.generate(messages=messages)
print(response)
```

### Getting Detailed Results

```python
result = rails.generate(
    messages=[{"role": "user", "content": "test input"}],
    return_details=True
)

if result['blocked']:
    print(f"Blocked: {result['block_reason']}")
    print(f"Message: {result['final_response']}")
    
    if result.get('input_check') and not result['input_check'].passed:
        print(f"Input blocked: {result['input_check'].message}")
    
    if result.get('output_check') and not result['output_check'].passed:
        print(f"Output blocked: {result['output_check'].message}")
else:
    print(f"Response: {result['final_response']}")
```

### Async Usage

```python
import asyncio
from elsai_guardrails.guardrails import LLMRails, RailsConfig

async def main():
    config = RailsConfig.from_content(yaml_content=yaml_content)
    rails = LLMRails(config=config)
    
    result = await rails.generate_async(
        messages=[{"role": "user", "content": "Hello"}],
        return_details=True
    )
    
    print(f"Response: {result['final_response']}")

asyncio.run(main())
```

## Block Reasons

Possible `block_reason` values:
- `'input'`: Input validation failed
- `'output'`: Output validation failed
- `'llm_error'`: LLM invocation error
- `'no_user_input'`: No user message found in messages

## Error Handling

If LLM is not configured, the system will return:
```python
{
    'blocked': False,
    'final_response': "Input validation passed. No LLM configured.",
    ...
}
```

## Next Steps

- [GuardrailSystem](guardrail-system.md) - Lower-level API
- [Python API](../python-api/overview.md) - More examples
- [Examples](../examples/basic-examples.md) - Usage examples

