const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertPdfToPng() {
  // Define the source PDF directory and target PNG directory
  const pdfDir = path.join(__dirname, 'public', 'static', 'uploads', 'papers');
  const pngDir = path.join(__dirname, 'public', 'static', 'uploads', 'teasers');
  
  // Ensure the PNG directory exists
  if (!fs.existsSync(pngDir)) {
    fs.mkdirSync(pngDir, { recursive: true });
  }
  
  // Get all PDF files
  const pdfFiles = fs.readdirSync(pdfDir).filter(file => file.endsWith('.pdf'));
  
  if (pdfFiles.length === 0) {
    console.log('No PDF files found in', pdfDir);
    return;
  }
  
  console.log(`Found ${pdfFiles.length} PDF files to convert`);
  
  // Launch browser
  const browser = await puppeteer.launch();
  
  // Process each PDF
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(pdfDir, pdfFile);
    const pngFileName = pdfFile.replace('.pdf', '.png');
    const pngPath = path.join(pngDir, pngFileName);
    
    console.log(`Converting ${pdfFile} to PNG...`);
    
    // Create a new page
    const page = await browser.newPage();
    
    // Go to PDF URL (local file)
    await page.goto(`file:${pdfPath}`, {
      waitUntil: 'networkidle2'
    });
    
    // Wait a bit for PDF.js to load and render
    await page.waitForTimeout(2000);
    
    // Take a screenshot
    await page.screenshot({
      path: pngPath,
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 600,
        height: 800
      }
    });
    
    console.log(` - Saved to ${pngPath}`);
    
    // Close the page
    await page.close();
  }
  
  // Close the browser
  await browser.close();
  console.log('All PDFs converted successfully!');
}

convertPdfToPng().catch(console.error);
