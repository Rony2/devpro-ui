"use client";

import { createContext, useContext } from "react";

const EditorContext = createContext(null);

export function EditorProvider({ setCode, children }) {
  return (
    <EditorContext.Provider value={{ setCode }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  return useContext(EditorContext);
}
