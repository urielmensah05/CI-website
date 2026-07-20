'use client'
import React, { useState } from 'react'

// Note: metadata n'est pas exportable depuis un composant 'use client'.
// Pour le SEO de cette page, ajoutez un layout.tsx dans app/devis/ si nécessaire.


export default function DevisForm() {
  const [form, setForm] = useState({
    structure_name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/devis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

if (!res.ok) {
  const err = await res.text()
  throw new Error(err)
}
      const data = await res.json()
      setSuccess('Merci ! Votre demande de devis a bien été envoyée. Nous vous contacterons très prochainement')
      setForm({
        structure_name: '',
        email: '',
        phone: '',
        service: '',
        description: '',
      })
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : null) || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-20 pb-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          Demande de devis
        </h1>
        <p className="mt-6 text-center text-gray-600">
          Parlez-nous de votre projet et recevez une proposition personnalisée.
        </p>

        <form onSubmit={handleSubmit} className="mt-16 space-y-6 bg-white p-10 rounded-2xl shadow-xl">
          <input
            type="text"
            name="structure_name"
            value={form.structure_name}
            onChange={handleChange}
            placeholder="Nom de votre structure"
            className="w-full border px-4 py-3 rounded-xl focus:border-orange-600 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-xl focus:border-orange-600 focus:outline-none"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Votre contact"
            className="w-full border px-4 py-3 rounded-xl focus:border-orange-600 focus:outline-none"
            required
          />
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl focus:border-orange-600 focus:outline-none"
            required
          >
            <option value="">Type de service</option>
            <option>Développement web</option>
            <option>Design graphique</option>
            <option>Marketing digital</option>
            <option>Autre</option>
          </select>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Décrivez votre projet"
            className="w-full border px-4 py-3 rounded-xl focus:border-orange-600 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-semibold hover:bg-orange-700 transition"
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>

          {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </section>
  )
}