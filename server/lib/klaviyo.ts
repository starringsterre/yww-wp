const KLAVIYO_BASE_URL = "https://a.klaviyo.com/api";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function getHeaders() {
  const apiKey = getRequiredEnv("KLAVIYO_PRIVATE_KEY");
  const revision = process.env.KLAVIYO_API_REVISION?.trim() || "2024-10-15";

  return {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    accept: "application/json",
    "content-type": "application/json",
    revision,
  };
}

async function klaviyoRequest(path: string, body: unknown) {
  const response = await fetch(`${KLAVIYO_BASE_URL}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Klaviyo request failed (${response.status}): ${errorText}`);
  }

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

type ProfileInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  properties?: Record<string, unknown>;
};

function profileAttributes(profile: ProfileInput) {
  return {
    email: profile.email,
    first_name: profile.firstName || "",
    last_name: profile.lastName || "",
    phone_number: profile.phone || "",
    properties: profile.properties || {},
  };
}

export async function subscribeProfileToList(args: {
  listId: string;
  profile: ProfileInput;
}) {
  return klaviyoRequest("/profile-subscription-bulk-create-jobs/", {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: profileAttributes(args.profile),
            },
          ],
        },
      },
      relationships: {
        list: {
          data: {
            type: "list",
            id: args.listId,
          },
        },
      },
    },
  });
}

export async function createEvent(args: {
  metricName: string;
  profile: ProfileInput;
  properties?: Record<string, unknown>;
}) {
  return klaviyoRequest("/events/", {
    data: {
      type: "event",
      attributes: {
        properties: args.properties || {},
        metric: {
          data: {
            type: "metric",
            attributes: {
              name: args.metricName,
            },
          },
        },
        profile: {
          data: {
            type: "profile",
            attributes: profileAttributes(args.profile),
          },
        },
      },
    },
  });
}
