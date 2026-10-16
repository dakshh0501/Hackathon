/**
 * TravelTales Frontend API Client
 * Connects frontend (port 5173) to backend API (port 4000)
 */

const API_BASE = 'http://localhost:4000/api/v1';

class ApiClient {
  constructor(baseUrl = API_BASE) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('traveltales_jwt') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('traveltales_jwt', token);
    } else {
      localStorage.removeItem('traveltales_jwt');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || `Request failed with status ${response.status}`);
      }

      return json.data;
    } catch (err) {
      console.warn(`[TravelTales API] Error fetching ${endpoint}:`, err.message);
      throw err;
    }
  }

  // Health check
  async getHealth() {
    const res = await fetch('http://localhost:4000/health');
    return res.json();
  }

  // Discovery & Destinations
  async getDestinations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/destinations${query ? `?${query}` : ''}`);
  }

  async getDestinationBySlug(slug) {
    return this.request(`/destinations/${slug}`);
  }

  async suggestDestinations(query) {
    return this.request(`/destinations/suggest?q=${encodeURIComponent(query || '')}`);
  }

  async getAttractions(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/attractions${query ? `?${query}` : ''}`);
  }

  async getAttractionById(id) {
    return this.request(`/attractions/${id}`);
  }

  async getLandscapeLayers() {
    return this.request('/meta/layers');
  }

  // Trip Intelligence Engine
  async generateItinerary(payload) {
    return this.request('/intelligence/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async validateItinerary(payload) {
    return this.request('/intelligence/validate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async estimateBudget(payload) {
    return this.request('/intelligence/budget', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async settleExpenses(payload) {
    return this.request('/intelligence/settle', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Trips CRUD
  async getTrips() {
    return this.request('/trips');
  }

  async getTripById(tripId) {
    return this.request(`/trips/${tripId}`);
  }

  async createTrip(tripData) {
    return this.request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) this.setToken(data.token);
    return data;
  }

  async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (data.token) this.setToken(data.token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Checklists & Packing
  async getChecklists(tripId) {
    return this.request(`/trips/${tripId}/checklists`);
  }

  async generateChecklist(tripId, needs = []) {
    return this.request(`/trips/${tripId}/checklists/generate`, {
      method: 'POST',
      body: JSON.stringify({ needs }),
    });
  }

  // Export
  async exportTrip(tripId, format = 'json') {
    return this.request(`/trips/${tripId}/export?format=${format}`);
  }
}

export const api = new ApiClient();
