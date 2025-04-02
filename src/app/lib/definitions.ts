export type Admin = {
    id: string;
    name: string;
    email: string;
    password: string;
};
  
export type Users = {
    id: string;
    first_name: string;
    last_name: string;
    company_name: string;  // Company the user belongs to
    email: string;
    contact: string;  // Phone number or other contact info
    social_media: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
      [key: string]: string | undefined;  // Allows for more dynamic social media platforms
    };
    expertise: string;  // expertise or skills
    message: string;  // Any message the user wants to provide
};

export type Infuencers = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;  // Phone number or other contact info
  social_media: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    [key: string]: string | undefined;  // Allows for more dynamic social media platforms
  };
  influence: string;  // field of influence or skills
  message: string;  // Any message the user wants to provide
};