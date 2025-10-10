const mammoth = require('mammoth');
const fs = require('fs');

async function testMammoth() {
  const filePath = '/Users/tald/Desktop/68900-06-25 (1).docx';
  const buffer = fs.readFileSync(filePath);

  const result = await mammoth.convertToHtml(
    { buffer },
    {
      styleMap: [
        "p[style-name='Heading 1'] => h1.heading-1",
        "p[style-name='Heading 2'] => h2.heading-2",
        "p[style-name='Heading 3'] => h3.heading-3",
        "table => table.docx-table",
        "tr => tr.docx-tr",
        "td => td.docx-td",
      ],
      convertImage: mammoth.images.imgElement(async (image) => {
        const imageBuffer = await image.read("base64");
        return {
          src: `data:${image.contentType};base64,${imageBuffer}`,
        };
      }),
      includeDefaultStyleMap: true,
    }
  );

  console.log('=== HTML OUTPUT ===');
  console.log(result.value.substring(0, 2000));
  console.log('\n\n=== MESSAGES ===');
  console.log(result.messages);

  fs.writeFileSync('/Users/tald/Projects/mindlaw/mammoth-output.html', result.value);
  console.log('\n\nSaved full output to mammoth-output.html');
}

testMammoth().catch(console.error);
