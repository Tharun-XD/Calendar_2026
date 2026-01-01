import json

# Load JSON file
with open("holidays_2026.json", "r", encoding="utf-8") as f:
    data = json.load(f)

titles = []

# Loop through all months
for month, days in data.items():
    for day in days:
        for event in day.get("events", []):
            title = event.get("title")
            if title:
                titles.append(title)

# Print all titles
for t in titles:
    print(t)

print("\nTotal titles:", len(titles))
