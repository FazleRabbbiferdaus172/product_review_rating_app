#!/bin/bash

curl -s -X POST http://localhost:3000/products/1/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1",
    "author": "John Doe",
    "comment": "Great product!",
    "rating": 5
  }'

curl -X PUT http://localhost:3000/products/1/reviews/1   -H "Content-Type: application/json"   -d '{"author": "Alice", "comment": "Updated comment", "rating": 4}'

curl -X DELETE http://localhost:3000/products/1/reviews/1