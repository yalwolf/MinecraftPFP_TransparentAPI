# Minecraft PFP 透明获取API

Minecraft PFP 透明 NodeJS API

使用`puppeteer`获取到图片后，使用`removeBg`API自动清除背景。


## 使用方法


请前往“removeBg”获取API并填写后即可使用

1. 安装依赖

```bash
npm install
```

2. 修改`main.js`中的`removeBg`位置的`API-KEY`

```Js
headers: { "X-Api-Key": "API-KEY" },
```