# Async Support

Elsai Guardrails provides full support for asynchronous operations.

## Async Generation

Use `generate_async()` for asynchronous LLM generation with guardrails:

```python
import asyncio
from guardrails import LLMRails, RailsConfig

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

## Detailed Async Results

Get detailed results asynchronously:

```python
async def generate_with_details():
    config = RailsConfig.from_content(yaml_content=yaml_content)
    rails = LLMRails(config=config)
    
    result = await rails.generate_async(
        messages=[{"role": "user", "content": "test"}],
        return_details=True
    )
    
    print(f"Blocked: {result['blocked']}")
    print(f"Response: {result['final_response']}")
    
    if result.get('input_check'):
        print(f"Input passed: {result['input_check'].passed}")
    
    if result.get('output_check'):
        print(f"Output passed: {result['output_check'].passed}")

asyncio.run(generate_with_details())
```

## Concurrent Requests

Process multiple requests concurrently:

```python
async def process_multiple():
    config = RailsConfig.from_content(yaml_content=yaml_content)
    rails = LLMRails(config=config)
    
    messages_list = [
        [{"role": "user", "content": "What is AI?"}],
        [{"role": "user", "content": "What is ML?"}],
        [{"role": "user", "content": "What is NLP?"}]
    ]
    
    # Process concurrently
    tasks = [rails.generate_async(messages=msg) for msg in messages_list]
    results = await asyncio.gather(*tasks)
    
    for i, result in enumerate(results):
        print(f"Request {i+1}: {result}")

asyncio.run(process_multiple())
```

## Async with Error Handling

```python
async def generate_safe():
    config = RailsConfig.from_content(yaml_content=yaml_content)
    rails = LLMRails(config=config)
    
    try:
        result = await rails.generate_async(
            messages=[{"role": "user", "content": "Hello"}],
            return_details=True
        )
        
        if result['blocked']:
            print(f"Blocked: {result['block_reason']}")
        else:
            print(f"Response: {result['final_response']}")
            
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(generate_safe())
```

## Integration with Async Web Frameworks

### FastAPI Example

```python
from fastapi import FastAPI
from guardrails import LLMRails, RailsConfig

app = FastAPI()

config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

@app.post("/chat")
async def chat(messages: List[Dict[str, str]]):
    result = await rails.generate_async(
        messages=messages,
        return_details=True
    )
    
    if result['blocked']:
        return {"error": result['block_reason'], "message": result['final_response']}
    
    return {"response": result['final_response']}
```

## Next Steps

- [Basic Usage](basic-usage.md) - Basic patterns
- [Advanced Usage](advanced-usage.md) - Advanced patterns
- [Examples](../examples/integration-examples.md) - Integration examples

