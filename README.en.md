# Minecraft PFP transparent acquisition API

Minecraft PFP transparent NodeJS API

After using `puppeteer` to obtain the image, use the `removeBg` API to automatically remove the background.

## Usage

Please go to "[removeBg](https://www.remove.bg/api)" to obtain the API and fill it in before use

1. Install dependencies

```bash
npm install
```

2. Modify the `API-KEY` in the `removeBg` position in `main.js`

```Js
headers: { "X-Api-Key": "API-KEY" },
```

```bash
# Enter the following content to use
node main.js
```

## Thanks
[MinecraftPFP](https://www.minecraftpfp.com/)

[removeBg](https://www.remove.bg/)