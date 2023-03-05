## Commands that were helpful for me:

```
xsel -b >> some.txt
sed 's/"},{"to":"/\n/g' export.csv > intermediate.csv
sed 's/"},{"to":"/,/g' export.csv > intermediate.csv
tr '\n' ',' < input.csv > output.csv
tr -cd 'x' < input.csv | wc -c
sed -E 's/,$//' clean > very_clean
```

delete ugly stuff in first and last line manually

this didn't actually change the file contents:
npx ts-node ./scripts/generate-tree.ts --in_file=./data/poapHoldersBefore2023-03-01.csv --out_file=./data/merkleTree.txt --num=1106363
