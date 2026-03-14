"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

const toolbarBtnStyle = (active: boolean): React.CSSProperties => ({
  padding: "5px 10px",
  borderRadius: "4px",
  border: "1px solid",
  borderColor: active ? "#1a1a18" : "#e8e6e1",
  backgroundColor: active ? "#1a1a18" : "transparent",
  color: active ? "#faf9f7" : "#6b6b67",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.8rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.15s ease",
});

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: [
          "min-height: 400px",
          "padding: 24px",
          "outline: none",
          "font-family: 'DM Sans', sans-serif",
          "font-size: 1.05rem",
          "line-height: 1.8",
          "color: #2a2a28",
        ].join("; "),
      },
    },
  });

  if (!editor) return null;

  const tools = [
    { label: "B", title: "Bold", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { label: "I", title: "Italic", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { label: "H2", title: "Heading 2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { label: "H3", title: "Heading 3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
    { label: "UL", title: "Bullet list", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { label: "OL", title: "Numbered list", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { label: "❝", title: "Blockquote", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    { label: "{ }", title: "Code block", action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock") },
  ];

  return (
    <div
      style={{
        border: "1px solid #e8e6e1",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          padding: "12px 16px",
          borderBottom: "1px solid #e8e6e1",
          backgroundColor: "#faf9f7",
        }}
      >
        {tools.map(({ label, title, action, active }) => (
          <button
            key={label}
            title={title}
            onClick={(e) => { e.preventDefault(); action(); }}
            style={toolbarBtnStyle(active)}
          >
            {label}
          </button>
        ))}
        <div style={{ width: "1px", backgroundColor: "#e8e6e1", margin: "0 4px" }} />
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }}
          style={toolbarBtnStyle(false)}
          title="Undo"
        >
          ↩
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }}
          style={toolbarBtnStyle(false)}
          title="Redo"
        >
          ↪
        </button>
      </div>

      {/* Editor body */}
      <EditorContent editor={editor} />
    </div>
  );
}
