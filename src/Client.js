import { EventEmitter } from 'fbemitter';
import qs from 'qs';

class Client extends EventEmitter {
  constructor(apiEndpoint) {
    super()
    this.endpoint = apiEndpoint
  }

  async request(path, options = {}) {
    this.emit('request', path, options)
    const res = await fetch(`${this.endpoint}${path}`, {
      method: 'GET',
      ...options,
      headers: {
        'content-type': 'application/json',
        ...(options.headers || {})
      }
    })

    this.emit('response', res)

    return res.json()
  }

  async discover() {
    return this.request('/discover/movie')
  }

  addLibrary({ user_id, movie_id }) {
    return this.request('/library/add', {
      method: 'POST',
      body: JSON.stringify({ user_id, movie_id })
    })
  }

  removeLibrary({ user_id, movie_id }) {
    return this.request('/library/delete' + qs.stringify({ user_id, movie_id }), {
      method: 'DELETE',
    })
  }
  existInLibrary({ user_id, movie_id }) {
    return this.request('/library/has' + qs.stringify({ user_id, movie_id }), {
      method: 'GET',
    })
  }
}

export default Client