const puppeteer = require('puppeteer');
const express = require('express');

async function convertCanvasToImage(name) {
    const url = `https://www.minecraftpfp.com/generate?ign=${name}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    // 隐藏 gradientCanvas
    await page.evaluate(() => {
        const gradientCanvas = document.querySelector('#gradientCanvas');
        const navBar = document.querySelector('#navBar');
        const footer = document.querySelector('#footer');
        const svelte_announcer = document.querySelector('#svelte-announcer');
        const inputWrapper = document.querySelector('#inputWrapper');
        const SaveButtonWrapper = document.querySelector('#SaveButtonWrapper');
        const button = document.querySelectorAll("#uiWrapper button")
        if (gradientCanvas || navBar || footer || svelte_announcer || inputWrapper || SaveButtonWrapper || button) {
            gradientCanvas.style.display = 'none';
            gradientCanvas.style.display = 'none';
            navBar.style.display = 'none';
            footer.style.display = 'none';
            svelte_announcer.style.display = 'none';
            inputWrapper.style.display = 'none';
            SaveButtonWrapper.style.display = 'none';
            button.forEach(button => button.style.display = 'none');
        }
    });

    // 获取 Canvas 元素并等待其加载完成
    await page.waitForSelector('#profileCanvas');
    const canvasElement = await page.$('#profileCanvas');
    const imageBuffer = await canvasElement.screenshot();

    await browser.close();

    return imageBuffer;
}

async function removeBg(blob) {
    const fileBlob = new Blob([blob], { type: 'image/png' });
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", fileBlob);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": "API-KEY" },
        body: formData,
    });

    if (response.ok) {
        return await response.arrayBuffer();
    } else {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
}

// 假设您有一个 HTTP 服务器来处理请求
const app = express();

app.get('/getMCpfp', async (req, res) => {
    const name = req.query.name;
    if(!name){
        return res.status(500).json({ error: 'name is null' });
    }
    const imageBuffer = await convertCanvasToImage(name);
    const rbgResultData = await removeBg(imageBuffer);

    res.writeHead(300, { 'Content-Type': 'image/png' });

    const buffer = Buffer.from(rbgResultData);
    res.end(buffer);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
