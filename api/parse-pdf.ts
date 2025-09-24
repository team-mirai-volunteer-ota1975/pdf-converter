import type { VercelRequest, VercelResponse } from '@vercel/node'
import pdf from 'pdf-parse'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS（ブラウザから呼ぶなら必要）
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  try {
    // リクエストボディを Buffer にまとめる
    const chunks: Buffer[] = []
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    }
    const buffer = Buffer.concat(chunks)

    // PDF をパース
    const data = await pdf(buffer)

    res.status(200).json({
      length: data.text.length,
      preview: data.text.slice(0, 500) + '...',
      text: data.text
    })
  } catch (err: any) {
    console.error(err)
    res.status(500).send('PDF parsing failed: ' + err.message)
  }
}
