# Sub0 Backend — Dreamscapes 3D

## Files

| File | Purpose |
|---|---|
| `_visit.json` | Database model for tracking visitor ratings per world |
| `record-visit.json` | POST endpoint — records a visit/rating |
| `get-stats.json` | GET endpoint — returns aggregate stats per world |

## How to deploy

1. Go to https://sub0.app and create a new project
2. Create the database model: paste `_visit.json` into the editor
3. Create the endpoints: paste each `.json` file as a new endpoint spec
4. Copy the API URL from the dashboard
5. Set `VITE_SUB0_API_URL` in your LingoQL deployment env vars
