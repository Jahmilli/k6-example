export const getTimestamp = (): string => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const logger = {
  info(...val: any): void {
    console.log(getTimestamp(), ...val);
  },
  warn(...val: any): void {
    console.warn(getTimestamp(), ...val);
  },
  error(...val: any): void {
    console.error(getTimestamp(), ...val);
  },
};

export const logWaitingTime = ({
  metric,
  response,
  messageType,
}: {
  metric: any;
  response: any;
  messageType: string;
}): void => {
  const responseTimeThreshold = 5000;
  let correlationId = "";
  let responseTime = response.timings.waiting;
  try {
    let json = response.json();
    correlationId = json.correlationId;
  } catch (err) {
    // noop
  }

  // Log any responses that far longer than expected so we can troubleshoot those particular queries
  if (responseTime > responseTimeThreshold) {
    logger.warn(
      `${messageType} with correlationId '${correlationId}' took longer than ${responseTimeThreshold}`
    );
  }
  metric.add(responseTime);
};
