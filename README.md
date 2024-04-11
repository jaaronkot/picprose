## Intro
PicProse is a article cover image generator tool for Medium, Wordpress, Wechat and other blog post

![preview](./doc/preview.jpg)

## Getting Started

**First:**
config Unsplash key

💡 create file `.env.local`, put in your unsplash key 
```
NEXT_PUBLIC_UNSPLASH_API_KEY = your_unsplash_api_key
```
Refer: [https://unsplash.com/documentation](https://unsplash.com/documentation)


**Second:**
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy

Run
 ```bash
npm run build
```

static file generate to `out` dir
