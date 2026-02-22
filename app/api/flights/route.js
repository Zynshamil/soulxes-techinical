import flightsData from "@/data/flights.json";

export async function GET() {
  return Response.json(flightsData);
}
