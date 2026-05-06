import { NextResponse } from "next/server";

type RsvpPayload = {
  name?: string;
  attend?: "yes" | "no" | "";
  party?: "alone" | "spouse" | "";
  spouseName?: string;
};

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Google Sheets webhook is not configured" },
      { status: 500 },
    );
  }

  let payload: RsvpPayload;
  try {
    payload = (await request.json()) as RsvpPayload;
  } catch {
    return badRequest("Invalid JSON body");
  }

  const name = payload.name?.trim() ?? "";
  const attend = payload.attend ?? "";
  const party = payload.party ?? "";
  const spouseName = payload.spouseName?.trim() ?? "";

  if (!name) return badRequest("Name is required");
  if (attend !== "yes" && attend !== "no") return badRequest("Attend is required");
  if (attend === "yes" && party !== "alone" && party !== "spouse") {
    return badRequest("Party is required when attending");
  }
  if (attend === "yes" && party === "spouse" && !spouseName) {
    return badRequest("Spouse name is required");
  }

  const attendText = attend === "yes" ? "Қатысамын" : "Қатыса алмаймын";
  const partyText =
    attend === "yes"
      ? party === "alone"
        ? "Жалғыз келемін"
        : "Жұбайымен келемін"
      : "";

  const requestBody = {
    submittedAt: new Date().toISOString(),
    name,
    attend: attendText,
    party: partyText,
    spouseName: attend === "yes" && party === "spouse" ? spouseName : "",
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Webhook rejected request" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach webhook" },
      { status: 502 },
    );
  }
}
