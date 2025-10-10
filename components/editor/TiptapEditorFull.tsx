'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { FontFamily } from '@tiptap/extension-font-family'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Image } from '@tiptap/extension-image'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TiptapEditorFullProps {
  content: string
  onChange: (content: string) => void
}

export function TiptapEditorFull({ content, onChange }: TiptapEditorFullProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const [showTableMenu, setShowTableMenu] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-black underline',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Subscript,
      Superscript,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none font-serif text-gray-900 leading-relaxed min-h-[600px] px-8 py-6',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
      // Update word/char count
      const text = editor.getText()
      setCharCount(text.length)
      setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length)
    },
  })

  // Initialize counts on mount
  useEffect(() => {
    if (editor) {
      const text = editor.getText()
      setCharCount(text.length)
      setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length)
    }
  }, [editor])

  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-all ${
        isActive
          ? 'bg-black text-white shadow-sm'
          : disabled
          ? 'opacity-40 cursor-not-allowed text-gray-400'
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      {children}
    </motion.button>
  )

  const colors = ['#000000', '#DC2626', '#EA580C', '#CA8A04', '#16A34A', '#2563EB', '#7C3AED', '#DB2777']

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
        {/* Typography & Basic Formatting */}
        <div className="flex items-center gap-1 flex-wrap">
          {/* Font Family */}
          <select
            onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white mr-2"
            defaultValue=""
          >
            <option value="">Default</option>
            <option value="Inter, sans-serif">Inter</option>
            <option value="Playfair Display, serif">Playfair Display</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Courier New, monospace">Courier New</option>
          </select>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Bold */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
            </svg>
          </ToolbarButton>

          {/* Italic */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h10M4 20h10M14 4L8 20" />
            </svg>
          </ToolbarButton>

          {/* Underline */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <span className="text-sm font-bold underline">U</span>
          </ToolbarButton>

          {/* Strikethrough */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <span className="text-sm font-bold line-through">S</span>
          </ToolbarButton>

          {/* Subscript */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            isActive={editor.isActive('subscript')}
            title="Subscript"
          >
            <span className="text-sm font-bold">X<sub className="text-xs">2</sub></span>
          </ToolbarButton>

          {/* Superscript */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            isActive={editor.isActive('superscript')}
            title="Superscript"
          >
            <span className="text-sm font-bold">X<sup className="text-xs">2</sup></span>
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Text Color */}
          <div className="relative">
            <ToolbarButton
              onClick={() => setShowColorPicker(!showColorPicker)}
              isActive={showColorPicker}
              title="Text Color"
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-bold">A</span>
                <div className="w-4 h-0.5 bg-black" />
              </div>
            </ToolbarButton>
            {showColorPicker && (
              <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10 flex gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run()
                      setShowColorPicker(false)
                    }}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Highlight */}
          <div className="relative">
            <ToolbarButton
              onClick={() => setShowHighlightPicker(!showHighlightPicker)}
              isActive={editor.isActive('highlight')}
              title="Highlight"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </ToolbarButton>
            {showHighlightPicker && (
              <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10 flex gap-1">
                {['#FEF3C7', '#FECACA', '#BFDBFE', '#BBF7D0', '#DDD6FE'].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color }).run()
                      setShowHighlightPicker(false)
                    }}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <button
                  onClick={() => {
                    editor.chain().focus().unsetHighlight().run()
                    setShowHighlightPicker(false)
                  }}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform bg-white"
                  title="Remove highlight"
                >
                  <svg className="w-4 h-4 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Clear Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Clear Formatting"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Headings */}
          <select
            onChange={(e) => {
              const level = e.target.value
              if (level === 'p') {
                editor.chain().focus().setParagraph().run()
              } else {
                editor.chain().focus().toggleHeading({ level: parseInt(level) as any }).run()
              }
            }}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white mr-2"
            value={
              editor.isActive('heading', { level: 1 }) ? '1' :
              editor.isActive('heading', { level: 2 }) ? '2' :
              editor.isActive('heading', { level: 3 }) ? '3' :
              'p'
            }
          >
            <option value="p">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
            <option value="5">Heading 5</option>
            <option value="6">Heading 6</option>
          </select>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Text Align */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title="Justify"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10M3 8h.01M3 12h.01M3 16h.01" />
            </svg>
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Blockquote */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </ToolbarButton>

          {/* Indent */}
          <ToolbarButton
            onClick={() => {
              if (editor.isActive('listItem')) {
                editor.chain().focus().sinkListItem('listItem').run()
              }
            }}
            disabled={!editor.can().sinkListItem('listItem')}
            title="Indent"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </ToolbarButton>

          {/* Outdent */}
          <ToolbarButton
            onClick={() => {
              if (editor.isActive('listItem')) {
                editor.chain().focus().liftListItem('listItem').run()
              }
            }}
            disabled={!editor.can().liftListItem('listItem')}
            title="Outdent"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Link */}
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('Enter URL:')
              if (url) {
                editor.chain().focus().setLink({ href: url }).run()
              }
            }}
            isActive={editor.isActive('link')}
            title="Insert Link"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </ToolbarButton>

          {/* Image */}
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('Enter image URL:')
              if (url) {
                editor.chain().focus().setImage({ src: url }).run()
              }
            }}
            title="Insert Image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </ToolbarButton>

          {/* Table Menu */}
          <div className="relative">
            <ToolbarButton
              onClick={() => setShowTableMenu(!showTableMenu)}
              isActive={editor.isActive('table')}
              title="Table Options"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </ToolbarButton>
            {showTableMenu && (
              <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-1 z-10 min-w-[160px]">
                <button
                  onClick={() => {
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().insertTable()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40"
                >
                  Insert Table
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().addRowBefore().run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().addRowBefore()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40"
                >
                  Add Row Above
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().addRowAfter().run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().addRowAfter()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40"
                >
                  Add Row Below
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().deleteRow().run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().deleteRow()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40"
                >
                  Delete Row
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().addColumnBefore().run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().addColumnBefore()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40"
                >
                  Add Column Left
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().addColumnAfter().run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().addColumnAfter()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40"
                >
                  Add Column Right
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().deleteColumn().run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().deleteColumn()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40"
                >
                  Delete Column
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().deleteTable().run()
                    setShowTableMenu(false)
                  }}
                  disabled={!editor.can().deleteTable()}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded disabled:opacity-40 border-t border-gray-200 mt-1"
                >
                  Delete Table
                </button>
              </div>
            )}
          </div>

          {/* Horizontal Rule */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </ToolbarButton>

          {/* Code Block */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Status Bar with Character/Word Count */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <span>{charCount} characters</span>
            <span>•</span>
            <span>{wordCount} words</span>
          </div>
        </div>
      </div>
    </div>
  )
}
