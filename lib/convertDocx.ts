import mammoth from 'mammoth'

export async function convertDocxToHtml(buffer: Buffer): Promise<string> {
  try {
    const options: any = {
      styleMap: [
        // Preserve all heading styles
        "p[style-name='Heading 1'] => h1.heading-1",
        "p[style-name='Heading 2'] => h2.heading-2",
        "p[style-name='Heading 3'] => h3.heading-3",
        "p[style-name='Title'] => h1.title",
        "p[style-name='Subtitle'] => h2.subtitle",

        // Preserve text formatting
        "r[style-name='Strong'] => strong",
        "r[style-name='Emphasis'] => em",

        // Preserve tables with full styling
        "table => table.docx-table",
        "tr => tr.docx-tr",
        "td => td.docx-td",

        // Lists
        "p[style-name='List Paragraph'] => p.list-para",
      ],

      // Convert images to base64 embedded in HTML
      convertImage: mammoth.images.imgElement(async (image) => {
        const imageBuffer = await image.read("base64")
        return {
          src: `data:${image.contentType};base64,${imageBuffer}`,
          style: "max-width: 100%; height: auto; display: block; margin: 0 auto;"
        }
      }),

      // Include default paragraph styles
      includeDefaultStyleMap: true,

      // Include embedded style map
      includeEmbeddedStyleMap: true,

      // Transform the document structure
      transformDocument: mammoth.transforms.paragraph((element: any) => {
        // Preserve alignment
        if (element.alignment) {
          return {
            ...element,
            styleId: element.styleId,
            styleName: element.styleName
          }
        }
        return element
      })
    }

    const result = await mammoth.convertToHtml({ buffer }, options)

    // Get the HTML
    let html = result.value

    // Add comprehensive RTL styling and Tiptap-compatible classes
    html = `
<style>
  .docx-content {
    direction: rtl;
    text-align: right;
    font-family: 'David', 'Times New Roman', serif;
    line-height: 1.6;
    padding: 20px;
  }

  .docx-content p {
    margin: 0.5em 0;
    text-align: right;
  }

  .docx-content h1,
  .docx-content h2,
  .docx-content h3 {
    text-align: center;
    margin: 1em 0;
    font-weight: bold;
  }

  .docx-content img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1em auto;
  }

  .docx-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    direction: rtl;
  }

  .docx-content td,
  .docx-content th {
    border: 1px solid #000;
    padding: 8px;
    text-align: right;
  }

  .docx-content strong {
    font-weight: bold;
  }

  .docx-content em {
    font-style: italic;
  }

  .docx-content u {
    text-decoration: underline;
  }

  .docx-content ul,
  .docx-content ol {
    margin: 0.5em 0;
    padding-right: 2em;
    text-align: right;
    direction: rtl;
  }

  .docx-content li {
    text-align: right;
    margin: 0.25em 0;
  }
</style>
<div class="docx-content" dir="rtl">${html}</div>
`

    // Log any conversion messages/warnings
    if (result.messages && result.messages.length > 0) {
      console.log('Mammoth conversion messages:', result.messages)
    }

    return html

  } catch (error) {
    console.error('Error converting DOCX:', error)
    throw new Error('Failed to convert DOCX file')
  }
}
