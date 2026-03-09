export type ShortItem = {
  id: string;
  title: string;
  channel: string;
  channelUrl: string;
  videoId: string;
  description?: string;
};

// A small curated list of English kids shorts (without a database).
// You can add or remove videos by editing this array.
export const shorts: ShortItem[] = [
  {
    id: "cocomelon-1",
    title: "Wheels on the Bus | Cocomelon",
    channel: "Cocomelon - Nursery Rhymes",
    channelUrl: "https://www.youtube.com/@cocomelon",
    videoId: "KQt_PJdML8g",
    description: "Sing along with this kids' short from Cocomelon.",
  },
  {
    id: "blippi-1",
    title: "Blippi Learns Colors",
    channel: "Blippi",
    channelUrl: "https://www.youtube.com/@Blippi",
    videoId: "Hj8LzH6Vkjw",
    description: "A short clip of Blippi teaching colors to kids.",
  },
  {
    id: "peppa-1",
    title: "Peppa Pig: Jumping in Muddy Puddles",
    channel: "Peppa Pig - Official Channel",
    channelUrl: "https://www.youtube.com/@peppapig",
    videoId: "jV7lCgKO_M8",
    description: "Peppa and George jump in muddy puddles in this short.",
  },
  {
    id: "twinkle-1",
    title: "Twinkle Twinkle Little Star",
    channel: "Super Simple Songs",
    channelUrl: "https://www.youtube.com/@SuperSimpleSongs",
    videoId: "JQP8VhK7ux0",
    description: "Learn the classic lullaby in a kid-friendly short.",
  },
  {
    id: "pinkfong-1",
    title: "Baby Shark Dance",
    channel: "Pinkfong! Kids' Songs & Stories",
    channelUrl: "https://www.youtube.com/@pinkfong",
    videoId: "XqZsoesa55w",
    description: "The famous Baby Shark dance in a short format.",
  },
  {
    id: "masha-1",
    title: "Masha and the Bear: Hide and Seek",
    channel: "Masha and the Bear",
    channelUrl: "https://www.youtube.com/@mashaandthebear",
    videoId: "O17-Xgfcdo0",
    description: "A fun hide and seek moment from Masha and the Bear.",
  },
  {
    id: "storybots-1",
    title: "StoryBots: Why Do We Have To Brush Teeth?",
    channel: "StoryBots",
    channelUrl: "https://www.youtube.com/@storybots",
    videoId: "FJsonVqeLrU",
    description: "A quick answer to a question kids ask every morning.",
  },
  {
    id: "sesame-1",
    title: "Sesame Street: ABC Song",
    channel: "Sesame Street",
    channelUrl: "https://www.youtube.com/@sesamestreet",
    videoId: "75TqKxTVFGE",
    description: "Learn letters with your favorite Sesame Street friends.",
  },
  {
    id: "boohbah-1",
    title: "Boohbah: Dance Time",
    channel: "Boohbah",
    channelUrl: "https://www.youtube.com/@boohbah",
    videoId: "kW7Jz2jvTQU",
    description: "A short dance break with the Boohbahs.",
  },
  {
    id: "pearl-1",
    title: "Baby Einstein: Baby Mozart",
    channel: "Baby Einstein",
    channelUrl: "https://www.youtube.com/@babyeinstein",
    videoId: "fGMfKapGOd0",
    description: "A soothing music short from Baby Einstein.",
  },
];
