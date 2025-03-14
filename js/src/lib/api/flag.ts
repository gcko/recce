import { axiosClient } from "./axiosClient";

export interface RecceServerFlags {
  show_onboarding_guide: boolean;
  single_env_onboarding: boolean;
  show_relaunch_hint: boolean;
}

export async function getServerFlag(): Promise<RecceServerFlags> {
  const response = await axiosClient.get("/api/flag");
  return response.data;
}

export async function markOnboardingCompleted(): Promise<void> {
  try {
    await axiosClient.post("/api/onboarding/completed");
  } catch (error) {
    // skip any errors
  }
}

export async function markRelaunchHintCompleted(): Promise<void> {
  try {
    await axiosClient.post("/api/relaunch-hint/completed");
  } catch (error) {
    // skip any errors
  }
}
