const toDate = timestamp => {
  return new Date(timestamp * 1000);
}

export const TimestampParser = {
  toDate,
};