import puppeteer from "puppeteer";
export async function htmlToPdf(html) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm",
        },
    });
    await browser.close();
    return pdf;
}
//# sourceMappingURL=html-to-pdf.js.map