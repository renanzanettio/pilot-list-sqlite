import db from "@/app/api/database";

export async function POST(req) {
  const { email, senha } = await req.json();

  const user = db.prepare("SELECT * FROM usuarios WHERE email = ? AND senha = ?").get(email, senha);

  if (user) {
    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, error: "Usuário ou senha inválidos" }), { status: 401 });
  }
}
