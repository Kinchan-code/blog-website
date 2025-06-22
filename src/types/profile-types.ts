export type Profile = {
  id: string;
  username: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
};

export type CreateProfileData = {
  username: string;
  name?: string;
};

export type UpdateProfileData = {
  username?: string;
  name?: string;
};
