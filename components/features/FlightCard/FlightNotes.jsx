import { NOTE_ICON_MAP } from "./constants";

export function FlightNotes({ notes }) {
  if (!notes?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-gray-100">
      {notes.map((note, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
          {NOTE_ICON_MAP[note.icon] ?? <span className="text-gray-400">•</span>}
          <span>{note.text}</span>
        </div>
      ))}
    </div>
  );
}
