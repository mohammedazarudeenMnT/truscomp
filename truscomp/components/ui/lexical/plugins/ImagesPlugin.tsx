import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from "lexical";
import { useEffect } from "react";
import * as React from "react";
import { $createImageNode, ImagePayload } from "../nodes/ImageNode";

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand();

export default function ImagesPlugin(): React.ReactNode {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand<ImagePayload>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload);
        $insertNodes([imageNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
