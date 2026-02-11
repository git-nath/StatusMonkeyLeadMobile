# StatusMonkey Lead Mobile

Mobile client for the existing StatusMonkey backend (no backend reimplementation).

## What changed

This app is now a **backend-connected mobile frontend** that mirrors the neon dashboard workflow from the web app:

- pulls dashboard stats + leads from your backend
- supports keyword/filter-based lead feed queries
- allows mobile actions for `Contacted` and `Ignore`
- keeps all data source responsibility in your existing server

## Backend connection

Set the backend URL before starting Expo:

```bash
export EXPO_PUBLIC_API_BASE_URL="http://YOUR_BACKEND_HOST:3000"
```

If your backend already runs on the same machine, you can leave it as default (`http://localhost:3000`).

## Expected API contract

The mobile app calls these endpoints:

- `GET /api/mobile/leads?query=&filter=`
- `POST /api/mobile/leads/:leadId/contacted`
- `POST /api/mobile/leads/:leadId/ignored`

`GET /api/mobile/leads` should return:

```json
{
  "stats": {
    "totalLeads": 1102,
    "emergency": 8,
    "hot": 45,
    "warm": 571,
    "contacted": 165,
    "dailyGoalCurrent": 0,
    "dailyGoalTarget": 10,
    "converted": 1,
    "revenue": 5.99
  },
  "filterCounts": {
    "all": 49,
    "today": 49,
    "pinned": 0,
    "top": 10,
    "hot": 2,
    "contacted": 165,
    "replied": 0,
    "converted": 0,
    "ignored": 888
  },
  "leads": [
    {
      "id": "abc123",
      "title": "How can a junior deal with a workaholic senior?",
      "subreddit": "careerguidance",
      "author": "throwaway",
      "commentsCount": 85,
      "priority": "hot",
      "postedAt": "2026-02-11T10:00:00.000Z",
      "postUrl": "https://reddit.com/...",
      "contacted": false,
      "replied": false,
      "converted": false,
      "ignored": false,
      "pinned": false
    }
  ]
}
```

## Run

```bash
npm install
npm run start
```

## Notes

- In this execution environment, npm registry access is restricted (HTTP 403), so install/start could not be fully run here.
- The code is prepared to connect to your existing backend once dependencies are installed in your environment.
