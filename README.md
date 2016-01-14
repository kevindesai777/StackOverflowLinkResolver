# Stack Overflow Link Preview for Mixmax

This is an open source Mixmax Link Resolver. See <http://sdk.mixmax.com/docs/tutorial-giphy-link-preview> for more information about how to use this example code in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl localhost:9146/resolver?url=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F34747143
```
