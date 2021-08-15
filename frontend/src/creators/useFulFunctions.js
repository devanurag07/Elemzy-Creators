export const getAssingmentColor = (perc) => {
  console.log(perc);
  console.log(((perc) => 50) & (perc <= 70));
  if (perc <= 30) {
    return "red";
  } else if ((perc >= 50) & (perc <= 70)) {
    return "orange";
  } else {
    return "green";
  }
};

export const getRandomColor = () => {
  const colors = [
    { foreground: "red", background: "#ff000036" },
    { foreground: "#e65c00", background: " #ffb380" },
    { foreground: "#0052cc", background: " #80b3ff" },
    { foreground: "#3b00b3", background: " #aa80ff" },
  ];

  const randomIdx = Math.floor(Math.random() * colors.length);
  const color = colors[randomIdx];

  return color;
};

export const MAIN_COLOR = "#3283C9";
export const SECONDARY_COLOR = "#151D5B";
export const MAIN_COLOR_LIGHT = "#E7F4FF";
