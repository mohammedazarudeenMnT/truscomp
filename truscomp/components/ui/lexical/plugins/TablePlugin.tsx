import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createTableCellNode,
  $createTableNode,
  $createTableRowNode,
  $isTableNode,
  TableCellHeaderStates,
  TableCellNode,
  TableNode,
} from "@lexical/table";
import { 
  $insertNodes, 
  $createParagraphNode, 
  $getSelection,
  $isRangeSelection,
  $setSelection,
  $createRangeSelection,
  COMMAND_PRIORITY_EDITOR, 
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ENTER_COMMAND,
  createCommand, 
  LexicalCommand,
  $getNodeByKey,
} from "lexical";
import { $findMatchingParent } from "@lexical/utils";
import { useEffect } from "react";

export interface InsertTableCommandPayload {
  columns: string;
  rows: string;
  includeHeaders?: boolean;
}

export const INSERT_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> =
  createCommand("INSERT_TABLE_COMMAND");

export default function TableInsertPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterInsert = editor.registerCommand<InsertTableCommandPayload>(
      INSERT_TABLE_COMMAND,
      ({ columns, rows, includeHeaders = true }) => {
        const numRows = Number(rows);
        const numCols = Number(columns);

        if (isNaN(numRows) || isNaN(numCols) || numRows < 1 || numCols < 1) {
          return false;
        }

        editor.update(() => {
          const tableNode = $createTableNode();

          for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            const tableRowNode = $createTableRowNode();
            const isHeaderRow = includeHeaders && rowIndex === 0;

            for (let colIndex = 0; colIndex < numCols; colIndex++) {
              const tableCellNode = $createTableCellNode(
                isHeaderRow ? TableCellHeaderStates.ROW : TableCellHeaderStates.NO_STATUS
              );
              
              const paragraphNode = $createParagraphNode();
              tableCellNode.append(paragraphNode);
              
              tableRowNode.append(tableCellNode);
            }

            tableNode.append(tableRowNode);
          }

          $insertNodes([tableNode]);
          
          // Always insert a paragraph after the table for content continuation
          const afterParagraph = $createParagraphNode();
          tableNode.insertAfter(afterParagraph);
        });

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    // Handle arrow down to escape table when at last row
    const unregisterArrowDown = editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;

        const anchorNode = selection.anchor.getNode();
        const tableNode = $findMatchingParent(anchorNode, $isTableNode);
        
        if (tableNode) {
          const tableRows = tableNode.getChildren();
          const lastRow = tableRows[tableRows.length - 1];
          
          // Check if we're in the last row
          const currentRow = $findMatchingParent(anchorNode, (node) => node.getParent() === tableNode);
          
          if (currentRow === lastRow) {
            // Get or create paragraph after table
            let nextSibling = tableNode.getNextSibling();
            if (!nextSibling) {
              const newParagraph = $createParagraphNode();
              tableNode.insertAfter(newParagraph);
              nextSibling = newParagraph;
            }
            nextSibling.selectStart();
            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      unregisterInsert();
      unregisterArrowDown();
    };
  }, [editor]);

  return null;
}
