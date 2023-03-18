## Commands that were helpful for me:

```
xsel -b >> some.txt
sed 's/"},{"to":"/\n/g' export.csv > intermediate.csv
sed 's/"},{"to":"/,/g' export.csv > intermediate.csv
tr '\n' ',' < input.csv > output.csv
tr -cd 'x' < input.csv | wc -c
sed -E 's/,$//' clean > very_clean
# Converts upper to lower case
$ tr '[:upper:]' '[:lower:]' < input.txt > output.txt
```

delete ugly stuff in first and last line manually

this didn't actually change the file contents much, it seems to sort though:
npx ts-node ./scripts/generate-tree.ts --in_file=./data/poapHoldersBefore2023-03-01.csv --out_file=./data/merkleTree.txt --num=1106363

eth_denver_holders.txt was generated with this script and SimpleHash:

```
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'file_dwa.csv',
    append: true,
    header: [
        {id: 'owner', title: 'owner_address'},

    ]
});


const saveToCsv = (records) => csvWriter.writeRecords(records)

const axios = require('axios');

const accessToken = 'API_KEy';
const limit = 50;
let cursor = '';
let i = 0

async function getAllRecords() {
  let allRecords = [];

  while (true) {
    console.log("calling with cursor:", cursor)
    const url = https://api.simplehash.com/api/v0/nfts/polygon/0x6C84D94E7c868e55AAabc4a5E06bdFC90EF3Bc72?limit=${limit}${cursor ? &cursor=${cursor} : ''}
    const headers = { 'X-API-KEY': ${accessToken} };

    try {
        const response = await axios.get(url, { headers });
        const matchingNFTs = response.data.nfts.filter((nft) => {
          const extraMetadata = nft.extra_metadata  {};
          const attributes = extraMetadata.attributes  [];
          const locationAttribute = attributes.find((attr) => attr.trait_type === 'Location');
          return locationAttribute && locationAttribute.value.includes('National Western Complex -  4655 Humboldt St, Denver CO 80216');
        });

        const owners = matchingNFTs.map(v => {
            if (!v.owners || !v.owners.length) {
              console.log(v)
              return ({ owner: '' })
            }
            return ({owner: v.owners[0].owner_address})

          });

        saveToCsv(owners)
        cursor = response.data.next_cursor;
        i++


      if (i>=20000) {
        break;
      }
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return allRecords;
}

getAllRecords()
  .then((allRecords) => console.log(allRecords))
  .catch((error) => console.error(error));
```
