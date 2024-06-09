import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}


export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} on ${formattedDate}`;
}


export function formatPostCount(count: number): string {
  if (count === 0) {
    return "No Posts";
  } else {
    const postCount = count.toString().padStart(2, "0");
    const postWord = count === 1 ? "Post" : "Posts";
    return `${postCount} ${postWord}`;
  }
}

export const getInitials = (name: string) => {
  const names = name?.split(' ');
  let initials = '';

  for (let i = 0; i < names?.length; i++) {
    if (names[i]?.length > 0) {
      initials += names[i][0].toUpperCase();
    }
  }

  return initials;
}