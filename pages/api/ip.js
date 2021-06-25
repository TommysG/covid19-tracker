// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { ip } = req.body;

  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();

  if (data.status === "success") {
    res.status(200).json({ data });
  } else {
    res.status(404).json({ message: `ip not found` });
  }
}
