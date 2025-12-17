# Advanced Usage

Advanced patterns and techniques for using Elsai Guardrails.

## Custom LLM Integration

Integrate with custom LLM functions:

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

def custom_llm(messages):
    # Your custom LLM implementation
    return "Generated response"

config = GuardrailConfig()
guardrail = GuardrailSystem(
    llm=custom_llm,
    config=config
)

# Use guardrail for validation
user_input = "test input"
input_result = guardrail.check_input(user_input)

if input_result.passed:
    response = custom_llm([{"role": "user", "content": user_input}])
    output_result = guardrail.check_output(response)
    
    if output_result.passed:
        print(response)
    else:
        print("Output blocked")
```

## Conditional Guardrails

Enable/disable checks based on conditions:

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

# Strict mode for production
production_config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True,
    toxicity_threshold=0.5,  # Lower threshold
    block_toxic=True,
    block_sensitive_data=True
)

# Permissive mode for development
dev_config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=False,  # Allow sensitive data in dev
    check_semantic=True,
    toxicity_threshold=0.9,  # Higher threshold
    block_toxic=True,
    block_sensitive_data=False
)

# Use based on environment
import os
is_production = os.getenv('ENV') == 'production'
config = production_config if is_production else dev_config
guardrail = GuardrailSystem(config=config)
```

## Batch Processing

Process multiple inputs:

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
        'message': result.message
    })

for r in results:
    print(f"{r['input']}: {'PASSED' if r['passed'] else 'BLOCKED'}")
```

## Logging and Monitoring

Add logging for guardrail checks:

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

## Custom Block Messages

Customize block messages by wrapping the guardrail:

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

class CustomGuardrail(GuardrailSystem):
    def check_input(self, user_input: str):
        result = super().check_input(user_input)
        
        if not result.passed:
            # Customize message based on failure type
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

## Integration with Web Frameworks

### Flask Example

```python
from flask import Flask, request, jsonify
from elsai_guardrails.guardrails import LLMRails, RailsConfig

app = Flask(__name__)

# Initialize rails
config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    
    result = rails.generate(
        messages=messages,
        return_details=True
    )
    
    if result['blocked']:
        return jsonify({
            'error': result['block_reason'],
            'message': result['final_response']
        }), 400
    
    return jsonify({
        'response': result['final_response']
    })
```

### FastAPI Example

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from elsai_guardrails.guardrails import LLMRails, RailsConfig
from typing import List, Dict

app = FastAPI()

# Initialize rails
config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.post("/chat")
async def chat(request: ChatRequest):
    messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
    
    result = await rails.generate_async(
        messages=messages,
        return_details=True
    )
    
    if result['blocked']:
        raise HTTPException(
            status_code=400,
            detail={
                'error': result['block_reason'],
                'message': result['final_response']
            }
        )
    
    return {"response": result['final_response']}
```

## Next Steps

- [Async Support](async-support.md) - Asynchronous operations
- [Examples](../examples/advanced-examples.md) - More advanced examples

