exports.handler = async function (event, context) {
  const targetUrl =
    "https://bdb154eb8131e59372300690ef42e3c6925ab0ff-8090.app.kvin.wang:25443/logs/tapp-tee-1?text&bare";

  try {
    // Fetch the logs from the target URL
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Error fetching logs: ${response.statusText}`);
    }

    const logData = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from all origins
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "text/plain",
      },
      body: logData,
    };
  } catch (error) {
    console.error("Failed to fetch logs:", error.message);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({
        error: "Failed to fetch logs.",
        details: error.message,
      }),
    };
  }
};
