export interface commentProps {
  id: string;
  content: string;
  author: {
    id: string;
    email: string;
    fullName: string;
  };
  mentions: Array<{
    id: string;
    user: {
      id: string;
      email: string;
      fullName: string;
    };
  }>;
}

export interface memberProps {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}
