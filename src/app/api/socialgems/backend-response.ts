export type BackendMessage = {
  status?: number;
  message?: string;
};

export async function readBackendResponse<T extends BackendMessage>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const fallbackMessage = response.ok ? "Unexpected backend response" : response.statusText || "Backend request failed";

  if (contentType.includes("application/json")) {
    try {
      return (await response.json()) as T;
    } catch {
      return { status: response.status, message: fallbackMessage } as T;
    }
  }

  const text = (await response.text()).trim();
  return {
    status: response.status,
    message: text || fallbackMessage,
  } as T;
}
