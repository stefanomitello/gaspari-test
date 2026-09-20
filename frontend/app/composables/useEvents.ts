import type {
  EventItem,
  PaginatedResponse,
  EventFilterParams,
} from "~/types/events";

export const useEvents = () => {
  const { apiFetch } = useApi();
  const isLoading = useState<boolean>("events_loading", () => false);
  const error = useState<string | null>("events_error", () => null);

  const buildQueryParams = (
    params?: EventFilterParams,
  ): Record<string, any> => {
    if (!params) return {};

    const query: Record<string, any> = {};

    if (params.title) {
      query["filter[title]"] = params.title;
    }
    if (params.location) {
      query["filter[location]"] = params.location;
    }
    if (params.category && params.category !== "Tutte") {
      query["filter[category]"] = params.category;
    }
    if (params.is_published !== undefined) {
      query["filter[is_published]"] =
        typeof params.is_published === "boolean"
          ? params.is_published
            ? 1
            : 0
          : params.is_published;
    }
    if (params.sort) {
      query.sort = params.sort;
    }
    if (params.page) {
      query.page = params.page;
    }
    if (params.per_page) {
      query.per_page = params.per_page;
    }

    return query;
  };

  /**
   * GET /api/events
   * Lista paginata degli eventi con filtri e ordinamento.
   * Se l'utente è autenticato, ogni evento include is_favorite.
   */
  const getEvents = async (
    params?: EventFilterParams,
  ): Promise<PaginatedResponse<EventItem>> => {
    isLoading.value = true;
    error.value = null;

    try {
      const query = buildQueryParams(params);
      return await apiFetch<PaginatedResponse<EventItem>>("/events", {
        method: "GET",
        query,
      });
    } catch (err: any) {
      error.value = err?.message || "Errore nel caricamento degli eventi";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * GET /api/events/categories
   * Restituisce le categorie distinte degli eventi pubblicati.
   */
  const getCategories = async (): Promise<string[]> => {
    try {
      const res = await apiFetch<{ data: string[] }>("/events/categories", {
        method: "GET",
      });
      return res?.data || [];
    } catch (err: any) {
      console.error("Errore nel recupero delle categorie:", err);
      return [];
    }
  };

  /**
   * GET /api/events/{slug}
   * Dettaglio dell'evento tramite slug (404 se non esiste)
   * Se l'utente è autenticato include is_favorite
   */
  const getEventBySlug = async (slug: string): Promise<EventItem> => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await apiFetch<{ data?: EventItem } | EventItem>(
        `/events/${slug}`,
        {
          method: "GET",
        },
      );
      return res && "data" in res && res.data ? res.data : (res as EventItem);
    } catch (err: any) {
      error.value = err?.message || `Evento ${slug} non trovato`;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * GET /api/favorites
   * Eventi preferiti dell'utente autenticato (paginati)
   */
  const getFavorites = async (
    page = 1,
    perPage = 15,
  ): Promise<PaginatedResponse<EventItem>> => {
    isLoading.value = true;
    error.value = null;

    try {
      return await apiFetch<PaginatedResponse<EventItem>>("/favorites", {
        method: "GET",
        query: { page, per_page: perPage },
      });
    } catch (err: any) {
      error.value = err?.message || "Errore nel caricamento dei preferiti";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * POST /api/events/{event}/favorite
   * Aggiunge un evento ai preferiti dell'utente (201)
   */
  const addFavorite = async (eventId: number): Promise<{ message: string }> => {
    return await apiFetch<{ message: string }>(`/events/${eventId}/favorite`, {
      method: "POST",
    });
  };

  /**
   * DELETE /api/events/{event}/favorite
   * Rimuove un evento dai preferiti dell'utente
   */
  const removeFavorite = async (
    eventId: number,
  ): Promise<{ message: string }> => {
    return await apiFetch<{ message: string }>(`/events/${eventId}/favorite`, {
      method: "DELETE",
    });
  };

  /**
   * Toggle favorite helper: inverte lo stato di is_favorite di un evento
   */
  const toggleFavorite = async (event: EventItem): Promise<boolean> => {
    const previousState = Boolean(event.is_favorite);
    const newState = !previousState;

    // Aggiornamento ottimistico
    event.is_favorite = newState;

    try {
      if (newState) {
        await addFavorite(event.id);
      } else {
        await removeFavorite(event.id);
      }
      return newState;
    } catch (err) {
      // Rollback in caso di fallimento
      event.is_favorite = previousState;
      throw err;
    }
  };

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    getEvents,
    getCategories,
    getEventBySlug,
    getFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    buildQueryParams,
  };
};
