"use client"

import React, { TextareaHTMLAttributes } from "react"
import { MarkdownToolbar } from "./MarkdownToolbar"

interface MarkdownTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
}

export function MarkdownTextarea({ id, ...props }: MarkdownTextareaProps) {
  return (
    <div>
      <MarkdownToolbar textareaId={id} />
      <textarea
        id={id}
        {...props}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault()
            const textarea = e.currentTarget
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const value = textarea.value
            
            const newContent = value.substring(0, start) + "  " + value.substring(end)
            
            // Set value natively to trigger onChange properly or just update it
            textarea.value = newContent
            
            // Move cursor
            textarea.selectionStart = textarea.selectionEnd = start + 2
            
            // Dispatch input event for React to pick up changes (if it's uncontrolled or controlled)
            const event = new Event('input', { bubbles: true })
            textarea.dispatchEvent(event)
            
            // If there is an external onKeyDown, call it
            if (props.onKeyDown) {
              props.onKeyDown(e)
            }
          }
        }}
      />
    </div>
  )
}
