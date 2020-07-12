# string-vars-action
An action to replace variables in a given string.

It expects a string containing any number of placeholders, and then attempts to populate them from the currently available environment variables.

## Inputs

### instring

The input string containing the lowercase variable names, surrounded by curly braces. **required**

### prefix

The prefix to use when inspecting the environment. Only environment variables starting with the prefix will be used when replacing the placeholders. **optional**

## Outputs

### outstring

The string after substituting the placeholders.

## Example Usage

```yaml
name: String Replace Test
on:
  push:
    branches: master
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
        - name: 'With prefix'
          env:
              STRVAR_ONE: '1'
              STRVAR_TWO: '2'
              ONE: '3'
          uses: AndreasNel/string-vars-action@master
          with:
              prefix: 'STRVAR_'
              instring: '{ONE} {ONE} {TWO}'
        - name: 'Without prefix'
          env:
              ONE: '1'
              TWO: '2'
          uses: AndreasNel/string-vars-action@master
          with:
              instring: '{ONE} {ONE} {TWO}'
```

In both cases, the string `1 1 2` will be the output.
