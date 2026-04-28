/**
 * Generate an .ics calendar file from a list of reminder strings.
 */
export function generateICS(reminders: string[]): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  let ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Mumzworld AI//Shopping Assistant//EN\r\nCALSCALE:GREGORIAN\r\n`;

  reminders.forEach((reminder, i) => {
    const eventDate = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
    const clean = reminder.replace(/[^\w\s\u0600-\u06FF.,!?-]/g, "").trim();
    ics += `BEGIN:VEVENT\r\n`;
    ics += `DTSTART:${formatDate(eventDate)}\r\n`;
    ics += `DTEND:${formatDate(new Date(eventDate.getTime() + 3600000))}\r\n`;
    ics += `SUMMARY:${clean}\r\n`;
    ics += `DESCRIPTION:Mumzworld AI Shopping Assistant Reminder\r\n`;
    ics += `UID:mumzworld-${Date.now()}-${i}@ai-assistant\r\n`;
    ics += `END:VEVENT\r\n`;
  });

  ics += `END:VCALENDAR\r\n`;
  return ics;
}

export function downloadICS(reminders: string[]) {
  const ics = generateICS(reminders);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mumzworld-reminders.ics";
  a.click();
  URL.revokeObjectURL(url);
}
