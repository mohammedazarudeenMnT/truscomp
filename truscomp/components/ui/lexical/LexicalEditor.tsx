"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getRoot } from "lexical";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { ImageNode } from "./nodes/ImageNode";
import ImagesPlugin from "./plugins/ImagesPlugin";
import TableInsertPlugin from "./plugins/TablePlugin";

const theme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "mb-6 text-lg tracking-normal leading-[1.8]",
  quote:
    "border-l-4 border-primary/20 pl-6 italic my-8 text-xl text-muted-foreground font-serif",
  heading: {
    h1: "text-4xl sm:text-5xl font-bold mb-8 mt-12 tracking-tight",
    h2: "text-3xl sm:text-4xl font-bold mb-6 mt-10 tracking-tight",
    h3: "text-2xl sm:text-3xl font-bold mb-4 mt-8 tracking-tight",
    h4: "text-xl sm:text-2xl font-bold mb-4 mt-6 tracking-tight",
    h5: "text-lg sm:text-xl font-bold mb-2 mt-4 tracking-tight",
  },
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "list-decimal ml-8 mb-6 mt-2 space-y-2",
    ul: "list-disc ml-8 mb-6 mt-2 space-y-2",
    listitem: "pl-2",
  },
  link: "text-primary hover:underline cursor-pointer transition-all decoration-primary/30 underline-offset-4",
  text: {
    bold: "font-bold text-foreground",
    italic: "italic",
    underline: "underline decoration-primary/30 underline-offset-4",
    strikethrough: "line-through opacity-50",
    code: "bg-muted/50 px-1.5 py-0.5 rounded-md font-mono text-sm border border-border/50",
  },
  table: "TrusCompTable",
  tableCell: "TrusCompTableCell",
  tableCellHeader: "TrusCompTableCellHeader",
};

function HtmlPlugin({
  initialHtml,
  onHtmlChange,
}: {
  initialHtml?: string;
  onHtmlChange: (html: string) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender && initialHtml && initialHtml !== "") {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialHtml, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        $getRoot().clear();
        $getRoot().append(...nodes);
      });
      setIsFirstRender(false);
    }
  }, [editor, initialHtml, isFirstRender]);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const html = $generateHtmlFromNodes(editor, null);
          onHtmlChange(html);
        });
      }}
    />
  );
}

interface LexicalEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function LexicalEditor({
  value,
  onChange,
  placeholder,
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "TrusCompEditor",
    theme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
    ] as unknown[],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative rounded-2xl bg-transparent flex flex-col min-h-[500px] transition-all TrusCompEditor">
        <ToolbarPlugin />
        <div className="flex-1 relative overflow-visible mt-6">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[450px] outline-none focus:ring-0 text-lg sm:text-xl leading-relaxed font-serif text-foreground/90 selection:bg-primary/10" />
            }
            placeholder={
              <div className="absolute top-0 left-0 text-muted-foreground/30 pointer-events-none text-lg sm:text-xl italic font-serif">
                {placeholder || "Tell your story..."}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <TablePlugin hasCellMerge hasCellBackgroundColor hasTabHandler />
          <TableInsertPlugin />
          <ImagesPlugin />
          <HtmlPlugin initialHtml={value} onHtmlChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
