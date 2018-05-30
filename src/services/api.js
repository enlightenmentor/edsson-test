export function fetchFeeds() {
  return fetch("http://localhost:8001/feeds").then(resp => resp.json());
}

export function addFeed(feed) {
  return fetch("http://localhost:8001/feeds", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(feed)
  }).then(resp => resp.json());
}

export function editFeed(feed) {
  return fetch(`http://localhost:8001/feeds/${feed.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(feed)
  }).then(resp => resp.json());
}

export function removeFeed(feedId) {
  return fetch(`http://localhost:8001/feeds/${feedId}`, {
    method: "DELETE"
  }).then(resp => resp.json());
}