# Steps

## Requirements

NodeJS >= v14.17.0

## Installing dependencies

```sh
npm i
```

## Example of running the script

```sh
npm run build && npm run start input.txt wild_output.txt
```

## Example of results

Input:

```sh
2 7 26
5 8 31
2 5 15
3 5 20
```

Output:

```sh
15: 2 4 5 6 8 10 12 14
20: 3 5 6 9 10 12 15 18
31: 5 8 10 15 16 20 24 25 30
26: 2 4 6 7 8 10 12 14 16 18 20 21 22 24
```
