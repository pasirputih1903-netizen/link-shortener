import express from 'express'
import { nanoid } from 'nanoid'
import supabase from '../lib/supabase.js'

const router = express.Router()

// POST /api/shorten
router.post('/shorten', async (req, res) => {
  const { original_url } = req.body

  if (!original_url) {
    return res.status(400).json({ error: 'URL tidak boleh kosong' })
  }

  const short_code = nanoid(6)

  const { error } = await supabase
    .from('links')
    .insert({ original_url, short_code })

  if (error) {
    return res.status(500).json({ error: 'Gagal menyimpan link' })
  }

  return res.json({
    short_url: `${process.env.BASE_URL}/${short_code}`
  })
})

// GET /:code → redirect
router.get('/:code', async (req, res) => {
  const { code } = req.params

  const { data, error } = await supabase
    .from('links')
    .select('original_url, click_count')
    .eq('short_code', code)
    .single()

  if (error || !data) {
    return res.status(404).send('Link tidak ditemukan')
  }

  await supabase
    .from('links')
    .update({ click_count: data.click_count + 1 })
    .eq('short_code', code)

  return res.redirect(
    `/redirect.html?url=${encodeURIComponent(data.original_url)}`
  )
})

export default router