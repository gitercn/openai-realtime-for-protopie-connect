import { ArrowUp, ArrowDown } from "react-feather";
import { useState } from "react";
const processedEventIds = new Set(); // 用于记录已处理的 event_id


function Event({ event, timestamp }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isClient = event.event_id && !event.event_id.startsWith("event_");

  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-gray-50">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isClient ? (
          <ArrowDown className="text-blue-400" />
        ) : (
          <ArrowUp className="text-green-400" />
        )}
        <div className="text-sm text-gray-500">
          {isClient ? "client:" : "server:"}
          &nbsp;{event.type} | {timestamp}
        </div>
      </div>
      <div
        className={`text-gray-500 bg-gray-200 p-2 rounded-md overflow-x-auto ${isExpanded ? "block" : "hidden"
          }`}
      >
        <pre className="text-xs">{JSON.stringify(event, null, 2)}</pre>
      </div>
    </div>
  );
}

export default function EventLog({ events, socket }) {
  const eventsToDisplay = [];
  let deltaEvents = {};

  events.forEach((event) => {
    if (event.type.endsWith("delta")) {
      if (deltaEvents[event.type]) {
        return; 
      } else {
        deltaEvents[event.type] = event;
      }
    }

    console.log(event)
    if (event?.type === "response.audio_transcript.done") {
      if (processedEventIds.has(event.event_id)) {
        return;
      }

      processedEventIds.add(event.event_id);

      console.log("Transcript:", event?.transcript);

      // Emit the transcript to the socket
      if (socket) {
        socket.emit("ppMessage", {
          messageId: "response",
          value: event.transcript,
        });
      } else {
        console.error("Socket is not available!");
      }
    }

    eventsToDisplay.push(
      <Event
        key={event.event_id}
        event={event}
        timestamp={new Date().toLocaleTimeString()}
      />,
    );
  });

  return (
    <div className="flex flex-col gap-2 overflow-x-auto">
      {events.length === 0 ? (
        <div className="text-gray-500">Awaiting events...</div>
      ) : (
        eventsToDisplay
      )}
    </div>
  );
}
