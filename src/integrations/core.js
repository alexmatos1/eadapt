
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api";

export async function UploadFile({ file }) {
  const formData = new FormData()
  formData.append("file", file)


  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) throw new Error("Erro ao enviar arquivo")

  return await response.json()
}