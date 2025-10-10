const docx4js = require('docx4js');
const fs = require('fs');
const path = require('path');

async function testConversion() {
  try {
    const filePath = '/Users/tald/Desktop/68900-06-25 (1).docx';
    const buffer = fs.readFileSync(filePath);

    console.log('Loading docx file...');
    const docx = await docx4js.load(buffer);

    console.log('Rendering to HTML...');
    const rendered = await docx.render((type, props, children) => {
      console.log(`Type: ${type}, Props:`, props);

      switch (type) {
        case 'document':
          return `<div dir="rtl" class="docx-content">${children}</div>`;

        case 'p':
          const pAlign = props?.align || 'right';
          return `<p style="text-align: ${pAlign};">${children || ''}</p>`;

        case 'r':
          let runStyle = '';
          if (props?.bold) runStyle += 'font-weight: bold;';
          if (props?.italic) runStyle += 'font-style: italic;';
          if (props?.underline) runStyle += 'text-decoration: underline;';
          if (props?.color) runStyle += `color: #${props.color};`;
          if (props?.fontSize) runStyle += `font-size: ${props.fontSize}pt;`;
          if (props?.fontFamily) runStyle += `font-family: '${props.fontFamily}', serif;`;

          return runStyle ? `<span style="${runStyle}">${children || ''}</span>` : `<span>${children || ''}</span>`;

        case 't':
          return children || '';

        case 'table':
          return `<table style="width: 100%; border-collapse: collapse; border: 1px solid #000;">${children || ''}</table>`;

        case 'tr':
          return `<tr>${children || ''}</tr>`;

        case 'td':
          return `<td style="border: 1px solid #000; padding: 8px;">${children || ''}</td>`;

        case 'img':
          if (props?.src) {
            return `<img src="${props.src}" style="max-width: 100%;" />`;
          }
          return '';

        default:
          if (children) {
            return typeof children === 'string' ? children : `<span>${children}</span>`;
          }
          return '';
      }
    });

    console.log('\n\nRendered HTML:');
    console.log(rendered);

    // Save to file
    fs.writeFileSync('/Users/tald/Projects/mindlaw/test-output.html', rendered);
    console.log('\nSaved to test-output.html');

  } catch (error) {
    console.error('Error:', error);
  }
}

testConversion();
