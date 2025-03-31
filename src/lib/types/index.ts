// Types communs pour l'application
export interface Game {
  id: string;
  title: string;
  platform: string;
  imageUrl?: string;
}

export interface StreamSchedule {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
}

export interface Achievement {
  id: string;
  viewerId: string;
  viewerName: string;
  title: string;
  description: string;
  date: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
}