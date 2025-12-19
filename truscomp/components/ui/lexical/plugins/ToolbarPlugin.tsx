"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getRoot,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  Undo,
  Redo,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { INSERT_IMAGE_COMMAND } from "./ImagesPlugin";
import { INSERT_TABLE_COMMAND } from "./TablePlugin";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  // Table State
  const [tableRows, setTableRows] = useState("3");
  const [tableCols, setTableCols] = useState("3");

  // Link State
  const [linkUrl, setLinkUrl] = useState("");



  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: reader.result as string,
          altText: file.name,
        });
      };
      reader.readAsDataURL(file);
      // Reset input
      e.target.value = "";
    }
  };

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      
      // Check link
      const node = selection.getNodes()[0];
      const parent = node?.getParent();
      setIsLink(parent?.getType() === "link");
      
      // Check block type
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementType = element.getType();
      
      if (elementType === "heading") {
        const tag = (element as any).__tag;
        setBlockType(tag || "h1");
      } else {
        setBlockType(elementType);
      }
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, _newEditor) => {
        updateToolbar();
        return false;
      },
      1
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const deleteCurrentBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        const element = nodes[0]?.getTopLevelElementOrThrow();
        if (element) {
          element.remove();
        }
      }
    });
  };

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, { 
      columns: tableCols, 
      rows: tableRows 
    });
  };

  const insertLink = () => {
    if (linkUrl) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
      setLinkUrl("");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  };

  return (
    <div className="flex items-center gap-1.5 p-2 border-b bg-background/50 backdrop-blur-md sticky top-0 z-20 flex-wrap sm:flex-nowrap overflow-x-auto no-scrollbar shadow-sm">
      {/* Block Type Indicator */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20 shrink-0">
        <Type className="w-3.5 h-3.5 text-primary" />
        <span className="text-[10px] font-black uppercase tracking-wider text-primary">
          {blockType === "paragraph" && "Text"}
          {blockType === "h1" && "H1"}
          {blockType === "h2" && "H2"}
          {blockType === "list" && "List"}
          {blockType === "quote" && "Quote"}
        </span>
      </div>

      <div className="h-5 w-px bg-border/60 mx-1 shrink-0" />

      <div className="flex items-center gap-1 shrink-0 px-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-muted/80 transition-colors"
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          title="Undo"
          type="button"
        >
          <Undo className="w-4.5 h-4.5 opacity-70" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-muted/80 transition-colors"
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          title="Redo"
          type="button"
        >
          <Redo className="w-4.5 h-4.5 opacity-70" />
        </Button>
      </div>

      <div className="h-5 w-px bg-border/60 mx-1 shrink-0" />

      <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1 shrink-0 transition-all">
        <Button
          variant={isBold ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all",
            isBold && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
          title="Bold (Selected)" 
          type="button"
        >
          <Bold className="w-4.5 h-4.5" />
        </Button>
        <Button
          variant={isItalic ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all",
            isItalic && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
          title="Italic (Selected)"
          type="button"
        >
          <Italic className="w-4.5 h-4.5" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={isLink ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 transition-all ml-1",
                isLink && "bg-background shadow-sm text-primary scale-105"
              )}
              title="Insert Link"
              type="button"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4 rounded-xl shadow-2xl border-border/40" sideOffset={10}>
             <div className="space-y-3">
               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Attach Hyperlink</Label>
               <div className="flex gap-2">
                 <Input 
                   placeholder="https://example.com" 
                   value={linkUrl}
                   onChange={(e) => setLinkUrl(e.target.value)}
                   className="h-9 text-xs rounded-lg border-muted/30"
                 />
                 <Button size="sm" onClick={insertLink} className="h-9 px-3 rounded-lg">
                   Apply
                 </Button>
               </div>
             </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="h-5 w-px bg-border/60 mx-1 shrink-0" />

      <div className="flex items-center gap-1 shrink-0 px-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-9 w-9 p-0 hover:bg-muted/80 rounded-lg transition-colors group",
            blockType === "paragraph" && "bg-primary/10 text-primary"
          )}
          onClick={formatParagraph}
          title="Paragraph / Normal Text"
          type="button"
        >
          <Type className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-muted/80 rounded-lg transition-colors group"
          onClick={() => formatHeading("h1")}
          title="Heading 1"
          type="button"
        >
          <Heading1 className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-muted/80 rounded-lg transition-colors group"
          onClick={() => formatHeading("h2")}
          title="Heading 2"
          type="button"
        >
          <Heading2 className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group"
          onClick={deleteCurrentBlock}
          title="Delete Current Block"
          type="button"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      <div className="h-5 w-px bg-border/60 mx-1 shrink-0" />

      <div className="flex items-center gap-1 shrink-0 px-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-muted/80 rounded-lg transition-colors"
          onClick={formatBulletList}
          title="Bullet List"
          type="button"
        >
          <List className="w-4.5 h-4.5" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-muted/80 rounded-lg transition-colors"
              title="Insert Table"
              type="button"
            >
              <TableIcon className="w-4.5 h-4.5 text-primary/80" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-4 rounded-xl shadow-2xl border-border/40" sideOffset={10}>
            <div className="space-y-4">
               <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Grid Dimensions</Label>
               <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-1">
                   <Label className="text-[10px] font-bold">Rows</Label>
                   <Input 
                     type="number" 
                     value={tableRows} 
                     onChange={(e) => setTableRows(e.target.value)}
                     className="h-8 text-xs rounded-md"
                   />
                 </div>
                 <div className="space-y-1">
                   <Label className="text-[10px] font-bold">Cols</Label>
                   <Input 
                     type="number" 
                     value={tableCols} 
                     onChange={(e) => setTableCols(e.target.value)}
                     className="h-8 text-xs rounded-md"
                   />
                 </div>
               </div>
               <Button onClick={insertTable} size="sm" className="w-full rounded-lg h-9 font-bold text-xs uppercase tracking-wider">
                 <Plus className="w-3 h-3 mr-2" /> Insert Grid
               </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="h-5 w-px bg-border/60 mx-1 shrink-0" />
        <input
          type="file"
          accept="image/*"
          id="lexical-image-upload"
          className="hidden"
          onChange={onImageUpload}
        />
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-muted/80 rounded-lg transition-colors"
          onClick={() => document.getElementById("lexical-image-upload")?.click()}
          title="Insert Image"
          type="button"
        >
          <ImageIcon className="w-4.5 h-4.5 text-primary/80" />
        </Button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1 shrink-0 transition-all">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-background hover:shadow-sm"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
          title="Align Left"
          type="button"
        >
          <AlignLeft className="w-4.5 h-4.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-background hover:shadow-sm"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
          title="Align Center"
          type="button"
        >
          <AlignCenter className="w-4.5 h-4.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-background hover:shadow-sm"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
          title="Align Right"
          type="button"
        >
          <AlignRight className="w-4.5 h-4.5" />
        </Button>
      </div>

    </div>
  );
}
