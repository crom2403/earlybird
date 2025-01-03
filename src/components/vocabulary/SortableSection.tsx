import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ResponseSection } from "@/app/vocabulary/action"

interface SortableSectionProps {
  section: ResponseSection
  children: React.ReactNode
}

const SortableSection = ({ section, children }: SortableSectionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: {
      type: "section",
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.9 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {React.cloneElement(children as React.ReactElement, {
        dragHandleProps: { ...attributes, ...listeners },
      })}
    </div>
  )
}

export default SortableSection
