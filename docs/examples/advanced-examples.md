# Advanced Examples

Advanced examples demonstrating complex use cases.

## Example 1: Custom Block Messages

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

class CustomGuardrail(GuardrailSystem):
    def check_input(self, user_input: str):
        result = super().check_input(user_input)
        
        if not result.passed:
            if result.semantic_class == 'jailbreak':
                result.message = "We cannot process requests that attempt to bypass safety measures."
            elif result.semantic_class == 'malicious':
                result.message = "We cannot assist with potentially harmful requests."
            elif result.sensitive_data.get('predicted_labels', []) != ["No sensitive data detected"]:
                result.message = "Please do not share personal information."
        
        return result

config = GuardrailConfig()
guardrail = CustomGuardrail(config=config)
```

## Example 2: Batch Processing

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)

inputs = [
    "Hello, how are you?",
    "My email is user@example.com",
    "This is a test message"
]

results = []
for input_text in inputs:
    result = guardrail.check_input(input_text)
    results.append({
        'input': input_text,
        'passed': result.passed,
        'message': result.message,
        'toxicity': result.toxicity.get('label', 'N/A'),
        'sensitive': result.sensitive_data.get('predicted_labels', [])
    })

for r in results:
    status = 'PASSED' if r['passed'] else 'BLOCKED'
    print(f"{r['input']}: {status}")
    if not r['passed']:
        print(f"  Reason: {r['message']}")
```

## Example 3: Conditional Configuration

```python
import os
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

# Production: strict
production_config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True,
    toxicity_threshold=0.5,
    block_toxic=True,
    block_sensitive_data=True
)

# Development: permissive
dev_config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=False,
    check_semantic=True,
    toxicity_threshold=0.9,
    block_toxic=True,
    block_sensitive_data=False
)

# Use based on environment
is_production = os.getenv('ENV') == 'production'
config = production_config if is_production else dev_config
guardrail = GuardrailSystem(config=config)
```

## Example 4: Logging and Monitoring

```python
import logging
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)

def check_with_logging(text):
    result = guardrail.check_text(text)
    
    logger.info(f"Text: {text[:50]}...")
    logger.info(f"Passed: {result.passed}")
    
    return result

result = check_with_logging("test input")
```

## Example 5: Concurrent Async Requests

```python
import asyncio
from elsai_guardrails.guardrails import LLMRails, RailsConfig

async def process_multiple():
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
    
    messages_list = [
        [{"role": "user", "content": "What is AI?"}],
        [{"role": "user", "content": "What is ML?"}],
        [{"role": "user", "content": "What is NLP?"}]
    ]
    
    tasks = [rails.generate_async(messages=msg) for msg in messages_list]
    results = await asyncio.gather(*tasks)
    
    for i, result in enumerate(results):
        print(f"Request {i+1}: {result}")

asyncio.run(process_multiple())
```

## Example 6: Error Handling

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

def safe_generate(rails, messages):
    try:
        result = rails.generate(
            messages=messages,
            return_details=True
        )
        
        if result['blocked']:
            if result['block_reason'] == 'llm_error':
                return {"error": "LLM service unavailable", "retry": True}
            elif result['block_reason'] == 'input':
                return {"error": "Input validation failed", "retry": False}
            elif result['block_reason'] == 'output':
                return {"error": "Output validation failed", "retry": False}
        else:
            return {"response": result['final_response']}
            
    except Exception as e:
        return {"error": str(e), "retry": True}

# Usage
config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

result = safe_generate(rails, [{"role": "user", "content": "Hello"}])
print(result)
```

## Example 7: Custom LLM Wrapper

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

def custom_llm_with_guardrails(messages, guardrail):
    # Check input
    user_input = ' '.join([msg.get('content', '') for msg in messages if msg.get('role') == 'user'])
    input_result = guardrail.check_input(user_input)
    
    if not input_result.passed:
        return f"Input blocked: {input_result.message}"
    
    # Generate response (your LLM logic here)
    response = "Generated response from custom LLM"
    
    # Check output
    output_result = guardrail.check_output(response)
    
    if not output_result.passed:
        return f"Output blocked: {output_result.message}"
    
    return response

# Usage
config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)

messages = [{"role": "user", "content": "Hello"}]
response = custom_llm_with_guardrails(messages, guardrail)
print(response)
```

## Next Steps

- [Integration Examples](integration-examples.md) - Framework integrations
- [Basic Examples](basic-examples.md) - Simple use cases

