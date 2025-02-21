export function capitalizeFirstLetter(string: string) {
    if (!string) return string; // handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  }