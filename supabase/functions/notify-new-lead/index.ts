import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, phone, address, timeline, source } = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not set — skipping email notification");
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailBody = `
      <h2>New Lead from ${source}</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;background:#f4f4f4;">Name</td><td style="padding:8px;">${name || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f4f4f4;">Email</td><td style="padding:8px;">${email || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f4f4f4;">Phone</td><td style="padding:8px;">${phone || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f4f4f4;">Address</td><td style="padding:8px;">${address || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f4f4f4;">Timeline</td><td style="padding:8px;">${timeline || "—"}</td></tr>
      </table>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "leads@hamadehomes.com",
        to: "rob@hamadehomes.com",
        subject: `New Lead: ${name} — ${source}`,
        html: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ success: false, error: err }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-new-lead error:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
